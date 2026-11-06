import './index.css';
import { setUpLoginPage } from './pages/login.js';
import { logInOrRegister } from './services/auth.js';

/**
 * Starts the app by connecting the login form in index.html to its actions.
 *
 * Log in and Register both use `logInOrRegister`. It logs in when the account
 * exists and creates the account when it does not.
 */
setUpLoginPage(document.querySelector('#login'), {
  onLogIn: logInOrRegister,
  onRegister: logInOrRegister,
});
