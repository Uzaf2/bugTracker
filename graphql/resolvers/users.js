const User = require('../../models/User');

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
        }
    }
};