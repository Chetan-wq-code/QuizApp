import React from "react";

const QuizHeader = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold uppercase tracking-widest text-blue-500">
          Question {current + 1} / {total}
        </span>
      </div>
     <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner ">
        <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
        ></div>
        </div>
    </div>
  );
};

export default QuizHeader;