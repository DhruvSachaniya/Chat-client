import { useState } from "react";
import axios from 'axios';

export default function About () {
    const [inputText, setInputText] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    function handleinput(event) {
        setInputText(event.target.value);
    }

    function handleemail(event) {
        setInputEmail(event.target.value);
    }

    function handlepassword(event) {
        setInputPassword(event.target.value);
    }

    async function sendingdata(username, email, password) {
        console.log("clicked");
        try {
          const response = await axios.post("http://localhost:5000/auth/register", {
            username: username,
            email: email,
            password: password,
          });
          console.log(response.data);
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }

    return(
        <div>
            <h1>this is register page</h1>
            <div>
                <input
                onChange={handleinput}
                type="text"
                value={inputText}
                />
                <input
                onChange={handleemail} 
                type="email" 
                value={inputEmail}    
                />
                <input
                onChange={handlepassword} 
                type="password"
                value={inputPassword}
                />
                <button onClick={() => sendingdata(inputText, inputEmail, inputPassword)} type="submit">
                    submit
                </button>
            </div>
        </div>
    );
}