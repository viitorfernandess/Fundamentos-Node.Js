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

// Função que lista todas as notas salvas na pasta "notes".
function listNotes() {
    // Lê o conteúdo da pasta "notes" e retorna uma lista com os nomes dos arquivos.
    // Como estamos usando 'readdirSync', a leitura é feita de forma síncrona (espera terminar).
    const notes = fs.readdirSync(notesDirectory)

    // Verifica se a pasta está vazia (ou seja, não há arquivos de nota).
    if (notes.length === 0) {
        console.log("Nenhuma nota encontrada.")
        return; // Sai da função para não continuar exibindo o restante
    }

    // Caso existam arquivos, imprime a lista no terminal.
    console.log("Notas salvas:")
    // Percorre cada item (arquivo de nota) da lista 'notes'
    // 'note' é o nome do arquivo (ex: "anotacao1.txt")
    // 'index' é a posição do item na lista (começa em 0)
    notes.forEach((note, index) => {
        // Exibe no terminal a numeração (começando do 1) e o nome da nota
        console.log(`${index + 1}. ${note}`)
    })
}

// Função que permite ao usuário ler o conteúdo de uma nota existente
function readNote() {
    // Lista as notas disponíveis para o usuário escolher
    listNotes()

    // Pergunta ao usuário qual nota ele deseja ler (baseado no número exibido na lista)
    rl.question("Digite o número da nota que deseja ler: ", (index) => {
        // Lê novamente a lista de arquivos na pasta "notes"
        const notes = fs.readdirSync(notesDirectory)

        // Pega o nome da nota selecionada (lembre-se: o usuário digita 1, 2, 3... então subtraímos 1)
        const selectedNote = notes[index - 1]

        // Verifica se o número digitado é válido (ou seja, se existe um arquivo correspondente)
        if (!selectedNote) {
            console.log("Número da nota inválido!")
            return
        }

        // Monta o caminho completo do arquivo da nota
        const notePath = path.join(notesDirectory, selectedNote)

        // Lê o conteúdo da nota (como texto)
        const content = fs.readFileSync(notePath, "utf-8")

        // Exibe o conteúdo da nota no terminal
        console.log(`Conteúdo da nota "${selectedNote}":`)
        console.log(content);
    })
}

// Função para criar uma nova nota
function createNote() {
    // Pergunta ao usuário qual será o nome da nota
    rl.question("Digite o nome da nota:", (noteName) => {

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



