import fs from 'node:fs'

export function createFile(text) {
    fs.writeFileSync('meuarquivo.txt', text)
}

export function updateFile(text) {
    fs.writeFileSync('meuarquivo.txt', text)
}

export function showFile() {
    try {
        const content = fs.readFileSync('meuarquivo.txt', 'utf-8')
        console.log(content)
    } catch (error) {
        console.error('Erro ao ler o arquivo: ', error.message)
    }
}

export function deleteFile() {
    try {
        fs.unlinkSync('meuarquivo.txt')
        console.log('Arquivo excluído com sucesso!')
    } catch (error) {
        console.error('Erro ao excluir o arquivo: ', error.message)
    }
}

// Função Síncrona: Executa uma instrução por vez, esperando cada uma terminar antes de continuar. Bloqueia o restante do código.

// Função Assíncrona: Permite continuar executando o código enquanto espera uma operação (como requisição ou timer) terminar. Não bloqueia o fluxo.