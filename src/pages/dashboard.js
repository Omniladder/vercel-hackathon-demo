/**
 * Connects the buttons in `dashboard.html` to their actions, and fills the links table.
 *
 * The markup lives in `dashboard.html`, so this function only adds behavior.
 * It does not talk to the database itself. The caller passes in the functions
 * to run for the buttons.
 *
 * @param {HTMLElement} container - The element that holds the page, such as the `#dashboard` div.
 * @param {object} actions - The functions to run for the buttons.
 * @param {() => Promise<void>} actions.onLogOut - Runs when the log out button is clicked.
 * @param {(id: string) => Promise<void>} actions.onDelete - Runs with the link's id after the user confirms a delete.
 */
export function setUpDashboardPage(container, { onLogOut, onDelete }) {
  const logOutButton = container.querySelector('[data-logout]');
  const tbody = container.querySelector('tbody');

  /**
   * Runs when the log out button is clicked. Turns the button off while the
   * log out runs, so it cannot be clicked twice.
   */
  logOutButton.addEventListener('click', async () => {
    logOutButton.disabled = true;
    await onLogOut();
  });

  /**
   * Runs when a button in the links table is clicked. The click is handled on the
   * table body because the rows are added later, by renderLinks.
   * The copy buttons put the matching text on the clipboard. Delete asks the user
   * to confirm, then runs the delete action. If the delete fails, the error is shown in an alert.
   */
  tbody.addEventListener('click', async (event) => {
    const row = event.target.closest('tr');
    if (!row) return;

    const copyUrlButton = event.target.closest('[data-copy-url]');
    if (copyUrlButton) {
      await copyText(copyUrlButton, row.querySelector('[data-destination]').textContent);
      return;
    }

    const copyShortButton = event.target.closest('[data-copy-short]');
    if (copyShortButton) {
      await copyText(copyShortButton, row.querySelector('[data-short-path]').textContent);
      return;
    }

    if (!event.target.closest('[data-delete]')) return;
    if (!window.confirm('Delete this short link? Anyone who opens it will see "Link not found".')) return;

    try {
      await onDelete(row.dataset.linkId);
    } catch (error) {
      window.alert(error.message);
    }
  });
}

/**
 * Copies text to the clipboard. The button says "Copied!" for a moment.
 * If the browser refuses, an alert shows the text so the user can copy it by hand.
 *
 * @param {HTMLElement} button - The button that was clicked.
 * @param {string} text - The text to copy.
 */
async function copyText(button, text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    window.alert(`Could not copy. Select this text and copy it yourself:\n${text}`);
    return;
  }

  const label = button.textContent;
  button.textContent = 'Copied!';
  setTimeout(() => {
    button.textContent = label;
  }, 1500);
}

/**
 * Replaces the rows in the links table with one row per link.
 * Each row is a copy of the `#link-row` template in `dashboard.html`.
 * With no links, the table is hidden and the welcome message shows instead.
 *
 * Short links show the full address, such as https://myapp.vercel.app/r/Qw7mZ2,
 * so the user can copy it. The host comes from the browser.
 *
 * @param {HTMLElement} container - The element that holds the page, such as the `#dashboard` div.
 * @param {{ id: string, name: string, code: string, originalUrl: string }[]} links - The links to show.
 */
export function renderLinks(container, links) {
  const template = container.querySelector('#link-row');
  const table = container.querySelector('.links-table');
  const tbody = container.querySelector('tbody');
  const emptyState = container.querySelector('[data-empty]');

  table.hidden = links.length === 0;
  emptyState.hidden = links.length > 0;

  const rows = links.map((link) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const shortUrl = new URL(`/r/${link.code}`, window.location.origin).href;

    row.dataset.linkId = link.id;
    row.querySelector('[data-name]').textContent = link.name;
    row.querySelector('[data-destination]').textContent = link.originalUrl;
    row.querySelector('[data-visit]').href = link.originalUrl;

    const shortLink = row.querySelector('[data-short-path]');
    shortLink.href = shortUrl;
    shortLink.textContent = shortUrl;

    return row;
  });

  tbody.replaceChildren(...rows);
}
