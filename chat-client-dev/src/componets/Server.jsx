import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Server() {
  const [serverName, setServerName] = useState("");
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();
  function fetchServers() {
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
  }
  useEffect(() => {
    fetchServers();
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
      fetchServers();
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
        {servers.length > 0
          ? servers.map((server) => {
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
            })
          : null}
      </div>
      <hr />
      <h1>create-server</h1>
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
