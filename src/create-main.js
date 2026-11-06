import './index.css';
import { setUpCreatePage } from './pages/create.js';
import { createLink } from './services/urls.js';

/**
 * Saves the new link, then sends the user to the dashboard.
 * If the save fails, the error stays on the page and no redirect happens.
 *
 * @param {string} label - The name for the link. May be empty.
 * @param {string} url - The address the short link redirects to.
 */
async function saveLinkAndGoToDashboard(label, url) {
  await createLink(label, url);
  window.location.href = '/dashboard.html';
}

/**
 * Starts the create page by connecting its form to the save action.
 */
setUpCreatePage(document.querySelector('#create'), {
  onCreate: saveLinkAndGoToDashboard,
});
