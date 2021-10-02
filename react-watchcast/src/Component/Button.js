import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const Button = ({ color, text, link }) => {
  return (
    <Link to={link}>

      <button
        style={{ backgroundColor: color }}
        className='btn'
      >
        {text}
      </button>
    </Link>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

export default Button