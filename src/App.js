import React from "react";
import "./App.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chats/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { useStateValue } from "./DataLayer/StateProvider";
import db from "./firebase/firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();

  const checkDocsExistence = async (roomId) => {
    const _doc = await db.collection("rooms").doc(roomId).get();
    console.log(_doc.exists);
    return _doc.exists ? true : false;
  };

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
