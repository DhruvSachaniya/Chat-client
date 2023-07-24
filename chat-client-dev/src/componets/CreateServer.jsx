import axios from "axios";
import { useState } from "react";


export default function CreateServer() {

    const [servername, setservername] = useState("");

    function handlechange(event){
        setservername(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios({
                url: "/servers",
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("jwt_token")
                },
                data: JSON.stringify({
                    serverName: servername
                }),
            });
            console.log(servername);
            setservername("");
        } catch (error) {
            console.log("error");
        }
    }


    return(
        <>
            <h1>create-server page</h1>
            <form onSubmit={handleSubmit}>
                <input
                onChange={handlechange}
                value={servername}
                name="servername" 
                type="text"
                placeholder="serverName"    
                />
            <button type="submit">create server</button>
            </form>
        </>
    );
}