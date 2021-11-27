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

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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

    """
    message = Mail(
    from_email='progwebmeanleaders@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)
    """
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = asunto
    msg['From'] = "progwebmeanleaders@gmail.com"
    msg['To'] = destino

    try:
        # Create the body of the message (a plain-text and an HTML version).
        text = "Notificación de Mean Leaders "
        html = mensaje
        
        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text, 'plain')
        part2 = MIMEText(html, 'html')
        
        
        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        msg.attach(part1)
        msg.attach(part2)
        
        #create server
        server = smtplib.SMTP('smtp.gmail.com: 587')
        
        server.starttls()
        
        # Login Credentials for sending the mail
        server.login(msg['From'], os.environ.get('password'))
        
        # send the message via the server.
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        
        server.quit()
        
        #print ("successfully sent email to %s:" % (msg['To']))
        return "Enviado correctamente"
    except Exception as e:
        print(e)    
        return "Error enviando el mensaje"


if __name__ == '__main__':
    app.run()