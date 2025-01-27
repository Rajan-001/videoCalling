const express = require("express")
const bodyParser = require("body-parser")
const { Server } = require("socket.io")

const io = new Server({
  cors: true,
})
const app = express()
app.use(express.json())

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, name } = data
    console.log("User ", name, "Joined Room ", roomId)
    socket.join(roomId)
    socket.emit("joined-room", { roomId })
    socket.broadcast.to(roomId).emit("user-joined", { name })
  })
})

app.listen(8000, () => console.log("Http server running at 8000"))
io.listen(8001)
