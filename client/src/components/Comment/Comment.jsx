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

  const addReply = (parentId, text) => {
    const copyComments = [...comments];
    addComments(copyComments, parentId, text);
    setComments(copyComments);
  };

  const addComments = (comments, parentId, text) => {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
        return;
      }
      if (comment.children.length > 0) {
        addComments(comment.children, parentId, text);
      }
    }
  };

  return (
    <section className="container w-full mx-auto my-4">
      <form onSubmit={handleNewComment}>
        <div>
          <input
            className="outline p-2 w-full mb-2"
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
            className="px-3 py-1 bg-gray-600 text-white rounded"
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
