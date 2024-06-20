import React, { useState } from 'react';
import { useBlogPostContext } from '../../context/blogPostContext';
import { BlogPost, NewBlogPost } from '../../context/blogPostContext';

import './blogPostForm.css'; // Make sure to import the correct path

interface BlogPostFormProps {
    post?: BlogPost;
    onClose: () => void;
    showModal: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onClose, showModal }) => {
    const { addBlogPost, editBlogPost } = useBlogPostContext();
    const [formData, setFormData] = useState({
        title: post?.title || '',
        body: post?.body || '',
        author: post?.author || '',
        date: post?.date || new Date()
    });

    if (!showModal) return null;  // Do not render if showModal is false

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (post?._id) {
            const updatedPost: BlogPost = { ...formData, _id: post._id, date: post.date };
            await editBlogPost(updatedPost);
        } else {
            const newPostData: NewBlogPost = { ...formData, date: new Date() };
            await addBlogPost(newPostData);
        }
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Body</label>
                        <textarea name="body" value={formData.body} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Author</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">{post ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogPostForm;
