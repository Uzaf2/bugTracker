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
            var comments = [];

           
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
                comments,
                type,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })

        var ticketId= mongoose.Types.ObjectId(newTicket._id);
        const project = await Project.findById(projectId);

        for (var i=0;i<project.tickets.length;i++)
        {
            ticketsArray.push(project.tickets[i]);
        }

        ticketsArray.push(ticketId);
        await Project.findByIdAndUpdate({_id: projectId},{tickets: ticketsArray});
        const ticket = await newTicket.save();

        return ticket;
        },
        async updateTicket(_,{id, title,description, assignedProjectInput, assignedDeveloperInput, priority, status, type  }) 
        {
            const tickets = await Ticket.find().sort({ createdAt: -1 });
                
            const project = await Project.find({name:assignedProjectInput});
            const developer = await User.find({username:assignedDeveloperInput});


            var projectArray = [];
            var developerArray = [];
            projectArray.push(mongoose.Types.ObjectId(project[0]._id));
            developerArray.push(mongoose.Types.ObjectId(developer[0]._id));
            const ticketId = tickets[id-1]._id;
            const ticketObj = await Ticket.findById(ticketId);

            await Ticket.findByIdAndUpdate({_id: ticketId},{title: title,
            description: description,assignedProject:projectArray,assignedDeveloper: developerArray,priority: priority, status: status,
            type: type});

            return tickets[id-1];
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
        },  async getTicketById(_,{ id }) 
        {
            try {
                const tickets = await Ticket.find().sort({ createdAt: -1 });
                return tickets[id-1];
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

            const ticketsLength =projects[index].tickets.length;

            for (var i=0; i<ticketsLength; i++)
            {
                ticketsIdsArray.push(projects[index].tickets[i]);
            }

            for (var i=0;i< ticketsIdsArray.length;i++)
            {
                const ticket = await Ticket.findById(ticketsIdsArray[i]);
                ticketsArray.push(ticket);
            }
            return ticketsArray;
        },
    }
};