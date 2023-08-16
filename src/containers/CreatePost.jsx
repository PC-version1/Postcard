import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addNewPost } from '../reducers';
import Navbar from '../components/Navbar';


const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  // const [addRequestStatus, setAddReuqestStatus] = useState('idle')

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new blog post using the input values
    const blogPost = {
      title,
      content,
      tags
  }
  const addData = async (blogPost) => {
    try{
      const response = await axios.post(`${POSTS_URL}/posts`, blogPost);
      console.log(blogPost);
      console.log(response)
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
  //i dont think we'll need to dispatch an action because there is no need to rerender after posting
    // dispatch(addNewPost(blogPost))

    setTitle('');
    setContent('');
  };
  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = (event) => {
    event.preventDefault();
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleClearTag = () => {
    setTags([]);
  }

  return (
    <>
    <Navbar />
    <div className="bg-slate-100 shadow-lg rounded-lg p-6 max-w-4xl mx-auto m-10">
      <h2 className="text-xl font-semibold mb-2">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-gray-800">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-800">Content</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="border border-gray-300 rounded p-2 w-full h-32 resize-none"
            required
          />
        </div>
        
        <div className="mt-4">
        <input
          type="text"
          placeholder="Add a tag..."
          value={tagInput}
          onChange={handleTagInputChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
          <div className="flex mt-4">
        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
        <ul className='flex space-x-10 mx-5'>
          {tags.map((tag, index) => (
            <li key={index} className="mb-2">
              {tag}
            </li>
          ))}
        </ul>
      </div>
          <button
          onClick={handleAddTag}
          className="mt-2 mx-1 bg-cyan-700 hover:bg-sky-600 text-white px-4 py-2 rounded  focus:outline-none"
        >
          Add Tag
        </button>
        <button
          onClick={handleClearTag}
          className="mt-2 mx-1 bg-cyan-700 hover:bg-sky-600 text-white px-4 py-2 rounded  focus:outline-none"
        >
          Clear Tags
        </button>
        <button
          type="submit"
          className="bg-cyan-700 hover:bg-sky-600 text-white px-4 py-2 mx-1 rounded  focus:outline-none float-right"
        >
          Create Post
        </button>
      </div>
     
      </form>
    </div>
    </>
  );
};

export default CreatePost;