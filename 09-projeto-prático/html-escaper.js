//Script para escapar um arquivos html

const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

run()

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

// Define uma função chamada askFilePath que recebe uma pergunta como argumento
function askFilePath(question) {
  // Cria uma interface de leitura para entrada (teclado) e saída (console)
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  // Retorna uma Promise, pois rl.question é assíncrono e precisa aguardar a resposta do usuário
  return new Promise((resolve) => {
    // Exibe a pergunta no terminal e espera o usuário digitar a resposta
    rl.question(question, (answer) => {
      // Quando o usuário responder, a resposta é passada para a função resolve
      // Isso "entrega" a resposta para quem chamou askFilePath
      resolve(answer)

      // Encerra a interface de leitura para liberar os recursos do terminal
      rl.close()
    })
  })
}


// Define uma função assíncrona para lidar com a interação com o usuário
async function userInteraction() {
  // Suporte a argumentos via linha de comando:
  // Exemplo: node html-escaper.js <inputPath> <outputPath>
  let inputPath = process.argv[2] // Captura o primeiro argumento passado (arquivo de entrada)

  // Se o caminho de entrada não for passado como argumento...
  if (!inputPath) {
    // Pergunta ao usuário qual o caminho do arquivo de entrada
    inputPath = await askFilePath("Informe o caminho do arquivo de entrada: ")
  }

  // Converte o caminho do arquivo de entrada para um caminho absoluto
  inputPath = path.resolve(inputPath)

  // Gera um nome padrão para o arquivo de saída baseado no nome do arquivo de entrada
  // Exemplo: se o arquivo for "index.html", o nome padrão será "escaped_index.html.txt"
  const defaultName = `escaped_${path.basename(inputPath)}.txt`

  // Pergunta ao usuário qual o caminho do arquivo de saída, oferecendo o nome padrão como sugestão
  const answer = await askFilePath(`Informe o caminho do arquivo de saída (padrão: ${defaultName}): `)

  // Se o usuário digitou um caminho, usa ele; senão, usa o nome padrão
  let outputPath = answer.length > 0 ? answer : defaultName

  // Também converte o caminho de saída para um caminho absoluto
  outputPath = path.resolve(outputPath)

  // Chama a função que processa o arquivo, escapando os caracteres especiais HTML
  escapeHtmlFile(inputPath, outputPath)
}

// Função principal que decide como executar o script
function run() {
  // Verifica se foram passados pelo menos dois argumentos na linha de comando
  // (os argumentos esperados são os caminhos dos arquivos de entrada e saída)
  if (process.argv.length >= 4) {
    // Se os caminhos foram passados, chama a função para escapar o HTML usando esses caminhos
    // Usa path.resolve para garantir que os caminhos sejam absolutos (completos)
    escapeHtmlFile(
      path.resolve(process.argv[2]),
      path.resolve(process.argv[3])
    )
  } else {
    // Caso os argumentos não tenham sido passados, entra no modo interativo

    // Exibe um cabeçalho amigável no terminal com nome e versão do script
    console.log("---------------------")
    console.log("HTML Tag Escaper v1.0")
    console.log("---------------------\n")

    // Exibe uma mensagem explicando que os argumentos não foram informados
    console.log("Argumentos não informados! Por favor, informe os caminhos dos arquivos para realizar o escape.")

    // Chama a função que interage com o usuário para perguntar os caminhos
    userInteraction()
  }
}



