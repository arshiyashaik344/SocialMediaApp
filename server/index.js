const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { PubSub } = require('graphql-subscriptions');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const UserMDS = require('./graphql/dataSources/user-ds');
const PostMDS = require('./graphql/dataSources/post-ds');
const CommentMDS = require('./graphql/dataSources/comment-ds');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  dataSources: () => ({
    userMDS : new UserMDS(User),
    postMDS : new PostMDS(Post),
    commentMDS : new CommentMDS(Comment)
  })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected ');
    console.log('MongoDB String : ' , MONGODB);
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
