/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row as required
  const headerRow = ['Columns (columns3)'];

  // Table content row: each cell is a column's content
  // Use the entire column element as the cell content for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
