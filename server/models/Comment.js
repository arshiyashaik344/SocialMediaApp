const { model, Schema } = require('mongoose');


const commentSchema = new Schema ({
    body : String ,
    username : String ,
    createdAt : String,
    postId : {
        type : Schema.Types.ObjectId,
        ref : 'posts'
    }

});


module.exports = model( 'Comment', commentSchema );