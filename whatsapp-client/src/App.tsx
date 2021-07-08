import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { DropDownContextProvider } from "./context/dropDownContext";

const App = () => {
  return (
    <DropDownContextProvider>
      <div className={s.app}>
        <DropMenu />
        <div className={s.appContainer}>
          <Sidebar />
          <ChatContainer />
        </div>
      </div>
    </DropDownContextProvider>
  );
};

export default App;
