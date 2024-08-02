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

# fare una get all'api creata da filippo che restituisce il serial number!
SERIAL_NUMBER=EM2024WALLSM74N1

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



python3 /root/wallbox_smart/src/onion_G.py
EOF

# Rendere eseguibile lo script di avvio
chmod +x /root/wallbox_smart/src/start_Onion.sh

# Aggiungere lo script di avvio a /etc/rc.local
if ! grep -q "/root/wallbox_smart/src/start_Onion.sh &" /etc/rc.local; then
    sed -i '/exit 0/i /root/wallbox_smart/src/start_Onion.sh &' /etc/rc.local
fi

# Creare lo script per il reboot con git pull
cat << 'EOF' > /root/wallbox_smart/src/reboot_with_git_pull.sh

# URL del repository
REPO_URL="https://$GITHUB_TOKEN@github.com/Emotion-SRL/wallbox_smart.git"
# Navigare nella directory del repository
cd /root/wallbox_smart
# Eseguire git pull
git pull $REPO_URL
# Eseguire il reboot
reboot
EOF

# Rendere eseguibile lo script di reboot
chmod +x /root/wallbox_smart/src/reboot_with_git_pull.sh

# Aggiungere i cron job per il reboot programmato
(crontab -l ; echo "0 17 * * * /root/wallbox_smart/src/reboot_with_git_pull.sh") | crontab -
(crontab -l ; echo "0 4 * * * /root/wallbox_smart/src/reboot_with_git_pull.sh") | crontab -

