class ServerWS:
    def __init__(self) -> None:
        self.clients = dict()

    def register(self, key, value):
        self.clients[key] = value

    def unregister(self, ws) -> str:
        if ws in self.clients:
            return self.clients.pop(ws)

    def check_clients(self):
        return len(self.clients) > 0

    def get_clients(self):
        return self.clients

    def get_client(self, ws):
        return self.clients.get(ws)

    def get_size(self):
        return len(self.clients)
