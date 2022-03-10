/* eslint-disable no-undef */
const { Given, When, Then } = require('@cucumber/cucumber');

const loginPage = require('../support/pages/Login_pageObjects');

Given('user navigates to the login form page', async function () {
  await testController.navigateTo('http://localhost:3000/login');
});

When('user enters {string} in the userName field', async function (string) {
  const userName = loginPage.elements.userNameField();
  await testController.typeText(userName, string);
});

When('user enters {string} in the Password field', async function (string) {
  const password = loginPage.elements.passwordField();
  await testController.typeText(password, string);
});

When('user clicks on Login button', async function () {
  const login = loginPage.elements.loginButton();
  await testController.click(login);
});

Then('posts page with userName {string} appears', async function (string) {
  const user = loginPage.elements.postsPage();
  const name = user.withText(string).exists;
  await testController.expect(name).ok();
});

// When('posts page with userName {string} appears', async function (string) {
//   const user = loginPage.elements.postsPage();
//   const name = user.withText(string).exists;
//   await testController.expect(name).ok();
// });
