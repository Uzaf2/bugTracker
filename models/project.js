const { model, Schema } = require('mongoose');

const projectSchema = new Schema ({
    name: String,
    description: String, 
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'ticket'
    }]
});

module.exports = model ('Project', projectSchema);