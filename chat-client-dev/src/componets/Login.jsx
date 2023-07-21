import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [cradentials, setCradentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCradentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios({
        url: "/auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(cradentials),
      });

      if (response.status === 200) {
        localStorage.setItem("jwt_token", response.data.token);
      }
      setCradentials({
        username: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>login page</h1>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={cradentials.username}
          type="text"
        />
        <input
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={cradentials.password}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
