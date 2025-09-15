/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (should be direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the text block (left column)
  // It has h2, h3, p
  const textBlock = gridChildren.find(child => child.querySelector('h2') && child.querySelector('h3'));

  // Find the contact list (right column, above image)
  // It is a <ul> with role="list"
  const contactList = gridChildren.find(child => child.tagName === 'UL' && child.getAttribute('role') === 'list');

  // Find the image (right column, below contact list)
  const image = gridChildren.find(child => child.tagName === 'IMG');

  // Compose left column: text block
  // Compose right column: contact list + image
  // We'll wrap contactList and image in a div for the right cell
  let rightCell;
  if (contactList && image) {
    const rightDiv = document.createElement('div');
    rightDiv.append(contactList, image);
    rightCell = rightDiv;
  } else if (contactList) {
    rightCell = contactList;
  } else if (image) {
    rightCell = image;
  } else {
    rightCell = '';
  }

  // Table structure
  const headerRow = ['Columns (columns18)'];
  const contentRow = [
    textBlock || '',
    rightCell
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
