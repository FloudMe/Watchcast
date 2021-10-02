import React, { Component } from "react";
import Navbar from "../Component/Navbar";
import Video from "../Component/Video";
class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    // componentDidMount(){
    //     axios.get(`http://localhost:4000/users/login`)
    //     .then(res => {
    //         videos = res.data;
    //     });
    // }

    render() {
        return (
            <div >
                <Navbar />
                {/* {this.state.videos.map( (uuid, name) =>{
                    <div className='videosTable'>
                        <Video key={uuid} imagePath = '' title={name}/>
                    </div>
                })} */}
                <div className='videosTable'>
                    <Video imagePath='' title='dupa' />
                </div>
            </div>
        )
    }
}

export default Videos;