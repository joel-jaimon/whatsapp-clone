import { createRef, useContext, useRef } from "react";
import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { dropDownContext } from "./context/dropDownContext";

const App = () => {
  const { setDropMenu } = useContext(dropDownContext);
  return (
    <div>
      <GlobalModal />
      <DropMenu />
      <div onClickCapture={() => setDropMenu("")} className={s.app}>
        <div className={s.appContainer}>
          <Sidebar />
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
