import { useEffect } from "react";
import { connect } from "react-redux";
import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Login } from "./components/Login/Login";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { RoomModal } from "./components/RoomModal/RoomModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { getActiveSocket } from "./redux/sockets/socketConnection";

const passStateToProps = ({ authState }: any) => ({
  authState,
});

const App = connect(passStateToProps)(({ authState }: any) => {
  const v = getActiveSocket();
  useEffect(() => {
    if (v) v.on("E", (c: any) => console.log(c));
  }, [v]);
  return authState.auth ? (
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
});

export default App;
