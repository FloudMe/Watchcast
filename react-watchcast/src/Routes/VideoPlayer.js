import { React, Component } from "react";
import ReactPlayer from 'react-player';
import './VideoPlayer.css';
import Navbar from "../Component/Navbar";
import axios from "axios";
import Comment from "../Component/Comment";
import authentication from "../scripts/authentication";
import Video from "../Component/Video";

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            video: [],
            comments: [],
            comment: '',
            videos: [],
        }

        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/videos/` + this.state.id)
        .then(res =>{
            const videoRes = res.data;
            this.setState(videoRes);
        })

       axios.get(`http://localhost:4000/videos/comments/` + this.state.id)
        .then(res =>{
            const comments = res.data;
            this.setState({comments: comments});
        })

        axios.get('http://localhost:4000/videos/videos/' + this.state.id)
        .then(res => {
            const videosRes = res.data;
            this.setState({videos:videosRes})
        })
    }

    buttonClick(){
        alert(authentication.authenticationHeader())
        axios.post(`http://localhost:4000/videos/`, {"video": this.state.id, "description": this.state.comment}, {headers: { 'authorization': authentication.authenticationHeader() }})
        .then(res => {
            this.state.comments.push(res.data);
            this.setState({reload: true});
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
                <div className='scetionVideos'>
                    {this.state.videos.map(video => {
                        return <Video uuid={video.uuid} imagePath = '' title={video.name} />
                    })}
                </div>
                <div className="sectionComment">
                    <input type='text' onChange={(e) => this.setState({comment: e.target.value})} />
                    <button className='adButton' type="button" onClick={this.buttonClick}>Click</button>
                    {this.state.comments.map( comment => {
                       return <Comment comment={comment} />
                    })}
                </div>
            </div>

        );
    }
}

export default VideoPlayer;