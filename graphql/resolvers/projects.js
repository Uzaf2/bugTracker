const { UserInputError } = require('apollo-server');
const Project = require('../../models/project');

module.exports= {
    Query: {

    },
    Mutation: {
        async createProject(_,{ name, description}) {
            const projectValue = await Project.findOne({name});

            if(projectValue) {
                throw new UserInputError('Username is taken',{
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

            return project;
        }
    }
}