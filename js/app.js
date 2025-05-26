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
let isReadOnlyMode = false;
const MAX_CHARS = 1000;

// Crear botón para modo lectura
document.addEventListener('DOMContentLoaded', () => {
  const toggleReadModeBtn = document.createElement('button');
  toggleReadModeBtn.id = 'readModeBtn';
  toggleReadModeBtn.textContent = 'Activar Modo Lectura';
  toggleReadModeBtn.className =
    'bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded ml-2';
  document.querySelector('header div').appendChild(toggleReadModeBtn);

  toggleReadModeBtn.addEventListener('click', () => {
    isReadOnlyMode = !isReadOnlyMode;
    editor.disabled = isReadOnlyMode;
    toggleReadModeBtn.textContent = isReadOnlyMode
      ? 'Desactivar Modo Lectura'
      : 'Activar Modo Lectura';
    alert(
      isReadOnlyMode
        ? 'Modo lectura activado: ya no puedes editar el contenido.'
        : 'Modo lectura desactivado: puedes volver a editar el contenido.'
    );
  });
});

function updatePreview() {
  try {
    errorMessage.textContent = '';
    const markdown = editor.value.trim();
    if (!markdown) throw new Error('No se ingresó contenido.');

    if (markdown.length > MAX_CHARS) {
      throw new Error(`El texto excede el límite de ${MAX_CHARS} caracteres.`);
    }

    const invalidHeader = /##[^#\s]/.test(markdown);
    const invalidList = /(^|\n)-[^\s]/.test(markdown);
    if (invalidHeader)
      throw new Error('Encabezado mal formado. Use espacio después de #.');
    if (invalidList)
      throw new Error('Elemento de lista mal formado. Use espacio después de -.');

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
  if (editor.value.length > MAX_CHARS) {
    editor.value = editor.value.substring(0, MAX_CHARS);
    alert(`Has alcanzado el límite máximo de ${MAX_CHARS} caracteres.`);
  }

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


