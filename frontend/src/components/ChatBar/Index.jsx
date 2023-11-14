/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
export default function Chat({ setOpenChatTab, socket }) {
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setChat((prevChat) => [...prevChat, data])
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
        //   console.log(message)
        setChat((prevChat) => [...prevChat, {message, name: "You"}])
        socket.emit('message', {message})
        setMessage("");
    }
    
  }

  return (
    <div>
      <div
        className="position-fixed top-0 h-100 text-white bg-dark"
        style={{ width: '400px', left: '0%', padding: '5px' }}
      >
        <button
          type="button"
          onClick={() => setOpenChatTab(false)}
          className="btn btn-light btn-block w-100 mt-5"
        >
          Close
        </button>
        <div
          className="w-100 mt-5 p-2 border border-1 border-white rounded-3"
          style={{ height: '70%' }}
        >
          {
            chat?.map((msg, index) => (

                <p key={index* 999} className="my-2 text-center w-100" >
              
                    {msg.name}: {msg.message}
                </p>
            ))
          }
        </div>
        <form className="w-100 mt-4  d-flex  rounded-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-100 border-0 rounded-0 py-2 px-4"
            style={{ width: '90%' }}
          />
          <button type="submit" className="btn btn-primary rounded-0">
            send
          </button>
        </form>
      </div>
    </div>
  )
}
