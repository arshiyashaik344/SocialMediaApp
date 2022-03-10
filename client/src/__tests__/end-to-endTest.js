/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { Selector,ClientFunction } from 'testcafe';
import { Selector,ClientFunction,Role } from 'testcafe';

fixture`Getting Started`.page`http://localhost:3000`;

test('tested entire flow of the application', async (t) => {
  // Test code
  const postsExists = Selector('div').withAttribute('class','ui three column grid').exists;
  const postForm = Selector('#post-form').exists;
  const heading = Selector('h1').withText('Recent Posts').exists;
  const user = Selector('#user');
  const getUserName = ClientFunction(() =>user().innerHTML, { dependencies: {user} });
  const singlePostPage = Selector('#single-post').exists;
  const CommentForm = Selector('#comment-form').child('Form');

  // *** done some trials (19-22) ***
  // const likePost = Selector('Card').withText('RK Mart').child('Button');
  // const postToBeLiked = Selector('div').withText('McDonalds');
  // console.log(postToBeLiked);
  // const likePost = postToBeLiked.child('i').withAttribute('class','heart icon');
  
  const deletePost = Selector('i').withAttribute('class','trash icon');
  const okButton = Selector('button').withText('OK');
  const logOut = Selector('a').withText('Logout');
  const userOne = Role('http://localhost:3000/login', async (t) => {
    await t
      .typeText('#user-name', 'arshiyas')
      .typeText('#user-password', 'arshi')
      .click('#login-button');
  });

  await t
    .expect(heading).ok()
    .expect(postsExists).ok()
    .click('#pagination')
    .useRole(userOne)
    .expect(getUserName()).contains('Arshiyas')
    .expect(heading).ok()
    .expect(postsExists).ok()
    .click(deletePost)
    .click(okButton)
    .expect(postForm).ok()
    .typeText('#post-name', 'MoonLight')
    .click('#post-submit-button')
    .expect(postsExists).ok()
    .click('#like-post')
    .click('#post-id')
    .expect(singlePostPage).ok()
    .click(CommentForm)
    .typeText('#comment-name', 'Tasty food')
    .click('#comment-submit-button')
    .expect(singlePostPage).ok()
    .useRole(Role.anonymous());
    // .click(logOut);
});
