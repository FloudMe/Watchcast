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

    componentDidMount() {
        axios.get(config.backendPath + `videos/` + this.state.id)
            .then(res => {
                const data = res.data;
                console.log(data)
                
                this.setState({video: data.video});
                this.setState({comments: data.comments});
                this.setState({videos: data.anotherVideos})
            })
            .catch(res => {
                alert("Błąd z wideo")
            })
    }

    buttonClick() {
        if (this.state.comment !== '') {
            axios.post(config.backendPath + `videos/`,
                { "video": this.state.id, "description": this.state.comment },
                { headers: { 'authorization': authentication.authenticationHeader() } })
                .then(res => {
                    this.state.comments.push(res.data);
                    this.setState({ reload: true });
                })
                .catch(res => {
                    alert("Błąd z dodaniem komentarza");
                })
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='videoPlayerPage'>
                    <div className='reactPlayer'>
                        <div className='videoPlayer'>
                            <ReactPlayer
                                className="player"
                                url={this.state.video.path}
                                controls={true}
                                width='70%'
                                height='70%'
                            />
                            <VideoDescription video={this.state.video} />
                        </div>
                        <hr></hr>
                        <div className="sectionComment">
                            <input className='textComment'
                                type='text'
                                placeholder='Your comment'
                                onChange={(e) => this.setState({ comment: e.target.value })} />
                            <button className='adButton' type="button" onClick={this.buttonClick}>Click</button>
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