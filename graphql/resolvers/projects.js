const { UserInputError } = require('apollo-server');
const Project = require('../../models/project');
var mongoose = require('mongoose');
module.exports = {
    Query: {
        async getProjects(_, { },) {
            try {
                const projects = await Project.find().sort({ createdAt: -1 });
                return projects;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createProject(_, { name, description }) {
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

            return project;
        },
        async assignUser(_, { projectId, userId }) {
            const project = await Project.findById(projectId);
            var flag = false;
            //console.log("List of objects", list[0]);
            //console.log("Length", project.users.length);

            console.log("Value of: ",typeof project.users[0]);

            if (userId.match(/^[0-9a-fA-F]{24}$/)) {
                var id = mongoose.Types.ObjectId(userId);
                var list = project.users;

                for (var i = 0; i < project.users.length; i++) {

                    var obj = toString(project.users[i]);
                    var obj2 = toString(id);
                    if (obj === obj2) {
                       // console.log("Project id:", project.users[i]);
                       // console.log("Given id:", id);
                        flag = true;
                    }
                }

                console.log("flag", flag);
                if (flag === false) {
                    project.users.push(id);
                }
            }
            
            await project.save();
            return project;
        }
    }
};