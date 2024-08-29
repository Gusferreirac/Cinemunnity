function Post({ post, username }) {
return (
    <div className="flex flex-col justify-center items-center">
        <div className="bg-gray-200 p-4 space-y-8 rounded-md ">
            <div className="grid grid-cols-2">
                <span>{username}</span>
                <span className="text-right">{post.timestamp}</span>
            </div>
            <h1 className="text-center font-bold text-xl">{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.creation_date}</p>
            <div className='text-center space-x-4 pb-4'>
                {post.tags.map(tag => (
                    <span className='bg-gray-300 p-2 rounded-lg' key={tag}>{tag}</span>
                ))}
            </div>
        </div>
    </div>
);
}

export default Post;