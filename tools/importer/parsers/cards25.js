/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardDiv) {
    // Find the image (first img in cardDiv)
    const img = cardDiv.querySelector('img');
    // Find the text container (look for h3 and p)
    let textCell = document.createElement('div');
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      const heading = textWrapper.querySelector('h3');
      const paragraph = textWrapper.querySelector('p');
      if (heading) {
        const h = document.createElement('h3');
        h.textContent = heading.textContent;
        textCell.appendChild(h);
      }
      if (paragraph) {
        const p = document.createElement('p');
        p.textContent = paragraph.textContent;
        textCell.appendChild(p);
      }
    }
    return [img, textCell];
  }

  // Get all immediate children that are cards (divs with image and text)
  const cardRows = [];
  const children = Array.from(element.querySelectorAll(':scope > div'));
  children.forEach((child) => {
    // Only include cards with images and text
    const img = child.querySelector('img');
    const hasText = child.querySelector('h3, p');
    if (img && hasText) {
      cardRows.push(extractCardContent(child));
    }
  });

  // Table header
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow, ...cardRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
