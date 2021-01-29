const { model, Schema } = require('mongoose');

const ticketSchema = new Schema ({
    title: String,
    description : String,
    assignedDeveloper: [{
        type: Schema.Types.ObjectId,
        ref: 'assignedDeveloper'
    }],
    submitter: [{
        type: Schema.Types.ObjectId,
        ref: 'submitter'
    }], 
    priority: String,
    status: String,
    type: String, 
    createdAt: String, 
    updatedAt: String
});

module.exports = model ('Ticket', ticketSchema);