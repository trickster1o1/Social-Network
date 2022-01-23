import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    let [user,setUser] = useState('');
    function srchUser(e) {
        if(e.key === 'Enter'){
            navigate('/u/'+user)
        }
    }
    return(
        <div className="navB">
            <nav className="navB-container">
                <ul>
                    <Link to='/'><li className="navB-content"><img className="m-logo" src='/Tlog.png' /></li></Link>
                </ul>
            </nav>
            <nav className="navB-container nav-right">
                <input type='text' placeholder="search" onKeyPress={(e)=>srchUser(e)} onChange={(e)=>setUser(e.target.value)} />
            </nav>
        </div>
    )
}

export default Header;