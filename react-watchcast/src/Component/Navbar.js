function Navbar() {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to={"/"} style={{marginLeft: "0px"}}>WatchCast</Link>
                <Link to="/laptops">Laptopy</Link>
                <Link to="/phones">Telefony</Link>
                <Link to="/tablets">Tablety</Link>
                <Link to="/help" style={{marginRight: "0px"}}>Pomoc i kontakt</Link>
                {loggedUser && userRole === 'admin' && <Link to="/change-role">Użytkownicy</Link>}
            </div>
        </nav>
    )
}

export default Navbar
