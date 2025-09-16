/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (the direct child of section)
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be 2: content column and image column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: contains heading, paragraph, and buttons
  const contentCol = columns[0];
  // Defensive: find the inner content container
  let contentBlock = contentCol;
  // If there's a nested grid, use its first child
  const nestedGrid = contentCol.querySelector(':scope > .w-layout-grid');
  if (nestedGrid && nestedGrid.children.length) {
    contentBlock = nestedGrid.children[0];
  }

  // Gather heading, paragraph, and button group
  const heading = contentBlock.querySelector('h2');
  const paragraph = contentBlock.querySelector('.rich-text, .w-richtext, p');
  const buttonGroup = contentBlock.querySelector('.button-group');

  // Compose left column cell
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Second column: image
  const imageCol = columns[1];
  // Defensive: find the image element
  const img = imageCol.querySelector('img') || imageCol;

  // Compose right column cell
  const rightCellContent = [];
  if (img && img.tagName === 'IMG') rightCellContent.push(img);

  // Table header
  const headerRow = ['Columns block (columns5)'];
  // Table content row (2 columns)
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
