/* eslint-disable no-undef */
const {
  Selector
} = require('../../../../../../../Installers/node-v16.13.0-linux-x64/lib/node_modules/testcafe');

exports.elements = {
  url: function () {
    return 'http://localost:3000/login';
  },
  userNameField: function () {
    return Selector('#user-name').with({ boundTestRun: testController });
  },
  passwordField: function () {
    return Selector('#user-password').with({
      boundTestRun: testController
    });
  },
  loginButton: function () {
    return Selector('#login-button').with({ boundTestRun: testController });
  },
  postsPage: function () {
    return Selector('a').with({ boundTestRun: testController });
  }
};
