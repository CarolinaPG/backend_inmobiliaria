#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov  5 21:53:19 2021
 
@author: carolina
"""
import os
from flask import Flask
#from r-twilio.rest import Client
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

@app.route("/")
def inicio():
    test = os.environ.get("Test")
    return test

"""
@app.route("/sms")
def sms():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        cel_envio = '+14177543986'
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")
        message = client.messages \
                        .create(
                             body=contenido,
                             from_=cel_envio,
                             to='+57' + destino
                         )
        
        print(message.sid)
        return "Enviado correctamente"
    except Exception as e:
        return "Error enviando el mensaje"
"""

@app.route("/envio-correo")
def email():
    destino = request.args.get("correo_destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")

    message = Mail(
    from_email='progwebmeanleaders@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)
    print(destino)
    print(asunto)
    print(mensaje)
    print(message)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Enviado correctamente"
    except Exception as e:
        print(e)    
        return "Error enviando el mensaje"


if __name__ == '__main__':
    app.run()