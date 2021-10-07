import React from 'react'

const Comment = ({ comment }) => {
    const options = { 
        year: 'numeric', 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour : 'numeric', 
        minute: 'numeric', 
        second: 'numeric'
    }
    const date = new Date(comment.created_at)
    const formatedDate = date.toLocaleDateString("en-UK", options)
    return (
        <div>
            <h1>{comment.user.first_name} {formatedDate}</h1>
            <h1>{comment.description}</h1>
        </div>
    )
}

export default Comment
