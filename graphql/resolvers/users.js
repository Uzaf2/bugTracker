const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const { validateLoginInput, validateRegisterInput } = require ('../../utils/validators');

module.exports = {
    Query: {
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

            if(!valid )
            {
                throw new UserInputError ('Error: ',{errors});
            }

            const user = await User.findOne({username});
            
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found',{errors});
            }
            return {
                ...user._doc,
                id:user._id
            };
        }
    }
};