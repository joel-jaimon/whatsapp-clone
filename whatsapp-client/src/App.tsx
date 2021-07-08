import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { DropDownContextProvider } from "./context/dropDownContext";
import { GlobalModalProvider } from "./context/globalModalContext";

const App = () => {
  return (
    <GlobalModalProvider>
      <DropDownContextProvider>
        <GlobalModal />
        <div className={s.app}>
          <DropMenu />
          <div className={s.appContainer}>
            <Sidebar />
            <ChatContainer />
          </div>
        </div>
      </DropDownContextProvider>
    </GlobalModalProvider>
  );
};

export default App;
