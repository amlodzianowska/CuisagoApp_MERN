const NeighborhoodController = require("../controllers/neighborhood.controller")

module.exports = app => {
    app.get("/api/neighborhoods", NeighborhoodController.findAllNeighborhoods)
    app.post("/api/neighborhoods", NeighborhoodController.createNeighborhood)
    app.get("/api/neighborhoods/:id", NeighborhoodController.findOneNeighborhood)
    app.put("/api/neighborhoods/:id", NeighborhoodController.updateOneNeighborhood)
    app.delete("/api/neighborhoods/:id", NeighborhoodController.deleteOneNeighborhood)

}