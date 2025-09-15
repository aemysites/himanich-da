/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor/div
  function extractCardContent(cardEl) {
    // Find the first image inside the card
    const img = cardEl.querySelector('img');
    // Find the heading (h2 or h3 or h4)
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find the first paragraph
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link or .button)
    let cta = cardEl.querySelector('.button, button, a.button');
    // If CTA is a div, convert to a button for semantic clarity
    if (cta && cta.tagName === 'DIV') {
      const btn = document.createElement('button');
      btn.textContent = cta.textContent;
      cta = btn;
    }
    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // Defensive: if not found, fallback to element itself
  const cardsContainer = mainGrid || element;

  // Gather all card elements (anchors with .utility-link-content-block)
  const cardEls = Array.from(cardsContainer.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.w-layout-grid > a.utility-link-content-block'));

  // Build table rows
  const rows = [
    ['Cards (cards37)'], // header row
  ];

  cardEls.forEach(cardEl => {
    const [img, textContent] = extractCardContent(cardEl);
    // Only add row if image and text are present
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
