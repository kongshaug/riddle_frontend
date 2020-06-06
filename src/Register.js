import React, { useState } from "react";
import facade from "./apiFacade";
import './App.css';
import { useHistory } from "react-router-dom";

function Register({ setRegistered, setUser }) {

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const create = async username => {
        try {
            const data = await facade.createUser(username);
            setUser(data);
            setRegistered(true);
        } catch (e) {
            setError("Username is already in use");
        }

    };

    const registerUser = evt => {
        evt.preventDefault();
        setUsername("");
        create(username);    
    };

    const onChange = evt => {
        setUsername(evt.target.value);
        setError("");
    };

    return (
        <div>
        <h2>Register user</h2>
            <input onChange={onChange} placeholder="username" value={username} id="username" />
            <p>{error}</p><br></br>
            <button onClick={registerUser}>Register</button>
    </div>
    )
}

 function Registered( {user} ) {

    const history = useHistory();

     return (
         <div>
             <br />
             <h2>Welcome {user.username}</h2>
             <h3>You are now ready to solve some riddles</h3>
             <button onClick={() => history.push("/riddle") }>Start riddling</button>
         </div>
     );
}

 function RegisterApp({ user, setUser }) {

        const [registered, setRegistered] = useState(false);
    
     return (
             <div className="register">
            {!registered ? (
                 <Register setRegistered={setRegistered} setUser={setUser} />
            ) : (
                     <div>
                         <Registered user={user} />
                    </div>
                )}
        </div>
     );
}

export default RegisterApp;
