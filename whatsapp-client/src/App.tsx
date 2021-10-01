import { CallerInfo } from "components/CallerInfo/CallerInfo";
import { connect } from "react-redux";
import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Login } from "./components/Login/Login";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { RoomModal } from "./components/RoomModal/RoomModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { getAccessToken } from "utils/accessToken";

const passStateToProps = ({ authState }: any) => ({
  authState,
});

const App = connect(passStateToProps)(({ authState }: any) => {
  return authState.auth ? (
    <div>
      {authState.socketStatus ? null : (
        <div className={s.smoke}>
          <div className={s.modal}>
            <div className={s.disconnectedModal}>
              <p>Sorry, server down. We'll be back back soon.</p>
            </div>
          </div>
        </div>
      )}
      <CallerInfo />
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
    <div
      style={{
        textAlign: "center",
      }}
      className={s.app}
    >
      <Login />
    </div>
  );
});

export default App;
