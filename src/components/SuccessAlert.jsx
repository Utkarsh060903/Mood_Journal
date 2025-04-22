import React, { useEffect } from "react";

const SuccessAlert = ({ message, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
      {message}
    </div>
  );
};

export default SuccessAlert;
