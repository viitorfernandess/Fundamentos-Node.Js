const fs = require("node:fs")

try {
    fs.writeFileSync("./arquivo.txt", "Olá, mundo!", "utf-8")
    console.log("Arquivo criado com sucesso!")
} catch (error) {
    console.log("Erro a escrever o arquivo: ", error.messsage)
}