import enum


class Test(enum.Enum):
    sun = enum.auto()
    mon = enum.auto()
    fri = enum.auto()


print(Test.fri.value)
