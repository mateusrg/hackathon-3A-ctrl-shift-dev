# Tarefa 1
lista = [1, 2, 3]
x = len(lista) * lista[1] # o "1" varia

# Tarefa 2
valores = [2, 4, 6, 8] # lista varia
soma = 0
for v in valores:
    if v > 5: # 5 varia
        soma += v
print(soma)

# Tarefa 3
def misterio(n):
    if n % 2 == 0:
        return n - 2
    return n * 2

print(misterio(7)) # o 7 varia

# Tarefa 4
def busca(nums, alvo):
    for i, n in enumerate(nums):
        if n == alvo:
            return i
    return -1

print(busca([5, 3, 8, 10], 7))

# Tarefa 5
def resposta(valor):
    match valor:
        case 5:
            return "um"
        case 8:
            return "dois ou três"
        case "cinco":
            return 1
        case "oito":
            return "outro"
        case _:
            return "ouro"