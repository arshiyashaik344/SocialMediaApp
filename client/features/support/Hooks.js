/* eslint-disable no-undef */
const fs = require('fs');
const createTestCafe = require('../../../../../../Installers/node-v16.13.0-linux-x64/lib/node_modules/testcafe');
// const createTestCafe = require('gherkin-testcafe');
const TestControllerHolder = require('./TestControllerHolder');
const {
  AfterAll,
  setDefaultTimeout,
  Before,
  After
} = require('@cucumber/cucumber');

const timeOut = 100000;
let cafeRunner = null;

function createTestFile() {
  fs.writeFileSync(
    'cucumbertest.js',
    'import TestControllerHolder from "./features/support/TestControllerHolder.js";\n\n' +
      'fixture("cucumberfixture")\n' +
      'test\n' +
      '("test", TestControllerHolder.capture)'
  );
}

function runTest(browser) {
  createTestCafe('localhost', 1337, 1338).then(function (tc) {
    cafeRunner = tc;
    const runner = tc.createRunner();
    return (
      runner
        .src('./cucumbertest.js')
        // .src(['steps/cucumbertest.js', 'features/Login.feature'])
        .screenshots('reports/screenshots/', true)
        .browsers(browser)
        .run()
    );
  });
}

setDefaultTimeout(timeOut);

Before(function () {
  runTest('chrome');
  createTestFile();
  return this.waitForTestController.then(function (testController) {
    return testController.maximizeWindow();
  });
});

After(function () {
  fs.unlinkSync('cucumbertest.js');
  TestControllerHolder.free();
});

AfterAll(function () {
  // eslint-disable-next-line no-unused-vars
  let intervalId = null;
  function waitForTestCafe() {
    intervalId = setInterval(checkLastResponse, 500);
  }
  function checkLastResponse() {
    if (
      testController.testRun.lastDriverStatusResponse ===
      'test-done-confirmation'
    ) {
      cafeRunner.close();
      process.exit();
    }
  }
  waitForTestCafe();
});
