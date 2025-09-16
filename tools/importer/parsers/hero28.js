/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only operate if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    // Look for an <img> inside the first grid cell
    bgImg = gridDivs[0].querySelector('img');
  }
  // If not found, fallback: search for first img in element
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the second grid cell (contains the text)
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The container with text is in the second grid cell
    const container = gridDivs[1];
    // The title is likely an h1
    const h1 = container.querySelector('h1');
    // Subheading or CTA not present in this example, but could be added here
    // Compose content cell
    if (h1) {
      contentCell = h1;
    } else {
      // fallback: use all content in container
      contentCell = container;
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
