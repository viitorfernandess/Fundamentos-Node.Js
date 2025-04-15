import { readFile } from "fs"
import { createFile, deleteFile, showFile, updateFile } from "./functions.mjs"

createFile("Conteúdo inicial do arquivo.\nCriado com módulo fs do Node.Js")
showFile()
console.log("---------------")
updateFile("Conteúdo modificado...")
showFile()
console.log("---------------")
deleteFile()

