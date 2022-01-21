import Header from './Header';
import { Link } from 'react-router-dom';
function Home() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    
    let pop = () => {
        if(document.getElementById('pop-out').style.display === ''){
            document.getElementById('pop-out').style.display = 'block';
        }else if(document.getElementById('pop-out').style.display === 'none'){
            document.getElementById('pop-out').style.display = 'block';
        } else {
            document.getElementById('pop-out').style.display = 'none';
        }

    }
    function logout() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div className="container">
            <Header />
            <div className='inner-container'>
                <div className='left-nav'>
                    <div>
                        <nav className='active-nav'>Home</nav>
                        <Link to='/addpost'><nav>Explore</nav></Link>
                        <nav>Notification</nav>
                        <nav>Profile</nav>
                    </div>
                    <div className='usr-lnk-exp' id='pop-out'>
                        <nav onClick={logout}>Logout</nav>
                    </div>
                    <div className='usr-lnk'>
                        {user ? <nav id='popper' onClick={pop} >{user.unm}</nav> :
                            <Link to='/login'><nav>Login</nav></Link>
                        }
                    </div>
                </div>
                <main>
                    Main Cont
                </main>
                <div className='right-nav'>
                    <nav>That</nav>
                </div>
            </div>
        </div>
    )
}

export default Home;