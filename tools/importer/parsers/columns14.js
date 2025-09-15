/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be: [h2, div])
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the heading (reference the actual element)
  const heading = gridChildren[0];

  // Second column: the content block (reference the actual element)
  const contentBlock = gridChildren[1];

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns14)'];

  // Table content row: columns side by side, referencing original elements
  const contentRow = [heading, contentBlock];

  // Build table using DOMUtils.createTable
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}
