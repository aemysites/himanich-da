/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as specified
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a .utility-aspect-1x1 div containing an image
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Defensive: Only add if image exists
    if (img) {
      // First cell: image
      // Second cell: empty string (required for 2-column structure)
      rows.push([img, '']);
    }
  });

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
