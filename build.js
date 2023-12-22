// J'importe les modules néccesaires
const express = require('express');
const sass = require('sass');
const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

// J'initialise l'instance express
const app = express();

app.set('view engine', 'pug'); // Configuration de Pug comme moteur de modèle

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Compilation du Sass en CSS
const result = sass.renderSync({
  file: path.join(__dirname, 'src', 'assets', 'sass', 'styles.scss')
});

// Minification du CSS
const minifiedCSS = new CleanCSS({ compatibility: 'ie7' }).minify(result.css.toString()).styles;
const compiledCSS = `<style>${minifiedCSS}</style>`;

// Compilation et minification du JavaScript
const jsContent = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'js', 'script.js'), 'utf8');
const minifiedJS = UglifyJS.minify(jsContent).code;
const compiledJS = `<script>${minifiedJS}</script>`;

const indexFilePath = path.join(__dirname, 'src', 'public', 'index.pug');

// Lecture du fichier index.pug
let indexHTML = fs.readFileSync(indexFilePath, 'utf8');

// Remplacement des balises de style et de script dans index.pug
indexHTML = indexHTML.replace('<!-- INSERT_CSS_HERE -->', compiledCSS);
indexHTML = indexHTML.replace('<!-- INSERT_JS_HERE -->', compiledJS);

// Écriture du fichier index.pug mis à jour
fs.writeFileSync(indexFilePath, indexHTML);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
