const { model, Schema } = require('mongoose');

const projectSchema = new Schema ({
    name: String,
    description: String, 
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

module.exports = model ('Project', projectSchema);