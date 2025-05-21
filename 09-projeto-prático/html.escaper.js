//Script para escapar um arquivos html

const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

function escapeHtmlSpecialCharacters(text) {
  // Usa o método .replace() com uma expressão regular para encontrar os caracteres <, > e &
  return text.replace(/[<>&]/g, (match) => {
    // Para cada caractere encontrado, verifica qual é e retorna sua entidade HTML correspondente
    switch (match) {
      case "<":
        return "&lt;"; // Substitui < por &lt;
      case ">":
        return "&gt;"; // Substitui > por &gt;
      case "&":
        return "&amp;"; // Substitui & por &amp;
      default:
        return match; // Retorna o caractere original caso não seja nenhum dos acima (por segurança)
    }
  })
}

// Define a função que recebe dois caminhos de arquivo: entrada e saída
function escapeHtmlFile(inputFilePath, outputFilePath) {
  try {
    // Lê o conteúdo do arquivo de entrada como texto UTF-8
    const fileContent = fs.readFileSync(inputFilePath, "utf-8")

    // Chama a função para escapar caracteres especiais do HTML
    const escapedContent = escapeHtmlSpecialCharacters(fileContent)

    // Escreve o conteúdo escapado no arquivo de saída
    fs.writeFileSync(outputFilePath, escapedContent, "utf-8")

    // Exibe uma mensagem de sucesso no console
    console.log(`Arquivo escapado com sucesso: ${outputFilePath}`)
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro
    console.log("Erro:", error.message)

    // Encerra o processo com um código de erro (1)
    process.exit(1)
  }
}


