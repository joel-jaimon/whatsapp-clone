import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { Sidebar } from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className={s.app}>
      <div className={s.appContainer}>
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default App;
