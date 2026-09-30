export const slugify = (text) =>
  String(text).toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

/** Flatten React children to plain text (used to build heading ids). */
export const textOf = (node) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return node?.props?.children ? textOf(node.props.children) : '';
};

/** Table of contents from "## Heading" lines (ignores fenced code). */
export function extractToc(markdown) {
  const toc = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^#{2,3}\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const text = m[1].replace(/`/g, '').replace(/\*+/g, '');
      toc.push({ text, id: slugify(text) });
    }
  }
  return toc;
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
