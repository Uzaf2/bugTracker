const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: String,
    password : String,
    email: String, 
    creationTime: String,
    role: String,
    access: String
});

module.exports = model ('User', userSchema);