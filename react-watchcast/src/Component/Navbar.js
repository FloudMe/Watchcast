import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import authentication from '../scripts/authentication';
import './Navbar.css';

const Navbar = () => {
    let [show, setShow] = useState(false);

    const userLog = authentication.currentUser();
    const userRole = authentication.userRole();

    return (
        <nav className="navbar">
            <div className="links">

                <Link className='watchcast'
                    to={"/videos"}
                    style={{ marginLeft: "1em", color: '#FFF', textDecoration: 'none' }}>WatchCast</Link>

                {userLog && <FiSettings onClick={() => setShow(!show)} viewBox="0 0 20 20" />}
                {show &&
                    <div className='settings'>
                        <ul>
                            <Link to='/user-details'><li>User</li></Link>
                            {userRole === 'admin' && <Link to='/change-role'><li>Users role</li></Link>}
                            <Link to='/' onClick={() => {
                                authentication.logout();

                            }}><li>Logout</li></Link>

                        </ul>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar
