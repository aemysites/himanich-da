/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract all collage images in order
  let images = [];
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  if (images.length === 0) {
    images = Array.from(element.querySelectorAll('img'));
  }

  // Compose a div to hold all collage images (preserving order and references)
  let collageDiv = null;
  if (images.length > 0) {
    collageDiv = document.createElement('div');
    collageDiv.style.display = 'grid';
    collageDiv.style.gap = '0';
    images.forEach(img => collageDiv.appendChild(img));
  }

  // 2. Extract content: heading, subheading, CTAs (preserving references)
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentDiv = null;
  if (contentContainer) {
    contentDiv = document.createElement('div');
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentDiv.appendChild(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentDiv.appendChild(subheading);
    // Button group (CTAs)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) contentDiv.appendChild(buttonGroup);
  }

  // 3. Build table rows as per block spec
  const headerRow = ['Hero (hero20)'];
  const imageRow = [collageDiv ? collageDiv : ''];
  const contentRow = [contentDiv ? contentDiv : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
