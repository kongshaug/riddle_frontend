import React, { useState } from "react";
import facade from "./apiFacade";
import TimeRiddle from "./TimeRiddle";
import OptRiddle from "./OptRiddle";
import DigestRiddle from "./DigestRiddle";
import Scoreboard from "./Scoreboard"


function Riddle({ user, setUser }) {

    return (
        <div>
            <h2>{user.username}</h2>
            <h2>HighScore : {user.highScore}</h2>
            <h2>Level {user.level} </h2>
            <Game user={user} setUser={setUser} />
        </div>
    );

}

function Game({user, setUser}){

    const [attempt, setAttempt] = useState({});
    const [error, setError] = useState("");
    const [riddle, setRiddle] = useState(false);
    const [hint, setHint] = useState("");

    const fetchRiddle = async user => {
        try {
            const data = await facade.getRiddle(user.id);
            setAttempt(data);
            setUser(data.user);
            setRiddle(true);
        } catch (e) {
            setError("No riddles for you!");
            alert(error);
        }
      
    }

    const getHint = async attempt => {
        try {
            const data = await facade.getHint(attempt.user.id, attempt.riddle.id);
            setHint(data);
           
        } catch (e) {
            setError("No hint for you!");
            alert(error);
        }
      
    }

    const validateAnswer = async (attempt, answer) => {
        try {
            const data = await facade.validateAnswer(attempt.riddle.id, attempt.user.id, answer);
            setAttempt(data);
            setUser(data.user);
        } catch (e) {
            setError("Something went wrong!");
            alert(error);
        }
    }


    if(!riddle)
        return <div><h3>Click the button to get a riddle</h3>
                <button onClick={()=>{fetchRiddle(user)}}>Get riddle</button>
                </div>
    else{

        if (attempt.status === "FINISHED") {
            return( 
            <div>
                <p>Congratulations! You have finished Mystery Games</p>
                <br></br><br></br>
                <Scoreboard />
            </div>
            );
        } 
        else if  (attempt.riddle.options){
            return <OptRiddle setRiddle={setRiddle} hint={hint} setHint={setHint} getHint={getHint} attempt = {attempt} validateAnswer={validateAnswer} />
        }
        else if(attempt.riddle.time){
            return <TimeRiddle setRiddle={setRiddle} hint={hint} setHint={setHint} getHint={getHint} attempt = {attempt} validateAnswer={validateAnswer}/> 
        }

        return  <DigestRiddle setRiddle={setRiddle} hint={hint} setHint={setHint} getHint={getHint} attempt = {attempt} validateAnswer={validateAnswer}/>

    }


}



export default Riddle;