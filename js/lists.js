export function processOrderedLists(text) {
  const lines = text.split('\n');
  let inList = false;
  let result = '';

  const processLine = (line) => {
    const match = line.match(/^\d+\.\s+(.*)/);
    return match ? `<li>${match[1]}</li>` : line;
  };

  lines.forEach((line, idx) => {
    if (/^\d+\.\s+/.test(line)) {
      if (!inList) {
        result += '<ol>';
        inList = true;
      }
      result += processLine(line);
      if (idx === lines.length - 1 || !/^\d+\.\s+/.test(lines[idx + 1])) {
        result += '</ol>';
        inList = false;
      }
    } else {
      result += line;
    }
    result += '\n';
  });

  return result;
}
