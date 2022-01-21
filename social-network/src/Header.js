import { Link } from "react-router-dom";

function Header() {
    
    return(
        <div className="navB">
            <nav className="navB-container">
                <ul>
                <Link to='/'><li className="navB-content"><img className="m-logo" src='/Tlog.png' /></li></Link>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Header;