import React, { useState } from 'react';
import { BlogPost as BlogPostType, useBlogPostContext } from '../../context/blogPostContext';
import BlogPost from './BlogPost';
import BlogPostForm from './BlogPostForm';
import './blogPostController.css'; // Ensure this is correctly linked

export const BlogPostController: React.FC = () => {
    const { blogPosts, deleteBlogPost } = useBlogPostContext();
    const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleAddClick = () => {
        setEditingPost({
            _id: '',
            title: '',
            body: '',
            author: '',
            date: new Date()
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setEditingPost(null);
        setShowModal(false);
    };

    return (
        <div className="blog-post-controller">
            <h1>My Blog</h1>
            <button onClick={handleAddClick}>Add New Post</button>
            {editingPost && (
                <BlogPostForm
                    post={editingPost}
                    onClose={handleCloseModal}
                    showModal={showModal}
                />
            )}
            <div className="blog-posts-container">
                {blogPosts.length > 0 ? (
                    blogPosts.map(post => (
                        <div key={post._id} className="blog-post-container">
                            <BlogPost {...post} />
                            <div className="button-container">
                                <button onClick={() => {
                                    setEditingPost(post);
                                    setShowModal(true);
                                }}>Edit</button>
                                <button onClick={() => deleteBlogPost(post._id)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Posts Available</p>
                )}
            </div>
        </div>
    );
};

export default BlogPostController;
