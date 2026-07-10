# Atualiza metadados públicos do repositório no GitHub.
# Requer: gh auth login (token válido da conta AntonioLanzaDesenvolvedor)

$ErrorActionPreference = "Stop"

gh repo edit AntonioLanzaDesenvolvedor/portifolio `
  --description "Portfolio pessoal — React, TypeScript, Vite. Site: antoniolanza.com" `
  --homepage "https://www.antoniolanza.com" `
  --add-topic portfolio `
  --add-topic react `
  --add-topic typescript `
  --add-topic vite `
  --add-topic frontend

# Renomeia o repo para a grafia correta (opcional; atualiza a URL do GitHub)
# Descomente a linha abaixo se quiser renomear portifolio -> portfolio
# gh repo rename portfolio --yes

Write-Host "Metadados atualizados. Confira: https://github.com/AntonioLanzaDesenvolvedor/portifolio"
