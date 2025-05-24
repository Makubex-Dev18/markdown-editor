const previewBtn = document.getElementById('previewBtn');
const contrastBtn = document.getElementById('contrastBtn');
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

let contrastApplied = false;

// Generar vista previa
previewBtn.addEventListener('click', () => {
  const markdown = editor.value;

  let html = markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/<\/ul>\n<ul>/gim, ''); // evitar múltiples ul

  preview.innerHTML = html;
});

// Contrastar encabezados
contrastBtn.addEventListener('click', () => {
  const headers = preview.querySelectorAll('h1, h2, h3');
  headers.forEach(h => {
    if (contrastApplied) {
      h.style.color = '';
      h.style.fontSize = '';
    } else {
      h.style.color = '#b91c1c'; // rojo
      h.style.fontSize = '1.5em';
    }
  });
  contrastApplied = !contrastApplied;
});

// Contador dinámico
editor.addEventListener('input', () => {
  const text = editor.value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const chars = text.length;

  wordCount.textContent = `${words} ${words === 1 ? 'palabra' : 'palabras'}`;
  charCount.textContent = `${chars} ${chars === 1 ? 'carácter' : 'caracteres'}`;
});
