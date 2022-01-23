import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useState, useEffect } from 'react';
function Home() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    let navigate = useNavigate();
    let [userPost, setUserPost] = useState([]);
    let [feeds, setFeeds] = useState([]);

    useEffect(() => {
        let getFeeds = async () => {
            await fetch('http://127.0.0.1:8000/api/feeds')
            .then((res)=>res.json())
            .then((r)=>{setFeeds(r)})
            .catch((e)=>console.log(e));
        }
        getFeeds();
    }, []);
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

    function viewFeed() {
        document.getElementById('profile-cont').style.display = 'none';
        document.getElementById('main-cont').style.display = 'block';
        document.getElementById('profile').classList.remove('active-nav');
        document.getElementById('notif').classList.remove('active-nav');
        document.getElementById('home').classList.add('active-nav');
    }
    async function viewProfile() {
        document.getElementById('profile-cont').style.display = 'block';
        document.getElementById('main-cont').style.display = 'none';
        document.getElementById('profile').classList.add('active-nav');
        document.getElementById('home').classList.remove('active-nav');
        document.getElementById('notif').classList.remove('active-nav');

        if(!user) {
            navigate('/login');
        } else {
            await fetch('http://127.0.0.1:8000/api/u/'+user.unm)
            .then((res)=>res.json())
            .then((r)=>{setUserPost(r)
                console.log(r);
            })
            .catch((e)=>console.log(e));
        }
    }
    return (
        <div className="container">
            <Header />
            <div className='inner-container'>
                <div className='left-nav'>
                    <div>
                        <nav className='active-nav' onClick={viewFeed} id='home'>Home</nav>
                        <Link to='/addpost'><nav id='exp'>Explore</nav></Link>
                        <nav id='notif'>Notification</nav>
                        <nav onClick={viewProfile} id='profile'>Profile</nav>
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
                    <div className='in-cont' id='main-cont'>
                        {
                            
                            feeds && feeds.msg === 'empty' ? 'No Posts Yet' : feeds && feeds.msg === 'success' ?
                            feeds.posts.map((post) => 
                            !user ? 
                            <div key={post.id} className="post-container">
                                <div className="post-head">
                                    {post.user.name}
                                    <span className='post-time'>{post.created_at}</span>
                                </div>
                                <div className="post-body">
                                    <span className="post-title">{post.title}</span>
                                    {post.post}
                                    <div className="post-img-cont">
                                        <img src={'http://127.0.0.1:8000/storage/'+post.file} alt='notAvailable...' />
                                    </div>
                                </div>
                            </div> :
                            user && user.id !== post.user.id ?
                            <div key={post.id} className="post-container">
                                <div className="post-head">
                                    {post.user.name}
                                </div>
                                <div className="post-body">
                                    <span className="post-title">{post.title}</span>
                                    {post.post}
                                    <div className="post-img-cont">
                                        <img src={'http://127.0.0.1:8000/storage/'+post.file} alt='notAvailable...' />
                                    </div>
                                </div>
                            </div>
                            : null
                            )
                            : feeds && feeds.msg === 'error404' 
                            ? feeds.msg : 'loading...'
                        }
                        
                    </div>
                    <div className='in-cont' id='profile-cont'>
                        {userPost && userPost.msg === 'success' ? <Profile uPost = {userPost} /> : userPost.msg === 'error404' ? 'server down' : 'Loading...' }
                        
                    </div>
                </main>
                <div className='right-nav'>
                    <nav>That</nav>
                </div>
            </div>
        </div>
    )
}

export default Home;