/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Defensive: get all direct child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Find image (first child div contains img)
    const imageContainer = card.querySelector(':scope > div');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Find text content
    // The second child div contains tag and date
    const infoDiv = card.querySelector(':scope > div + div');
    // The heading is the next sibling (h3)
    const heading = card.querySelector(':scope > h3');

    // Compose text cell
    const textContent = [];
    if (infoDiv) textContent.push(infoDiv);
    if (heading) textContent.push(heading);

    // Only add row if image and text content exist
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
