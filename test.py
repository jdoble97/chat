import os

try:
    name = os.environ['ADDRESS']
except KeyError:
    print('No hay ninguna tecla con eso')
    name = 'jorge'
print(name)