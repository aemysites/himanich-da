/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCard(anchor) {
    // Find the image (first child of inner grid)
    const innerGrid = anchor.querySelector('.w-layout-grid');
    let img = null;
    let textContent = document.createElement('div');
    if (innerGrid) {
      // Defensive: get first img
      img = innerGrid.querySelector('img');
      // Get the text block (second child of inner grid)
      // Usually the second div inside innerGrid
      const textBlock = innerGrid.querySelector('div:last-child');
      if (textBlock) {
        // We'll collect all text content in order
        // Tag + read time
        const metaRow = textBlock.querySelector('.flex-horizontal');
        if (metaRow) {
          textContent.appendChild(metaRow);
        }
        // Heading
        const heading = textBlock.querySelector('h3, .h4-heading');
        if (heading) {
          textContent.appendChild(heading);
        }
        // Description
        const desc = textBlock.querySelector('p');
        if (desc) {
          textContent.appendChild(desc);
        }
        // CTA ("Read")
        // Find last div inside textBlock that contains 'Read'
        const ctaDivs = Array.from(textBlock.querySelectorAll('div'));
        const cta = ctaDivs.find(d => d.textContent.trim().toLowerCase() === 'read');
        if (cta) {
          textContent.appendChild(cta);
        }
      }
    }
    return [img, textContent];
  }

  // Get all cards (anchors)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => extractCard(card));

  // Build table
  const cells = [
    ['Cards (cards33)'], // Header row
    ...rows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
