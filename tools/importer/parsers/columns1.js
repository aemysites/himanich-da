/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row: must match the block name exactly
  const headerRow = ['Columns block (columns1)'];

  // Second row: each cell is the content of a column (reference the actual DOM nodes)
  const columnsRow = columns;

  // Build the table using the WebImporter utility
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
