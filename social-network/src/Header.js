import { useNavigate, Link } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    function logout() {
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div className="navB">
            <nav className="navB-container">
                <ul>
                    {user ? <li className="navB-content" onClick={logout}>{user.unm}</li> : <Link to='/'><li className="navB-content">T</li></Link>}
                    
                </ul>
            </nav>
        </div>
    )
}

export default Header;