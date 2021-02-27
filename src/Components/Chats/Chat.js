import React, { useEffect, useState } from "react";
import logo from "./assets/2.PNG";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import db from "../../firebase/firebase";
import firebase from "firebase";
import "./Chat.scss";
import useSound from "use-sound";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../DataLayer/StateProvider";

function Chat(props) {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [msgbool, msgboolSet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  const [playOn] = useSound(`${process.env.PUBLIC_URL}/send.mp3`, {
    volume: 0.5,
  });
  const [playOff] = useSound(`${process.env.PUBLIC_URL}/send.mp3`, {
    volume: 0.5,
  });

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
          var objDiv = document.getElementById("chat_body");
          objDiv.scrollTop = objDiv.scrollHeight + 1000;
        });
    }
    var objDiv = document.getElementById("chat_body");
    objDiv.scrollTop = objDiv.scrollHeight + 1000;
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    msgboolSet(!msgbool);
    msgbool ? playOff() : playOn();
    setInput("");
  };

  return props.home ? (
    <div className="chat__default">
      <img src={logo} alt="Welcome" />
    </div>
  ) : (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h4>{roomName}</h4>
          <p>
            {messages.length !== 0
              ? `Last seen: ${messages[messages.length - 1].timestamp
                  ?.toDate()
                  .toUTCString()
                  .slice(0, 22)}`
              : "..."}
          </p>
        </div>
        <div className="chat_headeRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div id="chat_body" className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span
              className={`chat__name ${
                message.name === user.displayName && "dis_none"
              }`}
            >
              {message.name}
            </span>
            {message.message}
            <span className="chat__timestamp">
              {String(
                new Date(message.timestamp?.toDate()).toUTCString()
              ).slice(5, 12) +
                String(
                  new Date(message.timestamp?.toDate()).toUTCString()
                ).slice(17, 22)}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <span className="x10px">
          <InsertEmoticonIcon />
        </span>
        <form>
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <span className="x10px">
          <MicIcon />
        </span>
      </div>
    </div>
  );
}

export default Chat;
