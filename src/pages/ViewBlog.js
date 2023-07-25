import React from 'react';
import './ViewBlog.css';
const ViewBlogs = () => {
  // Retrieve blog objects from localStorage
  const getExistingBlogs = () => {
    const blogsString = localStorage.getItem('blogs');
    if (blogsString) {
      return JSON.parse(blogsString);
    } else {
      return [];
    }
  };

  const handleViewBlog = (content) => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newTab = window.open(url, '_blank');
    newTab.onload = () => URL.revokeObjectURL(url);
  };

  const handleCreateBlog = () => {
    window.location.href = "/";
  };

  const OpenViewBlog = () => {
    window.location.href = "/view";
  };



  const blogs = getExistingBlogs();

  return (
    <div>
       <nav className="navbar">
      <h1>Areeb's Blog Corner</h1>
      <div className="navbar-buttons">
        <button onClick={OpenViewBlog}>View Blog</button>
        <button onClick={handleCreateBlog}>Create Blog</button>
      </div>
    </nav>
      <h1>View Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>Blog ID: {blog.id}</p>
            <button onClick={() => handleViewBlog(blog.content)}>View Blog Details</button>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default ViewBlogs;
