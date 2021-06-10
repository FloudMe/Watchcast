import { useState } from 'react';
import { Link } from "react-router-dom";
import { FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    let [show, setShow] = useState(false);
    return (
        <nav className="navbar">
            <div className="links">
                
                <Link to={"/videos"} style={{marginLeft: "1em", color: '#FFF', textDecoration: 'none'}}>WatchCast</Link>
                
                {/* {loggedUser && userRole === 'admin' && <Link to="/change-role">Użytkownicy</Link>} */}
                <FiSettings onClick ={() => setShow(!show)} />
                {show && 
                    <div className='settings'>
                        <ul>
                            <Link to='/user-details'><li>User</li></Link>
                            <Link to='/logout'><li>Logout</li></Link>
                            {/* {userRole === 'admin' && <Link to='/change-role'><li>User</li></Link>} */}
                        </ul>
                    </div>}
                
                
            </div>
        </nav>
    )
}

// const on = (c) =>
// {
//     c = !c;
//     console.log('dupa');
//     return c;
// }

export default Navbar
