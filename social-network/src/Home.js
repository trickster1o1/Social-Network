import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import PostView from './PostView';
import PostComment from './PostComment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeTheme, defaultTheme } from './features/theme';
import { FcComments, FcLike, FcLikePlaceholder } from "react-icons/fc";

function Home() {
    let user = JSON.parse(localStorage.getItem('user-info'));
    let navigate = useNavigate();
    const [actionLog, setActionLog] = useState({}); 
    const [likeUpdate, setLikeUpdate] = useState({});
    let [userPost, setUserPost] = useState([]);
    let [feeds, setFeeds] = useState([]);
    let [noPost,setNoPost] = useState(2);
    let [reply,setReply] = useState({});
    let [showReply, setShowReply] = useState('none');
    let [meter, setMeter] = useState(0);
    let param = useParams();
    let [theme,setTheme] = useState('');
    const dispatch = useDispatch();
    let cthm = useSelector((state)=>state.theme.value);
    const [like,setLike] = useState({});
    useEffect(() => {
        let getFeeds = async () => {
            document.getElementById('profile-cont').style.display = 'none';
            document.getElementById('post-view').style.display = 'none';
            document.getElementById('main-cont').style.display = 'block';
            document.getElementById('profile').classList.remove('active-nav');
            document.getElementById('notif').classList.remove('active-nav');
            document.getElementById('home').classList.add('active-nav');
            await fetch('http://127.0.0.1:8000/api/feeds')
            .then((res)=>res.json())
            .then((r)=>{setFeeds(r)})
            .catch((e)=>console.log(e));

            
        }
        let getProfile = async () => {
            document.getElementById('post-view').style.display = 'none';
            document.getElementById('profile-cont').style.display = 'block';
            document.getElementById('main-cont').style.display = 'none';
            document.getElementById('home').classList.remove('active-nav');
            document.getElementById('notif').classList.remove('active-nav');
            if(param && param.user) {
                document.getElementById('profile').classList.remove('active-nav');
                await fetch('http://127.0.0.1:8000/api/u/'+param.user)
                .then((res)=>res.json())
                .then((r)=>{setUserPost(r)})
                .catch((e)=>console.log(e));
            } else {
                if(!user) {
                    navigate('/login');
                } else {
                    document.getElementById('profile').classList.add('active-nav');
                    await fetch('http://127.0.0.1:8000/api/u/'+user.unm)
                    .then((res)=>res.json())
                    .then((r)=>setUserPost(r))
                    .catch((e)=>console.log(e));
                }
            }
            
        }
        let getPost = () => {
            document.getElementById('post-view').style.display = 'flex';
            document.getElementById('profile-cont').style.display = 'none';
            document.getElementById('main-cont').style.display = 'none';
            document.getElementById('home').classList.remove('active-nav');
            document.getElementById('notif').classList.remove('active-nav');

        }
        if(param && param.page === 'home') {
            getFeeds();
        } else if (param && param.page === 'profile') {
            getProfile();
        } else if(param && param.page === 'post'){
            if(!param.user) {
                navigate('/home');
            } else {
                getPost();
            }
        } else {
            navigate('/home');
        }
        if(theme !== '') {
            if(theme === 'light') {
                dispatch(defaultTheme());
            } else {
                dispatch(changeTheme(theme));
            }
        }
        
        let hideTheme = document.querySelectorAll('.inner-container > div:not(.left-nav), main');
        document.querySelectorAll('.inner-container  div:not(pop-out), .inner-container div:not(popperCont)').forEach(pp => {
            pp.addEventListener('click', function() {
             document.getElementById('pop-out').style.display = 'none';
            })
        });
        hideTheme.forEach(ht => {
           
            ht.addEventListener('click',function(){
                document.getElementById('td').style.display = 'none';
                document.getElementById('td-bg').style.display = 'none';

            });
 
        });
    }, [param, theme]);
    let pop = () => {
        document.getElementById('pop-out').style.display = 'block';

    }
    function logout() {
        localStorage.removeItem('user-info');
        window.location.reload();
    }

    function viewFeed() {
        navigate('/home');
    }
    function viewProfile() {
        if(!user) {
            navigate('/login');
        } else {
            navigate('/profile');
        }
    }

    let likePost = async (id, likes) => {
        if(!user) {
            navigate('/login');
        } else {
            await fetch('http://127.0.0.1:8000/api/likepost/'+user.id+'/'+id,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            }).then((res)=>res.json())
            .then((r)=>{
                console.log(r);
                setLike({...like, ['p'+id]: r.stat });
                setActionLog({...actionLog, ['p'+id]: r.lks ? r.lks : 'null'});
                setLikeUpdate({...likeUpdate, ['p'+id]: r.lcount === 0 ? 'null' : r.lcount})
            })
            .catch((e)=>console.log(e));
        }
        console.log(actionLog);
    }

   let replyPost = (post) => {
       setShowReply('flex');
       setReply(post);
       setMeter(meter+1);
   }

   let displayThemes = () => {
       if(document.getElementById('td').style.display === 'flex') {
            document.getElementById('td').style.display = 'none';
            document.getElementById('td-bg').style.display = 'none';
       } else {
         document.getElementById('td').style.display = 'flex';
         document.getElementById('td-bg').style.display = 'flex';
       }
   }

   let changeThm = (e) => {
       localStorage.setItem('user-theme',e);
       setTheme(e);
   }

   function setThm() {
        document.getElementById('td').style.display = 'none';
        document.getElementById('td-bg').style.display = 'none';
   }

    return (
        <div className="container">
            <Header />
            <div className='inner-container'>
                <div className='left-nav'>
                    <div className='d-nav'>
                        <nav className='active-nav' onClick={viewFeed} id='home'>Home</nav>
                        <Link to='/addpost'><nav id='exp'>Explore</nav></Link>
                        <nav id='notif' onClick={!user ? ()=>navigate('login') : ()=>navigate('/message')}>Notification</nav>
                        <nav id='display' onClick={displayThemes}>Display</nav>
                        <nav onClick={viewProfile} id='profile'>Profile</nav>
                            <div id='td-bg' style={{'backgroundColor': cthm === 'light' ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.2)'}}>
                            </div>
                            <div className='theme-display' id="td">
                                Themes here {cthm}
                                <div>
                                    <div className='form-check'>
                                        <label className='form-check-label' htmlFor='dark'>Dark</label>
                                        <input className='form-check-input' type="radio" id='dark' value='dark' name='theme' onChange={(e)=>changeThm(e.target.value)} checked={cthm === 'dark' ? true : false} />
                                    </div>
                                    <div className='form-check'>
                                        <label className='form-check-label' htmlFor='light'>Light</label>
                                        <input className='form-check-input' type="radio" id='light' value='light' name='theme' onChange={(e)=>changeThm(e.target.value)} checked={cthm === 'light' ? true : false} />
                                    </div>
                                </div>
                                <button className='btn btn-primary' onClick={setThm}>Set</button>
                            </div>
                    </div>
                    <nav className='mob-nav'>
                        <nav onClick={viewFeed}>
                            <img src={cthm === 'light' ? './home.svg' : './home-white.svg'} alt='h' />
                        </nav>
                        <Link to='/addpost'><nav>
                            <img src={cthm === 'light' ? './exp.svg' : './exp-white.svg'} alt='h' />
                        </nav></Link>
                        <nav id='notif'>
                            <img src={cthm === 'light' ? './notif.svg' : './notif-white.svg'} alt='h' />
                        </nav>
                        <nav onClick={viewProfile}>
                            <img src={cthm === 'light' ? './prof.svg' : './prof-white.svg'} alt='h' />
                        </nav>
                    </nav>
                    <div className='d-nav usr-lnk-exp' id='pop-out'>
                        <nav onClick={logout}>Logout</nav>
                    </div>
                    <div className='usr-lnk' id='popperCont'>
                        {user ? <nav id='popper' onClick={pop} >{user.unm}</nav> :
                            <Link to='/login'><nav>Login</nav></Link>
                        }
                    </div>
                </div>
                <main>
                    <div className='in-cont' id='main-cont'>
                        {
                            
                            feeds && feeds.msg === 'empty' ? 'No Posts Yet' : feeds && feeds.msg === 'success' ?
                            <>
                            {feeds.posts.slice(0, noPost).map((post) => 
                            !user ? 
                            <div key={post.id} className="post-container">
                                <div className="post-head">
                                <span className='profile_p'> <img src={ post && post.user && post.user.profile && post.user.profile.profile_pic !== null && post.user.profile.profile_pic !== 'null' ? 'http://127.0.0.1:8000/storage/'+post.user.profile.profile_pic : 'http://127.0.0.1:8000/storage/profile/default.jpg'} alt="error404" /> </span>
                                    <Link to={'/profile/'+post.user.unm}>{post.user.name}</Link>
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
                            
                            <div key={post.id} className="post-container">
                                
                                    <div className="post-head">
                                        <span className='profile_p'> <img src={post && post.user && post.user.profile && post.user.profile.profile_pic !== null && post.user.profile.profile_pic !== 'null' ? 'http://127.0.0.1:8000/storage/'+post.user.profile.profile_pic : 'http://127.0.0.1:8000/storage/profile/default.jpg'} alt="error404" /> </span>
                                        <Link to={'/profile/'+post.user.unm}>{post.user.name}</Link>
                                    </div>
                                    <div className="post-body">
                                    <Link to={'/post/'+post.id}>
                                        <span className="post-title">{post.title}</span>
                                        {post.post}
                                        <div className="post-img-cont">
                                            <img src={'http://127.0.0.1:8000/storage/'+post.file} alt='notAvailable...' />
                                        </div>
                                        
                                    </Link>
                                    </div>
                                {likeUpdate['p'+post.id] && likeUpdate['p'+post.id] != 'null' ?
                                <div className="post-msg">{ likeUpdate['p'+post.id] } likes</div>
                                :
                                likeUpdate['p'+post.id] && likeUpdate['p'+post.id] == 'null' ? null
                                :post.like !== null && post.like.like_count !== '0' ?
                                    <div className="post-msg">{likeUpdate['p'+post.id] && likeUpdate['p'+post.id] != 'null' ? likeUpdate['p'+post.id] : post.like.like_count } likes</div>
                                    : null
                                }
                                <div className='post-tail'>
                                    <div onClick={()=>likePost(post.id, post.like.likes ? post.like.likes : '' )} id={'like'+post.id}   >
                                        {
                                            like['p'+post.id] ? <FcLike /> : actionLog['p'+post.id] && actionLog['p'+post.id].includes(','+user.id+',') ? <FcLike /> : actionLog['p'+post.id] && !actionLog['p'+post.id].includes(','+user.id+',') ? <FcLikePlaceholder /> : (user && post.like !== null && post.like.likes && post.like.likes.includes(','+user.id+',')) ? <FcLike /> : <FcLikePlaceholder />
                                        }
                                        
                                    </div>
                                    <div onClick={()=>replyPost(post)}>
                                        <FcComments />
                                    </div>
                                </div>
                            </div>
                            
                            )}
                            <div onClick={()=>setNoPost(noPost+2)} className="more-post" style={noPost >= feeds.posts.length ? {'display':'none'} : {'display':'flex'}} >Load more</div>
                            </>
                            : feeds && feeds.msg === 'error404' 
                            ? feeds.msg : 'loading...'
                        }
                        
                    </div>
                    <div className='in-cont' id='profile-cont'>
                        {userPost && userPost.msg === 'success' ? <Profile uPost = {userPost} /> : userPost.msg === 'error404' ? 'User not found' : 'Loading...' }
                    </div>
                    <div className='p-view' id='post-view'>
                        {param && param.user ? <PostView post={param.user} /> : null}
                    </div>

                </main>
                <div className='right-nav'>
                    <nav>That</nav>
                </div>
            </div>
                <PostComment post={reply} show={showReply} meter={meter} />
            
        </div>
    )
}

export default Home;