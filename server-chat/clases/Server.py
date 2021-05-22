from enum import Enum, auto

class ServerWS:
    def __init__(self) -> None:
        self.clients = dict()
    def register(self, key, value):
        self.clients[key]=value
    def unregister(self, ws)->str:
        if ws in self.clients:
            return self.clients.pop(ws)
    def check_clients(self):
        return len(self.clients)>0
    def get_clients(self):
        return self.clients
    def get_client(self, ws):
        return self.clients.get(ws)
class ResponseEnum(Enum):
    current_clients = auto()
    left_client = auto()
    msg_to_client = auto()

class Response:
    def __init__(self, resp_enum:ResponseEnum, msg:str=None) -> None:
        self.type = resp_enum.value
        self.data = msg
