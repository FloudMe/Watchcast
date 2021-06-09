import { Link } from "react-router-dom";
import { FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                
                <Link to={"/videos"} style={{marginLeft: "1em", color: '#FFF', textDecoration: 'none'}}>WatchCast</Link>
                
                {/* {loggedUser && userRole === 'admin' && <Link to="/change-role">Użytkownicy</Link>} */}
                <FiSettings />
                
            </div>
        </nav>
    )
}

export default Navbar
