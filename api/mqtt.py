from flask_mqtt import Mqtt

config = {
    "url": 'broker.hivemq.com',
    "port": 1883,
    "username": "",
    "password": "",
    "refreshTime": 1.0
}

topics = ["safe.kids/receber", "safe.kids/data_gps"]