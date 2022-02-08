const CommentController = require("../controllers/comment.controller")

module.exports = app => {
    app.post("/api/comments", CommentController.createComment)
    app.get("/api/comment/:id", CommentController.findOneComment)
    app.put("/api/comments/:id", CommentController.updateOneComment)
    app.delete("/api/comments/:id", CommentController.deleteOneComment)
    //show all the Comments that belong to one event
    app.get("/api/comments/event/:eventId", CommentController.findEventComments)
}