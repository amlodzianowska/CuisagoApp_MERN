const Neighborhood = require("../models/neighborhood.model")
const neighborhoodRoutes = require("../routes/neighborhood.routes")

class NeighborhoodController {
    createNeighborhood(req, res){
        const neighborhood = new Neighborhood(req.body)
        neighborhood.save()
        .then(newNeighborhood => {
            res.json({results: newNeighborhood})
        })
        .catch(err=>res.json({err}))
    }
    
    findAllNeighborhoods(req,res){
        Neighborhood.find() //these are mongoose built-in methods
            .then(allNeighborhoods =>{
                res.json({results: allNeighborhoods})
            })
            .catch(err=>res.json({err}))
    }

    //watch for _id! (remembre underscore)
    findOneNeighborhood(req, res){
        Neighborhood.findOne({_id:req.params.id})
            .then(foundNeighborhood=>{
                res.json({results: foundNeighborhood})
            })
            .catch(err=>res.json({err}))
    }

    updateOneNeighborhood(req,res){
        Neighborhood.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(foundNeighborhood=>{
                res.json({results: foundNeighborhood})
            })
            .catch(err=>res.json({err}))
    }

    deleteOneNeighborhood(req, res){
        Neighborhood.deleteOne({_id:req.params.id})
            .then(deletedNeighborhood=>{
                res.json({results: deletedNeighborhood})
            })
            .catch(err=>res.json({err}))
    }
}

module.exports = new NeighborhoodController()