const { UserInputError } = require('apollo-server');
const Comment = require('../../models/comment');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const  authorization  = require('../../utils/check-auth');

module.exports = {
    Query: {
       
    },
    Mutation: {
        async createComment(_, { message }) {
            try {
                const projectValue = await Project.findOne({ name });

                if (projectValue) {
                    throw new UserInputError('Username is taken', {
                        errors: {
                            username: 'This project username is taken'
                        }
                    })
                }
    
                const newProject = new Project({
                    name,
                    description
                })
    
                const project = await newProject.save();
    
                return {
                    ...project._doc,
                    id:project._id,
             };
            }
            catch(err){
                throw new Error(err);
            }
           
        }
    }
};