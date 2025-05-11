# QA Code Quiz Project

This repository contains a QA-focused project setup for demonstrating manual testing, API testing, unit testing (Jest), and UI automation using Cypress.

## 🛠️ Project Stack

- **Backend Mock API:** Node.js (`mockedAPI/index.js`)
- **Unit Testing:** Jest
- **API Testing Tool:** Postman (manual)
- **UI Automation:** Cypress
- **Package Manager:** npm

##  How to Run

> **Note:** All commands below are to be run from the root of the project directory.
>  **Important:** Keep an eye on your terminal output for any port changes. Ports for the mock server or API may vary depending on your environment.



### 1. Start the Mocked Web App (Manual Testing)

```bash
npm install
npm start
```

Open your browser to `http://localhost:3000` and perform manual UI testing.

### 2. Start the Mock API (Postman Testing)

```bash
node mockedAPI/index.js
```

The API will be available at `http://localhost:9999`. You can manually test the endpoints using Postman.


### 3. Run Unit Tests (Jest)

**Important:** Before running Jest tests, **stop the manually started mock server**.  
Supertest creates its own instance of the server during testing to avoid port conflicts.

```bash
npm run test:unit
```

This will execute all Jest-based unit and integration tests located in the `__tests__/` directory.


### 4. Run Cypress UI Automation

```bash
npx cypress open
```

Choose a test and run it from the Cypress UI.

## Test Types

| Type           | Tool          | Location              | Status   |
|----------------|---------------|------------------------|----------|
| Manual UI      | Browser       | Localhost:3000         | Done   |
| API (Manual)   | Postman       | localhost:9999         | Done   |
| Unit Testing   | Jest          | `mockedAPI/__tests__/`           | Done   |
| UI Automation  | Cypress       | `cypress/`             | Done   |

## Testing Strategy & Justification

The frontend login portal provided was in a prototype stage and lacked basic accessibility and automation hooks such as `id`, `class`, or `label` attributes. Additionally, the backend API had multiple issues and inconsistent behavior. Given these constraints, the following strategy was adopted:

###  Manual Testing (Primary Focus)

Manual testing was prioritized to ensure functional coverage and catch UI/API integration issues that automation could miss in an unstable build. Tests included:

- Input validation (empty, invalid, and valid credentials)
- State behavior
- Error message rendering
- UI responsiveness
- API behavior via Postman (positive/negative flows)

# Manual Testing

![Pass Fail Chart](https://quickchart.io/chart?c={type:'pie',data:{labels:['Pass','Fail'],datasets:[{data:[41.9,58.1]}]}})

## Pass/Fail Breakdown
- **Pass Rate**: 41.9%
- **Fail Rate**: 58.1%

---

# API Testing

![Pass Fail Chart](https://quickchart.io/chart?c={type:'pie',data:{labels:['Pass','Fail'],datasets:[{data:[44.8,55.2]}]}})

## Pass/Fail Breakdown
- **Pass Rate**: 44.8%
- **Fail Rate**: 55.2%



Manual test evidence is provided through structured test case documentation.
Detailed notes and results for manual testing can be found here:  
#### [Manual Testing Report (Google Sheets)](https://docs.google.com/spreadsheets/d/1pNWuY_rC9-iMR1zhXWPgXFsl_lDmdcVY/edit?usp=sharing&ouid=106020571511058470684&rtpof=true&sd=true)


### Cypress Automation (Secondary, Placeholder-Based)

While full automation was limited due to missing selectors, Cypress tests were still implemented using available `placeholder` text in the input fields. These tests cover:

- Typing into email/password fields
- Simulating login clicks
- Basic visual checks (page load, redirection)

This demonstrates future readiness for automation once the frontend is stabilized and improved for testability.

### Unit Testing with Jest
To enable API testing with Jest and Supertest, the Express app instance needed to be exported:

```js
// At the end of mockedAPI/index.js 
module.exports = app;
```

This allows Supertest to import the app and send mock HTTP requests:

```js
const supertest = require("supertest");
const app = require("../index.js");
const fs = require("fs");

describe("GET at /", () => {
  test('user should get "Backend API" ', async () => {
    const res = await supertest(app).get("/");

    expect(res.text).toBe("Backend API");
  });
});
```

---

**Note:** Without exporting `app`, Supertest cannot hook into the server instance to perform tests. Hence had to make changes to backend code.


---

### 🔍 Known Issues & Limitations

- Lack of semantic HTML (`label`, `for`, `id`) reduces accessibility and automation reliability
- Lack of responsiveness amongst diverse devices
- API instability led to intermittent failures in automated tests
- No input sanitization or error handling present in current implementation

---

### Future Enhancements

For reliable automation and better test coverage:

- Developers should add `data-testid`, `id`, or `aria-label` attributes to key UI elements
- API endpoints need stable mocks or better contract definitions
- API also needs a lot of validation as currently no validation has been used
- Frontend form logic should handle edge cases (e.g., input validation, empty states)





##  Author

- **Name:** Mohammed Wasik  
- **GitHub:** [@mohammedWasik](https://github.com/mohammedWasik)

