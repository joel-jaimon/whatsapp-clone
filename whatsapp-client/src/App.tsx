import s from "./App.module.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { DropMenu } from "./components/Dropmenu/Dropmenu";
import { GlobalModal } from "./components/GlobalModal/GlobalModal";
import { MovableModal } from "./components/MovableModal/MovableModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Room } from "./components/Room/Room";
import { CreateRoom } from "./components/Room/CreateRoom";
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>
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
                </Route>
                <Route exact path="/rooms">
                    <CreateRoom />
                </Route>
                <Route exact path="/rooms/:roomId">
                    <Room />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
