import asyncio
from websockets import server, exceptions
import os
from paquetews.Server import ServerWS
from paquetews.OperationSocket import OperationSocket
import socket

# Definiendo: direccion y puerto
try:
    ADDRESS = os.environ['ADDRESS']
    PORT = os.environ['PORT']
except KeyError:
    ADDRESS = 'localhost'
    PORT = 7777

server_ws = ServerWS()
operations_ws = OperationSocket()


async def register_client(ws: socket.socket):

    try:
        name = await ws.recv()
        server_ws.register(ws, name)
        print(f'Usuario {name} registrado')
    except exceptions.ConnectionClosed:
        pass


async def unregister_client(ws):
    username = server_ws.unregister(ws)
    print(f'{username} desconectado')
    await notify_logout(username)

#############
#############
#############


async def notify_new_client(ws_not_send):
    if server_ws.check_clients():
        # await asyncio.wait([operations_ws.notify_current_clients(client, server_ws.get_size()) for client in server_ws.get_clients() if client is not ws_not_send])
        # The explicit passing of coroutine objects to asyncio.wait() is deprecated since Python 3.8, and scheduled for removal in Python 3.11
        # await asyncio.wait([asyncio.create_task(operations_ws.notify_current_clients(client, server_ws.get_size()))
        #                     for client in server_ws.get_clients() if client is not ws_not_send])
        await asyncio.wait([asyncio.create_task(operations_ws.notify_current_clients(client, server_ws.get_size()))
                            for client in server_ws.get_clients()])


async def notify_logout(name):
    if server_ws.get_size() > 0:
        await asyncio.wait([asyncio.create_task(operations_ws.notify_exited_client(client, server_ws.get_size()))
                            for client in server_ws.get_clients()])

async def handle_connection(ws, path):
    '''
    Se ejecutará esta función cada vez que se conecte un nuevo cliente
    '''
    await register_client(ws)
    await notify_new_client(ws)
    try:
        async for message in ws:
            print(f'Mensaje recibido de {server_ws.get_client(ws)}: {message}')
            for client in server_ws.get_clients():
                if client is not ws:
                    await operations_ws.send_msg(client, message, server_ws.get_client(ws))
    finally:
        await unregister_client(ws)

if __name__ == '__main__':
    server = server.serve(handle_connection, ADDRESS, PORT)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(server)
    print(f'Serve in {ADDRESS}:{PORT}')
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        print('It is stopped the server')
