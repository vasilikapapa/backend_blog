import React from 'react';
import { BlogPost as BlogPostType } from '../../context/blogPostContext'; 

// Component to display a single blog post
const BlogPost: React.FC<BlogPostType> = ({ _id, title, body, author, date }) => {
    return (
        <div className="blog-post" key={_id}>
            <h2>{title}</h2>
            <p>{body}</p>
            <footer>
                <small>Written by {author} on {new Date(date).toLocaleDateString()}</small>
            </footer>
        </div>
    );
};

export default BlogPost;
