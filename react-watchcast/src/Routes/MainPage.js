import { React, Component } from "react";
import './Background.css';
import './MainPage.css';
import WatchCast from "../Component/WatchCast";
import Button from "../Component/Button";

class MainPage extends Component {
    render() {
        return (
            <div id="SLIDE_BG">
                <WatchCast />
                <div className="centerMainPage">
                    <div className="napisLogin">
                        Dołącz i oglądaj filmy jakie chcesz
                    </div>
                    <Button className="login" text='login' link='/login' />
                    <div className="brakKonta">
                        Nie masz konta, zapisz się!
                    </div>
                    <Button className="register" text='register' link='/register' />
                </div>
            </div>
        )
    }
}

export default MainPage;
