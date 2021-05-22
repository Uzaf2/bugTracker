const { model, Schema } = require('mongoose');

const commentSchema = new Schema ({
    createdAt: String,
    message: String, 
    commenter: String,
});

module.exports = model ('Comment', commentSchema);