# 02: Login page (`src/pages/login.js`)

The login form's HTML lives in `index.html`. `src/pages/login.js` connects that form to the actions for its buttons, and handles what happens when the user presses one. The page does not talk to the database. Instead, the code that starts the app (see [01: Entry point](01-entry-point.md)) passes in the functions to run for each button. This keeps the page simple and lets the sign-in code be added later without changing the page.

## The flow in plain words

1. The user types an email and password and presses **Log in**, or presses **Register**.
2. The page checks that both boxes are filled in.
3. The buttons are turned off while the request runs.
4. If the request fails, the error message appears in the red box under the form.
5. The buttons are turned back on when the request finishes.

## The functions

### `setUpLoginPage(container, { onLogIn, onRegister })`

The main function. It finds the form inside the container, which is the `#login` div in `index.html`, and connects the buttons to the actions it receives. It does not create any HTML.

| Part | What it is |
|------|------------|
| `container` | The element that holds the form, such as the `#login` div |
| `onLogIn` | Runs when the form is submitted |
| `onRegister` | Runs when **Register** is clicked |

### `showError(message)`

Shows a message in the red box under the form. An empty message hides the box.

### `setBusy(isBusy)`

Turns the buttons off while a request is running, so the user cannot send the same request twice. It also marks the form as busy for screen readers. Pass `true` to turn the buttons off and `false` to turn them back on.

### `attempt(action)`

Checks the form, then runs either the log in or the register action.

- If the email or password is empty, it shows "Enter your email and password." and stops.
- Otherwise it clears the old error, turns the buttons off, and runs the action.
- If the action throws an error, the error message is shown.
- The buttons are always turned back on at the end, whether the action worked or not.

### Event handlers (inside `setUpLoginPage`)

Two small functions listen for the user's actions:

- **Form submit:** runs when the user presses Enter or clicks **Log in**. It stops the browser from reloading the page, then runs `attempt` with `onLogIn`.
- **Register click:** runs when **Register** is clicked. It runs `attempt` with `onRegister`.

## Related

- [Design overview](README.md)
- [Guide 01: Register and log in](../guides/01-register-and-log-in.md), which describes what the user sees.
