import './index.css';
import { setUpLoginPage } from './pages/login.js';
import { getSession, logInOrRegister } from './services/auth.js';

/**
 * Sends the user straight to the dashboard when they are already logged in,
 * so the login form is skipped.
 */
async function redirectIfLoggedIn() {
  // Short links (/r/:code) belong to the redirect page, not the login page.
  if (window.location.pathname.startsWith('/r/')) return;
  if (await getSession()) window.location.href = '/dashboard.html';
}

/**
 * Logs in or registers, then sends the user to the dashboard.
 * If the action throws, the error stays on the page and no redirect happens.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
async function logInAndGoToDashboard(email, password) {
  await logInOrRegister(email, password);
  window.location.href = '/dashboard.html';
}

/**
 * Starts the app by connecting the login form in index.html to its action.
 *
 * Log in uses `logInOrRegister`. It logs in when the account exists and
 * creates the account when it does not.
 */
redirectIfLoggedIn();

setUpLoginPage(document.querySelector('#login'), {
  onLogIn: logInAndGoToDashboard,
});
