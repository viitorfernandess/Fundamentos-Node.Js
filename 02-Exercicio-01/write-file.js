const fs = require("node:fs")

fs.writeFile("meuarquivo.txt", "Conteúdo inicial do arquivo.\nCriado com o módulo fs do Node.js", (error) => {
    if (error) {
        console.log("Erro ao criar o arquivo.", error.message)
        return
    }

    console.log("Arquivo criado com sucesso")
})