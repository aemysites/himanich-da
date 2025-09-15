/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract icon and text from each card
  function extractCardContent(card) {
    // Icon: find the first svg inside .icon
    const iconWrapper = card.querySelector('.icon');
    let icon = null;
    if (iconWrapper) {
      icon = iconWrapper;
    }
    // Text: find the first <p> (description)
    const text = card.querySelector('p');
    return [icon, text];
  }

  // Get all direct children of the grid (each card)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build table rows
  const rows = cards.map(card => {
    const [icon, text] = extractCardContent(card);
    return [icon, text];
  });

  // Header row as per block spec
  const headerRow = ['Cards (cards19)'];

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
