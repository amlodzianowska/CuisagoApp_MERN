const GuestController = require("../controllers/guest.controller")

module.exports = app => {
    app.post("/api/guests", GuestController.createGuest)
    app.get("/api/guest/:id", GuestController.findOneGuest)
    app.delete("/api/guests/:id", GuestController.deleteOneGuest)
    //show all the guests that belong to one event
    app.get("/api/guests/event/:eventId", GuestController.findEventGuests)
}