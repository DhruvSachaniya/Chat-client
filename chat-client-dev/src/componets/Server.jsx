import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Server() {
  const [serverName, setServerName] = useState("");
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "/users/servers",
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt_token"),
      },
    })
      .then((response) => {
        setServers(response.data.joinedServers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(event) {
    setServerName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios({
        url: "/servers",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt_token"),
        },
        data: JSON.stringify({
          serverName: serverName,
        }),
      });
      setServerName("");
    } catch (error) {
      console.log("error");
    }
  }

  function seeChannels(serverId) {
    localStorage.setItem("serverId", serverId);
    navigate("/channels");
  }

  return (
    <>
      <div>
        {servers.map((server) => {
          return (
            <div
              key={server._id}
              onClick={() => {
                seeChannels(server._id);
              }}
            >
              <h1>{server.serverName}</h1>
            </div>
          );
        })}
      </div>
      <hr />
      <h1>create-server page</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={serverName}
          name="servername"
          type="text"
          placeholder="serverName"
        />
        <button type="submit">create server</button>
      </form>
    </>
  );
}