import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import io, { Socket } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat=(e)=>{
    e.preventDefault();
    socket.emit("chat" , message);
    setMessage("");
  }


  return (
    <div className="App">
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
