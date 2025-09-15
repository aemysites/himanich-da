/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image (first img in card)
  function extractImage(card) {
    let img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract text content (title + description)
  function extractText(card) {
    // Find all heading and description elements inside the card
    const frag = document.createDocumentFragment();
    // Get all headings (h3 or .h4-heading)
    card.querySelectorAll('h3, .h4-heading').forEach(h => {
      frag.appendChild(h.cloneNode(true));
    });
    // Get all descriptions (div.paragraph-sm)
    card.querySelectorAll('div.paragraph-sm').forEach(d => {
      frag.appendChild(d.cloneNode(true));
    });
    // If no heading/desc found, fallback to all text content
    if (!frag.childNodes.length) {
      frag.appendChild(document.createTextNode(card.textContent.trim()));
    }
    return frag.childNodes.length ? frag : '';
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const rows = [];
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  tabPanes.forEach(tabPane => {
    // Find the grid inside the tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll('a');
    cards.forEach(card => {
      // Defensive: skip if not an <a>
      if (!(card instanceof HTMLAnchorElement)) return;
      // Extract image and text
      const img = extractImage(card);
      const text = extractText(card);
      // Only add if either image or text exists
      if (img || text) {
        rows.push([img || '', text]);
      }
    });
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
