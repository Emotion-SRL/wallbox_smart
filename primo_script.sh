#!/bin/bash

### INSTALLARE PYTHON ###

# Aggiornare il gestore dei pacchetti
echo "Aggiornamento del gestore dei pacchetti..."
opkg update

# Installare python3-light
# echo "Installazione di python3-light..."
# opkg install python3-light

# Verificare se python3 è già installato
if ! command -v python3 &> /dev/null; then
    echo "Installazione della versione completa di python3..."
    opkg install python3

    # Verificare se l'installazione è riuscita
    if [ $? -ne 0 ]; then
        echo "Errore durante l'installazione di python3."
        exit 1
    fi
else
    echo "python3 è già installato."
fi

### INSTALLARE PIP ###
# Installare pip
echo "Installazione di pip..."
opkg update
opkg install python3-pip

# Verificare se l'installazione è riuscita
if [ $? -ne 0 ]; then
    echo "Errore durante l'installazione di pip."
    exit 1
fi


### RISOLVERE L'ERRORE "NO SPACE LEFT ON DEVICE" ###
# Creare una directory temporanea per pip
echo "Creazione di una directory temporanea per pip..."
mkdir -p /root/temp

# Impostare la variabile di ambiente TMPDIR
export TMPDIR=/root/temp

### RISOLVERE L'ERRORE DI SETUPTOOLS ###
# Aggiornare setuptools
echo "Aggiornamento di setuptools..."
pip3 install --upgrade setuptools

# Verificare se l'aggiornamento è riuscito
if [ $? -ne 0 ]; then
    echo "Errore durante l'aggiornamento di setuptools."
    exit 1
fi

### INSTALLARE GIT ###

# Verificare se git è già installato
if ! command -v git &> /dev/null; then
    echo "Installazione di git..."
    opkg install git git-http ca-bundle
    opkg update
else
    echo "git è già installato."
fi

### CLONARE LA CARTELLA DEL PROGETTO DA GITHUB ###

# Definire il token e l'URL del repository
GITHUB_TOKEN="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"
REPO_URL="https://$GITHUB_TOKEN@github.com/Emotion-SRL/wallbox_smart.git"
CLONE_DIR="wallbox_smart"

# Verificare se la cartella del repository esiste già
if [ ! -d "$CLONE_DIR" ]; then
    echo "Clonando il repository..."
    git clone $REPO_URL $CLONE_DIR

    # Verificare se il clone è riuscito
    if [ $? -ne 0 ]; then
        echo "Errore durante la clonazione del repository."
        exit 1
    fi
else
    echo "La cartella $CLONE_DIR esiste già. Clonazione saltata."
fi
# Navigare nella directory del progetto clonato
cd $CLONE_DIR

# Eseguire eventuali comandi di configurazione o avvio
# Ad esempio, installare le dipendenze se c'è un file requirements.txt
# if [ -f "requirements.txt" ]; then
#     echo "Installando le dipendenze..."
#     pip install -r requirements.txt
# fi

echo "Progetto clonato e configurato con successo."

echo "Impostazione dei permessi per la cartella $CLONE_DIR..."
chmod -R 777 .


# Sostituire la cartella OnionOS in /www con quella in wallbox_smart solo se esiste
if [ -d "wallbox_smart/OnionOS" ]; then
    echo "Sostituzione della cartella OnionOS in /www con quella in wallbox_smart..."
    rm -rf /www/OnionOS
    mv wallbox_smart/OnionOS /www/
    echo "Cartella OnionOS sostituita con successo."
else
    echo "La cartella OnionOS non è presente in wallbox_smart, è già stata spostata. Operazione saltata."
fi

# Aggiungere la riga gpioctl dirout-low 11 a /etc/rc.local
RC_LOCAL="/etc/rc.local"
if ! grep -q "gpioctl dirout-low 11" "$RC_LOCAL"; then
    echo "Aggiungendo 'gpioctl dirout-low 11' a $RC_LOCAL..."
    echo "gpioctl dirout-low 11" >> "$RC_LOCAL"
    echo "Riga aggiunta con successo."
else
    echo "La riga 'gpioctl dirout-low 11' è già presente in $RC_LOCAL."
fi

# Recuperare il MAC address dell'Onion Omega 2
MAC_ADDRESS=$(ifconfig eth0 | grep 'HWaddr' | awk '{print $5}')
echo "Il MAC address dell'Onion Omega 2 è: $MAC_ADDRESS"
# Ripulire il MAC address dai :
CLEAN_MAC_ADDRESS=$(echo $MAC_ADDRESS | tr -d ':')
echo "Il MAC address ripulito è: $CLEAN_MAC_ADDRESS"

# Definisci le credenziali di login
USERNAME="manager-admin_Spotlink"
PASSWORD="AndreaGiacomoFilippoMax22!"

# Definisci l'URL dell'API di login
API_LOGIN="https://emotion-test.eu/api/auth/login/"

# Effettua la richiesta POST all'API di login per ottenere il token
LOGIN_RESPONSE=$(curl -s -X POST "$API_LOGIN" \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")
# Stampa la risposta per il debug
echo "Risposta login: $LOGIN_RESPONSE"

# Estrai il token dalla risposta JSON
AUTH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.key')

# Verifica se il token è stato recuperato correttamente
if [ -z "$AUTH_TOKEN" ]; then
    echo "Errore durante il recupero del token di autenticazione"
    exit 1
fi

echo "Token di autenticazione recuperato con successo: $AUTH_TOKEN"

# Effettua la richiesta POST all'API per ottenere il SERIAL_NUMBER
RESPONSE=$(curl -s -X POST "https://emotion-test.eu/api/wallbox/assign-serial/" \
    -H "Authorization: Token $AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"mac_address\": \"$CLEAN_MAC_ADDRESS\"}" \
    -w "\nHTTP_STATUS_CODE:%{http_code}")

# Estrai il codice di stato HTTP dalla risposta
HTTP_STATUS_CODE=$(echo "$RESPONSE" | grep "HTTP_STATUS_CODE" | cut -d':' -f2)

# Estrai il corpo della risposta
RESPONSE_BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS_CODE:.*//g')

# Stampa il codice di stato HTTP e il corpo della risposta per il debug
echo "Codice di stato HTTP: $HTTP_STATUS_CODE"
echo "Corpo della risposta: $RESPONSE_BODY"

# Verifica se la richiesta è stata eseguita con successo (codice di stato 200 o 201)
if [ "$HTTP_STATUS_CODE" -eq 200 ] || [ "$HTTP_STATUS_CODE" -eq 201 ]; then
    # Estrai il SERIAL_NUMBER dalla risposta JSON
    SERIAL_NUMBER=$(echo "$RESPONSE_BODY" | jq -r '.serial_number')

    # Verifica se il SERIAL_NUMBER è stato recuperato correttamente
    if [ -n "$SERIAL_NUMBER" ]; then
        echo "SERIAL_NUMBER recuperato con successo: $SERIAL_NUMBER"
    else
        echo "Errore durante il recupero del SERIAL_NUMBER"
        echo "Risposta JSON: $RESPONSE_BODY"
    fi
else
    echo "Errore durante la richiesta all'API. Codice di stato HTTP: $HTTP_STATUS_CODE"
    echo "Risposta JSON: $RESPONSE_BODY"
fi

# Stampa il valore di SERIAL_NUMBER per il debug
echo "Valore di SERIAL_NUMBER: $SERIAL_NUMBER"



# Scrivere il serial number nel file wallbox_smart/serial_number.txt, cancellando eventuali scritte e spazi vuoti
echo -n "$SERIAL_NUMBER" > /root/wallbox_smart/serial_number.txt

# Verificare se il comando echo è stato eseguito correttamente
if [ $? -eq 0 ]; then
    echo "Serial number scritto con successo in wallbox_smart/serial_number.txt"
else
    echo "Errore durante la scrittura del serial number in wallbox_smart/serial_number.txt"
fi




# Creare lo script di avvio per onionG.py
cat << 'EOF' > /root/wallbox_smart/src/start_onion.sh
#!/bin/sh
python3 /root/wallbox_smart/src/onion_G.py
EOF

# Verificare se lo script di avvio è stato creato correttamente
if [ $? -eq 0 ]; then
    echo "Script di avvio creato con successo: /root/wallbox_smart/src/start_onion.sh"
else
    echo "Errore durante la creazione dello script di avvio: /root/wallbox_smart/src/start_onion.sh"
fi

# Rendere eseguibile lo script di avvio
chmod +x /root/wallbox_smart/src/start_onion.sh

# Verificare se il comando chmod è stato eseguito correttamente
if [ $? -eq 0 ]; then
    echo "Script di avvio reso eseguibile: /root/wallbox_smart/src/start_onion.sh"
else
    echo "Errore durante la modifica dei permessi dello script di avvio: /root/wallbox_smart/src/start_onion.sh"
fi

# Aggiungere lo script di avvio a /etc/rc.local
if ! grep -q "/root/wallbox_smart/src/start_onion.sh &" /etc/rc.local; then
    sed -i '/exit 0/i /root/wallbox_smart/src/start_onion.sh &' /etc/rc.local
    if [ $? -eq 0 ]; then
        echo "Script di avvio aggiunto a /etc/rc.local"
    else
        echo "Errore durante l'aggiunta dello script di avvio a /etc/rc.local"
    fi
else
    echo "Lo script di avvio è già presente in /etc/rc.local"
fi

# Creare lo script per il reboot con git pull
cat << 'EOF' > /root/wallbox_smart/src/reboot_with_git_pull.sh
#!/bin/sh
# URL del repository
REPO_URL="https://$GITHUB_TOKEN@github.com/Emotion-SRL/wallbox_smart.git"
# Navigare nella directory del repository
cd /root/wallbox_smart
# Eseguire git pull
git pull $REPO_URL
# Eseguire il reboot
reboot
EOF

# Verificare se lo script di reboot è stato creato correttamente
if [ $? -eq 0 ]; then
    echo "Script di reboot creato con successo: /root/wallbox_smart/src/reboot_with_git_pull.sh"
else
    echo "Errore durante la creazione dello script di reboot: /root/wallbox_smart/src/reboot_with_git_pull.sh"
fi

# Rendere eseguibile lo script di reboot
chmod +x /root/wallbox_smart/src/reboot_with_git_pull.sh

# Verificare se il comando chmod è stato eseguito correttamente
if [ $? -eq 0 ]; then
    echo "Script di reboot reso eseguibile: /root/wallbox_smart/src/reboot_with_git_pull.sh"
else
    echo "Errore durante la modifica dei permessi dello script di reboot: /root/wallbox_smart/src/reboot_with_git_pull.sh"
fi

# Aggiungere i cron job per il reboot programmato
(crontab -l ; echo "0 17 * * * /root/wallbox_smart/src/reboot_with_git_pull.sh") | crontab -
if [ $? -eq 0 ]; then
    echo "Cron job aggiunto per il reboot alle 17:00"
else
    echo "Errore durante l'aggiunta del cron job per il reboot alle 17:00"
fi

(crontab -l ; echo "0 4 * * * /root/wallbox_smart/src/reboot_with_git_pull.sh") | crontab -
if [ $? -eq 0 ]; then
    echo "Cron job aggiunto per il reboot alle 04:00"
else
    echo "Errore durante l'aggiunta del cron job per il reboot alle 04:00"
fi