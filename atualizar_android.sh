#!/bin/bash
echo "📁 Copiando arquivos para my-app/www..."
npm run copiar

echo "🔄 Sincronizando com Android..."
cd my-app
npx cap sync android

echo "🚀 Abrindo Android Studio..."
npx cap open android