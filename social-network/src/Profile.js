function Profile(props) {
    return(
        <>
            { props.uPost.posts.length === 0 ? 'No Posts yet' :
                props.uPost.posts.map((post) => 
                    <div key={post.id} className="post-container">
                        <div className="post-head">
                            {props.userInfo.name}
                        </div>
                        <div className="post-body">
                            <span className="post-title">{post.title}</span>
                            {post.post}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Profile;