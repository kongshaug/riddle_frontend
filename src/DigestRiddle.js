import React, { useState } from "react";
import facade from "./apiFacade";


function DigestRiddle({ attempt, setRiddle, validateAnswer, hint, setHint, getHint }) {

    const [answer, setAnswer] = useState("");
    const [digest, setDigest] = useState("");
    const [digestReturn, setDigestReturn] = useState("");
    const [error, setError] = useState("");

    const onChange = evt => {
        setAnswer(evt.target.value);
    };

    const digestChange = evt => {
        setDigest(evt.target.value);
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

    const digestMe = evt => {
        evt.preventDefault();
        fetchDigest(attempt, digest);
    }

    const fetchDigest = async (attempt, input) => {
        try {
            const data = await facade.digestRiddle(attempt.riddle.id, input);
            setDigestReturn(data);
        } catch (e) {
            setError("Something went wrong!");
            alert(error);
        }
    }


    if (attempt.status === "PENDING") {
        return (
            <div>
                <br />
                <p>You have {attempt.tries} tries left</p>
                {hint === "" ?
                    (<button onClick={() => { getHint(attempt) }}>Get hint ( -10 points )</button>) : (
                        <p>{hint}</p>)}
                <h3>{attempt.riddle.riddle} </h3>
                <input onChange={digestChange} type="number" placeholder="enter a number" value={digest} id="digest" />
                <button onClick={digestMe}>Feed to function</button><br></br>
                <b>function({digest}) = {digestReturn}</b><br></br>
                <input onChange={onChange} placeholder="ex. x * 12" value={answer} id="answer" />
                <button onClick={submit}>Submit answer</button>
            </div>
        );
    }
    else if (attempt.status === "SOLVED") {
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


export default DigestRiddle;