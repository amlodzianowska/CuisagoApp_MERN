const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

class UserController {
    register(req, res){
        const user = new User(req.body)
        user.save()
            .then(()=>{
                res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                .json({msg: "successfully created user", user:user})
            })
            .catch(err => res.json(err));
    }

    login(req, res){
        User.findOne({email: req.body.email})
            .then(user=>{
                if(user === null){
                    res.json({msg: "Invalid login attempt: user not found!"})
                } else{
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid=>{
                            if(passwordIsValid){
                                res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly:true})
                                .json({msg: "success"});
                            }else{
                                res.json({msg: "Invalid login attempt!"})
                            }
                        })
                        .catch({msg: "Invalid login attempt!"})
                }
            })
            .catch(err=> res.json(err))
    }

    
    loggedinUser(req,res){
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        User.findById(decodedJWT.payload._id)
        .then(user=>res.json({user}))
        .catch(err=>res.json(err))
    }
    
    logout(req,res){
        res.cookie("usertoken", jwt.sign({_id:""}, secret), {
            httpOnly:true,
            maxAge: 0
        }).json({msg: "logged out user"})
    }
    
    showAll(req, res){
        User.find() //these are mongoose built-in methods
        .then(allUsers =>{
            res.json({results: allUsers})
        })
        .catch(err=>res.json({err}))
    }
    
    findOneUser(req, res){
        User.findOne({_id:req.params.id})
            .then(foundUser=>{
                res.json({results: foundUser})
            })
            .catch(err=>res.json({err}))
    }
    
    updateOneUser(req,res) {
        User.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then(foundUser=>{
                res.json({results: foundUser})
            })
            .catch(err=>res.json({err}))
    }
    
    deleteOneUser(req, res){
        User.deleteOne({_id:req.params.id})
            .then(deletedUser=>{
                res.json({results: deletedUser})
            })
            .catch(err=>res.json({err}))
    }

}

module.exports = new UserController()
