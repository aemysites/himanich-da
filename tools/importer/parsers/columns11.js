/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the two main grids
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 2) return;
  const topGrid = grids[0];
  const bottomGrid = grids[1];

  // Left column: title block (Trend alert, h1) + left image
  const leftTitleBlock = topGrid.children[0]?.cloneNode(true);
  const leftImageDiv = bottomGrid.querySelectorAll('.utility-aspect-1x1')[0]?.cloneNode(true);
  const leftCol = document.createElement('div');
  if (leftTitleBlock) leftCol.appendChild(leftTitleBlock);
  if (leftImageDiv) leftCol.appendChild(leftImageDiv);

  // Right column: content block (paragraph, author, button) + right image
  const rightContentBlock = topGrid.children[1]?.cloneNode(true);
  const rightImageDiv = bottomGrid.querySelectorAll('.utility-aspect-1x1')[1]?.cloneNode(true);
  const rightCol = document.createElement('div');
  if (rightContentBlock) rightCol.appendChild(rightContentBlock);
  if (rightImageDiv) rightCol.appendChild(rightImageDiv);

  // Table rows
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  if (table) {
    element.replaceWith(table);
  }
}
