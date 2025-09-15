/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a container for accordion items
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all immediate children that are accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title cell: Find the toggle title (usually .paragraph-lg inside .w-dropdown-toggle)
    let titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleEl) {
      // Fallback: try to find any text node inside the toggle
      const toggle = item.querySelector('.w-dropdown-toggle');
      if (toggle) {
        titleEl = document.createElement('div');
        titleEl.textContent = toggle.textContent.trim();
      }
    }

    // Content cell: Find the content inside .accordion-content
    let contentEl = item.querySelector('.accordion-content');
    if (contentEl) {
      // Defensive: If content is wrapped, unwrap to get the actual content
      const innerContent = contentEl.querySelector('.rich-text, .w-richtext');
      if (innerContent) {
        contentEl = innerContent;
      }
    } else {
      // Fallback: try to find any nav or content area
      contentEl = item.querySelector('nav, .w-dropdown-list');
    }

    // Defensive: If no content found, use empty div
    if (!contentEl) {
      contentEl = document.createElement('div');
    }

    // Add row: [title, content]
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
