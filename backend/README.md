# 1. Correr el servicio para el envío de Emails #

Primero se debe tener instalado python3 y pip para gestionar la instalación del módulo flask

> sudo apt-get install pip

> sudo apt install python3-virtualenv

> pip install -U flask

> pip install -U sendgrid

Ahora si se puede lanzar el servicio de enviar email con python y sendgrid. Falta revisar el servicio de enviar SMS (aún no implementado). Se ejecuta el archivo enviosSmsEmail.py desde Spyder y se deja corriendo el servicio:

![servicio de Python](../servicioPython.png)


# 2. Verificar que el Cluster de MongoDB está funcionando #

Debes crear un cluster en MongoDB Atlas y debes instalar MongoDB Compass para verificar la conexión.

Cuando has creado tu usuario y contraseña para acceder al cluster debes agregar la siguiente línea de código en MongoDB para acceder a la conexión. Ten en cuenta que debes cambiar *user* por tu usuario y *password* por la contraseña del usuario.

> mongodb+srv://user:password@cluster0.suwl6.mongodb.net/test

Cuando ya hayas podido ingresar y comprobar la conexión debes agregar la línea de url en los siguientes ficheros:
	dist/datasources/mongodb.datasource.js

	src/datasources/mongodb.datasource.ts

	~~~
	url: 'mongodb+srv://*usuario*:*password*@*lo que te muestra mongodb atlas*?retryWrites=true&w=majority',
	~~~

**Nota: ** Debes cambiar el usuario, la contraseña y el nombre de cluster y base de datos



# 3. Preparar y lanzar el servidor del backend #

> npm install

Si presenta problemas con las versiones, puede intentar:

> npm install --force

> npm start

![Run backend](./runbackend.png)

 
