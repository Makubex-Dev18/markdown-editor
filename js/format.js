export function toggleFormat(callback) {
  const textarea = document.getElementById('editor');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end) return; // No hay selección

  const selectedText = textarea.value.slice(start, end);
  const formatted = callback(selectedText);

  textarea.setRangeText(formatted, start, end, 'end');
}

export function boldToggle(text) {
  return text.startsWith('**') && text.endsWith('**')
    ? text.slice(2, -2)
    : `**${text}**`;
}

export function italicToggle(text) {
  return text.startsWith('*') && text.endsWith('*')
    ? text.slice(1, -1)
    : `*${text}*`;
}
