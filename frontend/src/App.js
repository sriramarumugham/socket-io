import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import io, { Socket } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const user=nanoid(5);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat" , {message:message , user:user});
    setMessage("");
  }
useEffect(()=>{
  socket.on('chat' , (payload)=>{
    setChat([...chat , payload])
  })
})

  return (
    <div className="App">

      {chat.map((payload , index)=>{
        return <p key={index}> {payload.message} : <span>id: {payload.user}</span> </p>
      })}
      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="sent text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
