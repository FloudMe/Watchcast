import { React, Component } from "react";
import ReactPlayer from 'react-player';
import myVideo from '../public/test.mp4'
import './VideoPlayer.css';
import Navbar from "../Component/Navbar";

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            videoPath: '',
            title: ''
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     return {videoPath: props.videoPath, title: props.title };
    //   }

    render(){
        
        return (
            <div>
                <Navbar />
                <div className='videoPlayer'>
                    <ReactPlayer
                        className='react-player'
                        //   url={this.state.videoPath}
                        url='https://firebasestorage.googleapis.com/v0/b/watchcast-37092.appspot.com/o/test.mp4?alt=media&token=35af7e8e-4985-45bc-bfc8-f12b813f054a'
                        controls={true}
                
                    />
                    <h2>Tytul</h2>
                </div>
                


            {/* <ReactVideo
                    src="../public/test.mp4"
                    poster="https://www.example.com/poster.png"
                    primaryColor="red"
                    // other props
                /> */}
                {/* <YoutubePlayer
                src="https://youtu.be/UZCO5k1Nu70" // Reqiured
                width={650}
                height={600}
            /> */}
            </div>
            
        );
    }
}

export default VideoPlayer;