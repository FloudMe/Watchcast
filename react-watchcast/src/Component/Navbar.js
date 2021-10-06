import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom";
import authentication from '../scripts/authentication';
import './Navbar.css';

const Navbar = ({ userRole }) => {
    let [show, setShow] = useState(false);
    let [search, setSearch] = useState('');

    const buttonClick = (e) => {
        e.preventDefault();
        if (search !== '')
            alert(search);
    }
    return (
        <nav className="navbar">
            <div className="links">

                <Link to={"/videos"} style={{ marginLeft: "1em", color: '#FFF', textDecoration: 'none' }}>WatchCast</Link>

                <div className='searchBar'>
                    <input className='search' type='text' onChange={(e) => setSearch(e.target.value)} />
                    <button className='searchButton' type="button" onClick={buttonClick}>Click</button>
                </div>

                <FiSettings onClick={() => setShow(!show)} />
                {show &&
                    <div className='settings'>
                        <ul>
                            <Link to='/user-details'><li>User</li></Link>
                            <Link to='/' onClick={() => {
                                authentication.logout();

                            }}><li>Logout</li></Link>
                            {/* {userRole === 'admin' && <Link to='/change-role'><li>User</li></Link>} */}
                        </ul>
                    </div>}


            </div>
        </nav>
    )
}

export default Navbar
