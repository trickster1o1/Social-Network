import { useEffect, useState } from "react";

function PostComment(props) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    let [show, setShow] = useState('');
    useEffect(()=>{
        setShow(props.show);
    }, [props]);

    return (
        <div className='push-comment' style={props && props.show ? {'display':show} : null } id='p-cmnt'>
                <div className='push-comment-head'>
                    <span id="cmnt-cros" onClick={()=>setShow('none')} >X</span>
                </div>
                <div className="push-comment-body">
                    {props && props.post && props.post.user ?
                        <div className="comment-body-head">
                            <span className='p_p'> <img src={'http://127.0.0.1:8000/storage/'+props.post.user.profile.profile_pic} alt="error404" /> </span>
                            <span className='post-comment-head'><b>{props.post.user.name}</b>@{props.post.user.unm}</span>
                        </div>
                    : null}
                    <p>
                        {props.post.post}
                    </p>
                </div>
                <div className="push-comment-reply">
                    <textarea type='text' placeholder="reply" />
                </div>
        </div>
    );
}

export default PostComment;