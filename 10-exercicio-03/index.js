// Importa o módulo 'fs' (File System), que permite ler, escrever e manipular arquivos no sistema.
const fs = require("node:fs")

// Importa o módulo 'path', usado para lidar com caminhos de arquivos e diretórios
// de forma segura e compatível com todos os sistemas operacionais (Windows, Linux, etc.).
const path = require("node:path")

// Importa o módulo 'readline', que permite ler a entrada do usuário linha por linha,
// muito útil para criar programas que funcionam no terminal (CLI).
const readline = require("node:readline")

// Cria um caminho absoluto para a pasta "notes", que ficará no mesmo diretório do arquivo atual.
// '__dirname' representa o diretório onde este script está salvo.
// 'path.join' garante que o caminho seja criado corretamente, independente do sistema operacional.
const notesDirectory = path.join(__dirname, "notes")

// Cria uma interface de leitura no terminal (linha de comando) usando o módulo 'readline'.
// Isso permite interagir com o usuário, lendo o que ele digita (entrada padrão).
// 'input: process.stdin' → define que a entrada virá do teclado.
// 'output: process.stdout' → define que as mensagens aparecerão no terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Função que verifica se a pasta "notes" existe.
// Se não existir, ela é criada.
// Isso garante que o diretório onde as anotações serão salvas já esteja pronto.
function initializeNotesDirectory() {
    // 'fs.existsSync' verifica se a pasta "notes" já existe.
    if (!fs.existsSync(notesDirectory)) {
        // Se não existir, 'fs.mkdirSync' cria a pasta.
        fs.mkdirSync(notesDirectory)
    }
}

// Define a função chamada listNotes, que será usada para listar os arquivos de notas
function listNotes() {

    // Usa o módulo fs (filesystem) para ler de forma síncrona os arquivos dentro do diretório de notas
    const notes = fs.readdirSync(notesDirectory)

    // Verifica se o array de arquivos está vazio, ou seja, se não há nenhuma nota salva
    if (notes.length === 0) {

        // Se não houver arquivos, exibe a mensagem informando que nenhuma nota foi encontrada
        console.log("Nenhuma nota encontrada.")

    } else {
        // Se houver arquivos, exibe a mensagem indicando que há notas salvas
        console.log("Notas salvas:")

        // Percorre o array de notas com forEach, mostrando cada uma com seu número na lista
        notes.forEach((note, index) => {

            // Exibe o número da nota (index + 1) e o nome do arquivo da nota
            console.log(`${index + 1}. ${note}`)
        })
    }
    askForNextAction()
}


// Função responsável por permitir ao usuário ler uma nota salva
function readNote() {

    // Lista todas as notas disponíveis para que o usuário veja os números
    listNotes()

    // Pergunta ao usuário qual número da nota ele deseja ler
    rl.question("Digite o número da nota que deseja ler:", (index) => {

        // Lê novamente os nomes dos arquivos de notas salvos no diretório
        const notes = fs.readdirSync(notesDirectory)

        // Usa o número informado pelo usuário (subtraindo 1 porque o índice começa em 0)
        const selectedNote = notes[index - 1]

        // Verifica se o número digitado é inválido (fora da lista ou inexistente)
        if (!selectedNote) {
            console.log("Número da nota inválido!")
        } else {
            // Se o número for válido, monta o caminho completo até o arquivo da nota
            const notePath = path.join(notesDirectory, selectedNote)

            // Lê o conteúdo do arquivo da nota como texto (formato utf-8)
            const content = fs.readFileSync(notePath, "utf-8")

            // Exibe no terminal o conteúdo da nota selecionada
            console.log(`Conteúdo da nota "${selectedNote}":\n\n${content}`)
        }

        // Pergunta ao usuário se ele deseja realizar outra ação
        askForNextAction()
    })
}

// Função para criar uma nova nota
function createNote() {
    // Pergunta ao usuário qual será o nome da nota
    rl.question("Digite o nome da nota: ", (noteName) => {

        // Cria o caminho completo do arquivo juntando o diretório das notas com o nome digitado
        const notePath = path.join(notesDirectory, noteName)

        // Pergunta ao usuário qual será o conteúdo da nota
        rl.question("Digite o conteúdo da nota:\n", (content) => {

            // Cria um arquivo .txt com o nome da nota e escreve o conteúdo dentro dele
            // O terceiro parâmetro ("utf8") define o tipo de codificação do texto
            fs.writeFileSync(notePath + ".txt", content, "utf8")

            // Exibe uma mensagem confirmando que a nota foi criada com sucesso
            console.log(`Nota ${noteName} foi criada com sucesso!`)
        })
    })
}

// Define a função chamada askForNextAction
function askForNextAction() {

    // Exibe a pergunta no terminal e espera a resposta do usuário
    rl.question("\nDeseja realizar outra ação? (s/n): ", (answer) => {

        // Converte a resposta para letras minúsculas e verifica se é "s"
        if (answer.toLowerCase() === "s") {

            // Se for "s", chama a função principal (main), repetindo a ação
            main()

        } else {
            // Se a resposta não for "s" (ou seja, qualquer outra coisa)

            // Exibe mensagem de encerramento no terminal
            console.log("Encerrando...")

            // Fecha a interface de leitura de linha (readline)
            rl.close()

            // Encerra completamente a execução do programa com status 0 (sucesso)
            process.exit(0)
        }
    })
}


function main() {
    initializeNotesDirectory()

    console.clear()
    console.log("---------------------------")
    console.log("Notas rápidas no Terminal")
    console.log("---------------------------")

    console.log("Escolha uma opção:")
    console.log("1. Listar notas")
    console.log("2. Ler uma nota")
    console.log("3. Criar uma nova nota")
    console.log("4. Excluir uma nota")
    console.log("5. Sair")

    rl.question("Digite o número da opção desejada: ", (option) => {
        switch (option) {
            case "1":
                listNotes()
                break;
            case "2":
                readNote()
                break;
            case "3":
                createNote()
                break;
            case "5":
                console.log("Saindo...")
                rl.close()
                process.exit(0)

            default:
                console.log("Opção inválida!")
                break;
        }
    })
}

main()



