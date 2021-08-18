import s from "./App.module.scss";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { RoomModal } from "./components/RoomModal/RoomModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
const App = () => {
    return (
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
    );
};

export default App;
