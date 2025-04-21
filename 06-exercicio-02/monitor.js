// Começar importando os módulos que serão utilizados

const os = require("node:os")
const fs = require("node:fs")
const path = require("node:path")
const { uptime } = require("node:process")

//Criar um mapa para o sistema saber o nome correto de cada plataforma

const systemPlatformMap = {
    "win32": "Windows",
    "linux": "Linux",
    "darwin": "MacOS"
}

function getSystemInfo() {
    const system = systemPlatformMap[os.platform()]
    const arch = os.arch()
    const cpu = os.cpus()[0].model //Informa só o item da primeira posição [0]

    const upTimeDays = Math.floor(os.uptime() / 60 / 60 / 24) // dividir por 60 para obter os minutos; dividir por 60 para obter as horas; dividir por 24 para obter os dias.
    const upTimeDaysInSeconds = upTimeDays * 24 * 60 * 60  // Quantidade de dias inteiros(calcualdo com o math floor) e ver quantos segundos são.

    const upTimeHours = Math.floor((os.uptime() - upTimeDaysInSeconds) / 60 / 60)  // Utilizar o math floor para subtrair dos segundos totais, as quantidades de dias em segundos; depois dividir por 60 e depois por 60 de novo para ver a quantidade de segundos em horas
    const upTimeHoursInSeconds = upTimeHours * 60 * 60

    const upTimeMins = Math.floor((os.uptime() - upTimeDaysInSeconds - upTimeHoursInSeconds) / 60)
    const upTimeMinsInSeconds = upTimeMins * 60

    const upTimeSecs = Math.floor(os.uptime() - upTimeDaysInSeconds - upTimeHoursInSeconds - upTimeMinsInSeconds)

    const upTime = `${upTimeDays}:${upTimeHours}:${upTimeMins}:${upTimeSecs}`

    const ramTotal = os.totalmem() / 1024 / 1024 / 1024  // Função informa o valor em bytes, fazemos a divisão apra que o valor informado seja em Gigabytes
    const ramUsage = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024
    const ramUsagePercent = Math.round((ramUsage / ramTotal) * 100)

    return { system, arch, cpu, upTime, ramUsage, ramTotal, ramUsagePercent }



}

function printlog({ system, arch, cpu, upTime, ramUsage, ramTotal, ramUsagePercent }) {


    console.clear() //A cada nova execução ele limpa o console
    console.log("DETALHES DO SISTEMA: ")
    console.log(`Sistema Operacional: ${system}`)
    console.log(`Arquitetura: ${arch}`)
    console.log(`Modelo do Processador: ${cpu}`)
    console.log(`Tempo de Atividade do Sistema: ${upTime}`)
    console.log(`Uso de memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent.toFixed(2)} %)`)
}

function saveLog({ system, arch, cpu, upTime, ramUsage, ramTotal, ramUsagePercent }) {
    const logContent = `DETALHES DO SISTEMA | Sistema Operacional: ${system} | Arquitetura: ${arch} | Modelo do Processador: ${cpu} | Tempo de Atividade do Sistema: ${upTime} | Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent} %)\n---\n`
    const logDir = path.join("/", "log")

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir)
    }

    const logFilePath = path.join(logDir, "log.txt")
    fs.appendFileSync(logFilePath, logContent)
}

setInterval(() => {
    const systemInfo = getSystemInfo()
    printlog(systemInfo)
    saveLog(systemInfo)
}, 1000)