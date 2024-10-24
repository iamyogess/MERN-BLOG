import React, { useRef, useState } from "react";

const CommentItems = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReplyBox(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };

  const handleCancelButton = () => {
    setShowReplyBox(false);
    setReplyText("");
  };

  const handleReplySave = (commentId) => {
    addReply(commentId, replyText);
    setShowReplyBox(false);
    setReplyText("");
  };

  const handleKeyDown = (e, commentId) => {
    if (e.key === "Enter") {
      handleReplySave(commentId);
    } else if (e.key === "Escape") {
      handleCancelButton();
    }
  };

  return (
    <div className="ml-4 mt-2">
      <li>
        {comment.display}
        {!showReplyBox && (
          <button
            className="px-2 py-1 text-sm text-gray-600"
            onClick={handleReply}
          >
            Reply
          </button>
        )}

        {showReplyBox && (
          <>
            <br />
            <input
              type="text"
              className="p-1 w-full mb-1"
              placeholder="Type your reply"
              ref={inputRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, comment.id)}
            />
            <button
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded mr-2"
              onClick={() => handleReplySave(comment.id)}
            >
              Save
            </button>
            <button
              className="px-3 py-1 bg-gray-400 text-white text-sm rounded"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </>
        )}

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
