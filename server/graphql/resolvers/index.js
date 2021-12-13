const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');


module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    
    comments: async (parent, _, {dataSources : { commentMDS }}) => {
      const comments = await commentMDS.getAllComments( parent._id);
      if (comments.length === 0 ) {
        return [];
      }
      return comments;
    } ,

    commentCount: async (parent, _, {dataSources : { commentMDS }}) => {
      const comments = await commentMDS.getAllComments( parent._id);
      return comments.length;
    }
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};
