const Event = require("../models/event.model")
const eventRoutes = require("../routes/event.routes")

class EventController {
    createEvent(req, res){
        const event = new Event(req.body)
        event.save()
        .then(newEvent => {
            res.json({results: newEvent})
        })
        .catch(err=>res.json({err}))
    }
    
    findAllEvents(req,res){
        Event.find() //these are mongoose built-in methods
            .then(allEvents =>{
                res.json({results: allEvents})
            })
            .catch(err=>res.json({err}))
    }
    // createEvent(req, res){
    //     Event.create(req.body)
    //         .then(newEvent => {
    //             res.json({results: newEvent})
    //         })
    //         .catch(err=>res.json({err}))
    // }

    //watch for _id! (remembre underscore)
    findOneEvent(req, res){
        Event.findOne({_id:req.params.id})
            .populate("host_id")
            .then(foundEvent=>{
                res.json({results: foundEvent})
            })
            .catch(err=>res.json({err}))
    }

    updateOneEvent(req,res){
        Event.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(foundEvent=>{
                res.json({results: foundEvent})
            })
            .catch(err=>res.json({err}))
    }

    deleteOneEvent(req, res){
        Event.deleteOne({_id:req.params.id})
            .then(deletedEvent=>{
                res.json({results: deletedEvent})
            })
            .catch(err=>res.json({err}))
    }

    findHostEvents(req,res){
        Event.find({host_id:req.params.hostid}) //these are mongoose built-in methods
            .populate("host_id", "username")
            .then(hostsEvents =>{
                res.json({results: hostsEvents})
            })
            .catch(err=>res.json({err}))
    }
}

module.exports = new EventController()