### Promises Demo

Steps to run (you will need node and npm installed):

1. In this directory in terminal, run: `npm i && npm start`
2. Start live server (VS code extension). Or open the index page in your browser.

This is more of a visual demo - less for live-coding purposes.

To modify behavior:

- To give each request a 50% chance of failure, change line 74 of script.js by appending `/error-prone` to the URL
- At the bottom of the script.js file, you'll see four function calls to `createRequestSection`. Each of these creates a different button console on the webpage. Here's what each argument does:
  - arg one: The descriptive text on the left side of the screen
  - arg two: A call to the `createEventListener` function. This function takes several args as well:
    - `numRequests`: How many async calls this button should trigger
    - `parallel` (default: `true`): Should the calls run in parallel or in sequence (will have no effect if `numRequests` is 1)
    - `awaited` (default: `true`): Should the calls be awaited?
  - Any of these args can be modified to adjust behavior. A new call to the function will add a new request section to the webpage.
