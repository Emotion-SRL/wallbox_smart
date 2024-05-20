import asyncio
import json
import os

import requests
import websockets

connected_clients = {}
status_requested = {}


async def django(websocket, path):
    try:
        # Ricevere l'indirizzo IP del client
        client_ip = websocket
        print("connessione a django sulla porta 15001")
        # Memorizza l'indirizzo IP pubblico del client
        # connected_clients[client_ip] = websocket
        # Attendere ulteriori messaggi dal client
        async for message in websocket:
            print(f"Ricevuto messaggio da django sulla porta 15001: {message}")
            # Qui puoi gestire il messaggio JSON come preferisci
            message_data = json.loads(message)
            target_ip = message_data.get('serial_number', "")
            connection = connected_clients.get(target_ip, False)
            if connection:
                amps = message_data['max_ampere']
                print(f"Invio messaggio al client con IP {target_ip}")
                await connection.send("set max amps " + str(amps))
            else:
                print(f"Client con serial number {target_ip} non trovato.")

    except websockets.exceptions.ConnectionClosedError:
        print(f"Connessione chiusa dal client {client_ip} sulla porta 15001")
#salvo le password dei client
client_passwords = {}


async def server(websocket, path):
    try:
        async for message in websocket:
            message = json.loads(message)
            print(connected_clients)
            # Chiamata all'API per salvare i dati nel database
            if "ip_address" in message:
                connected_clients[message["serial_number"]] = websocket
                client_passwords[message["serial_number"]] = message.get('password')
                print(f"Client mi ha inviato {message}.")
                await save_boot_notification_to_db(message)
            else:
                await save_realtime_notification_to_db(message)
    except websockets.exceptions.ConnectionClosed:
        serial = ""
        for serial_number, client in connected_clients.items():
            if client == websocket:
                serial = serial_number
        message = {}
        print(f"il serial  {serial} ")
        print(f"il client  {client} ")
        message["serial_number"] = serial
        message["status"] = "OFFLINE"
        message["password"] = client_passwords.get(serial, "Password non trovata")
        await save_boot_notification_to_db(message)
        connected_clients.pop(serial, None)
        client_passwords.pop(serial, None)  # Rimuovere anche la password


async def send_status(client_ip):
    # Verifica se il client è connesso
    if client_ip in connected_clients:
        # Invia il comando "status" al client specificato
        print("Invio comando status al client {client_ip}")
    else:
        print(f"Client {client_ip} non trovato.")


async def save_boot_notification_to_db(message):
    # URL dell'API per salvare i dati nel database
    api_url = os.environ.get(
        'API_URL', "https://emotion-projects.eu/api") + "/wallbox/"
    try:
        # Effettua la richiesta PATCH all'API
        # message_json = json.dumps(message, indent = 2)
        response = requests.patch(api_url, json=message)
        print(response)
        print(response.json())
        # Controlla lo stato della risposta
        if response.status_code == 200:
            print("Dati salvati boot notification con successo nel database.")
        else:
            print(
                "Si è verificato un errore durante il salvataggio dei dati nel database.")
    except Exception as e:
        print(f"Errore durante la richiesta all'API: {e}")


async def save_realtime_notification_to_db(message):
    # URL dell'API per salvare i dati nel database
    api_url = os.environ.get(
        'API_URL', "https://emotion-projects.eu/api") + "/wallbox/realtime/"
    try:
        # Effettua la richiesta PATCH all'API
        # message_json = json.dumps(message, indent = 2)
        response = requests.post(api_url, json=message)
        print(response.json())
        # Controlla lo stato della risposta
        if response.status_code == 201:
            print("Dati realtime notification salvati con successo nel database.")
        else:
            print(
                "Si è verificato un errore durante il salvataggio dei dati nel database.")
    except Exception as e:
        print(f"Errore durante la richiesta all'API: {e}")

start_django = websockets.serve(django, "0.0.0.0", 15001)
start_server = websockets.serve(server, "0.0.0.0", 8765)

asyncio.get_event_loop().run_until_complete(start_django)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
