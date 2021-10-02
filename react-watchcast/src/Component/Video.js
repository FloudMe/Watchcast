import React from 'react'

const Video = ({ key, imagePath, title }) => {
    return (
        <div>
            {/* <img className={name} src={require(imagePath)} /> */}
            <h1>{title}</h1>
        </div>
    )
}

export default Video
