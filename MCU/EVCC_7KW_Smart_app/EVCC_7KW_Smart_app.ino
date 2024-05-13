50
#include "Evcc.h"

// Define Digital Pin
#define CP 11
#define RL 45
#define GL 46
#define BL 44
#define REL 30

// Define Analog Pin
#define PPreadA A2
#define CPreadA A0
#define CT1 A3
#define CT_EXT A4

bool isPluggedIn = true;
bool reg_toggle = false;
bool line_splitted = true;

int max_amps = 32;
int min_amps = 6;
int hysteresis = 5;

unsigned long EXT_reading_interval = 300;
unsigned long loop_interval = 50;
unsigned long previousMillis1 = 0;
unsigned long previousMillis2 = 0;

int samples = 500;
String message;
int amps;
int E_max_amp_address = 0;
String status_msg;

Evcc evcc(PPreadA, CP, CPreadA, samples, RL, GL, BL, REL, CT1, CT_EXT);

void setup()
{

  Serial1.begin(9600);
  // Serial.begin(9600);
  evcc.UpdateMaxAmps(max_amps);
  evcc.Timer_init();
  evcc.AC_off(); // Utilizzo del metodo off() della classe Plug
  delay(1000);
}

void loop()
{
  unsigned long currentMillis = millis(); // Ottieni l'attuale valore di millis()

  if (currentMillis - previousMillis1 >= loop_interval)
  {
    previousMillis1 = currentMillis;

    if (Serial1.available() > 0)
    {
      String command = Serial1.readStringUntil('\n'); // Leggi il comando fino al carattere di nuova riga
      if (command == "start")
      {
        isPluggedIn = true;
      }
      else if (command == "stop")
      {
        isPluggedIn = false;
        // evcc.Plug_stop();
      }
      else if (command == "status")
      {
        status_msg = evcc.Get_status();
        Serial1.println(status_msg);
      }
      else if (command.startsWith("max amp "))
      {
        max_amps = command.substring(7).toInt();
        evcc.UpdateMaxAmps(max_amps);
      }
    }

    // Esegui evcc.Plug_start() se è stato dato il comando "start"
    if (isPluggedIn && reg_toggle)
    {
      evcc.Plug_start();
    }
    else
    {
      evcc.Plug_stop(); // Esegui evcc.Plug_stop() se non è stato dato il comando "start"
    }
  }

  if (currentMillis - previousMillis2 >= EXT_reading_interval)
  {
    previousMillis2 = currentMillis; // Aggiorna il valore di previousMillis

    reg_toggle = evcc.Smart_reg(min_amps, line_splitted, hysteresis);

    // Serial.println(max_amps);
    // amps = evcc.Smart_reg(max_amps);
    // evcc.UpdateDuty(int(amps/0.6)); //amps
    // Serial.print("amps: "); Serial.print(amps);
    // Serial.print("      max_amps: "); Serial.println(max_amps);
  }
}