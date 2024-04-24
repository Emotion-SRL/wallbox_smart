import asyncio
import websockets

connected_clients = {}
status_requested = {}

async def server(websocket, path):
    try:
        # Ricevere l'indirizzo IP del client
        client_ip = websocket.remote_address[0]
        print(f"Client connesso dall'indirizzo IP: {client_ip}")

        # Memorizza l'indirizzo IP pubblico del client
        connected_clients[client_ip] = websocket

        # Se lo stato non è stato richiesto per questo client, invialo
        if client_ip not in status_requested:
            await send_status(client_ip)
            # Segna che lo stato è stato richiesto per evitare di inviarlo nuovamente
            status_requested[client_ip] = True

        # Attendere ulteriori messaggi dal client
        async for message in websocket:
            print(f"Ricevuto messaggio dal client {client_ip}: {message}")

    except websockets.exceptions.ConnectionClosedError:
        print(f"Connessione chiusa dal client {client_ip}")


async def send_status(client_ip):
    # Verifica se il client è connesso
    if client_ip in connected_clients:
        # Invia il comando "status" al client specificato
        await connected_clients[client_ip].send("status")
    else:
        print(f"Client {client_ip} non trovato.")

start_server = websockets.serve(server, "0.0.0.0", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
