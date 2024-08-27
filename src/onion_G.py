import asyncio
import calendar
import datetime
import json
import os
import select
import socket
import subprocess
import sys
import time

import oneWire
import pytz
import serial
import websockets
from temperatureSensor import TemperatureSensor

desired_time_zone = pytz.timezone('Europe/Rome')


# setup onewire and polling interval
oneWireGpio = 19 # set the sensor GPIO
pollingInterval = 1 # seconds

# Configura la comunicazione seriale
ser = serial.Serial('/dev/ttyS1', 9600, timeout=1)

# Apro il file in modalità lettura
with open("/root/wallbox_smart/serial_number.txt", "r") as file:
# Leggo la prima riga del file
    serialNumber = file.readline()


# def get_mac_address(interface):
#     try:
#         # Esegui il comando ifconfig per ottenere le informazioni sull'interfaccia specificata
#         output = subprocess.check_output(['ifconfig', interface]).decode('utf-8')
#         # Cerca la riga che contiene il MAC address (HWaddr)
#         mac_line = [line for line in output.split('\n') if 'HWaddr' in line][0]
#         # Estrai il MAC address dalla riga
#         mac_address = mac_line.split('HWaddr')[1].strip()
#         print("mac_address" + mac_address)
#         return mac_address
#     except:
#         return None

def get_mac_address(interface):
    try:
        # Esegui il comando ifconfig per ottenere le informazioni sull'interfaccia specificata
        output = subprocess.check_output(['ifconfig', interface]).decode('utf-8')
        # Cerca la riga che contiene il MAC address (HWaddr)
        mac_line = [line for line in output.split('\n') if 'HWaddr' in line][0]
        # Estrai il MAC address dalla riga
        mac_address = mac_line.split('HWaddr')[1].strip()
        # Rimuovi i due punti dal MAC address
        mac_address_clean = mac_address.replace(':', '')
        print("MAC Address ripulito: " + mac_address_clean)
        return mac_address_clean
    except Exception as e:
        print(f"Errore: {e}")
        return None


def status():

    command = 'status'
    ser.write(command.encode())
    while ser.in_waiting == 0:
        pass
    data = ser.readline().decode().strip()
    print("porco dio il json che mi arriva è fatto così:  "+data)
    try:
        current_time = datetime.datetime.now(tz=desired_time_zone)
        str_date_time = current_time.strftime("%d-%m-%Y, %H:%M:%S")
        print(str_date_time)
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

async def send_realtime_data(websocket, mac_address_clean, serialNumber):
    while True:
        mcu_data = status()
        print(mcu_data)
        mcu_data_json = json.loads(mcu_data)
        max_amps=int(float(mcu_data_json["Max_amps"]))
        ampere = int(float(mcu_data_json["IRMS_L1"]) * 100)
        ev_state = mcu_data_json["State"]
        realtime_data = {
            "serial_number": serialNumber,
            "password": mac_address_clean,
            "ampere": ampere,
            "temperature": mcu_data_json["Temp"],
            "status": ev_state
        }
        realtime_json = json.dumps(realtime_data, indent=2)
        if ampere >= 600:
            await websocket.send(realtime_json)
            print(f"realtime_notification: {realtime_json}")
        else:
            client_ip = "192.168.1.174"
            id_data = {}
            id_data["serial_number"] = serialNumber
            id_data["password"] = mac_address_clean
            id_data["ip_address"] = client_ip
            id_data["max_ampere"] = max_amps
            id_data["status"] = ev_state
            identification = json.dumps(id_data, indent =2)
            await websocket.send(identification)
        await asyncio.sleep(58)



async def client(websocket):
    try:
        mcu_data = status()
        if mcu_data:
            mcu_data_json = json.loads(mcu_data)
            # il resto del tuo codice
        else:
            print("Errore: status() ha restituito None o una stringa vuota")
        mcu_data_json = json.loads(mcu_data)
        max_amps=int(float(mcu_data_json["Max_amps"]))
        ampere = int(float(mcu_data_json["IRMS_L1"]) * 100)
        print(f"ampere {ampere}")
        ev_state = mcu_data_json["State"]
        # Ottieni l'indirizzo IP del client
        # client_ip = socket.gethostbyname(socket.gethostname())
        client_ip = "192.168.1.174"
        # client_ip = os.popen("ifconfig apcli0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'").read().strip()
        # Invia l'IP al server
        mac_address_clean = get_mac_address("ra0")
        id_data = {}
        id_data["serial_number"] = serialNumber
        id_data["password"] = mac_address_clean
        id_data["ip_address"] = client_ip
        id_data["max_ampere"] = max_amps
        id_data["status"] = ev_state
        identification = json.dumps(id_data, indent =2)
        await websocket.send(identification)
        print(f"boot_notification: {identification}")
         # Avvia il task per l'invio dei dati in tempo reale
        asyncio.ensure_future(send_realtime_data(websocket, mac_address_clean, serialNumber))

        # Ricevi il messaggio dal server
        async for response in websocket:
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
                await asyncio.sleep(2)
                mcu_data = json.loads(status()) #non gestito
                id_data["max_ampere"] = int(float(mcu_data["Max_amps"]))
                app_update = json.dumps(id_data, indent =2)
                await websocket.send(app_update)

    except Exception as e:
        print(f"Errore durante la connessione al server: {e}")
        # Gestisci eventuali errori di connessione ricreandola
        await asyncio.sleep(10)  # Attendi 5 secondi prima di tentare di riconnettersi
        print("Riprova a connetterti al server...")
        async with websockets.connect("wss://emotion-projects.eu/wallbox") as new_websocket:
            await client(new_websocket)  # Chiamata ricorsiva per riconnettersi e mantenere la connessione attiva

async def connect_to_server():
    async with websockets.connect("wss://emotion-projects.eu/wallbox") as websocket:
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
