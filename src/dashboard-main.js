import { renderLinks, setUpDashboardPage } from './pages/dashboard.js';
import { logOut } from './services/auth.js';
import { deleteLink, listLinks } from './services/urls.js';

/**
 * Logs the user out, then sends them to the login page.
 * If the log out fails, the button stays off and no redirect happens.
 */
async function logOutAndGoHome() {
  await logOut();
  window.location.href = '/';
}

/**
 * Loads the user's links and shows them in the table.
 *
 * @param {HTMLElement} container - The element that holds the page, such as the `#dashboard` div.
 */
async function showMyLinks(container) {
  const rows = await listLinks();
  renderLinks(
    container,
    rows.map((row) => ({ id: row.id, name: row.name, code: row.short_code, originalUrl: row.original_url })),
  );
}

/**
 * Deletes a link from the database, then reloads the page so the table is up to date.
 * If the delete fails, the error goes back to the page.
 *
 * @param {string} id - The id of the link to delete.
 */
async function deleteLinkAndRefresh(id) {
  await deleteLink(id);
  window.location.reload();
}

/**
 * Starts the dashboard: connects its buttons, then loads the links.
 */
const dashboard = document.querySelector('#dashboard');

setUpDashboardPage(dashboard, {
  onLogOut: logOutAndGoHome,
  onDelete: deleteLinkAndRefresh,
});
showMyLinks(dashboard);
