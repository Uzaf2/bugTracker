const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { validateLoginInput, validateRegisterInput } = require ('../../utils/validators');

var mongoose = require('mongoose');
const { UniqueArgumentNamesRule } = require('graphql');
const { SECRET_KEY } = require ('../../config');
const jsonwebtoken = require('jsonwebtoken');

function generateToken(user){

return jwt.sign ({
    role: user.role,
    id: user.id,
    email: user.email,
    username: user.username
},
SECRET_KEY, {
    expiresIn: '1h'
});
}

module.exports = {
    Query: {
        async getUserMultiple(_,{users},)
        {
            try {
                var list = [];
                for (var i=0; i< users.length; i++)
                {
                    var id = mongoose.Types.ObjectId(users[i].name);
                    const user = await User.findById(id);
                    list.push(user);
                }

                return list;
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getUsers(_, {},) {
            try {
                const users = await User.find().sort({createdAt : -1});
                return users;
            }
            catch(err){
                throw new Error (err);
            }
        }
    }, 
    Mutation: {
        async getUser(_,{userId},){
            try {
              
                const user = await User.findById(userId);
                return user;
            }
            catch (err) {
                throw new Error (err);
            }
        },
        async demoLogin(_,{role})
        {
            var username = "admin";
            const user = await User.findOne({username});
            user.role = role;
            await user.save();

            const token = generateToken(user);
            return {
                ...user._doc,
                id:user._id,
                token
         };
        },
        async register (_, { registerInput: { username, email, password, confirmPassword }}) {

           const { errors, valid } = validateRegisterInput(username,email, password, confirmPassword);
           if (!valid) {
               throw new UserInputError('Error: ', {errors});
           }
            const user = await User.findOne({username});
            if (user) {
                throw new UserInputError('This Username is already taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                }
                )
            }

            const newUser = new User({
                username,
                email,
                password,
                creationTime: new Date().toISOString(),
                role: "None",
                access: "None"
              });

              const res = await newUser.save();

              return {
                ...res._doc,
                id: res._id,
              };
        },
        
        async login (_, {username, password}) {

            const {errors, valid} = validateLoginInput(username, password);

            if(!valid)
            {
                throw new UserInputError ('Error: ',{errors});
            }

            const user = await User.findOne({username});
            
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found',{errors});
            }

            const token = generateToken(user);
       
            return {
                ...user._doc,
                id:user._id,
                token
            };
        },
        async assignRole(_, {name, role}){
            try {

            const userObj = await User.findOneAndUpdate({username:name}, {role, role});

            await userObj.save();        
            const users = await User.find().sort({createdAt : -1});
            return users;
            
        }
        catch(err){
            throw new Error (err);
        }
        }
    }
};