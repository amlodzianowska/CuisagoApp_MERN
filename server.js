const express = require("express");
const cors = require("cors")
const cookies = require("cookie-parser")

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) //this allows the express application to share resources and information with the front end
app.use(cookies());


require("./server/config/mongoose.config");
require("./server/routes/user.routes")(app)
require("./server/routes/event.routes")(app)
require("./server/routes/neighborhood.routes")(app)

app.listen(port, ()=>console.log(`listening on port ${port}`))