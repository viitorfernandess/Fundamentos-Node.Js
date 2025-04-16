// Começar importando os módulos que serão utilizados

const os = require("node:os")
const fs = require("node:fs")
const path = require("node:path")

//Criar um mapa para o sistema saber o nome correto de cada plataforma

const systemPlatformMap = {
    "win32": "Windows",
    "linux": "Linux",
    "darwin": "MacOS"
}

function printlog() {
    const system = systemPlatformMap[os.platform()]
    const arch = os.arch()
    const cpu = os.cpus()[0].model //Informa só o item da primeira posição [0]

    console.log("DETALHES DO SISTEMA: ")
    console.log(`Sistema Operacional: ${system}`)
    console.log(`Arquitetura: ${arch}`)
    console.log(`Modelo do Processador: ${cpu}`)
}

printlog()