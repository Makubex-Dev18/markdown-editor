import { toggleFormat, boldToggle } from './format.js';
import { processOrderedLists } from './lists.js';
import { highlightCodeBlocks } from './blocks.js';

const previewBtn = document.getElementById('previewBtn');
const contrastBtn = document.getElementById('contrastBtn');
const formatBtn = document.getElementById('formatBtn');
const clearBtn = document.getElementById('clearBtn');
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const errorMessage = document.getElementById('errorMessage');

let contrastApplied = false;

function updatePreview() {
  try {
    errorMessage.textContent = '';
    const markdown = editor.value.trim();
    if (!markdown) throw new Error('No se ingresó contenido.');

    // Validación de sintaxis Markdown mal formada
    const invalidHeader = /##[^#\s]/.test(markdown);
    const invalidList = /(^|\n)-[^\s]/.test(markdown);
    if (invalidHeader) throw new Error('Encabezado mal formado. Use espacio después de #.');
    if (invalidList) throw new Error('Elemento de lista mal formado. Use espacio después de -.');

    let html = markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\* (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/<\/ul>\n<ul>/gim, '');

    html = processOrderedLists(html);
    html = highlightCodeBlocks(html);

    preview.innerHTML = html;
  } catch (error) {
    console.error('Error en la conversión Markdown:', error);
    errorMessage.textContent = error.message;
  }
}

previewBtn.addEventListener('click', updatePreview);

editor.addEventListener('input', () => {
  const text = editor.value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const chars = text.length;
  wordCount.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
  charCount.textContent = `${chars} ${chars === 1 ? 'carácter' : 'caracteres'}`;
  updatePreview();
});

formatBtn.addEventListener('click', () => {
  toggleFormat(boldToggle);
});

clearBtn.addEventListener('click', () => {
  editor.value = '';
  preview.innerHTML = '';
  wordCount.textContent = '0 palabras';
  charCount.textContent = '0 caracteres';
  errorMessage.textContent = '';
});

contrastBtn.addEventListener('click', () => {
  const headers = preview.querySelectorAll('h1, h2, h3');
  headers.forEach(h => {
    h.style.color = contrastApplied ? '' : '#b91c1c';
    h.style.fontSize = contrastApplied ? '' : '1.5em';
  });
  contrastApplied = !contrastApplied;
});
