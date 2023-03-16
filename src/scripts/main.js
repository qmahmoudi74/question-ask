const addQuestionButton = document.getElementById("add-question");
const modal = document.getElementById("add-question-modal");
const questionSubject = document.getElementById("question-subject");
const questionText = document.getElementById("question-text");
const submitQuestion = document.getElementById("submit-question");
const discardQuestion = document.getElementById("discard-question");
const closeModal = document.getElementById("modal-close");

function isModalOpen(isOpen = false) {
  questionText.value = "";
  questionSubject.value = "";

  if (isOpen) modal.classList.remove("hidden");
  else modal.classList.add("hidden");
}

addQuestionButton.addEventListener("click", () => {
  isModalOpen(true);
});

submitQuestion.addEventListener("click", () => {
  addQuestion({
    commentsNumber: Math.floor(Math.random() * 30 + 1),
    content: questionText.value,
    title: questionSubject.value
  });

  isModalOpen(false);
});

discardQuestion.addEventListener("click", () => {
  isModalOpen(false);
});

closeModal.addEventListener("click", () => {
  isModalOpen(false);
});
