import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [channels, setChannels] = useState([]);

  const navigate = useNavigate();

  function fetchChannels() {
    axios({
      url: `/channels/servers/${localStorage.getItem("parentServerId")}`,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("jwt_token"),
      },
    })
      .then((response) => {
        setChannels(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log(
            "No channel found for this server! please create one to chat."
          );
        }
      });
  }

  useEffect(() => {
    fetchChannels();
  }, []);

  function handleChange(event) {
    setChannelName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios({
        url: "/channels",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt_token"),
        },
        data: JSON.stringify({
          channelName: channelName,
          parentServerId: localStorage.getItem("parentServerId"),
        }),
      });
      fetchChannels();
      setChannelName("");
    } catch (error) {
      console.log("err");
      console.log(error);
    }
  }

  function seeChat(channelId) {
    localStorage.setItem("channelId", channelId);
    navigate("/chat");
  }

  return (
    <>
      <hr />
      {channels.length > 0
        ? channels.map((channel) => {
            return (
              <div
                key={channel._id}
                onClick={() => {
                  seeChat(channel._id);
                }}
              >
                <h1>{channel.channelName}</h1>
              </div>
            );
          })
        : null}
      <h1>CreateChannel page</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="channelname"
          type="text"
          placeholder="channelname"
          value={channelName}
        />
        <button type="submit">create-channel</button>
      </form>
    </>
  );
}
