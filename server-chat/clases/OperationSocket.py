import json
from .Server import Response, ResponseEnum


class OperationSocket:

    def __init__(self) -> None:
        pass

    async def notify_current_clients(self, ws, size):
        response = Response(ResponseEnum.current_clients, size)
        print('Como se ve el dato:', json.dumps(response.__dict__))
        await ws.send(json.dumps(response.__dict__))

    async def send_msg(self, ws, message):
        # message =f'[{source}]: {msg}'
        response_msg = json.dumps(
            Response(ResponseEnum.msg_to_client, message).__dict__)
        await ws.send(response_msg)

    async def notify_exited_client(self, ws, size):
        response_exited = json.dumps(
            Response(ResponseEnum.left_client, size).__dict__)
        print(response_exited)
        await ws.send(response_exited)
