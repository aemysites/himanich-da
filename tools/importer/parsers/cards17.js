/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per spec
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card is a direct child div.utility-aspect-1x1
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Get the image element
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // Two columns: image cell and text cell (empty string for text content)
    rows.push([img, '']);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
