import React from "react";
import formatedDate from "../scripts/date";

const VideoDescription = ({ video }) => {
    const date = formatedDate(video.created_at)
    return (
        <div className='videoDescription'>
            <h1>{video.name}</h1>
            <h2>{video.description}</h2>
            {date}
        </div>
    );
};


export default VideoDescription;