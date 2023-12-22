// J'importe les modules néccesaires
const express = require('express');
const sass = require('sass');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// Initialisation de l'instance de express
const app = express();

// On gére les fichiers statiques
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Compilation du Sass en CSS
const result = sass.renderSync({
  file: path.join(__dirname, 'src', 'assets', 'sass', 'styles.scss')
});
fs.writeFileSync(path.join(__dirname, 'src', 'public', 'styles.css'), result.css);

// Transpilation du JavaScript avec Babel
execSync('babel src/assets/js --out-dir src/public');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
