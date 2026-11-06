/**
 * Connects the login form in `index.html` to the actions for its buttons.
 *
 * The form's markup lives in `index.html`, so this function only adds behavior.
 * It does not talk to the database itself. The caller passes in the function
 * to run when the user logs in.
 *
 * @param {HTMLElement} container - The element that holds the login form, such as the `#login` div.
 * @param {object} actions - The functions to run for the form.
 * @param {(email: string, password: string) => Promise<void>} actions.onLogIn - Runs when the form is submitted.
 */
export function setUpLoginPage(container, { onLogIn }) {
  const form = container.querySelector('form');
  const errorBox = container.querySelector('.login-error');
  const buttons = container.querySelectorAll('button');

  /**
   * Shows a message in the red box under the form. An empty message hides the box.
   *
   * @param {string} message - The text to show, or an empty string to hide the box.
   */
  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = !message;
  }

  /**
   * Turns the form's buttons on or off while a request is running, so the user
   * cannot click them twice.
   *
   * @param {boolean} isBusy - `true` to disable the buttons, `false` to enable them.
   */
  function setBusy(isBusy) {
    form.setAttribute('aria-busy', String(isBusy));
    buttons.forEach((button) => {
      button.disabled = isBusy;
    });
  }

  /**
   * Runs when the form is sent, by pressing Enter or clicking Log in.
   * Stops the browser from reloading the page, then checks that both fields
   * are filled in. If the log in action fails, the error is shown under the form.
   */
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      showError('Enter your email and password.');
      return;
    }

    showError('');
    setBusy(true);
    try {
      await onLogIn(email, password);
    } catch (error) {
      showError(error.message);
    } finally {
      setBusy(false);
    }
  });
}
