const { model, Schema } = require('mongoose');

const commentSchema = new Schema ({
    createdAt: String,
    message: String, 
    commenter: [{
        type: Schema.Types.ObjectId,
        ref: 'commenter'
    }],
});

module.exports = model ('Comment', projectSchema);