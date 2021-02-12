const { model, Schema } = require('mongoose');

const projectSchema = new Schema ({
    name: String,
    description: String, 
    users: [{
        username: String, 
        email: String, 
        role: String
    }],
    tickets: [{
        title: String,
        description: String, 
        assignedDeveloper: String, 
        submitter: String,
        priority: String, 
        status: String,
        type: String,
        createdAt: String,
        updatedAt:String
    }]
});

module.exports = model ('Project', projectSchema);