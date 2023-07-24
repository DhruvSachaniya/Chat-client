import axios from "axios";
import { useState } from "react";

export default function CreateChannel() {
  const [inputtext, setinputtext] = useState({
    channelname: "",
    parentserverId: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setinputtext((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  }

  async function sendingchannel(event) {
    event.preventDefault();
    try {
      await axios({
        url: "/channels",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt_token"),
        },
        data: JSON.stringify({
          channelName: inputtext.channelname,
          parentServer: inputtext.parentserverId,
        }),
      });
      setinputtext({
        channelname: "",
        parentserverId: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>CreateChannel page</h1>
      <form onSubmit={sendingchannel}>
        <input
          onChange={handleChange}
          name="channelname"
          type="text"
          placeholder="channelname"
          value={inputtext.channelname}
        />
        <input
          onChange={handleChange}
          name="parentserverId"
          type="text"
          placeholder="serverId"
          value={inputtext.parentserverId}
        />
        <button type="submit">create-channel</button>
      </form>
    </>
  );
}
