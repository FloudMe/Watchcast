import React from 'react'
import PropTypes from 'prop-types'

const Video = ({ uuid, imagePath, title, onClick }) => {
    return (
        <div className={`video`} onClick={() => onClick(uuid)}>
            {/* <img className={name} src={require(imagePath)} /> */}
            <h1>{title}</h1>
        </div>
    )
}

Video.propTypes = {
    onClick: PropTypes.func,
}

export default Video
