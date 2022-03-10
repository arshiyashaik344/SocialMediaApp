/* eslint-disable no-undef */
// import { Selector } from 'testcafe';
import { Selector } from 'testcafe';
import { Role } from 'testcafe';

fixture`Getting Started`.page`http://localhost:3000`;

test('Login::Checking with valid creds', async (t) => {
  const userOne = Role('http://localhost:3000/login', async (t) => {
    await t
      .typeText('#user-name', 'arshiyas')
      .typeText('#user-password', 'arshi')
      .click('#login-button');
  });
  await t.useRole(userOne);
});

test('Login::Checking with empty values', async (t) => {
  const errorField = Selector('div').withAttribute(
    'class',
    'ui error message'
  ).exists;
  const errorMessages = {
    username: Selector('li').withText('Username must not be empty').exists,
    password: Selector('li').withText('Password must not be empty').exists
  };
  await t
    .navigateTo('http://localhost:3000/login')
    .typeText('#user-name', ' ')
    .typeText('#user-password', ' ')
    .click('#login-button')
    .expect(errorField)
    .ok()
    .expect(errorMessages.username)
    .ok()
    .expect(errorMessages.password)
    .ok();
});

test('Login::Checking with invalid creds', async (t) => {
  const errorMessages = {
    invalidCreds: Selector('li').withText('Wrong credentials').exists,
    noUser: Selector('li').withText('User not found').exists
  };
  const input = Selector('#user-name');
  await t
    .navigateTo('http://localhost:3000/login')
    .typeText('#user-name', 'arshiyas')
    .typeText('#user-password', 'abcd')
    .click('#login-button')
    .expect(errorMessages.invalidCreds)
    .ok()
    .click(input)
    .pressKey('ctrl+a delete')
    .typeText('#user-name', 'arshiya')
    .typeText('#user-password', 'abcd')
    .click('#login-button')
    .expect(errorMessages.noUser)
    .ok();
});
