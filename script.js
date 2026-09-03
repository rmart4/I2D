// --- Utilitaires ---
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(count) {
  const pool = shuffle(QUESTION_BANK).slice(0, count);
  return pool.map(q => {
    const distractors = shuffle(ALL_TERMS.filter(t => t !== q.answer)).slice(0, 3);
    const options = shuffle([q.answer, ...distractors]);
    return { img: q.img, answer: q.answer, options };
  });
}

// --- Etat ---
let questions = [];
let currentIndex = 0;
let score = 0;

// --- Elements ---
const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionCounter = document.getElementById("question-counter");
const scoreLive = document.getElementById("score-live");
const questionImage = document.getElementById("question-image");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

document.querySelectorAll(".choice-btn[data-count]").forEach(btn => {
  btn.addEventListener("click", () => {
    const count = parseInt(btn.dataset.count, 10);
    startQuiz(count);
  });
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function startQuiz(count) {
  questions = buildQuestions(count);
  currentIndex = 0;
  score = 0;
  setupScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];
  questionCounter.textContent = `Question ${currentIndex + 1}/${questions.length}`;
  scoreLive.textContent = `Score : ${score}`;
  questionImage.src = q.img;
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");

  answersDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option, q.answer));
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(btn, selected, correct) {
  const buttons = answersDiv.querySelectorAll(".answer-btn");
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add("correct");
  });

  if (selected === correct) {
    score++;
    feedback.textContent = "Bonne réponse !";
    feedback.className = "feedback ok";
  } else {
    btn.classList.add("incorrect");
    feedback.textContent = `Faux — la bonne réponse était : ${correct}`;
    feedback.className = "feedback ko";
  }

  scoreLive.textContent = `Score : ${score}`;
  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultText.textContent = `Tu as obtenu ${score} / ${questions.length} bonnes réponses.`;
}
