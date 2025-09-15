/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (content), right (image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: content block (should be a DIV)
  const leftCol = columns.find((el) => el.tagName === 'DIV');
  // Right column: image block (should be an IMG)
  const rightCol = columns.find((el) => el.tagName === 'IMG');

  // Defensive fallback
  const leftContent = leftCol || columns[0];
  const rightImage = rightCol || columns[1];

  // --- FIX: Extract all text content from left column as a single cell ---
  // Create a container div to hold all left column content
  const leftCell = document.createElement('div');
  // Append all children of leftContent to the leftCell
  Array.from(leftContent.childNodes).forEach((node) => {
    leftCell.appendChild(node.cloneNode(true));
  });

  // For the right column, just use the image element
  const rightCell = rightImage.cloneNode(true);

  // Use the block name as the header row, as required
  const headerRow = ['Columns block (columns15)'];
  const contentRow = [leftCell, rightCell];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
