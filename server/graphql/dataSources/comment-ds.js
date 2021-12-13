const { MongoDataSource } = require('apollo-datasource-mongodb');

class Comments extends MongoDataSource {

    getAllComments(postId) {
        const comments =  this.model.find({ postId : postId }).sort({createdAt : -1});
        return comments;
    }

    createComment(comment = {}) {
        return this.model.create(comment);
    }

    deleteComment(commentId) {
        return this.model.deleteOne({ _id: commentId });
    }

    deleteAllComments(postId) {
        return this.model.deleteMany({ _id : postId });
    }
}

module.exports = Comments;