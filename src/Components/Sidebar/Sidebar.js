import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import firebase from "firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "../SidebarChats/SidebarChat";
import { useStateValue } from "../../DataLayer/StateProvider";
import db from "../../firebase/firebase";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [newGP, setNGP] = useState(false);
  const [err, setERR] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("lastMsgOn", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            doc: doc.metadata,
          }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const err_control = (er) => {
    setERR(er);
    setTimeout(() => {
      setERR(false);
    }, 2000);
  };

  const createGP = async (e) => {
    e.preventDefault();
    const roomName = document.querySelector("#n-gp-name").value;
    if (roomName.length > 1) {
      if (roomName.match(/^[a-zA-Z ]*$/)) {
        try {
          await db.collection("rooms").add({
            name: roomName,
            creater: user.displayName,
            createrAvatar: user.photoURL,
            lastMsgOn: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setNGP(false);
        } catch (e) {
          err_control(e?.toString()?.slice(0, 50));
        }
      } else {
        err_control("Group name can only contain text.");
      }
    } else {
      err_control("Please enter a Group Name.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar className="avatar-uu" src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ChatIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined fontSize="small" />
          <input className="input" placeholder="Search or start" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {newGP ? (
          <div className="new-gp-div">
            <div className="cancel-gp">
              <IconButton onClick={() => setNGP(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <img
              src={`https://avatars.dicebear.com/api/human/${Math.floor(
                Math.random() * 2000
              )}.svg`}
            />

            <div className="cte">
              <input placeholder="Group Name" id="n-gp-name" type="text" />
              <IconButton onClick={(e) => createGP(e)}>
                <NavigateNextIcon />
              </IconButton>
            </div>

            {err ? (
              <Alert className="err" severity="error">
                {err}
              </Alert>
            ) : null}
          </div>
        ) : (
          <>
            <SidebarChat newGP={newGP} addNewChat setNGP={setNGP} />
            {rooms.map((room) => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
