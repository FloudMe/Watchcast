import React from 'react'
import formatedDate from '../scripts/date'

const Comment = ({ comment }) => {
    const date = formatedDate(comment.created_at)

    return (
        <div className='comment'>
            <div className='user'>
                <h1>{comment.user.first_name}</h1>
                <p>{date}</p>
            </div>
            <h2>{comment.description}</h2>
        </div>
    )
}

export default Comment
