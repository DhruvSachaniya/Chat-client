import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
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
    </>
  );
}
