import React, { useState, useEffect } from "react";

const FeedbackMessage = ({ message, onClearFeedbackClick }) => {
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);

    const timer = setTimeout(() => {
      onClearFeedbackClick();
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClearFeedbackClick]);

  if (message && visible) {
    const className = `alert alert-dismissible fade show mt-3 mb-3 ${
      message.isError ? "alert-danger" : "alert-success"
    }`;

    return (
      <div className={className} role="alert">
        {message.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => onClearFeedbackClick()}
        ></button>
      </div>
    );
  }

  return null;
};

export default FeedbackMessage;
