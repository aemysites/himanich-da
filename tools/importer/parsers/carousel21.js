/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: find the card structure
  let card = element.querySelector('.card');
  if (!card) {
    // fallback: try to find a card-body directly
    card = element.querySelector('.card-body')?.parentElement || element;
  }
  
  // Find the card-body (contains heading and image)
  const cardBody = card.querySelector('.card-body') || card;

  // Find the image (mandatory, first cell)
  const img = cardBody.querySelector('img');

  // Find the heading (optional, second cell)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell (second column)
  let textCell = null;
  if (heading) {
    // Use the heading as the main text content
    // Wrap in a div for structure
    const textDiv = document.createElement('div');
    textDiv.appendChild(heading);
    textCell = textDiv;
  }

  // Build the row for this slide
  const row = [img, textCell];

  // Compose the table data
  const tableData = [headerRow, row];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
