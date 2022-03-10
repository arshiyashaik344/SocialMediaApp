var reporter = require('cucumber-html-reporter');
var options = {
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    Title: 'Sample Report',
    Browser: 'chrome',
    Platform: 'Linux'
  }
};
reporter.generate(options);
