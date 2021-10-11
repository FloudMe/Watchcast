import { React, Component } from "react";
import ReactPlayer from 'react-player';
import './VideoPlayer.css';
import Navbar from "../Component/Navbar";
import axios from "axios";
import Comment from "../Component/Comment";
import authentication from "../scripts/authentication";
import Video from "../Component/Video";
import VideoDescription from "../Component/VideoDescription";
import config from "../config";
import './VideoPlayer.css'
import '../Component/Video.css'

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            video: [],
            comments: [],
            comment: '',
            videos: [],
            enabled: authentication.currentUser() === null ? "disabled" : "",
        }
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        axios.get(config.backendPath + `videos/` + this.state.id)
            .then(res => {
                const data = res.data;

                this.setState({ video: data.video });
                this.setState({ comments: data.comments });
                this.setState({ videos: data.anotherVideos })
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }

    buttonClick() {
        if (this.isCommentNotEmpty()) {
            this.sendComment();
        }
    }

    isCommentNotEmpty() {
        return this.state.comment !== '';
    }

    sendComment() {
        axios.post(config.backendPath + `videos/`,
            { "video": this.state.id, "description": this.state.comment },
            { headers: { 'authorization': authentication.authenticationHeader() } })
            .then(res => {
                this.state.comments.push(res.data);
                this.setState({ reload: true });
            })
            .catch(err => {
                alert(err.response.data.message);
            });
    }

    render() {
        return (
            <div className="background">
                <Navbar />
                <div className='videoPlayerPage'>
                    <div className='reactPlayer'>
                        <div className='videoPlayer'>
                            <ReactPlayer
                                className="player"
                                url={this.state.video.path}
                                controls={true}
                                width='100%'
                                height='100%'
                            />
                            <VideoDescription video={this.state.video} />
                        </div>
                        <hr></hr>
                        <div className="sectionComment">
                            <input className='textComment'
                                type='text'
                                placeholder='Your comment'
                                disabled={this.state.enabled}
                                onChange={(e) => this.setState({ comment: e.target.value })} />
                            <button className='adButton' disabled={this.state.enabled} type="button" onClick={this.buttonClick}>Click</button>
                            {this.state.comments.map(comment => {
                                return <Comment comment={comment} />
                            })}
                        </div>
                    </div>

                    <div className='sectionVideos'>
                        {this.state.videos.map(video => {
                            return <Video uuid={video.uuid} title={video.name} created_at={video.created_at} />
                        })}
                    </div>

                </div>
            </div>

        );
    }
}

export default VideoPlayer;