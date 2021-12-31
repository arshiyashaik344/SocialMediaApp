const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts(_, __, { dataSources : { postMDS } }) {
      try {
        // const posts = await Post.find().sort({ createdAt: -1 });
        const posts = await postMDS.getAllPosts();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }, {dataSources : { postMDS }}) {
      try {
        // const post = await Post.findById(postId);
        const post = await postMDS.getSinglePost(postId);

        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const { dataSources : { postMDS }} = context;

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = {
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      };

      // const post = await newPost.save();
      const post = await postMDS.createPost(newPost);

      context.pubsub.publish('NEW_POST', {
        newPost: post
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      const { dataSources : { postMDS, commentMDS }} = context;
      try {
        // const post = await Post.findById(postId);
        const post = await postMDS.getSinglePost(postId);

        if (user.username === post.username) {
          // await post.delete();
          await postMDS.deletePost(postId);
          await commentMDS.deleteAllComments(postId);
          // return 'Post deleted successfully';
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const { dataSources : { postMDS }} = context;

      // const post = await Post.findById(postId);
      const post = await postMDS.getSinglePost(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        // await post.save();
        await postMDS.likePost(post);
        return post;
      } else throw new UserInputError('Post not found');
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};
