/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Header row as required
  const headerRow = ['Columns block (columns30)'];

  // Second row: each cell is the content of a column
  // Reference the entire column element for resilience
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
