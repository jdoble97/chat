from enum import Enum, auto


class ResponseEnum(Enum):
    current_clients = auto()
    left_client = auto()
    msg_to_client = auto()


class Response:
    def __init__(self, resp_enum: ResponseEnum, data) -> None:
        self.type = resp_enum.value
        self.data = data
