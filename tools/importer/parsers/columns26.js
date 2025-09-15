/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get the two main content columns (first row)
  // The first two children of the grid are the left and right columns
  // (excluding possible nested grids)
  const gridChildren = Array.from(mainGrid.children);
  // Defensive: filter out nested grids (the testimonial grid is a child)
  // The first two <p> elements are the left and right columns
  const leftCol = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const rightCol = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('paragraph-lg'));
  // Defensive: if not found, fallback to first and second <p>
  const allPs = mainGrid.querySelectorAll(':scope > p');
  const left = leftCol || allPs[0];
  const right = rightCol || allPs[1];

  // The testimonial grid is the next grid child
  const testimonialGrid = gridChildren.find(
    (el) => el.classList.contains('w-layout-grid') && el !== mainGrid
  );

  // Defensive: if not found, try to find a grid inside mainGrid
  let testimonial = testimonialGrid;
  if (!testimonial) {
    testimonial = mainGrid.querySelector('.w-layout-grid:not(:first-child)');
  }

  // The testimonial grid contains the divider, the avatar+name, and the logo
  // We'll use the entire testimonial grid as the second row, right cell

  // Build the table rows
  const headerRow = ['Columns block (columns26)'];
  const firstRow = [left, right];
  const secondRow = [
    // Left cell: avatar+name+role
    testimonial ? testimonial.querySelector('.flex-horizontal') : '',
    // Right cell: logo (svg)
    testimonial ? testimonial.querySelector('.utility-display-inline-block') : ''
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    firstRow,
    secondRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
