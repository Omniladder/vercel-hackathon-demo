import { getOriginalUrl } from './services/urls.js';

/**
 * Reads the short code from the address. For `/r/Qw7mZ2` the code is `Qw7mZ2`.
 *
 * @returns {string} The last part of the address.
 */
function codeFromAddress() {
  return window.location.pathname.split('/').pop();
}

/**
 * Looks up the code and sends the visitor to the original address. If the code
 * is unknown or the lookup fails, the not-found message stays on the page.
 */
async function redirectToOriginal() {
  try {
    const originalUrl = await getOriginalUrl(codeFromAddress());
    if (originalUrl) {
      window.location.replace(originalUrl);
      return;
    }
  } catch (error) {
    document.querySelector('[data-not-found-message]').textContent = error.message;
  }

  document.querySelector('[data-loading]').hidden = true;
  document.querySelector('[data-not-found]').hidden = false;
}

redirectToOriginal();
