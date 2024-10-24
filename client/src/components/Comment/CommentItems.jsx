import React, { useRef, useState } from "react";

const CommentItems = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReplyBox(!showReplyBox); // Toggle the visibility of the reply box
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  };

  const handleCancelButton = () => {
    setShowReplyBox(false);
    setReplyText("");
  };

  return (
    <div>
      <li>
        {comment.display}
        {!showReplyBox && (
          <button
            className="px-4 py-2 my-2 bg-purple-500 text-white font-bold mx-2 rounded-lg"
            onClick={handleReply}
          >
            Reply
          </button>
        )}
        {/* Show reply box if showReplyBox is true */}
        {showReplyBox && (
          <>
            <br />
            <input
              type="text"
              placeholder="Type your reply here"
              ref={inputRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <br />
            <button className="px-4 py-2 my-2 bg-blue-500 text-white font-bold rounded-lg">
              Save
            </button>
            <button
              className="px-4 py-2 my-2 bg-gray-500 text-white font-bold rounded-lg"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </>
        )}

        {/* Nested comments */}
        {comment.children.length > 0 && (
          <ul>
            {comment.children.map((item) => (
              <CommentItems key={item.id} comment={item} addReply={addReply} />
            ))}
          </ul>
        )}
      </li>
    </div>
  );
};

export default CommentItems;
