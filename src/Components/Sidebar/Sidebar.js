import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "../SidebarChats/SidebarChat";
import { useStateValue } from "../../DataLayer/StateProvider";
import db from "../../firebase/firebase";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [newGP, setNGP] = useState(true);
  // const data = async () => {
  //   const rooms = db.collection("rooms");
  //   const snapshot = await rooms.get();
  //   snapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  // };

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // data();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input className="input" placeholder="Search or start" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {newGP ? (
          <div className="new-gp-div">
            <img src="https://avatars.dicebear.com/api/human/200.svg" />
          </div>
        ) : (
          <>
            <SidebarChat addNewChat />
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
