# npm run copiar  (script incluído no package.json)
# ./copiar_para_www.ps1

Write-Host "Iniciando copia de arquivos para /www..."

# 1. Limpa a pasta www (se existir)
if (Test-Path -Path "./my-app/www") {
    Remove-Item -Path "./my-app/www/*" -Recurse -Force
    Write-Host "Pasta /www limpa."
}

# 2. Cria a pasta www (se nao existir)
if (-Not (Test-Path -Path "./my-app/www")) {
    New-Item -ItemType Directory -Path "./my-app/www" | Out-Null
}

# 3. Lista de arquivos/diretorios para copiar
$arquivos = @(
    "index.html",
    "manifest.json",
    "styles.css",
    "script.js",
    "service-worker.js",
    "images",
    "assets",
    "styles",
    "scripts",
    "favicon.ico"
)

# 4. Copia cada item para a pasta www
foreach ($item in $arquivos) {
    if (Test-Path -Path $item) {
        Copy-Item -Path $item -Destination "./my-app/www" -Recurse -Force
        Write-Host "$item copiado."
    }
    else {
        Write-Host "$item nao encontrado. Pulando..."
    }
}

Write-Host "Copia concluida! Arquivos prontos para o Capacitor e GitHub Pages."