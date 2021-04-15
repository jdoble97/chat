from enum import Enum

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
# class ResponseEnum(Enum):
#     new_client = 1
#     closed_conn = 2
#     msg_to_send = 3