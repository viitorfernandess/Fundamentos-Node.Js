// Cria um objeto vazio para armazenar os argumentos nomeados
const namedArguments = {}

// Itera sobre os argumentos da linha de comando, ignorando os dois primeiros (node e caminho do script)
process.argv.slice(2).forEach((arg, index, array) => {
    // Verifica se o argumento atual começa com "--", ou seja, é um argumento nomeado
    if (arg.startsWith("--")) {
        // Remove os dois traços iniciais para obter apenas o nome do argumento
        const argName = arg.slice(2)

        // Pega o valor do argumento, que se espera estar logo após o nome
        const argValue = array[index + 1]

        // Adiciona o argumento ao objeto com o nome como chave e o valor como valor
        namedArguments[argName] = argValue
    }
})

// Exibe os argumentos informados no console
console.log("Argumentos Informados: ")
console.log(namedArguments)
