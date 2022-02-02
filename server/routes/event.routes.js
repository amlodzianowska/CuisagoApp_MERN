const EventController = require("../controllers/event.controller")

module.exports = app => {
    app.get("/api/events", EventController.findAllEvents)
    app.post("/api/events", EventController.createEvent)
    app.get("/api/events/:id", EventController.findOneEvent)
    app.put("/api/events/:id", EventController.updateOneEvent)
    app.delete("/api/events/:id", EventController.deleteOneEvent)
    //show all the events that belong to one host
    app.get("/api/host/events/:hostid", EventController.findHostEvents)
    app.get("/api/events/neighborhood/:neighborhoodId", EventController.findNeighborhoodEvents)
}
