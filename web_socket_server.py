import asyncio

import websockets

connected_clients = {}


async def server(websocket, path):
    try:
        # Ricevere l'indirizzo IP e il serial number del client
        client_ip = websocket.remote_address[0]
        print(f"Client connesso dall'indirizzo IP: {client_ip}")

        # Memorizza l'indirizzo IP pubblico del client
        connected_clients[client_ip] = websocket

        # Attendere ulteriori messaggi dal client
        async for message in websocket:
            # Divide il messaggio in indirizzo IP e serial number
            client_ip, serial_number = message.split(',')
            print(f"Ricevuto messaggio dal client: {client_ip}")
            print(f"Serial number: {serial_number}")

    except websockets.exceptions.ConnectionClosedError:
        print(f"Connessione chiusa dal client {client_ip}")

start_server = websockets.serve(server, "0.0.0.0", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()