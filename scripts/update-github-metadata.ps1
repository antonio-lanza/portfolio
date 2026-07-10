# Atualiza metadados públicos do repositório no GitHub.
# Requer: gh auth login (token válido da conta AntonioLanzaDesenvolvedor)

$ErrorActionPreference = "Stop"

gh repo edit AntonioLanzaDesenvolvedor/portfolio `
  --description "Portfolio pessoal — React, TypeScript, Vite. Site: antoniolanza.com" `
  --homepage "https://www.antoniolanza.com" `
  --add-topic portfolio `
  --add-topic react `
  --add-topic typescript `
  --add-topic vite `
  --add-topic frontend

Write-Host "Metadados atualizados. Confira: https://github.com/AntonioLanzaDesenvolvedor/portfolio"
