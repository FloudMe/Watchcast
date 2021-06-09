import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./Login.css"
import axios from "axios";
import Navbar from "../Component/Navbar";
import Video from "../Component/Video";
class Videos extends Component {

    constructor(props) {
        super(props);
        this.videos = {

        }
    }

    

    render() {
        return (
            <div >
                <Navbar />
                <div className='videosTable'>
                    <Video imagePath = '' title = 'dupa' />
                </div>
            </div>
        )
    }
}

export default Videos;