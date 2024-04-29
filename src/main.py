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
        client_ip = websocket.remote_address[0]
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
                amps = round(float(message_data['max_ampere']), 2)
                print(f"Invio messaggio al client con IP {target_ip}")
                await connection.send("set max amps " + str(amps))
            else:
                print(f"Client con IP {target_ip} non trovato.")

    except websockets.exceptions.ConnectionClosedError:
        print(f"Connessione chiusa dal client {client_ip} sulla porta 15001")


async def server(websocket, path):
    try:
        # # Ricevere l'indirizzo IP del client
        # client_ip = websocket.remote_address[0]
        # print(f"Client connesso dall'indirizzo IP: {client_ip}")
        # # Memorizza l'indirizzo IP pubblico del client
        # connected_clients[client_ip] = websocket
        # await websocket.send("Connesso al server")
        # # Se lo stato non è stato richiesto per questo client, invialo
        # if client_ip not in status_requested:
        #     await send_status(client_ip)
        #     # Segna che lo stato è stato richiesto per evitare di inviarlo nuovamente
        #     status_requested[client_ip] = True
        # # Attendere ulteriori messaggi dal client
        async for message in websocket:
            message = json.loads(message)
            print(connected_clients)
            # Chiamata all'API per salvare i dati nel database
            if "ip_address" in message:
                connected_clients[message["serial_number"]] = websocket
                await save_boot_notification_to_db(message)
            else:
                await save_realtime_notification_to_db(message)
    except websockets.exceptions.ConnectionClosed:
        for serial_number, client in connected_clients.items():
            if client == websocket:
                connected_clients.pop(serial_number, None)


async def send_status(client_ip):
    # Verifica se il client è connesso
    if client_ip in connected_clients:
        # Invia il comando "status" al client specificato
        print("Invio comando status al client")
    else:
        print(f"Client {client_ip} non trovato.")


async def save_boot_notification_to_db(message):
    # URL dell'API per salvare i dati nel database
    api_url = os.environ.get(
        'API_URL', "https://emotion-test.eu/api") + "/wallbox/"
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
        'API_URL', "https://emotion-test.eu/api") + "/wallbox/realtime/"
    try:
        # Effettua la richiesta PATCH all'API
        # message_json = json.dumps(message, indent = 2)
        response = requests.post(api_url, json=message)
        print(response)
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