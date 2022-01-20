import Header from './Header';
import { Link } from 'react-router-dom';
function Home() {
    return (
        <div className="container">
            <Header />
            <div className='inner-container'>
                <div className='left-nav'>
                <Link to='/signup'><nav>Signup</nav></Link>
                    <nav>Login</nav>
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