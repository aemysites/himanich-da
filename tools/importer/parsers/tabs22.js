/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for tab menu and tab content containers
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels (order matters)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  const tabLabels = tabLinks.map(link => {
    // Defensive: find the label div inside each link
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Get tab panes (order matters)
  const tabPanes = Array.from(tabContent.querySelectorAll('div.w-tab-pane'));

  // Build rows: each row is [label, content]
  const rows = tabLabels.map((label, i) => {
    // Defensive: get the pane for this tab
    const pane = tabPanes[i];
    if (!pane) return [label, ''];
    // The content is the grid inside each pane
    const grid = pane.querySelector('.w-layout-grid');
    // Defensive: if grid missing, use pane itself
    const content = grid || pane;
    return [label, content];
  });

  // Table header
  const headerRow = ['Tabs (tabs22)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
