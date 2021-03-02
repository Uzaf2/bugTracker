const { model, Schema } = require('mongoose');
// There should be an array of assigned Tickets and ticketsCreated
// There should be an array of associated Projects as well
const userSchema = new Schema ({
    username: String,
    password : String,
    email: String, 
    creationTime: String,
    role: String,
    access: String,
    assignedTickets:[{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    ticketsCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    associatedProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]

});

module.exports = model ('User', userSchema);