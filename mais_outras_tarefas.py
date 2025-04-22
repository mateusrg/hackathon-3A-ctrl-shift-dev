# Tarefa com Erro 1
valores = [1, 2, 3]
soma = 0
for v in valores:
    soma += v
media = soma / len(valores)
print("Média: " + media)

# Tarefa com Erro 2
def calcula(x):
    return 100 / x

print(calcula(10))
print(calcula(0))
print(calcula(5))


# Tarefa com Erro 3
texto = "abcde"
print(texto.upper())
print(texto.append("f"))
print(texto[0])

# Tarefa com Erro 4
dados = {"nome":"Ana", "idade ":20 ," altura": 1.65}
print(dados["nome"])
print(dados["altura"])
print(dados["idade "])


# Tarefa com Erro 5
nome = "Jorge"
idade = 30

def saudacao(): return
print(f"Olá, {nome}!")

def despedida():
print("Tchau!")

saudacao()