const API_URL = 'https://jsonplaceholder.typicode.com/users';

const listEl = document.getElementById('list');
const statusEl = document.getElementById('status');
const reloadBtn = document.getElementById('reloadBtn');

reloadBtn.addEventListener('click', () => fetchUsers());

window.addEventListener('DOMContentLoaded', () => fetchUsers());

function renderLoading(isLoading) {
  if (isLoading) {
    statusEl.textContent = 'Loading…';
    reloadBtn.disabled = true;
  } else {
    statusEl.textContent = '';
    reloadBtn.disabled = false;
  }
}

function renderError(message) {
  statusEl.innerHTML = `<div class="error" role="alert">${message} <button class="button" id="retryBtn">Try again</button></div>`;
  document.getElementById('retryBtn')?.addEventListener('click', () => fetchUsers());
}

function renderUsers(users = []) {
  listEl.innerHTML = '';

  if (!Array.isArray(users) || users.length === 0) {
    statusEl.innerHTML = `<div class="empty">No users to display.</div>`;
    return;
  }

  const frag = document.createDocumentFragment();

  users.forEach((u) => {
    const address = u?.address
      ? `${u.address.street}, ${u.address.suite}, ${u.address.city}, ${u.address.zipcode}`
      : '—';

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(u.name)}</h3>
      <p class="meta">${escapeHtml(u.email)}</p>
      <p class="meta">${escapeHtml(address)}</p>
    `;
    frag.appendChild(card);
  });

  listEl.appendChild(frag);
}

function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function fetchUsers() {
  renderLoading(true);
  statusEl.textContent = '';
  listEl.setAttribute('aria-busy', 'true');

  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/json' } });

    // Handle HTTP errors explicitly; fetch only rejects on network/CORS failures
    // so we check response.ok before reading the body.
    if (!res.ok) {
      // Consume text to avoid locked body in some browsers
      let detail = '';
      try { detail = await res.text(); } catch {}
      throw new Error(`Request failed: ${res.status} ${res.statusText}${detail ? ` – ${detail.slice(0,120)}` : ''}`);
    }

    const data = await res.json();

    renderUsers(data);
  } catch (err) {
    console.error(err);
    renderError('Could not load users. Please check the connection and try again.');
  } finally {
    renderLoading(false);
    listEl.removeAttribute('aria-busy');
  }
}
