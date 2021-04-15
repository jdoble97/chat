import asyncio
from asyncio.streams import start_server
import websockets
from clases import Server, OperationSocket

# clients = dict()
clients = Server.ServerWS()
operations = OperationSocket.OperationSocket()


async def notify_new_client(client_not_send):
    if clients.check_clients():
        # await asyncio.wait([client.send(messages) for client in clients if client is not client_not_send])
        for client in clients.get_clients():
            if client is not client_not_send:
                await operations.notify_new_client(client, clients.get_clients().get(client_not_send))

async def notify_logout(name):
    if clients.check_clients():
        await asyncio.wait([operations.nofity_exited_client(client, name) for client in clients.get_clients()])

async def register(websock):
    '''
    Añadimos al usuario al diccionario de sockets
    '''
    await websock.send('Escriba su nombre: ')
    nameUser = await websock.recv()
    clients.register(websock, nameUser)
    await notify_new_client(websock)


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
                    await operations.send_msg(client, clients.get_client(websocket), messages)

    # except websockets.exceptions.ConnectionClosed:
    #     print('Sesion cerrada desde el cliente')
    #     await unregister(websocket)
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