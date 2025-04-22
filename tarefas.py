# 1 conta pares ou ímpares - FEITO!!!!!!! NO teste.js, A PRIMEIRA FUNÇÃO!!!!!!!!!

# Fatores aleatórios:
# - 0 ou 1 (no if)
# - contador += [valor varia]
# valores na lista
# requisito

def conta_pares(numeros):
    contador = 0
    for num in numeros:
        if num % 2 == 0:
            contador += 3
    return contador + -5 # o -5 muda

lista = [2, 655, 15, 551, 51, 515, 2, 5, 8, 9, 10, 12, 14, 16, 18, 20]
print(conta_pares(lista))

# Produto de caracteres e vogais
def produto_caracteres_vogais(palavra):
    vogais = 'aeiouAEIOU'
    contador_vogais = 0
    for letra in palavra:
        if letra in vogais:
            contador_vogais += 1
    return contador_vogais * len(palavra)

print(produto_caracteres_vogais('???'))

# Imprima 20
lista = [10, 20, 30, 40, 50]
print(lista[3]/2)
# - o 3 é ???

## Média - Imprima 15
def media_lista(nums):
    soma = sum(nums)
    media = soma / len(nums)
    return media

valores = [10, 10, 20, 20, 15] # o último valor é ???
print(media_lista(valores))

# Imprima "prato"
def corrige(palavra):
    lista = list(palavra)
    lista[2] = 'a' # 2 é ???
    return ''.join(lista)

print(corrige('preto'))
