import React, { useState, useEffect } from 'react';
 
function Toast({ data }) {
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [progressWidth, setProgressWidth] = useState(100);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressBar(false);
    }, 3000);
 
    const interval = setInterval(() => {
      setProgressWidth(prevWidth => prevWidth - (100 / 300));
    }, 10);
 
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
 
  return (
    <div>
      <div className={`fixed top-10 right-10 max-w-xs ${data.color === "green" ? "bg-green-700" : "bg-red-700"} text-sm text-white rounded-md shadow-lg mb-3 ml-3 `} role="alert">
        <div className="flex p-4">
          {data.message}
        </div>
        {showProgressBar && (
          <div className={`h-2 ${data.color === "green" ? "bg-green-400" : "bg-red-400"} rounded-lg`} style={{ width: `${progressWidth}%`, transition: 'width 0.01s linear' }} />
        )}
      </div>
    </div>
  );
}
 
export default Toast;
 
