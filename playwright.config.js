// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */ const env = require("dotenv").config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /*[
    [
      "monocart-reporter",
      {
        name: "My Test Report",
        outputFile: "./test-results/report.html",
      },
    ],
  ],*/
  reporter: "./custom-reporter.js",

  testIgnore: "**.skip.**.js",
  testMatch: "**.e2e.js",
  //outputDir: "playwright-results",
  //timeout: 60 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    headless: false,
    baseURL: process.env.BASE_URL,
    //httpCredentials: {
    username: process.env.USER,
    password: process.env.PASS,
    //},
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    /*{
      name: "smoke",
      // testDir: './tests/smoke',
      // testMatch: '**.smoke.e2e.ts',
      grep: new RegExp("@smoke"),
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
        viewport: {
          width: 400,
          height: 300,
        },
      },
    },*/
    {
      name: "qauto",
      testMatch: "**.e2e.js",
      use: {
        headless: false,
        ...devices["Desktop Chrome"],
        //baseURL: "https://qauto.forstudy.space/",
        /*httpCredentials: {
          username: "guest",
          password: "welcome2qauto",
        },*/
      },
    },
    /* {
      name: "regression",
      testDir: "./tests-examples/regression",
      testMatch: "**.e2e.js",
      //grep: new RegExp("@regression"),
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
