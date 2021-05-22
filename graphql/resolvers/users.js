const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { validateLoginInput, validateRegisterInput } = require ('../../utils/validators');

var mongoose = require('mongoose');
const { UniqueArgumentNamesRule } = require('graphql');
const { SECRET_KEY } = require ('../../config');
const jsonwebtoken = require('jsonwebtoken')

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
                console.log("userId", userId);
                const user = await User.findById(userId);
                return user;
            }
            catch (err) {
                throw new Error (err);
            }
        },
        async demoLogin(_,{})
        {
            var username = "usman";
            const user = await User.findOne({username});
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
                throw new UserInputError('Username is taken', {
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
            console.log("Token in the login", token);
            return {
                ...user._doc,
                id:user._id,
                token
            };
        },
        async assignRole(_, {name, role}){
            try {
            //console.log("Values in the AssignRole function", name,"Role :", role);

            const userObj = await User.findOneAndUpdate({username:name}, {role, role});
            //console.log("UserObj", userObj[0].role);
            //userObj[0].role.push(role);

            //console.log("UserObj",userObj.assignedTickets);

            /*
            const assignedTickets = userObj[0].assignedTickets;
            const ticketsCreated = userObj[0].ticketsCreated;
            const associatedProjects = userObj[0].associatedProjects;
            const _id = userObj[0]._id;
            const email = userObj.email;
            const password = userObj.password;
            const creationTime = userObj.creationTime;
            const roleValue = role;
            const username = userObj[0].username;
            const access = userObj[0].access;

            console.log("UserObj", userObj);

        
            const newUser = new User({
                _id,
                username,
                email,
                password,
                creationTime,
                roleValue,
                access
              });
              
              */

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