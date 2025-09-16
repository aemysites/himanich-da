/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row must match the target block name exactly
  const headerRow = ['Columns block (columns35)'];

  // Each column: gather its content as a fragment, preserving all text and structure
  const contentRow = columns.map((col) => {
    // If the column is a link (button), use the element directly
    if (col.tagName === 'A') return col;
    // Otherwise, collect all child nodes (including text, headings, etc.)
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach((node) => frag.appendChild(node));
    return frag;
  });

  // Compose the table: header row, then content row
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
