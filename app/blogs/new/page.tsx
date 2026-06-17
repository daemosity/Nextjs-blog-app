const NewBlog = () => {
  return (
    <div>
      <h2>Create New Blog</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Title" />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" placeholder="Author" />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" placeholder="url" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
