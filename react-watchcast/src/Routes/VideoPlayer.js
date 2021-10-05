import { React, Component } from "react";
import ReactPlayer from 'react-player';
// import myVideo from '../public/test.mp4'
import './VideoPlayer.css';
import Navbar from "../Component/Navbar";
import axios from "axios";

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            video: [],
        }
    }

    componentDidMount(){
        axios(`http://localhost:4000/videos/` + this.state.id)
        .then(res =>{
            const video = res.data;
            this.setState(video);
            console.log(this.state.video.path)
        })
    }

    render() {

        return (
            <div>
                <Navbar />
                <div className='videoPlayer'>
                    <ReactPlayer
                        url={this.state.video.path}
                        controls={true}
                    />
                    <h2>{this.state.video.name}</h2>
                    <h1>{this.state.video.description}</h1>
                </div>
            </div>

        );
    }
}

export default VideoPlayer;