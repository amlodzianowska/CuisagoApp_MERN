const Comment = require("../models/comment.model")
const commentRoutes = require("../routes/comment.routes")

class CommentController {
    createComment(req, res){
        const comment = new Comment(req.body)
        comment.save()
        .then(newComment => {
            res.json({results: newComment})
        })
        .catch(err=>res.json({err}))
    }

    //watch for _id! (remembre underscore)
    findOneComment(req, res){
        Comment.findOne({_id:req.params.id})
            .populate("author_id")
            .then(foundComment=>{
                res.json({results: foundComment})
            })
            .catch(err=>res.json({err}))
    }

    updateOneComment(req,res){
        Comment.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(foundComment=>{
                res.json({results: foundComment})
            })
            .catch(err=>res.json({err}))
    }

    deleteOneComment(req, res){
        Comment.deleteOne({_id:req.params.id})
            .then(deletedComment=>{
                res.json({results: deletedComment})
            })
            .catch(err=>res.json({err}))
    }

    findEventComments(req,res){
        Comment.find({event_id:req.params.eventId}) //these are mongoose built-in methods
            .populate("event_id")
            .populate("author_id")
            .then(eventComments =>{
                res.json({results: eventComments})
            })
            .catch(err=>res.json({err}))
    }
}

module.exports = new CommentController()