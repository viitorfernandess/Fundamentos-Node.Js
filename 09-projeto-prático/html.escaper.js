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

