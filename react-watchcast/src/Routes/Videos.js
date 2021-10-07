import React, { Component } from "react";
import Navbar from "../Component/Navbar";
import Video from "../Component/Video";
import axios from "axios";
class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            comments: [],
        }
        // this.onClick = this.onClick.bind(this);
        
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/videos`)
        .then(res => {
            const videosRes = res.data.videos;
            this.setState({videos: videosRes});
        });
    }
    
    render() {
        return (
            <div >
                <Navbar />
                <div className='videos'>
                {this.state.videos.map( video =>{
                        return <Video uuid={video.uuid} imagePath = '' title={video.name}/>
                })}
                </div>
            </div>
        )
    }
}

export default Videos;