// Fisher-Yates Shuffle Algorithm
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Decodes HTML entities like &quot; or &#039;
export const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};