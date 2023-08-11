import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  async function fetchChat() {
    try {
      const response = await axios(
        `/messages/${localStorage.getItem("channelId")}`,
        {
          method: "get",
          headers: {
            Authorization: localStorage.getItem("jwt_token"),
          },
        }
      );
      setChat(response.data.response);
    } catch (err) {
      console.log(err);
      console.log("error occurred");
    }
  }

  useEffect(() => {
    if (socket === null) {
      const socket = io("http://localhost:5000", {
        autoConnect: false,
      });

      socket.connect();
      setSocket(socket);

    }
    fetchChat();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const messageData = {
      message: message,
      channelId: localStorage.getItem("channelId"),
      jwtToken: localStorage.getItem("jwt_token"),
    };

    socket.emit("send_message", messageData);

    setMessage("");
    socket.on("message_created", () => {
      fetchChat();
    });
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  return (
    <>
      <h1>Channel name placeholder</h1>
      {chat.length > 0
        ? chat.map((message) => {
            return (
              <div key={message._id}>
                <p>{message.message}</p>
              </div>
            );
          })
        : null}
      <hr />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="message..."
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
