import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface BlogPost {
    _id: string;
    title: string;
    author: string;
    body: string;
    date: Date;
}

export interface NewBlogPost {
    title: string;
    author: string;
    body: string;
    date: Date;
}

export interface BlogPostContextType {
    blogPosts: BlogPost[];
    fetchBlogPosts: () => void;
    addBlogPost: (post: NewBlogPost) => void;
    editBlogPost: (post: BlogPost) => void;
    deleteBlogPost: (id: string) => void;
}

const BlogPostContext = createContext<BlogPostContextType | null>(null);

export const useBlogPostContext = () => useContext(BlogPostContext)!;

export const BlogPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    const fetchBlogPosts = useCallback(async () => {
        try {
            const response = await axios.get<BlogPost[]>('http://localhost:3001/blog-posts');
            setBlogPosts(response.data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }, []);

    const addBlogPost = async (post: NewBlogPost) => {
        try {
            await axios.post('http://localhost:3001/create-blog-post', post);
            fetchBlogPosts();
        } catch (error) {
            console.error('Error adding blog post:', error);
        }
    };

    const editBlogPost = async (post: BlogPost) => {
        try {
            await axios.post(`http://localhost:3001/edit-blog-post/${post._id}`, post);
            fetchBlogPosts();
        } catch (error) {
            console.error('Error editing blog post:', error);
        }
    };

    const deleteBlogPost = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/delete-blog-post`, { data: { id } });
            fetchBlogPosts(); // Refresh blog posts from the server
        } catch (error) {
            console.log(id)
            console.error('Error deleting blog post:', error);
        }
    };
    

    useEffect(() => {
        fetchBlogPosts();
    }, [fetchBlogPosts]);

    return (
        <BlogPostContext.Provider value={{ blogPosts, fetchBlogPosts, addBlogPost, editBlogPost, deleteBlogPost }}>
            {children}
        </BlogPostContext.Provider>
    );
};
