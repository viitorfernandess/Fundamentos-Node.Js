// process.stdout.write("Olá, mundo !")

// process.stdin.on("data", (data) => {
//     process.stdout.write(`Você digitou: ${data}`)
// })

// process	Objeto global do Node.js para controlar o processo atual.
// stdin	Entrada padrão (o que o usuário digita no terminal).
// .on("data", ...)	Escuta quando o usuário digita algo e aperta Enter.
// (data) => { ... }	Função que é chamada com o que o usuário digitou.
// data	O conteúdo digitado, geralmente como um Buffer.
// process.stdout.write()	Escreve texto na saída padrão (console), sem quebra de linha.


const readLine = require("node:readline")

const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

// rl.question("Qual o seu nome ?", (answer) => {
//     rl.write(`Olá, ${answer}!\n`)
//     rl.close()
// })

// rl.on("close", () => {
//     rl.write("Saindo...")
//     // process.exit(0)  // 0 significa que encerra sem err, já o 1 significa que encerra com erro
// })

rl.on('SIGINT', () => {
    rl.question('Deseja realmente sair? (s/n) ', (resposta) => {
        if (resposta.trim().toLowerCase() === 's') {
            rl.close()
        } else {
            rl.write("Você escolheu continuar.")
        }
    })
})