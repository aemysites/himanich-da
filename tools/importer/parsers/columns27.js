/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: all content except the image
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns27)'];

  // Second row: two columns
  // Left column: include all content from leftCol
  // Right column: include the image element only
  const leftCellContent = leftCol;
  const rightCellContent = rightCol;

  const tableRows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
