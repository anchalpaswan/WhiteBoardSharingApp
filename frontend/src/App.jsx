import { Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {ToastContainer, toast} from "react-toastify";
import io from 'socket.io-client'
import './App.css'

import Forms from './components/Forms/index'
import RoomPage from './pages/RoomPage'

const server = "http://localhost:5000";
const connectionOptinos = {
  "force new connection" : true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptinos)
function App() {

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("userJoined");// data will send success message and users 
        setUsers(data.users)
       
      } else {
        console.log("userJoined failed");
      }
    })

    socket.on("allUsers", (data) => {
      setUsers(data);
    })

    socket.on("userJoinedMessageBroadcasted", (data) => {
      toast.info(`${data} joined the room`)
    })
    socket.on("disconnect", (data) => {
      toast.info(`${data} left the room`)
    })
    
    
  }, [])
  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (
      S4() +
      S4() +
      '_' +
      S4() +
      '_' +
      S4() +
      '_' +
      S4() +
      '_' +
      S4() +
      S4() +
      S4()
    )
  }
  return (
    <div className="container">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users}/>} />
      </Routes>
    </div>
  )
}

export default App
