const { UserInputError } = require('apollo-server');
const Ticket = require('../../models/ticket');

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');


var mongoose = require('mongoose');

module.exports = {
    Mutation: {
        async createTicket(_,{title,description, assignedProjectInput, assignedDeveloperInput, priority, status, type  }) 
        {
            var assignedProject = [];
            var assignedDeveloper = [];
            var ticketsArray = [];

            const assignedProjectValue = await Project.find({name:assignedProjectInput});

            if (!assignedProjectValue){
                throw new UserInputError('Project name is not present',{
                    errors: {
                        name:'Project name is not present'
                    }
                })
            }

            const assignedDeveloperValue = await User.find({username:assignedDeveloperInput});

            var developerId= mongoose.Types.ObjectId(assignedDeveloperValue[0]._id);
            var projectId = mongoose.Types.ObjectId(assignedProjectValue[0]._id);

            if (!assignedDeveloperValue){
                throw new UserInputError('Developer name is not present',{
                    errors: {
                        name:'Developer name is not present'
                    }
                })
            }          
            
            assignedProject.push(projectId);
            assignedDeveloper.push(developerId);

            const newTicket = new Ticket({
                title,
                description,
                assignedProject,
                assignedDeveloper,
                priority,
                status,
                type,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })

           var ticketId= mongoose.Types.ObjectId(newTicket._id);

           //assignedProjectValue[0].tickets.push(ticketId);

           ticketsArray.push(ticketId);

           await Project.findByIdAndUpdate({_id: projectId},{tickets: ticketsArray});


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
        },
        async getTicketsByProjectId(_,{id})
        {
            const projects = await Project.find().sort({ createdAt: -1 });
            const index = id -1;
            var ticketsArray =[];
            var ticketsIdsArray = [];

            console.log("Index",index);
            const ticketsLength =projects[index].tickets.length;

            console.log("ticketsLength",ticketsLength);
            for (var i=0; i<ticketsLength; i++)
            {
                ticketsIdsArray.push(projects[index].tickets[i]);
            }

            console.log("Tickets Ids", ticketsIdsArray);
            
            for (var i=0;i< ticketsIdsArray.length;i++)
            {
                const ticket = await Ticket.findById(ticketsIdsArray[i]);
                ticketsArray.push(ticket);
            }
            console.log("TicketsArray", ticketsArray);
            return ticketsArray;
        },
    }
};