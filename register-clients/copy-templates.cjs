const path = require('path');
const fs = require('fs');

console.info('[INFO] Copiando arquivos de template para a pasta de build...');
try {
  fs.mkdirSync(path.resolve(__dirname, 'dist', 'templates'))
  const directory = fs.readdirSync(path.resolve(__dirname, 'src', 'templates'), {
    encoding: 'utf-8',
  });
  directory.forEach(file => {
    fs.copyFileSync(
      path.resolve(__dirname, 'src', 'templates', file),
      path.resolve(__dirname, 'dist', 'templates', file)
    );
  });
} catch (error) {
  console.info(
    '[ERROR] Não foi possível copiar a pasta de template para a pasta build, finalizando processo...'
  );
  console.error(error);
  process.exit(1);
}
console.info('[INFO] Processo finalizado com sucesso');