import React, { useState, useEffect } from 'react';
import QuillEditor from '../components/QuillEditor';
import './CreateBlog.css'

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Check if there are any existing blogs in local storage
    const existingBlogs = getExistingBlogs();

    // If there are existing blogs, set the blogs state with the existing blogs
    if (existingBlogs.length > 0) {
      setBlogs(existingBlogs);
    }
  }, []);

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };

  const handleEditorChange = (content) => {
    setBlogContent(content);
  };

  const handleSaveblog = () => {
    // Generate a unique key using the current timestamp as the id
    const id = Date.now();

    // Create a new blog object with the id, title, and content
    const newBlog = { id, title: blogTitle, content: blogContent };

    // Add the new blog to the existing blogs array and update the state
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);

    // Clear the title and editor content after saving
    setBlogTitle('');
    setBlogContent('');

    alert('Blog saved successfully!');
  };

  const handleViewBlog = () => {
    window.location.href = "/view";
  };

  const handleCreateBlog = () => {
    window.location.href = "/";
  };

  const getExistingBlogs = () => {
    // Retrieve the existing blogs array from local storage
    const blogsString = localStorage.getItem('blogs');
    if (blogsString) {
      return JSON.parse(blogsString);
    } else {
      return [];
    }
  };

  // Save the blogs array to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  return (
    <div className="create-blog-container">
    <nav className="navbar">
      <h1>Areeb's Blog Corner</h1>
      <div className="navbar-buttons">
        <button onClick={handleViewBlog}>View Blog</button>
        <button onClick={handleCreateBlog}>Create Blog</button>
      </div>
    </nav>
    <div className="create-blog-content">
      <h2 style={{border: 'black solid 1px', fontSize: 50}}>Create Blog</h2>
      <div className="blog">
      <input
        type="text"
        placeholder="Enter Blog Title"
        value={blogTitle}
        onChange={handleTitleChange}
        style={ {width: "20%"}}
      />
      <QuillEditor value={blogContent} onChange={handleEditorChange}/>
      </div>
      <div className="blog-buttons">
      <button onClick={handleSaveblog}>Save Blog</button>
      <button onClick={handleViewBlog}>View Blog</button>
      </div>
    </div>
  </div>
  );
};

export default CreateBlog;
