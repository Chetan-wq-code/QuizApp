import React, { useState } from "react";
import CategoryScreen from "./components/CategoryScreen";
import QuizHeader from "./components/QuizHeader";
import QuestionCard from "./components/QuestionCard";
import ResultCard from "./components/ResultCard";
import { shuffleArray, decodeHTML } from "./util";

const App = () => {
  // State to track the currently selected category name (e.g., "Science", "History")
  const [selectedCategory, setSelectedCategory] = useState(null);
  // State to store the list of questions fetched from the API
  const [questions, setQuestions] = useState([]);
  // State to track the index of the current question being displayed
  const [currentIdx, setCurrentIdx] = useState(0);
  // State to keep track of the user's score (number of correct answers)
  const [score, setScore] = useState(0);
  // State to determine if the result screen should be shown
  const [showResult, setShowResult] = useState(false);
  // State to store the answer selected by the user for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State to manage the loading status during API calls
  const [loading, setLoading] = useState(false);

  // Function to fetch questions from the Open Trivia Database API
  const fetchQuestions = async (id, name) => {
    setLoading(true);
    setSelectedCategory(name);
    setLoading(true); // Start loading spinner
    setSelectedCategory(name); // Set the active category
    try {
      // Fetch 10 multiple choice questions for the selected category
      const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`);
      const data = await res.json();
      
      // Format the fetched data to match the app's structure
      const formatted = data.results.map(q => ({
        question: decodeHTML(q.question),
        answer: decodeHTML(q.correct_answer),
        question: decodeHTML(q.question), // Decode HTML entities in the question text
        answer: decodeHTML(q.correct_answer), // Decode the correct answer
        // Combine correct and incorrect answers, shuffle them, and decode them
        options: shuffleArray([q.correct_answer, ...q.incorrect_answers]).map(opt => decodeHTML(opt))
      }));
      setQuestions(formatted);
      setQuestions(formatted); // Update state with formatted questions
    } catch (err) { alert("Failed to fetch questions!"); }
    finally { setLoading(false); }
    finally { setLoading(false); } // Stop loading regardless of success or failure
  };

  // Function to handle when a user selects an answer
  const handleAnswer = (ans) => {
    setSelectedAnswer(ans);
    setSelectedAnswer(ans); // Mark the selected answer
    // Check if the selected answer is correct and update score
    if (ans === questions[currentIdx].answer) setScore(s => s + 1);
    
    // Wait for 1.5 seconds before moving to the next question or showing results
    // This delay allows the user to see the visual feedback (green/red)
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1);
        setSelectedAnswer(null);
      } else { setShowResult(true); }
        setCurrentIdx(i => i + 1); // Move to next question
        setSelectedAnswer(null); // Reset selected answer for the new question
      } else { setShowResult(true); } // End of quiz, show results
    }, 1500);
  };

  // Function to reset the game state to the initial screen
  const restart = () => {
    setSelectedCategory(null); setQuestions([]); setCurrentIdx(0); setScore(0); setShowResult(false); setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      {/* Background Glows - Decorative elements for visual appeal */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>

      {/* Main Card Container with Glassmorphism effect */}
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl z-10">
        {/* Conditional Rendering based on game state */}
        {loading ? (
          // Loading State
          <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div><p className="text-blue-200">Loading trivia...</p></div>
        ) : !selectedCategory ? (
          // Category Selection Screen
          <CategoryScreen onSelect={fetchQuestions} />
        ) : showResult ? (
          // Result Screen
          <ResultCard score={score} total={questions.length} onRestart={restart} />
        ) : (
          // Quiz Interface
          <>
            <QuizHeader current={currentIdx} total={questions.length} />
            <QuestionCard data={questions[currentIdx]} handleAnswer={handleAnswer} selectedAnswer={selectedAnswer} />
          </>
        )}
      </div>
    </div>
  );
};
export default App;