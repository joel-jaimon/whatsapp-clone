import React, { useEffect, useState } from "react";
import "./App.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chats/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { useStateValue } from "./DataLayer/StateProvider";
import db, { firebaseApp } from "./firebase/firebase";
import { auth } from "firebase";
import { actionTypes } from "./DataLayer/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    auth().onAuthStateChanged((persistedUser) => {
      if (persistedUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: persistedUser,
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <CircularProgress />
      ) : !user ? (
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
