import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import { useHistory } from "react-router-dom";
import './App.css';


const UserRow = ({ user }) => {
    return (
        <tr>
            <td> {user.username} </td>
            <td> {user.level} </td>
            <td> {user.highScore} </td>
        </tr>
    )
}

function Scoreboard() {

    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getScoreboard = async () => {
            try {
                const users = await facade.getScoreboard();
                setUsers(users);
                setFetching(true);
            } catch (error) {
                alert("!! " + error);
            }
        };
        getScoreboard();
    }, []);

    const tableUsers = users.map((user, index) => (
        <UserRow key={index} user={user} />
    ));

    const ScoreboardTable = () => {
        return fetching ? (
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Level</th>
                        <th>Highscore</th>
                    </tr>
                </thead>
                <tbody>{tableUsers}</tbody>
            </table>
        ) : (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            )

    }

    return (
        <div>
            <h2>Scoreboard</h2>
            <button onClick={() => history.push("/") }>Go to frontpage</button>
            <br></br>
            <ScoreboardTable />
        </div>
    )


}

export default Scoreboard;