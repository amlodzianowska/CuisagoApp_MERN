const User = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt");

module.exports = app=>{
    app.post("/api/register", User.register)
    app.post("/api/login", User.login)
    app.get("/api/user/loggedin", authenticate, User.loggedinUser)
    app.get("/api/users/logout", User.logout)
    app.get("/api/users/allusers", User.showAll)
    app.get("/api/user/:id", User.findOneUser)
    app.put("/api/users/update/:id", User.updateOneUser)
    app.get("/api/users/delete/:id", User.deleteOneUser)
}
