const { UserInputError } = require('apollo-server');
const Project = require('../../models/project');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const  authorization  = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getProjectsAndUsers(_, { name },) {
            try {
                const index = name -1 ;
                var usersArray = [];
                const projects = await Project.find().sort({ createdAt: -1 });
                const length = projects[index].users.length;
                var userId = 0
                var users = 0;

                for (var i=0;i<length; i++)
               {
                  userId = projects[index].users[i];
                  var usersValue =  await User.findOne( userId );
                  usersArray.push(usersValue);
               }

               return usersArray;
            }
            catch (err) {
                throw new Error(err);
            }
        },
       
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
        async createProject(_, { name, description,  }) {
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
    
                return project;
            }
            catch(err){
                throw new Error(err);
            }
           
        },
         async getProject(_, {projectId},) {
            try {
                const project = await Project.findById(projectId);
                return project;
            }
            catch (err){
                throw new Error (err);
            }
        },
        async assignUser(_, { projectId, userId }) {
            
            //const userObj = authorization(context);
            const project = await Project.findById(projectId);
            console.log("Project", project);
            var flag = false;

            if (userId.match(/^[0-9a-fA-F]{24}$/)) {
                var id = mongoose.Types.ObjectId(userId);
                var list = project.users;

                for (var i = 0; i < project.users.length; i++) {

                    var obj = toString(project.users[i]);
                    var obj2 = toString(id);
                  
                    if (obj.localeCompare(obj2))
                {
                    flag = true;
                }
                }

                if (flag === false) {
                    project.users.push(id);
                }
            }
            
            await project.save();
            
            return project;
        }
    }
};