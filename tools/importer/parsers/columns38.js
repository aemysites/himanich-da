/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element || !document) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns38)'];

  // Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Each column cell: use the entire column div (preserves images, aspect wrappers, etc.)
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
