/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check if element exists
  if (!element) return;

  // Table header as specified
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> inside the grid)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Defensive: Each card should have two main children: image wrapper and content wrapper
    const cardChildren = card.querySelectorAll(':scope > div');
    if (cardChildren.length < 2) return; // skip malformed cards

    // First child: image wrapper (contains <img>)
    const imageWrapper = cardChildren[0];
    const img = imageWrapper.querySelector('img');
    // Defensive: ensure image exists
    const imageCell = img ? img : '';

    // Second child: content wrapper
    const contentWrapper = cardChildren[1];
    // We'll build a fragment for the text cell
    const textCellFragment = document.createDocumentFragment();

    // Tag (optional, usually present)
    const tag = contentWrapper.querySelector('.tag-group .tag');
    if (tag) {
      // Render as a small or div, preserve element
      textCellFragment.appendChild(tag);
    }

    // Title (h3)
    const title = contentWrapper.querySelector('h3');
    if (title) {
      textCellFragment.appendChild(title);
    }

    // Description (p)
    const desc = contentWrapper.querySelector('p');
    if (desc) {
      textCellFragment.appendChild(desc);
    }

    // If you want to add a CTA, you could check for a button or link inside contentWrapper, but none present here

    // Add row: [image, text content]
    rows.push([
      imageCell,
      textCellFragment
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
