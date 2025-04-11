const fs = require("node:fs")

fs.readFile("meuarquivo.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Erro ao ler o arquivo", error.message)
        return
    }

    console.log("Arquivo lido com sucesso!")
    console.log("Conteúdo do arquivo: ", data)

})

// Na callback de readFile, você recebe dois argumentos: error e data. O segundo (data) é o conteúdo lido do arquivo, e você precisa usá-lo.