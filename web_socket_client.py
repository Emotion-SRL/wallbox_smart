import asyncio
import socket

import websockets


# client
async def client():
    try:
        async with websockets.connect("ws://192.168.1.120:8765") as websocket:
            # Ottieni l'indirizzo IP del client
            client_ip = socket.gethostbyname(socket.gethostname())
            print(f"ip? {client_ip}")
            # Invia l'IP al server
            await websocket.send(client_ip)
            print(f"Inviato IP al server: {client_ip}")
            # Ricevi il messaggio di conferma dal server
            response = await websocket.recv()
            print(f"Ricevuto messaggio dal server: {response}")
    except Exception as e:
        print(f"Errore durante la connessione al server: {e}")
asyncio.get_event_loop().run_until_complete(client())
