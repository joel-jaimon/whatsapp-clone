import React, { useEffect, useState } from "react";
import "./SidebarChat.scss";
import { Avatar } from "@material-ui/core";
import db from "../../firebase/firebase";
import { Link } from "react-router-dom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useStateValue } from "../../DataLayer/StateProvider";
import firebase from "firebase";

function SidebarChat({ id, name, addNewChat, setNGP, newGP }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const [lastViewed, setLastViewed] = useState();
  const [unseenCount, setUnseenMsgCount] = useState();

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

  const manageViewedRooms = async () => {
    const _user = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    const usersDocID = await _user.docs.map((doc) => doc.id)[0];

    const recentInfo = await db
      .collection("users")
      .doc(usersDocID)
      .collection("chatsViewed")
      .where("roomId", "==", id)
      .get();

    if (recentInfo.empty) {
      await db
        .collection("users")
        .doc(usersDocID)
        .collection("chatsViewed")
        .add({
          roomId: id,
          lastOpenedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastOpenedAtMS: new Date().getTime(),
        });
    }

    const roomInfoId = await recentInfo.docs.map((e) => e.id)[0];

    if (roomInfoId) {
      await db
        .collection("users")
        .doc(usersDocID)
        .collection("chatsViewed")
        .doc(roomInfoId)
        .update({
          lastOpenedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastOpenedAtMS: new Date().getTime(),
        });
    }

    const updatedInfo = await db
      .collection("users")
      .doc(usersDocID)
      .collection("chatsViewed")
      .where("roomId", "==", id)
      .get();

    setLastViewed(updatedInfo.docs.map((e) => e.data())[0].lastOpenedAtMS);
  };

  useEffect(() => {
    if (id && lastViewed) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .where("tsCompare", ">", lastViewed)
        .onSnapshot((snapshot) => {
          setUnseenMsgCount(snapshot.docs.length);
        });
    }
  }, []);

  console.log(lastViewed, unseenCount);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div onClick={() => manageViewedRooms()} className="sidebarChat">
        <Avatar
          className="avatar-uu"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <div className="_chips">
            <p>{messages[0]?.message}</p>{" "}
            {unseenCount ? <span>{unseenCount}</span> : null}
          </div>
        </div>
      </div>
    </Link>
  ) : newGP ? null : (
    <div onClick={() => setNGP(true)} className="sidebarChat main-ww">
      <GroupAddIcon />
      <h4>Create Group</h4>
    </div>
  );
}

export default SidebarChat;
