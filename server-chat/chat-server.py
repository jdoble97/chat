import asyncio
from asyncio.streams import start_server
import websockets
from clases import Server, OperationSocket
import json
# clients = dict()
clients = Server.ServerWS()
operations = OperationSocket.OperationSocket()


# async def notify_new_client(client_not_send):
#     if clients.check_clients():
#         # await asyncio.wait([client.send(messages) for client in clients if client is not client_not_send])
#         for client in clients.get_clients():
#             if client is not client_not_send:
#                 await operations.notify_current_clients(client, clients.get_clients().get(client_not_send))
async def notify_new_client(client_not_send):
    if clients.check_clients():
        # await asyncio.wait([client.send(messages) for client in clients if client is not client_not_send])
        for client in clients.get_clients():
            await operations.notify_current_clients(client, len(clients.get_clients()))

async def notify_logout(name):
    if clients.check_clients():
        await asyncio.wait([operations.notify_exited_client(client, len(clients.get_clients())) for client in clients.get_clients()])

async def register(websock):
    '''
    Añadimos al usuario al diccionario de sockets
    '''
    print('Pidiendo nombre')
    try:
        nameUser = await websock.recv()
        print('Nombre del usuario', nameUser, type(nameUser))
        clients.register(websock, nameUser)
        await notify_new_client(websock)
    except websockets.ConnectionClosed:
        print('Cliente desconectado antes de tiempo')


async def unregister(websock):
    client_name = clients.unregister(websock)
    if client_name:
        await notify_logout(client_name)




async def handler_conn(websocket, path):
    '''
    Función que se ejecutará cada que vez que se conecte un nuevo cliente
    '''
    print('Nuevo cliente')
    try:
        await register(websocket)
        async for messages in websocket:
            for client in clients.get_clients():
                if client is not websocket:
                    await operations.send_msg(client, messages)

    # except websockets.exceptions.ConnectionClosed:
    #     print('Sesion cerrada desde el cliente')
    #     await unregister(websocket)
    except websockets.ConnectionClosedError:
        print('Error en cierre de conexion')
    finally:
        print('Sesion cerrada ')
        await unregister(websocket)

start_server = websockets.serve(handler_conn, 'localhost',7777)
if __name__=="__main__":

    loop = asyncio.get_event_loop()
    print('SERVER EN PUERTO 7777')
    loop.run_until_complete(start_server)
    loop.run_forever()
    print('SERVIDOR CORRECTAMENTE')