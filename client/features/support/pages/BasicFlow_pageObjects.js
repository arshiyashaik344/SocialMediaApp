/* eslint-disable no-undef */
const {
  Selector
} = require('../../../../../../../Installers/node-v16.13.0-linux-x64/lib/node_modules/testcafe');

exports.elements = {
  postNameField: function () {
    return Selector('#post-name').with({ boundTestRun: testController });
  },
  funcButton: function () {
    return Selector('button').with({ boundTestRun: testController });
  },
  likeIcon: function () {
    return Selector('i').with({ boundTestRun: testController });
  },
  singlePostNav: function () {
    return Selector('a').with({ boundTestRun: testController });
  },
  recentPostOrComment: function () {
    return Selector('div').with({ boundTestRun: testController });
  },
  commentNameField: function () {
    return Selector('#comment-name').with({ boundTestRun: testController });
  }
};
