import { useNavigate } from "react-router-dom";

function Profile(props) {
    const navigate = useNavigate();
    
    function triggerEdit() {
        if(props.uPost.profile === null) {
            navigate('/setprofile/0');
        } else {
            navigate('/setprofile/1');
        }
    }
   const user = JSON.parse(localStorage.getItem('user-info'));
    return(
        <>
            <div className="profile-head">
                {
                    props.uPost.profile === null ? 
                    <div className="profile-cover">
                            <div className="profile-pic">
                                <img src='/logo512.png' alt='error404' />
                            </div>
                            <div className="profile-desc">
                                <span><b>{props.uPost.user.name}</b></span>
                                <p>Some text here</p>
                                {user && user.unm === props.uPost.user.unm ? <button className="btn btn-secondary" onClick={triggerEdit}>Edit</button> : null}
                            </div>
                        </div> 
                     :
                    <div className="profile-cover">
                            {
                                props.uPost.profile.cover_pic !== 'null' ?
                                <div className="cover-pic">
                                    <img src={'http://127.0.0.1:8000/storage/'+props.uPost.profile.cover_pic} alt='...' />
                                </div>
                                : null
                            }
                        <div className={props.uPost.profile.cover_pic !== 'null' ? "profile-pic wc" : "profile-pic"}>
                            
                            {
                                props.uPost.profile.profile_pic !== 'null' 
                                ? <img src={'http://127.0.0.1:8000/storage/'+props.uPost.profile.profile_pic} alt='error404' />
                                : <img src='/logo512.png' alt='error404' />
                            }
                        </div>
                        <div className="profile-desc">
                            <span><b>{props.uPost.user.name}</b></span>
                            <p>{props.uPost.profile.description}</p>
                            {user && user.unm === props.uPost.user.unm ? <button className="btn btn-secondary" onClick={triggerEdit}>Edit</button> : null}
                        </div>
                    </div>
                }
            </div>
            { props.uPost.posts.length === 0 ? 'No Posts yet' :
                props.uPost.posts.map((post) => 
                    <div key={post.id} className="post-container">
                        <div className="post-head">
                            {props.uPost.user.name}
                        </div>
                        <div className="post-body">
                            <span className="post-title">{post.title}</span>
                            {post.post}
                            <div className="post-img-cont">
                                <img src={'http://127.0.0.1:8000/storage/'+post.file} alt='notAvailable...' />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Profile;