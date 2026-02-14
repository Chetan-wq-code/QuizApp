import React, { useState } from "react";
import CategoryScreen from "./components/CategoryScreen";
import QuestionCard from "./components/QuestionCard";
import ResultCard from "./components/ResultCard";
import { shuffleArray, decodeHTML } from "./util";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async (id, name) => {
    setLoading(true);
    setSelectedCategory(name);
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`);
      const data = await res.json();
      const formatted = data.results.map(q => ({
        question: decodeHTML(q.question),
        answer: decodeHTML(q.correct_answer),
        options: shuffleArray([q.correct_answer, ...q.incorrect_answers]).map(opt => decodeHTML(opt))
      }));
      setQuestions(formatted);
    } catch (err) { alert("Failed to fetch questions!"); }
    finally { setLoading(false); }
  };

  const handleAnswer = (ans) => {
    setSelectedAnswer(ans);
    if (ans === questions[currentIdx].answer) setScore(s => s + 1);
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1);
        setSelectedAnswer(null);
      } else { setShowResult(true); }
    }, 1500);
  };

  const restart = () => {
    setSelectedCategory(null); setQuestions([]); setCurrentIdx(0); setScore(0); setShowResult(false); setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl z-10">
        {loading ? (
          <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div><p className="text-blue-200">Loading trivia...</p></div>
        ) : !selectedCategory ? (
          <CategoryScreen onSelect={fetchQuestions} />
        ) : showResult ? (
          <ResultCard score={score} total={questions.length} onRestart={restart} />
        ) : (
          <>
            <div className="mb-8"><div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div></div></div>
            <QuestionCard data={questions[currentIdx]} handleAnswer={handleAnswer} selectedAnswer={selectedAnswer} />
          </>
        )}
      </div>
    </div>
  );
};
export default App;