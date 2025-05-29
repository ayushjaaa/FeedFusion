import React, { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handlePostSubmit(e) {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    // For now just log the post data
    const postData = {
      title,
      content,
    };
    console.log("Posting article:", postData);

    // Reset form
    setTitle("");
    setContent("");

    alert("Article posted successfully!");
  }

  return (

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Post an Article</h2>
        <form className="space-y-6" onSubmit={handlePostSubmit}>
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Enter article title"
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Write your article content here..."
              rows={6}
            />
          </div>

          {/* Submit Button */}
     
        </form>
      </div>

  );
};

export default PostForm;
