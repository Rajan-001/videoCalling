import { useEffect, useState } from "react"
import { useSocket } from "../providers/Socket"
import { useNavigate } from "react-router-dom"

export const Homepage = () => {
  const { socket } = useSocket()
  const [name, setName] = useState()
  const [roomId, setRoomId] = useState()
  const navigate = useNavigate()
  const handleJoinRoom = () => {
    console.log(roomId)
    socket.emit("join-room", { name: name, roomId: roomId })
  }
  const handleRoomJoined = ({ roomId }) => {
    navigate(`/room/${roomId}`)
  }

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined)
  }, [socket])

  return (
    <div className="homepage-container">
      <div>
        <input
          type="text"
          placeholder="Enter Your name here"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Room code"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="border-2 border-indigo-600" onClick={handleJoinRoom}>
          Enter Room
        </button>
      </div>
    </div>
  )
}
