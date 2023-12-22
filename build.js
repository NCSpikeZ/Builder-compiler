// J'importe les modules néccesaires
const express = require('express');
const sass = require('sass');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

// J'initialise instance express
const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Compilation du Sass en CSS
const result = sass.renderSync({
  file: path.join(__dirname, 'src', 'assets', 'sass', 'styles.scss')
});

// Minification du CSS
const minifiedCSS = new CleanCSS().minify(result.css.toString()).styles;
const compiledCSS = `<style>${minifiedCSS}</style>`;

// Transpilation et minification du JavaScript
const jsContent = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'js', 'script.js'), 'utf8');
const minifiedJS = UglifyJS.minify(jsContent).code;
const compiledJS = `<script>${minifiedJS}</script>`;

const indexFilePath = path.join(__dirname, 'src', 'public', 'index.html');

// Lecture du fichier index.html
let indexHTML = fs.readFileSync(indexFilePath, 'utf8');

// Remplacement des balises de style et de script dans index.html
indexHTML = indexHTML.replace('<!-- INSERT_CSS_HERE -->', compiledCSS);
indexHTML = indexHTML.replace('<!-- INSERT_JS_HERE -->', compiledJS);

// Écriture du fichier index.html mis à jour
fs.writeFileSync(indexFilePath, indexHTML);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
