const { UserInputError } = require('apollo-server');
const Ticket = require('../../models/ticket');

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');


var mongoose = require('mongoose');

module.exports = {
    Mutation: {
        async createTicket(_,{title,description, assignedProject, assignedDeveloper, priority, status, type  }) 
        {
            console.log("title", title);
            console.log("description", description);
            console.log("assignedProject", assignedProject);
            console.log("assignedDeveloper", assignedDeveloper);
            console.log("priority", priority);
            console.log("status", status);
            console.log("type", type);


            //const ticketValue  = await Ticket.findOne({name});
            
            /*if (ticketValue){
                throw new UserInputError('name of the ticket is already taken',{
                    errors: {
                        name:'This ticket username is already taken'
                    }
                })
            }
            */
            
            //console.log("AssignedProject", assignedProject);
            const assignedProjectValue = await Project.find({name:assignedProject});
             
            if (!assignedProjectValue){
                throw new UserInputError('Project name is not present',{
                    errors: {
                        name:'Project name is not present'
                    }
                })
            }
            
           // console.log("Project", assignedProjectValue[0]._id);

            const projectId =  assignedProjectValue[0]._id;

            //console.log("AssignedDeveloper", assignedDeveloper);
            const assignedDeveloperValue = await User.find({username:assignedDeveloper});

            if (!assignedDeveloperValue){
                throw new UserInputError('Developer name is not present',{
                    errors: {
                        name:'Developer name is not present'
                    }
                })
            }
            
           // console.log("Developer", assignedDeveloperValue[0]._id);

            const developerId = assignedDeveloperValue[0]._id;
            
            
            const newTicket = new Ticket({
                title,
                description,
                projectId,
                developerId,
                priority,
                status,
                type,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })

            const ticket = await newTicket.save();
           return ticket;
        }
    },
    Query: {
        async getTickets(_,{ }) 
        {
            try{
                const tickets = await Ticket.find().sort({ createdAt: -1 });
                return tickets;
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};