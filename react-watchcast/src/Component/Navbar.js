const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to={"/"} style={{marginLeft: "0px"}}>WatchCast</Link>
                
                {loggedUser && userRole === 'admin' && <Link to="/change-role">Użytkownicy</Link>}
            </div>
        </nav>
    )
}

export default Navbar
