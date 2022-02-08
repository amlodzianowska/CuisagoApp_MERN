const Guest = require("../models/guest.model")
const guestRoutes = require("../routes/guest.routes")

class GuestController {
    createGuest(req, res){
        const guest = new Guest(req.body)
        guest.save()
        .then(newGuest => {
            res.json({results: newGuest})
        })
        .catch(err=>res.json({err}))
    }

    //watch for _id! (remembre underscore)
    findOneGuest(req, res){
        Guest.findOne({_id:req.params.id})
            .populate("author_id")
            .then(foundGuest=>{
                res.json({results: foundGuest})
            })
            .catch(err=>res.json({err}))
    }

    deleteOneGuest(req, res){
        Guest.deleteOne({_id:req.params.id})
            .then(deletedGuest=>{
                res.json({results: deletedGuest})
            })
            .catch(err=>res.json({err}))
    }

    findEventGuests(req,res){
        Guest.find({event_id:req.params.eventId}) //these are mongoose built-in methods
            .populate("event_id")
            .populate("guest_id")
            .then(eventGuests =>{
                res.json({results: eventGuests})
            })
            .catch(err=>res.json({err}))
    }
}

module.exports = new GuestController()