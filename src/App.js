import React from "react";
import "./App.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chats/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { useStateValue } from "./DataLayer/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat home={true} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
