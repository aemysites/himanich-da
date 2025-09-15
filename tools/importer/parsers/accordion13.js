/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Accordion (accordion13)'];

  // Collect all accordion items (each .divider is one item)
  const items = Array.from(element.querySelectorAll(':scope > .divider'));

  // Build rows for each accordion item
  const rows = items.map(divider => {
    // Each divider contains a grid with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return null; // Defensive: skip if grid missing
    const children = Array.from(grid.children);
    // Defensive: expect at least two children
    const titleEl = children[0] || document.createElement('div');
    const contentEl = children[1] || document.createElement('div');
    return [titleEl, contentEl];
  }).filter(Boolean); // Remove any nulls

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
