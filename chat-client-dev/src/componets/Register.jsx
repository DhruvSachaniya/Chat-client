import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function About () {
    const [inputText, setInputText] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [responsemess, setresponsemess] = useState("");


    function handleinput (event) {
        const {name, value} = event.target;
        if(name === "username") {
            setInputText(value);
        } else if (name === "email") {
            setInputEmail(value);
        } else if (name === "password") {
            setInputPassword(value);
        }
    }

    async function sendingdata(username, email, password) {
        console.log("clicked");
        try {
          const response = await axios.post("http://localhost:5000/auth/register", {
            username: username,
            email: email,
            password: password,
          });
          setresponsemess(JSON.stringify(response.data));
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }

    return(
        <div>
            <h1>this is register page</h1>
            <div>
                <input
                name="username"
                placeholder="username"
                onChange={handleinput}
                type="text"
                value={inputText}
                />
                <input
                name="email"
                placeholder="email"
                onChange={handleinput} 
                type="email" 
                value={inputEmail}    
                />
                <input
                name="password"
                placeholder="password"
                onChange={handleinput} 
                type="password"
                value={inputPassword}
                />
                <button onClick={() => sendingdata(inputText, inputEmail, inputPassword)} type="submit">
                    submit
                </button>
                <p>If already registered? <Link to="/login">Login here</Link></p>
                {responsemess && (
                    <div>
                        <p>{responsemess}</p><Link to="/login">Go to login page</Link>
                    </div>
                )}

            </div>
        </div>
    );
}