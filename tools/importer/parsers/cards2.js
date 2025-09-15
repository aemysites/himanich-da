/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card
  function getImage(card) {
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content from a card
  function getTextContent(card) {
    const fragments = [];
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      // Only include the tag text, not the whole element
      const tag = tagGroup.querySelector('.tag');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag.textContent.trim();
        tagSpan.style.fontSize = '0.8em';
        tagSpan.style.fontWeight = 'bold';
        tagSpan.style.display = 'inline-block';
        tagSpan.style.marginBottom = '0.5em';
        fragments.push(tagSpan);
      }
    }
    // Heading (h2, h3, h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) {
      // Use the heading element as is (preserves semantic meaning)
      fragments.push(heading);
    }
    // Paragraph
    const para = card.querySelector('p');
    if (para) {
      fragments.push(para);
    }
    return fragments;
  }

  // Find the grid layout containing all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The cards are structured as follows:
  // - The first child is a large card (with image, tag, heading, paragraph)
  // - The second child is a flex container with two smaller cards (each with image, tag, heading, paragraph)
  // - The third child is a flex container with several text-only cards (each with heading, paragraph)
  const cards = [];

  // First card (big card)
  const firstCard = grid.children[0];
  if (firstCard && firstCard.classList.contains('utility-link-content-block')) {
    const img = getImage(firstCard);
    const textContent = getTextContent(firstCard);
    cards.push([img, textContent]);
  }

  // Second block: flex container with two cards (each has image)
  const secondBlock = grid.children[1];
  if (secondBlock && secondBlock.classList.contains('flex-horizontal')) {
    const cardLinks = secondBlock.querySelectorAll('.utility-link-content-block');
    cardLinks.forEach(card => {
      const img = getImage(card);
      const textContent = getTextContent(card);
      cards.push([img, textContent]);
    });
  }

  // Third block: flex container with multiple text-only cards
  const thirdBlock = grid.children[2];
  if (thirdBlock && thirdBlock.classList.contains('flex-horizontal')) {
    const cardLinks = thirdBlock.querySelectorAll('.utility-link-content-block');
    cardLinks.forEach(card => {
      // No image for these cards
      // Text: heading and paragraph
      const textContent = [];
      const heading = card.querySelector('h2, h3, h4');
      if (heading) textContent.push(heading);
      const para = card.querySelector('p');
      if (para) textContent.push(para);
      cards.push(['', textContent]);
    });
  }

  // Build the table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  cards.forEach(([img, textContent]) => {
    rows.push([
      img || '',
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
