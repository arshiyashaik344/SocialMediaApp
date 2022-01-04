const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');


module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      const { dataSources : { commentMDS }} = context;

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {

        const comment = await commentMDS.createComment({
          body,
          username,
          createdAt : new Date().toISOString(),
          postId : post.id
        });


        context.pubsub.publish('NEW_COMMENT', {
          newComment : comment
        });
  
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      const { dataSources : { postMDS, commentMDS }} = context;

      // const post = await Post.findById(postId);
      const post = await postMDS.getSinglePost(postId);

      if (post) {

        const comments = await commentMDS.getAllComments(postId);
       
        const commentIndex = comments.findIndex((c) => c.id === commentId);

        if (comments[commentIndex].username === username) {
          // post.comments.splice(commentIndex, 1);
          // await post.save();

          const commentId = comments[commentIndex].id;
          await commentMDS.deleteComment(commentId);
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  },
  Subscription: {
    newComment: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_COMMENT')
    }
  }
};
