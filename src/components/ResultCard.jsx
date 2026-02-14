import React from "react";

const ResultCard = ({ score, total, onRestart }) => (
  <div className="text-center py-6 animate-bounceIn">
    <div className="text-7xl mb-6">🎉</div>
    <h2 className="text-4xl font-black text-white mb-2">Well Done!</h2>
    <p className="text-slate-400 text-lg mb-10">You scored <span className="text-blue-400 font-bold">{score}</span> out of <span className="text-white font-bold">{total}</span></p>
    <button onClick={onRestart} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
      Play Again
    </button>
  </div>
);
export default ResultCard;