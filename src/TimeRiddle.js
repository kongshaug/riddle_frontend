import React, { useState, useEffect } from "react";


function TimeRiddle({ attempt, setRiddle, validateAnswer, hint, setHint, getHint }) {

    const [answer, setAnswer] = useState("");
    const [timer, setTimer] = useState(attempt.riddle.time);

    useEffect( () => {
        if(timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            setTimer("Times up");
            validateAnswer(attempt, "failed");
        }
    }, [timer]);

    const onChange = evt => {
        setAnswer(evt.target.value);
    };

    const next = () => {
        setRiddle(false);
        setHint("");
    };

    const submit = evt => {
        evt.preventDefault();
        validateAnswer(attempt, answer);
        setAnswer("");
    }

    
    if(attempt.status === "PENDING") {
    return (
        <div>
            <p>{timer}</p><br></br>
            {hint === "" ?
                    (<button onClick={() => { getHint(attempt) }}>Get hint ( -10 points )</button>) : (
                        <p>{hint}</p>)}
            <h3>{attempt.riddle.riddle} </h3>
            <input onChange={onChange} placeholder="answer" value={answer} id="answer" />
            <button onClick={submit}>Submit answer</button>
        </div>
    ); }
    else if(attempt.status === "SOLVED") {
        return (
            <div>
                <h3>You've solved the riddle, congratulations</h3>
                <button onClick={next}>Next riddle</button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>You've failed this riddle, try another riddle</h3>
                <button onClick={next}>Try again</button>
            </div>
        )
    }

}
 

    export default TimeRiddle;