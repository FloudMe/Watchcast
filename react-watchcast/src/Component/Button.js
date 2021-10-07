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

export default Button