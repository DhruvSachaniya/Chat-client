import axios from "axios";
import { useState } from "react";

export default function Login() {
    const [inputname, setinputname] = useState("");
    const [inputpass, setinputpass] = useState("");
    const [responsemess, setresponsemess] = useState("");
    
    function handleinput (event) {
        const {name, value} = event.target;
        if(name === "username") {
            setinputname(value);
        } else if (name === "password") {
            setinputpass(value);
        }
    }

    async function logindata(username, password) {
        try{
            const response = await axios.post("http://localhost:5000/auth/login", {
                username: username,
                password: password
            });
            setresponsemess(JSON.stringify(response.data));
            
        } catch (error) {
            console.log("error sending data", error)
        }
    }


    return(
        <>
            <h1>this is login page</h1>
            <div>
                <input
                name="username"
                placeholder="username" 
                onChange={handleinput}
                value={inputname}
                type="text"/>
                <input 
                name="password"
                placeholder="password"
                onChange={handleinput}
                value={inputpass}
                type="password"/>
                <button onClick={()=> logindata(inputname, inputpass)}>
                    login
                </button>
                {responsemess && <p>{responsemess}</p>}
            </div>
        </>
    );
}