/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header row: must match the block name exactly
  const headerRow = ['Columns block (columns31)'];

  // Second row: reference the actual DOM elements for each column
  const contentRow = columns.map(col => col);

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
