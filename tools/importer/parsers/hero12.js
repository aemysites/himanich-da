/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children of the section
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find the background image (first .utility-position-relative with an img.cover-image.utility-position-absolute)
  let bgImgDiv = children.find(div => div.querySelector('img.cover-image.utility-position-absolute'));
  let bgImg = bgImgDiv ? bgImgDiv.querySelector('img.cover-image.utility-position-absolute') : null;

  // Find the content container (second child)
  let contentDiv = children.find(div => div.classList.contains('container'));
  let cardBody = contentDiv && contentDiv.querySelector('.card-body');
  let grid = cardBody && cardBody.querySelector('.grid-layout');

  // Within grid: find the text column (contains headline/subheading/cta)
  let gridChildren = grid ? Array.from(grid.children) : [];
  let textCol = gridChildren.find(el => el.querySelector('h2'));

  // Extract all relevant text and CTA from textCol
  let textContent = null;
  if (textCol) {
    textContent = document.createElement('div');
    // Headline
    const h2 = textCol.querySelector('h2');
    if (h2) textContent.appendChild(h2.cloneNode(true));

    // List items (paragraphs with icons)
    const flexGroups = textCol.querySelectorAll('.flex-horizontal.flex-gap-xxs');
    flexGroups.forEach(group => {
      const p = group.querySelector('p');
      if (p) textContent.appendChild(p.cloneNode(true));
    });

    // Divider (optional, for visual separation)
    const dividers = textCol.querySelectorAll('.divider');
    dividers.forEach(divider => {
      textContent.appendChild(divider.cloneNode(true));
    });

    // CTA button
    const button = textCol.querySelector('.button-group a.button');
    if (button) textContent.appendChild(button.cloneNode(true));
  }

  // Compose table rows
  const headerRow = ['Hero (hero12)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  // Always include the third row, even if empty
  const textRow = [textContent ? textContent : ''];
  const cells = [headerRow, bgImgRow, textRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
