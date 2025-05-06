📻 Clock Radio Android (Capacitor)
Aplicativo de rádio relógio desenvolvido com Capacitor para Android.

⚙️ Configuração Inicial
Pré-requisitos
Node.js (v18+)

npm ou yarn

Android Studio (para build Android)

Passos realizados na criação do projeto
Setup inicial do Capacitor:

bash
Copy
npm init @capacitor/app
✔ What directory should be used for your app? … my-app
✔ What should be the App ID for your app? … io.github.marcimoreira.clockradioandroid
Estrutura de pastas gerada:

Copy
Portfolio_Proj_013-Clock_Radio_Capacitor_Android/
└── my-app/               # Pasta principal do projeto
    ├── android/          # Código nativo Android
    ├── ios/              # Código nativo iOS (se aplicável)
    ├── src/              # Código web (HTML/JS/CSS)
    └── capacitor.config.json # Configurações do Capacitor
🚀 Como Executar o Projeto
1. Primeira execução
bash
Copy
# Acesse a pasta do projeto
cd C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
2. Build e execução no Android
bash
Copy
# Adicione a plataforma Android (se não feito anteriormente)
npx cap add android

# Sincronize com a plataforma Android
npx cap sync

# Abra no Android Studio para build/emulação
npx cap open android
3. Comandos úteis para desenvolvimento
Comando	Descrição
npm run build	Gera a versão de produção web
npx cap sync	Sincroniza alterações com as plataformas nativas
npx cap copy	Copia arquivos web para as plataformas
📂 Estrutura de Pastas (Onde trabalhar)
src/ - Arquivos web do app (HTML, JS, CSS)

android/app/src/main/assets/public - Build web para Android (gerado automaticamente)

capacitor.config.json - Configurações do Capacitor

ℹ️ Informações Técnicas
App ID: io.github.marcimoreira.clockradioandroid

Pasta do projeto: my-app/

Entry point: src/index.html

🔄 Fluxo de Trabalho Típico
Edite os arquivos em src/

Teste no navegador com npm start

Quando pronto para testar no Android:

bash
Copy
npm run build
npx cap sync android
npx cap open android
No Android Studio: ▶️ Run no emulador/dispositivo

Você pode copiar este conteúdo diretamente para o README.md do seu projeto. Ele inclui:

Todos os comandos necessários

Caminhos completos das pastas

Fluxo completo de desenvolvimento

Informações técnicas importantes

Quer que eu adicione algo específico sobre a funcionalidade do rádio ou configurações adicionais? 😊

🛑 Como Parar o npm start
No terminal onde o servidor está rodando:

Pressione Ctrl + C (Windows/Linux/macOS)

Isso mostrará a mensagem:

bash
Copy
^C
npm run start exited with code 0
Pronto! O servidor foi encerrado.

Se estiver usando o VS Code:

Clique no ícone 🗑️ (Lixeira) no terminal ativo.

Caso o terminal trave (raro):

Feche a janela do terminal e abra uma nova.

========================
# 1. Volte para a raiz do projeto
cd C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android

# 2. Execute a cópia DOS NOVOS ARQUIVOS
npm run copiar

# 3. Entre na pasta my-app
cd my-app

# 4. Verifique se a pasta www foi criada
dir www

# 5. Sincronize com Android
npx cap sync android

# 6. Abra no Android Studio dentro de my-app
npx cap open android
====================================

PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android> cd my-app
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> cd..     
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android> npm run copiar

> copiar
> powershell -ExecutionPolicy Bypass -File copiar_para_www.ps1

Iniciando copia de arquivos para /www...
Pasta /www limpa.
index.html copiado.
manifest.json copiado.
styles.css copiado.
script.js copiado.
service-worker.js copiado.
images copiado.
assets nao encontrado. Pulando...
styles nao encontrado. Pulando...
scripts nao encontrado. Pulando...
favicon.ico copiado.
Copia concluida! Arquivos prontos para o Capacitor e GitHub Pages.
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android> cd my-app
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> npm install -g @capacitor/cli@latest                  

added 108 packages in 5s

19 packages are looking for funding
  run `npm fund` for details
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> npm install @capacitor/core@latest @capacitor/android@latest

added 1 package, and audited 123 packages in 1s

22 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> npx cap sync android
√ Copying web assets from www to android\app\src\main\assets\public in 14.54ms
√ Creating capacitor.config.json in android\app\src\main\assets in 1.63ms
√ copy android in 27.23ms
√ Updating Android plugins in 2.92ms
[info] Found 2 Capacitor plugins for android:
       @capacitor/camera@7.0.1
       @capacitor/splash-screen@7.0.1
√ update android in 73.09ms
[info] Sync finished in 0.115s
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> npx cap open android
[info] Opening Android project at: android.
PS C:\Portfolio_Marcia_Moreira-GERAL\Portfolio_Proj_013-Clock_Radio_Capacitor_Android\my-app> 

