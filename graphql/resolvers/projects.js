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

                var errors={}; 
                errors.username= 'This project username is taken';
                if (projectValue) {
                    throw new UserInputError('Username is taken', {errors})
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
        async assignUser(_, { projectId, userId, name }) {
            
            try {

            const project = await Project.findById(projectId);
            var flag = false;

            var id = mongoose.Types.ObjectId(userId);
            if (userId.match(/^[0-9a-fA-F]{24}$/)) {

                const length = project.users.length;
                for (var i = 0; i < length; i++) {                
                    var obj = mongoose.Types.ObjectId(project.users[i]);
                    if (obj.equals(id))
                    {
                        var errors={}; 
                        throw new UserInputError('User already assigned to the project');
                    }
                    else  {
                        project.users.push(id);
                        }   
                }
            }
            
            if (project.users.length==0)
            {
                    project.users.push(id);
            }
            
            await project.save();

                const index = name -1 ;
                var usersArray = [];
                const projects = await Project.find().sort({ createdAt: -1 });
                const length = projects[index].users.length;
                var userId = 0

                for (var i=0;i<length; i++)
               {
                  userId = projects[index].users[i];
                  var usersValue =  await User.findOne( userId );
                  usersArray.push(usersValue);
               }
               return usersArray;
            }
            catch(err){
                throw new Error(err);
            }
        }
    }
};