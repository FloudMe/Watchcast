import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Video = ({ uuid, imagePath, title, onClick }) => {
    return (
        <Link to={{pathname: '/video/' + uuid}} onClick={refreshPage}>
        <div className={`video`} >
            {/* <img className={name} src={require(imagePath)} /> */}
            <h1>{title}</h1>
        </div>
        </Link>
    )
}

function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    });
}

Video.propTypes = {
    onClick: PropTypes.func,
}

export default Video
