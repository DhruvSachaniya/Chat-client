import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CryptoJS from "crypto-js";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  function fetchChat(socket) {
    console.log("Fetching chat");
    if (socket) {
      const channelId = localStorage.getItem("channelId");
      if (channelId !== undefined) {
        console.log("Fetching messages");
        socket.emit("fetch_messages", {
          channelId: channelId,
        });
      } else {
        console.log("Channel id not found!");
      }
    } else {
      console.log("Socket not found");
    }
  }

  useEffect(() => {
    if (socket === null) {
      const newSocket = io("http://localhost:5000", {
        auth: {
          token: localStorage.getItem("jwt_token"),
        },
      });
      console.log(`token sent ${newSocket.auth.token}`);
      newSocket.on("connect", () => {
        console.log("Connected");
        setSocket(newSocket);
        fetchChat(newSocket);

        newSocket.on("messages_fetched", (data) => {
          console.log(data.messages);
          for (let i = 0; i < data.messages.length; i++) {
            const encryptedMessage = data.messages[i].message;

            try {
              const decryptedBytes = CryptoJS.AES.decrypt(
                encryptedMessage,
                "secret-key"
              );
              const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
              data.messages[i].message = decryptedText;
            } catch (error) {
              console.error("Decryption Error:", error);
            }
          }
          console.log("Message fetched, console logging from useEffect");
          setChat(data.messages);
        });

        newSocket.on("message_created", () => {
          console.log("message created, console.logging from useEffect");
          fetchChat(newSocket);
        });

        return () => {
          console.log("turnning off sockets");
          newSocket.off("messages_fetched");
          newSocket.off("message_created");
          newSocket.disconnect();
        };
      });
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(socket);
    const messageData = {
      message: message,
      channelId: localStorage.getItem("channelId"),
    };

    socket.emit("send_message", messageData);

    setMessage("");
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
