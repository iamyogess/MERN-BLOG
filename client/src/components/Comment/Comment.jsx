import React, { useState } from "react";
import CommentItems from "./CommentItems";

const Comment = () => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      display: "Hello!",
      children: [
        {
          id: 2,
          display: "Hii!",
          children: [
            {
              id: 3,
              display: "Awesome!",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      display: "Godddd!!",
      children: [],
    },
  ]);

  const handleInputCommentChange = (e) => {
    setInput(e.target.value);
  };

  const newComment = (text) => ({
    id: new Date().getTime(),
    display: text,
    children: [],
  });

  const handleNewComment = (e) => {
    e.preventDefault();
    if (input) {
      setComments([...comments, newComment(input)]);
      setInput("");
    }
  };

  const addReply = () => {}; // Implement this if you want to add replies

  return (
    <section className="container w-full mx-auto my-6">
      <form onSubmit={handleNewComment}>
        <div>
          <input
            className="outline px-8 py-2 my-3"
            type="text"
            placeholder="Your Comment"
            name="comment"
            id="comment"
            value={input}
            onChange={handleInputCommentChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md"
          >
            Post
          </button>
        </div>
        <div>
          {comments.map((item) => (
            <CommentItems key={item.id} comment={item} addReply={addReply} />
          ))}
        </div>
      </form>
    </section>
  );
};

export default Comment;
