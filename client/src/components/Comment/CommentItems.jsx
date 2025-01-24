import React, { useRef, useState } from "react";

const CommentItems = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReplyBox(true);
    // Removed setTimeout as it's not necessary with autoFocus
  };

  const handleCancelButton = () => {
    setShowReplyBox(false);
    setReplyText("");
  };

  const handleReplySave = (commentId) => {
    if (replyText.trim()) {
      addReply(commentId, replyText.trim());
      setShowReplyBox(false);
      setReplyText("");
    }
  };

  const handleKeyDown = (e, commentId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySave(commentId);
    } else if (e.key === "Escape") {
      handleCancelButton();
    }
  };

  return (
    <div className="ml-4 mt-4">
      <li className="list-none">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-gray-800 mb-2">{comment.display}</p>
              {!showReplyBox && (
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 
                           transition-colors flex items-center gap-1"
                  onClick={handleReply}
                  aria-label={`Reply to comment: ${comment.display}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  Reply
                </button>
              )}
            </div>
          </div>

          {showReplyBox && (
            <div className="mt-3">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-400 resize-none"
                placeholder="Write your reply..."
                rows="2"
                ref={inputRef}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, comment.id)}
                autoFocus
                aria-label="Reply text"
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg
                           hover:bg-blue-700 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed"
                  onClick={() => handleReplySave(comment.id)}
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg
                           hover:bg-gray-200 transition-colors"
                  onClick={handleCancelButton}
                >
                  Cancel
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Press Esc to cancel, Enter to submit
              </p>
            </div>
          )}
        </div>

        {comment.children?.length > 0 && (
          <ul className="mt-2 space-y-2">
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