import serial
import json
import asyncio
import time
import select
import sys
from temperatureSensor import TemperatureSensor
import oneWire
import calendar
import datetime  
import pytz
import socket
import websockets
import os

 
desired_time_zone = pytz.timezone('Europe/Rome')


# setup onewire and polling interval
oneWireGpio = 19 # set the sensor GPIO
pollingInterval = 1 # seconds

# Configura la comunicazione seriale
ser = serial.Serial('/dev/ttyS1', 9600, timeout=1)

# Apro il file in modalità lettura
with open("serial_number.txt", "r") as file:
# Leggo la prima riga del file
    serialNumber = file.readline()
    

def status():

    command = 'status'
    ser.write(command.encode())
    while ser.in_waiting == 0:
        pass
    data = ser.readline().decode().strip()
    try:

        current_time = datetime.datetime.now(tz=desired_time_zone)
        str_date_time = current_time.strftime("%d-%m-%Y, %H:%M:%S")
        # check and print the temperature

        if not oneWire.setupOneWire(str(oneWireGpio)):
            print("Kernel module could not be inserted. Please reboot and try again.")
            return -1

    # get the address of the temperature sensor
    #it should be the only device connected in this experiment    
        sensorAddress = oneWire.scanOneAddress()

    # instantiate the temperature sensor object
        sensor = TemperatureSensor("oneWire", { "address": sensorAddress, "gpio": oneWireGpio })
        if not sensor.ready:
            print("Sensor was not set up correctly. Please make sure that your sensor is firmly connected to the GPIO specified above and try again.")
            return -1
       
        sensor_value = sensor.readValue()
        json_data = json.loads(data)
        json_data["Temp"] = f"{'%.2f' % sensor_value} C"
        time.sleep(pollingInterval)
        json_data["Time"] = str_date_time
        # json_data = current_date
        L1_current = json_data["IRMS_L1"]
        updated_data = json.dumps(json_data, indent=2)
        
        # print("IRMS_L1:", L1_current)
        # print("IRMS_L2:", L2_current)
        # print("IRMS_L3:", L3_current)
        # print("//////////////////////////////////////////////////////////////")
        
        print(updated_data)
        return updated_data

    except Exception as e:
        print(e)


def start():
    command = 'start'
    ser.write(command.encode())

def stop():
    command = 'stop'
    ser.write(command.encode())

def set_amp(number):

    amp = number
    msg = "max amp "+ amp
    ser.write(msg.encode())
    time.sleep(1)



async def client(websocket):
    try:
        # Ottieni l'indirizzo IP del client
        # client_ip = socket.gethostbyname(socket.gethostname())
        client_ip = os.popen("ifconfig apcli0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'").read().strip()
        print(f"ip? {client_ip}")
        # Invia l'IP al server
        id_data = {
            "Client IP": client_ip,
            "SN": serialNumber
        }
        identification = json.dumps(id_data)        
        await websocket.send(identification)
        print(f"Inviato identification: {identification}")

        # Ricevi il messaggio dal server
        response = await websocket.recv()
        print(f"Ricevuto messaggio dal server: {response}")

        # Esegui l'azione richiesta dal server
        if response == "start":
            start()
            print("Wallbox start")
            await websocket.send("Wallbox start")

        elif response == "stop":
            stop()
            print("Wallbox stop")
            await websocket.send("Wallbox stop")

        elif response == "status":
            print("Status update...")
            await websocket.send(status())

        elif response.startswith("set max amp"):
            parts = response.split()
            number = parts[-1] 
            set_amp(number)

        # Chiamata ricorsiva per mantenere la connessione attiva
        await client(websocket)

    except Exception as e:
        print(f"Errore durante la connessione al server: {e}")
        # Gestisci eventuali errori di connessione ricreandola
        await asyncio.sleep(5)  # Attendi 5 secondi prima di tentare di riconnettersi
        print("Riprova a connetterti al server...")
        async with websockets.connect("ws://192.168.1.16:8765") as new_websocket:
            await client(new_websocket)  # Chiamata ricorsiva per riconnettersi e mantenere la connessione attiva

async def connect_to_server():
    async with websockets.connect("ws://192.168.1.16:8765") as websocket:
        await client(websocket)

# Utilizziamo il metodo run_until_complete per eseguire la funzione principale async
loop = asyncio.get_event_loop()
loop.run_until_complete(connect_to_server())


        
        







# while True:



#     # Ricevi i dati dalla porta seriale
#     data = ser.readline().decode().strip()
#     temperature = read_temperature()
    
#     # Parsa la stringa JSON ricevuta
#     try:
#         json_data = json.loads(data)
#         L1_current = json_data["IRMS_L1"]
#         L2_current = json_data["IRMS_L1"]
#         L3_current = json_data["IRMS_L3"]
#         json_data["temperatura"] = temperature
#         updated_data = json.dumps(json_data)
        
#         # Ora puoi utilizzare i dati come preferisci
#         # print("IRMS_L1:", L1_current)
#         # print("IRMS_L2:", L2_current)
#         # print("IRMS_L3:", L3_current)
#         # print("//////////////////////////////////////////////////////////////")
#         # print(json_data)
#     except json.JSONDecodeError:
#         print("Errore durante il parsing del JSON.")