/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image (if present)
  const contentCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img; // Use the image element directly
    return col; // Fallback: use the column div if no image
  });

  // Table header row as required
  const headerRow = ['Columns block (columns29)'];
  // Table content row
  const tableRows = [headerRow, contentCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
