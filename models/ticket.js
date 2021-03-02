const { model, Schema } = require('mongoose');

const ticketSchema = new Schema ({
    title: String,
    description : String,
    assignedDeveloper: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }],
    submitter: [{
        type: Schema.Types.ObjectId,
        ref: 'Submitter'
    }], 
    priority: String,
    status: String,
    type: String, 
    createdAt: String, 
    updatedAt: String
});

module.exports = model ('Ticket', ticketSchema);