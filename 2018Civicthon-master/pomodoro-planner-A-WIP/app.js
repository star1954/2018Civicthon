//importing and establishing the express (router) object
express = require("express")
var app = express()

app.use(express.static("js"))
app.use(express.static("public"))

//defining the index site function
app.get("/", function (req, res) {
  console.log("serving up the index")
  res.sendFile(__dirname + "/html/index.html")
})

//starting the server
var server = app.listen(3000, function() {
  console.log("Pomodoro Planner is listening on port 3000!")
})