/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image (only include if present)
  const img = columns[0].querySelector('img');
  // Second column: content
  const contentCol = columns[1];

  // Only include columns with meaningful content
  const rowCells = [];
  if (img) rowCells.push(img);
  if (contentCol && contentCol.textContent.trim()) rowCells.push(contentCol);

  // If no meaningful columns, do not create table
  if (rowCells.length === 0) return;

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns32)'];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowCells
  ], document);

  element.replaceWith(table);
}
