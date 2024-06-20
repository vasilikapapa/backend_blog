import React from 'react';
import './App.css';
import { BlogPostProvider } from './context/blogPostContext'; // Ensure the correct import path to the BlogPostProvider
import { BlogPostController } from './components/blogPostList/blogPostController'; // Ensure the correct import path to the BlogPostController

function App() {
  return (
    <div className="App">
     
        <BlogPostProvider>
          <BlogPostController />
        </BlogPostProvider>
    </div>
  );
}

export default App;
