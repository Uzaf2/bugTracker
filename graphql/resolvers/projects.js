const { UserInputError } = require('apollo-server');
const Project = require('../../models/project');

module.exports= {
    Query: {
        async getProjects(_, {},){
            try {
                const projects = await Project.find().sort({createdAt:-1});
                return projects;
            }
            catch(err)
            {
                throw new Error(err);
            }
        }
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
};