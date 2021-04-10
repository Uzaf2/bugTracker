const { model, Schema } = require('mongoose');

const ticketSchema = new Schema ({
    title: String,
    description : String,
    assignedProject: [{
        type: Schema.Types.ObjectId,
        ref: 'AssignedProject'
    }],
    assignedDeveloper: [{
        type: Schema.Types.ObjectId,
        ref: 'AssignedDeveloper'
    }], 
    priority: String,
    status: String,
    type: String, 
    createdAt: String, 
    updatedAt: String
});

module.exports = model ('Ticket', ticketSchema);