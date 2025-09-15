/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero6)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the background image (should be the .cover-image)
  let bgImg = element.querySelector('img.cover-image');
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- CONTENT ROW ---
  // Find the card containing text and CTAs
  let card = element.querySelector('.card');
  const contentRow = [card ? card : ''];

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
