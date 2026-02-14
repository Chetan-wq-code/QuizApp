import React from "react";

const CategoryScreen = ({ onSelect }) => {
  const topics = [
    { name: "General Knowledge", id: 9, icon: "🌍", color: "from-blue-500 to-indigo-600" },
    { name: "Computers", id: 18, icon: "💻", color: "from-emerald-500 to-teal-600" },
    { name: "Science", id: 17, icon: "🔬", color: "from-purple-500 to-pink-600" },
    { name: "History", id: 23, icon: "📜", color: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="text-center animate-fadeIn">
      <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Quiz Master</h1>
      <p className="text-blue-200/60 mb-10 font-medium">Select a category to begin your challenge</p>
      <div className="grid gap-5">
        {topics.map((t) => (
          <button key={t.id} onClick={() => onSelect(t.id, t.name)} 
            className={`p-6 rounded-3xl bg-gradient-to-br ${t.color} hover:scale-[1.03] transition-all shadow-xl flex items-center justify-between group border border-white/10`}>
            <div className="flex items-center gap-5">
              <span className="text-3xl bg-white/20 p-3 rounded-2xl group-hover:rotate-12 transition-transform">{t.icon}</span>
              <span className="text-xl font-bold text-white">{t.name}</span>
            </div>
            <span className="text-2xl text-white/40 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default CategoryScreen;