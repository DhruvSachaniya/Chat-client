import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [cradentials, setCradentials] = useState({
    username: "",
    email: "",
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

  async function handleRegister(event) {
    event.preventDefault();
    try {
      await axios({
        url: "/auth/register",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: cradentials.username,
          email: cradentials.email,
          password: cradentials.password,
        }),
      });
      setCradentials({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("error");
    }
  }

  return (
    <>
      <h1>register page</h1>
      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="username"
          onChange={handleChange}
          type="text"
          value={cradentials.username}
        />
        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
          type="email"
          value={cradentials.email}
        />
        <input
          name="password"
          placeholder="password"
          onChange={handleChange}
          type="password"
          value={cradentials.password}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        If already registered? <Link to="/login">Login here</Link>
      </p>
    </>
  );
}
