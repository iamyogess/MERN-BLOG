import React, { useRef, useState } from "react";

const CommentItems = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReplyBox(true);
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
    <>
      <div className="relative ml-4 mt-4">
        {/* Vertical connection line for nested comments */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
        
        <li className="list-none">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
            {/* Horizontal connection line */}
            <div className="absolute left-[-20px] top-8 w-4 h-px bg-gray-200" />
            
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                {/* Comment content */}
                <div className="flex items-start justify-between">
                  <p className="text-gray-800 text-base leading-relaxed">
                    {comment.display}
                  </p>
                </div>

                {/* Reply button */}
                {!showReplyBox && (
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 
                              text-sm font-medium text-blue-600 
                              hover:text-blue-700 hover:bg-blue-50 
                              rounded-md transition-all"
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

            {/* Reply form */}
            {showReplyBox && (
              <div className="mt-4 space-y-3">
                <textarea
                  className="w-full px-4 py-3 text-gray-700 border border-gray-200 
                            rounded-lg focus:ring-2 focus:ring-blue-500 
                            focus:border-transparent placeholder-gray-400 
                            resize-none bg-white transition-all"
                  placeholder="Write your reply..."
                  rows="3"
                  ref={inputRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, comment.id)}
                  autoFocus
                  aria-label="Reply text"
                />

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white font-medium 
                                rounded-lg hover:bg-blue-700 transition-colors 
                                disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:ring-offset-2"
                      onClick={() => handleReplySave(comment.id)}
                      disabled={!replyText.trim()}
                    >
                      Submit Reply
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-medium 
                                rounded-lg hover:bg-gray-200 transition-colors
                                focus:outline-none focus:ring-2 focus:ring-gray-500 
                                focus:ring-offset-2"
                      onClick={handleCancelButton}
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 italic">
                    Press Esc to cancel, Enter to submit
                  </p>
                </div>
              </div>
            )}
          </div>
        </li>

        {/* Nested replies */}
        {comment.children?.length > 0 && (
          <ul className="mt-2 space-y-2 relative">
            {comment.children.map((item) => (
              <CommentItems key={item.id} comment={item} addReply={addReply} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CommentItems;