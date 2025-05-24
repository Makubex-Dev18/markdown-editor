export function highlightCodeBlocks(text) {
  return text.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="bg-gray-900 text-green-400 p-2 rounded overflow-auto"><code>${code}</code></pre>`;
  });
}
