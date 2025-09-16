/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all top-level grid children
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let imageEl = null;
  let contentEl = null;

  // Find the image and content containers
  gridDivs.forEach((div) => {
    // Look for an image inside
    if (!imageEl && div.querySelector('img')) {
      imageEl = div.querySelector('img');
    }
    // Look for a heading inside
    if (!contentEl && div.querySelector('h1')) {
      contentEl = div;
    }
  });

  // Fallback: try to find image and content if above fails
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  if (!contentEl) {
    // Try to find a container with a heading
    contentEl = element.querySelector('h1')?.closest('div');
  }

  // Build the table rows
  const headerRow = ['Hero (hero39)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentEl ? contentEl : ''];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
