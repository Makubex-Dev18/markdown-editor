import { toggleFormat, boldToggle } from './format.js';
import { processOrderedLists } from './lists.js';
import { highlightCodeBlocks } from './blocks.js';

const previewBtn = document.getElementById('previewBtn');
const contrastBtn = document.getElementById('contrastBtn');
const formatBtn = document.getElementById('formatBtn');
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

let contrastApplied = false;

previewBtn.addEventListener('click', () => {
  let markdown = editor.value;

  
  // Convertir negrita y cursiva a HTML
  markdown = markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // negrita
    .replace(/\*(.*?)\*/g, '<em>$1</em>');             // cursiva

  // Convertir encabezados y listas con Regex
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/<\/ul>\n<ul>/gim, '');

  // Aplicar funciones adicionales
  html = processOrderedLists(html);       // HU2
  html = highlightCodeBlocks(html);       // HU3

  preview.innerHTML = html;
});

contrastBtn.addEventListener('click', () => {
  const headers = preview.querySelectorAll('h1, h2, h3');
  headers.forEach(h => {
    h.style.color = contrastApplied ? '' : '#b91c1c';
    h.style.fontSize = contrastApplied ? '' : '1.5em';
  });
  contrastApplied = !contrastApplied;
});

formatBtn.addEventListener('click', () => {
  toggleFormat(boldToggle); // Puedes cambiar a italicToggle
});

editor.addEventListener('input', () => {
  const text = editor.value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const chars = text.length;

  wordCount.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
  charCount.textContent = `${chars} ${chars === 1 ? 'carácter' : 'caracteres'}`;
});

