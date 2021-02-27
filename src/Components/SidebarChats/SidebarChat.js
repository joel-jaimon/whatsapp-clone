import React, { useEffect, useState } from "react";
import "./SidebarChat.scss";
import { Avatar } from "@material-ui/core";
import db from "../../firebase/firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat, setNGP, newGP }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);
  const [newgp, setGP] = useState(false);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : newGP ? null : (
    <div onClick={() => setNGP(true)} className="sidebarChat">
      <h4>Create Group</h4>
    </div>
  );
}

export default SidebarChat;
