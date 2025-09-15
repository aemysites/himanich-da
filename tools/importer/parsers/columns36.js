/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (should have two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text/buttons, right: images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Text content and buttons
  const leftCol = columns[0];
  // Find heading, paragraph, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // RIGHT COLUMN: Images
  const rightCol = columns[1];
  // Defensive: Find the nested grid containing images
  const imageGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  } else {
    // Fallback: find images directly in rightCol
    images = Array.from(rightCol.querySelectorAll('img'));
  }
  // Compose right cell content (all images)
  const rightCellContent = images;

  // Compose table rows
  const headerRow = ['Columns block (columns36)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}
