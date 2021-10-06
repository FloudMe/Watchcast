import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => {
    return (
        <div>
            
            <h1>{comment.description}</h1>
        </div>
    )
}



export default Comment
