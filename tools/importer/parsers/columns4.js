/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid-layout
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row as specified
  const headerRow = ['Columns block (columns4)'];

  // Get all immediate children (each column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (usually an image)
  const columns = columnDivs.map((colDiv) => {
    // If the column contains an image, use the image element
    const img = colDiv.querySelector('img');
    if (img) return img;
    // Otherwise, use the whole column div
    return colDiv;
  });

  // Second row: one cell per column
  const contentRow = columns;

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
