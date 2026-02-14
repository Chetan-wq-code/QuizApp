import React from "react";

const QuestionCard = ({ data, handleAnswer, selectedAnswer }) => {
  if (!data) return null;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-10 leading-tight text-white">{data.question}</h2>
      <div className="space-y-4">
        {data.options.map((opt, i) => {
          const isCorrect = opt === data.answer;
          const isSelected = selectedAnswer === opt;
          let btnClass = "bg-white/5 border-white/10 hover:bg-white/10";

          if (selectedAnswer) {
            if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
            else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-400";
            else btnClass = "bg-white/5 border-white/5 opacity-40";
          }

          return (
            <button key={i} disabled={!!selectedAnswer} onClick={() => handleAnswer(opt)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center group ${btnClass}`}>
              <span className={`w-10 h-10 rounded-xl text-center leading-10 mr-5 font-white transition-all ${selectedAnswer && isCorrect ? "bg-green-500 text-white" : "bg-white/10"}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-semibold text-white text-lg">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default QuestionCard;