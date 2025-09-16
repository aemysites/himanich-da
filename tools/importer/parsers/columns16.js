/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: find the grid container (the direct child with grid classes)
  // The structure is: section > div.centered > div.grid-layout
  let grid;
  const centered = element.querySelector(':scope > div.centered');
  if (centered) {
    grid = centered.querySelector(':scope > .grid-layout');
  } else {
    grid = element.querySelector('.grid-layout');
  }

  // Defensive: fallback if grid not found
  if (!grid) {
    // If the structure is unexpected, do nothing
    return;
  }

  // Each direct child of the grid is a column cell
  const columnDivs = Array.from(grid.children);

  // For each column, extract the inner image container (which is a div > div > img)
  const cells = columnDivs.map((colDiv) => {
    // Find the image container inside this column
    // Structure: colDiv > div.utility-aspect-2x3 > img
    let imgContainer = colDiv.querySelector('.utility-aspect-2x3');
    if (imgContainer) {
      // Return the whole container (preserves aspect ratio wrappers)
      return imgContainer;
    }
    // Fallback: just return the first img if structure is different
    const img = colDiv.querySelector('img');
    if (img) return img;
    // If nothing found, return an empty string
    return '';
  });

  // Table rows: header, then one row with all images as columns
  const tableRows = [
    headerRow,
    cells,
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
