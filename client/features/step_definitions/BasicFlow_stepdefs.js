/* eslint-disable no-undef */
const { When, Then } = require('@cucumber/cucumber');

const postsPage = require('../support/pages/BasicFlow_pageObjects');

When('user creates a post named {string}', async function (string) {
  const postName = postsPage.elements.postNameField();
  await testController.typeText(postName, string);
});

When('user clicks on Submit button', async function () {
  const submitBtn = postsPage.elements.funcButton().withText('Submit');
  await testController.click(submitBtn);
});

When('user likes the post', async function () {
  const likeBtn = postsPage.elements
    .likeIcon()
    .withAttribute('class', 'heart icon');
  await testController.click(likeBtn);
});

When('user goes to the single post page', async function () {
  const singlePost = postsPage.elements
    .singlePostNav()
    .withAttribute('class', 'meta');
  await testController.click(singlePost);
});

When('user comments on the post as {string}', async function (string) {
  const commentField = postsPage.elements.commentNameField();
  await testController.typeText(commentField, string);
});

When('user clicks on Submit button in comment form', async function () {
  const submitBtn = postsPage.elements
    .funcButton()
    .withAttribute('class', 'ui button teal');
  await testController.click(submitBtn);
});

Then(
  'posts page gets updated with the new post {string}',
  async function (string) {
    const newPost = postsPage.elements
      .recentPostOrComment()
      .withText(string).exists;
    await testController.expect(newPost).ok();
  }
);

Then('new comment {string} appears on the page', async function (string) {
  const newComment = postsPage.elements
    .recentPostOrComment()
    .withText(string).exists;
  await testController.expect(newComment).ok();
});
