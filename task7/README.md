# User Directory (Fetch API)

A minimal web app that fetches and displays users from a public API with loading, empty, and error states, plus a Retry action. Built with plain HTML, CSS, and JavaScript using the Fetch API.[1][9]

### Demo goals
- On load, fetch users from the JSONPlaceholder /users endpoint and render name, email, and full address.[10][11]
- Show a visible “Loading…” state while fetching, handle failures gracefully, and provide a Reload button to retry.[9][12]

### Tech
- Vanilla JS (Fetch API, async/await), semantic HTML, lightweight CSS.[1][9]

## Project structure
- index.html — markup for header, status region, users list, and Reload button.[9][1]
- styles.css — simple card/row styling for readability.[13][1]
- app.js — fetch logic, rendering, error handling, and event wiring.[14][9]

## Getting started

1) Clone or download the project files into a folder.[9]
2) Open index.html directly in a modern browser, or serve with any static server.[9]
3) The page auto-fetches users; click Reload to refetch on demand.[9]

API endpoint used: https://jsonplaceholder.typicode.com/users (free mock data).[10]

## Implementation details

- Fetch pattern:
  - Use async/await with fetch(URL).[14][9]
  - Check response.ok; throw on non‑2xx to surface HTTP errors.[15][9]
  - Parse with response.json() and render results.[5][9]
- UI states:
  - Loading: status region shows “Loading…” and disables Reload.[1][9]
  - Success: list of user cards is rendered; status cleared.[10][1]
  - Empty: if no users, show “No users found.”[5][9]
  - Error: status shows a friendly message and keeps Reload available.[12][9]
- Data mapping:
  - For each user, display name, email, and address formatted as “street, suite, city, zipcode.”[11][10]

## Scripts overview (app.js)

- fetchUsers(): sets loading UI → fetches → checks response.ok → parses JSON → renders → catch for network/HTTP errors → finally clears loading.[14][9]
- renderUsers(users): maps users into cards with name, email, and formatted address.[5][10]
- renderLoading(isLoading) and renderError(message): small helpers to manage status UI and retry.[12][9]
- Event wiring: Reload button triggers fetchUsers(); fetchUsers() also runs on initial load.[1][9]

## How to test error handling

- Open DevTools → Network → set “Offline” (or “No throttling” → “Offline”).[12]
- Click Reload; the app should display an error message and keep the button enabled for retry.[12][9]
- Restore Online and click Reload to confirm recovery.[9]

## Acceptance criteria checklist

- Auto-fetch on page load and re-fetch on Reload click.[1][9]
- Each card shows name, email, and correctly formatted address from the same user object.[11][10]
- Loading, empty, and error states are visible and mutually exclusive; loader/error clear on success.[12][9]
- No unhandled promise rejections; HTTP errors use response.ok checks; network errors are caught.[15][9]

## Notes and references

- JSONPlaceholder API root and /users endpoint overview.[11][10]
- Fetch API usage and patterns (MDN and tutorial).[1][9]
- Error handling guidance (treat non‑2xx as errors, show friendly messages).[15][12]

## Possible extensions

- Add search/filter by name or email on the client.[9]
- Paginate or virtualize the list for large datasets.[9]
- Replace mock API with a real backend or another mock like DummyJSON for variety.[16][9]

[1](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data)
[2](https://dev.to/zand/a-comprehensive-and-user-friendly-project-readmemd-template-2ei8)
[3](https://www.w3schools.com/js/js_api_fetch.asp)
[4](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
[5](https://www.javascripttutorial.net/web-apis/javascript-fetch-api/)
[6](https://javascript.info/fetch)
[7](https://blog.logrocket.com/fetch-api-javascript/)
[8](https://www.youtube.com/watch?v=cuEtnrL9-H0)
[9](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
[10](https://jsonplaceholder.typicode.com)
[11](https://devhunt.org/blog/jsonplaceholder-api-the-easiest-fake-rest-api)
[12](https://web.dev/articles/fetch-api-error-handling)
[13](https://www.freecodecamp.org/news/javascript-fetch-api-for-beginners/)
[14](https://dmitripavlutin.com/javascript-fetch-async-await/)
[15](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
[16](https://dummyjson.com/docs/users)