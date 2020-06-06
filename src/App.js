import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Register from "./Register";
import Scoreboard from "./Scoreboard";
import Riddle from "./Riddle";

function App(props) {

  const init = { username:"", highScore:"", level:"" };
  const [user, setUser] = useState(init);

  return (
    <div className="App App-header">
  
        <Router>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/register">
            <Register user={user} setUser={setUser}   />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard  />
          </Route>
          <Route path="/riddle">
            <Riddle user={user} setUser ={setUser} />
          </Route>
        </Router>

    </div>

  );
}

function Welcome() {
  return (
    <div >
      <br></br><h2>Welcome to Mystery Games</h2><br></br>
      <button>
        <NavLink to="/register" activeClassName="active">
          Register
        </NavLink>
      </button><br></br><br></br>
      <button>
        <NavLink to="/scoreboard" activeClassName="active">
          Scoreboard
        </NavLink>
      </button>
    </div>
  )
}




export default App;
