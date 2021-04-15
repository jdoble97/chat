class OperationSocket:
    def __init__(self) -> None:
        pass
    async def notify_new_client(self, ws, source):
        await ws.send(f'[{source}] se ha conectado')
        
    async def send_msg(self, ws, source, msg):
        message =f'[{source}]: {msg}'
        await ws.send(message)
    async def nofity_exited_client(self, ws, source):
        await ws.send(f'{source} ha cerrado la sesión')