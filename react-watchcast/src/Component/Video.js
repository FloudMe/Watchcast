import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import imageSrc from '../public/play.jpg'
import formatedDate from '../scripts/date'
import './Video.css'

const Video = ({ uuid, title, description, created_at }) => {
    const date = formatedDate(created_at)

    return (
        <Link className='videosLink' to={{ pathname: '/video/' + uuid }} onClick={refreshPage}>
            <img className="videoImg" src={imageSrc} alt={title}/>
            <div className='videoText' >
                <h1>{title}</h1>
                <div className='descriptionAndCreated_at'>
                    <div className='description'>
                        {description}
                    </div>
                    <div className='created_at'>
                        {date}
                    </div>
                </div>

            </div>
        </Link>
    )
}

function refreshPage() {
    setTimeout(() => {
        window.location.reload(false);
    });
}

Video.propTypes = {
    onClick: PropTypes.func,
}

export default Video
