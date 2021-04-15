import asyncio
from asyncio.streams import start_server
import websockets
from zmq.sugar import socket

# async def handler__conn(websocket, path):
#     print('Cliente conectado')
#     await websocket.send('Bienvenido al socket, escriba su nombre: ')
#     await read(websocket)
#     websocket.send(websocket)

# async def read(websocket):
#     while True:
#         print('Esperando escritura del cliente')
#         message = await websocket.recv()
#         print('READ:',message)
clients_conn = []
async def echo(websocket, path):
    print('Cliente conectado')
    clients_conn.append(websocket)
    async for message in websocket:
        print('ENVIANDO MENSAJES A LOS CLIENTES...')
        await send_all(clients_conn,message)

async def send_all(clients, message):
    for client in clients:
        await client.send(message)
create_serve = websockets.serve(echo, 'localhost', 7777)

loop = asyncio.get_event_loop()
loop.run_until_complete(create_serve)
loop.run_forever()
