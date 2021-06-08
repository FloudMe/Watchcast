import React from 'react'

const Video = ({imagePath, title}) => {
    return (
        <div>
            <img className='imagePath' src={require(imagePat)} />
            <h1>{title}</h1>
        </div>
    )
}

export default Video
