const { UserInputError } = require('apollo-server');
const Comment = require('../../models/comment');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const Ticket = require('../../models/ticket');
const tickets = require('./tickets');
const  authorization  = require('../../utils/check-auth');

module.exports = {
    Query: {
       async getCommentsByTicketId(_,{id})
       {
        try {
            var comments = [];
            var commentsArray = [];
            const tickets = await Ticket.find().sort({ createdAt: -1 });
   
            var length = tickets[id-1].comments.length;
 
            for (var i=0;i<length;i++)
            {
                comments.push(tickets[id-1].comments[i]);
            }

            for (var i=0;i< comments.length;i++)
            {
              
                const commentsObj = await Comment.findById(comments[i]);
                //console.log("Commenter Obj", commentsObj._id);
                //const commenterObj = await User.findById(mongoose.Types.ObjectId(commentsObj._id));
                console.log("Comments Obj", commentsObj);
                commentsArray.push(commentsObj);
            }
        
            return commentsArray;
           
        }
        catch (err) {
            throw new Error(err);
        }
       }
    },
    Mutation: {
        async createComment(_, { message, id }, context) {
            try {
                const user = authorization(context);
                console.log("user: ", user);

                const ticket = await Ticket.findById(id);

                console.log("Comment user", user);
                const newComment = new Comment({
                    message,
                    createdAt: new Date().toISOString(),
                    commenter: user.username
                })

                const comment = await newComment.save();
                ticket.comments.push(comment._id);
                await ticket.save();
                
                console.log("Comment", comment);
                return {
                    ...comment._doc,
                    id: comment._id,
                  };
            }
            catch(err){
                throw new Error(err);
            }
           
        }

    }
};