const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'public');

console.log('Iniciando build...');

// 1. Limpar/Criar diretório public
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);
console.log('Diretório public recriado.');

// 2. Copiar index.html
fs.copyFileSync('index.html', path.join(distDir, 'index.html'));
console.log('index.html copiado.');

// 3. Função para copiar diretórios recursivamente
const copyRecursiveSync = (src, dest) => {
    if (!fs.existsSync(src)) return;
    
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

// 4. Copiar assets
copyRecursiveSync('assets', path.join(distDir, 'assets'));
console.log('Assets copiados.');

// 5. Rodar Tailwind para gerar o CSS minificado dentro de public
console.log('Compilando Tailwind CSS...');
try {
    execSync('npx tailwindcss -i ./assets/css/input.css -o ./public/assets/css/styles.min.css --minify', { stdio: 'inherit' });
    console.log('Tailwind compilado com sucesso.');
} catch (error) {
    console.error('Erro ao compilar Tailwind:', error);
    process.exit(1);
}

console.log('Build concluído com sucesso!');
