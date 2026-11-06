/**
 * Connects the login form in `index.html` to the actions for its buttons.
 *
 * The form's markup lives in `index.html`, so this function only adds behavior.
 * It does not talk to the database itself. The caller passes in the functions
 * to run when the user logs in or registers.
 *
 * @param {HTMLElement} container - The element that holds the login form, such as the `#login` div.
 * @param {object} actions - The functions to run for each button.
 * @param {(email: string, password: string) => Promise<void>} actions.onLogIn - Runs when the form is submitted.
 * @param {(email: string, password: string) => Promise<void>} actions.onRegister - Runs when Register is clicked.
 */
export function setUpLoginPage(container, { onLogIn, onRegister }) {
  const form = container.querySelector('form');
  const errorBox = container.querySelector('.login-error');
  const buttons = container.querySelectorAll('button');
  const registerButton = container.querySelector('[data-register]');

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
   * Checks that both fields are filled in, then runs the chosen action.
   * If the action fails, the error message is shown under the form.
   *
   * @param {(email: string, password: string) => Promise<void>} action - The function to run, either log in or register.
   * @returns {Promise<void>} Resolves when the action finishes, whether it worked or not.
   */
  async function attempt(action) {
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      showError('Enter your email and password.');
      return;
    }

    showError('');
    setBusy(true);
    try {
      await action(email, password);
    } catch (error) {
      showError(error.message);
    } finally {
      setBusy(false);
    }
  }

  /**
   * Runs when the form is sent, by pressing Enter or clicking Log in.
   * Stops the browser from reloading the page, then runs the log in action.
   */
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    attempt(onLogIn);
  });

  /**
   * Runs when Register is clicked. Uses the same checks and error handling as Log in.
   */
  registerButton.addEventListener('click', () => {
    attempt(onRegister);
  });
}
