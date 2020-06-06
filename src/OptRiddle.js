import React, { useState } from "react";
import './App.css';

const RadioOption = ({option}) => {
    return ( 
        <li>
        <label>
            <input type="radio" value={option} name="options" />
                 {option}
        </label>
        </li>
    )
}

function OptRiddle({ attempt, setRiddle, validateAnswer, hint, setHint, getHint }) {

    const [answer, setAnswer] = useState("");

    const options = attempt.riddle.options.map((option, index) => (
    <RadioOption key={index} option={option} />
    ));

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
            {hint === "" ?
                    (<button onClick={() => { getHint(attempt) }}>Get hint ( -10 points )</button>) : (
                        <p>{hint}</p>)}
            <h3>{attempt.riddle.riddle} </h3>
            <form onChange={onChange}>
            <ul className="options">
                {options}
            </ul>
            </form>
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
 

    export default OptRiddle;