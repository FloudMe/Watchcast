import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Background.css';
import './MainPage.css';
import WatchCast from "../Component/WatchCast";
import axios from "axios";

class MainPage extends Component {

    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div id="SLIDE_BG">
                {/* <div className="WatchCast">WatchCast</div> */}
                <WatchCast />
                <div className="centerMainPage">
                    <div className="napisLogin">
                    Dołącz i oglądaj filmy jakie chcesz
                    </div>
                    <Link to="/login">Login</Link>
                    <div className="brakKonta">Nie masz konta, zapisz się!</div>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}

export default MainPage;
