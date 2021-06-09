import React from 'react'

const Video = ({name, imagePath, title}) => {
    return (
        <div>
            {/* <img className={name} src={require(imagePath)} /> */}
            <h1>{title}</h1>
        </div>
    )
}

export default Video
