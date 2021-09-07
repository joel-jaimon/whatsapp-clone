import { useState } from "react";
import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Login } from "./components/Login/Login";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { RoomModal } from "./components/RoomModal/RoomModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import socket from "./utils/socketConnection/socketConnection";

const App = () => {
  // socket.on("eval", (data: any) => {
  //   console.log(data);
  // });
  const [auth, setAuth] = useState(false);
  return auth ? (
    <div>
      <RoomModal />
      <MovableModal />
      <GlobalModal />
      <DropMenu />
      <div className={s.app}>
        <div className={s.appContainer}>
          <Sidebar />
          <ChatContainer />
        </div>
      </div>
    </div>
  ) : (
    <div className={s.app}>
      <Login />
    </div>
  );
};

export default App;
