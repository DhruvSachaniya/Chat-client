import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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
    fetchChat();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios("/messages", {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        message: message,
        channelId: localStorage.getItem("channelId"),
      }),
    });
    
    setMessage("");
    fetchChat();
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
