import json
from paquetews.Responses import Response, ResponseEnum


class OperationSocket:

    def __init__(self) -> None:
        pass

    async def notify_current_clients(self, ws, size):
        data = {'number_of_clients': size}
        response = Response(ResponseEnum.current_clients, data)
        await ws.send(json.dumps(response.__dict__))

    async def send_msg(self, ws, message, source):
        data = {'source': source, 'message': message}
        response_msg = json.dumps(
            Response(ResponseEnum.msg_to_client, data).__dict__)
        await ws.send(response_msg)

    async def notify_exited_client(self, ws, size):
        response_exited = json.dumps(
            Response(ResponseEnum.left_client, {'number_of_clients': size}).__dict__)
        print(response_exited)
        await ws.send(response_exited)
