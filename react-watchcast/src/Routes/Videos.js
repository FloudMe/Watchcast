import axios from "axios";
import React, { Component } from "react";
import Navbar from "../Component/Navbar";
import Video from "../Component/Video";
import config from "../config";
class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
        }
    }

    componentDidMount() {
        axios.get(config.backendPath + `videos`)
            .then(res => {
                const videosRes = res.data.videos;
                this.setState({ videos: videosRes });
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    render() {
        return (
            <div className="background">
                <Navbar />
                <div className='videos'>
                    {this.state.videos.map(video => {
                        return <Video uuid={video.uuid}
                            title={video.name}
                            description={video.description}
                            created_at={video.created_at} />
                    })}
                </div>
            </div>
        )
    }
}

export default Videos;