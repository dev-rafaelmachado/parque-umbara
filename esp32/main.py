from machine import Pin, PWM
import time
import network
import ujson
from umqtt.simple import MQTTClient
import uasyncio as asyncio

ssid = 'Rafa'
password = 'a12345678'

MQTT_CLIENT_ID = "safe-kids-esp"
MQTT_BROKER = "broker.mqttdashboard.com"
MQTT_TOPIC_GPS = "safe.kids/data_gps"
MQTT_TOPIC_RECEIVE = "safe.kids/receber"
MQTT_USER = "adm"
MQTT_PASSWORD = "123321"

sAlert = False

# ----- Connect Wifi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)
while not wlan.isconnected():
    pass
print('Conectado à rede Wi-Fi:')
print('SSID:', wlan.config('essid'))
print('Endereço IP:', wlan.ifconfig()[0])

# ---- Função de callback
def callback(topic, msg):
    global sAlert
    print("Mensagem recebida: ", msg.decode())
    msg = msg.decode()
    vetor = msg.split(":")
    print(vetor)

    if vetor[0] == "id1" and vetor[1] == "Ligar Alerta":
        sAlert = True
    elif vetor[0] == "id1" and vetor[1] == "Desligar Alerta":
        sAlert = False


# ----- MQTT Client connect
print("Connecting to MQTT server... ", end="")
client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER, user=MQTT_USER, password=MQTT_PASSWORD)

client.set_callback(callback)
client.connect()
print("Connected!")
client.subscribe(MQTT_TOPIC_RECEIVE)

# ----- Machine

sLed = True

led_pin = Pin(18, Pin.OUT)
piezo_pin = Pin(19, Pin.OUT)
piezo_pwm = PWM(piezo_pin)
piezo_pwm.freq(440)
piezo_pwm.duty(0)

melodia = [
    (261, 0.5),  # Nota C
    (349, 0.5),  # Nota F
    (493, 0.5)   # Nota B
]

def tocar_nota(frequencia, duracao):
    piezo_pwm.freq(frequencia)
    piezo_pwm.duty(512)
    time.sleep(duracao)
    piezo_pwm.duty(0)

def tocar_melodia(notas, duracao):
    for nota in notas:
        frequencia = nota[0]
        duracao_nota = nota[1]
        tocar_nota(frequencia, duracao_nota * duracao)
        time.sleep(duracao * 0.1)

async def main():
    global sLed
    while True:
        client.check_msg()
        
        if sAlert:
            tocar_melodia(melodia, 0.2)
            sLed = not sLed
            led_pin.value(sLed)
        else:
            led_pin.value(0)
            
        await asyncio.sleep(1) # Aguarda 1 segundos antes verificar novamentec
async def enviar_dados_gps():
    while True:
        message = ujson.dumps({
            "id": 1,
            "latitude": -25.450104,
            "longitude": -49.251823,
        })
        client.publish(MQTT_TOPIC_GPS, message)
        await asyncio.sleep(10)  # Aguarda 10 segundos antes de enviar novamente

loop = asyncio.get_event_loop()
loop.create_task(main())
loop.create_task(enviar_dados_gps())
loop.run_forever()
       

