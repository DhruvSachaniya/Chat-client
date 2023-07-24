import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [channels, setChannels] = useState([]);

  function fetchChannels() {
    axios({
      url: `/channels/${localStorage.getItem("serverId")}`,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("jwt_token"),
      },
    }).then((response) => {
      setChannels(response.data);
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
          parentServer: localStorage.getItem("serverId"),
        }),
      });
      fetchChannels();
      setChannelName("");
    } catch (error) {
      console.log("err");
      console.log(error);
    }
  }

  return (
    <>
      <hr />
      {channels.length > 0
        ? channels.map((channel) => {
            return (
              <div key={channel._id}>
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
