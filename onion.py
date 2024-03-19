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
 
desired_time_zone = pytz.timezone('Europe/Rome')


# setup onewire and polling interval
oneWireGpio = 19 # set the sensor GPIO
pollingInterval = 1 # seconds

# Configura la comunicazione seriale
ser = serial.Serial('/dev/ttyS1', 9600, timeout=1)
    

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
    #   it should be the only device connected in this experiment    
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
    except Exception as e:
        print(e)


def start():
    command = 'start'
    ser.write(command.encode())

def stop():
    command = 'stop'
    ser.write(command.encode())

def set_amp():

    amp = input("")
    msg = "max amp "+ amp
    ser.write(msg.encode())
    time.sleep(1)


while True:
    time.sleep(0.5)

    i = input("Enter command: ")

    if i == "start":
        start()
    elif i == "stop":
        stop()
    elif i == "status":
        while True:
            print("Status update... (Press Enter to stop)")
            status()
            # time.sleep(0.2)

        # Controlla se c'è un input pronto sulla tastiera
            if select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], []):
                key = sys.stdin.read(1)  # Leggi il tasto premuto
                break  # Esci dal ciclo se è stato premuto un tasto
    elif i == "set max amp":
        set_amp()
        
        







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