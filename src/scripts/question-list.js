const questions = JSON.parse(window.localStorage.getItem("questions") ?? "[]");
updateQuestionList();

function createQuestionCard({
  id = "",
  title = "",
  time = "",
  date = "",
  commentsNumber = 0,
  content = ""
}) {
  return `<section class="question-card">
  <header class="question-card__header">
  <div class="question-card__avatar">
  <img src="/src/images/avatar.png" alt="avatar" />
  </div>

  <div class="question-card__question-title">${title}</div>

              <span class="spacer"></span>

              <div class="question-card__date-time">
                <div class="question-card__time">
                  <span>ساعت:</span>
                  <span>${time}</span>
                  </div>

                  <div class="question-card__date">
                  <span>تاریخ:</span>
                  <span>${date}</span>
                  </div>
              </div>

              <div class="question-card__comments">
                <img src="/src/images/comment-icon.svg" alt="comments" />
                <span>${commentsNumber.toLocaleString("fa-IR", {
                  useGrouping: false
                })}</span>
                </div>
                </header>

                <div class="question-card__wrapper">
              <p>${content}</p>

              <button
                class="secondry"
                id="see-question-details"
                onclick="window.location.assign('/question.html?id=${id}')"
              >
              مشاهده جرئیات
              </button>
              </div>
              </section>`;
}

function updateQuestionList() {
  const questionList = document.getElementById("question-list");

  if (!questionList) return;

  questionList.innerHTML = (questions ?? [])
    .map((question) => createQuestionCard(question))
    .join(" ");
}

function addQuestion({ title = "", commentsNumber = 0, content = "" }) {
  questions.push({
    id: crypto.randomUUID(),
    title,
    time: new Date().toLocaleString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    date: new Date().toLocaleString("fa-IR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    commentsNumber,
    content
  });

  window.localStorage.setItem("questions", JSON.stringify(questions));

  updateQuestionList();
}
