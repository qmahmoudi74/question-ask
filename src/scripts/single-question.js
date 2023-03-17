const mainHeaderTitle = document.getElementById("main-header-title");
const singleQuestion = document.getElementById("single-question");
const answersList = document.getElementById("answers");
const answerText = document.getElementById("answer-text");
const submitAnswer = document.getElementById("submit-answer");

function searchToObject() {
  let pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for (i in pairs) {
    if (pairs[i] === "") continue;

    pair = pairs[i].split("=");
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return obj;
}

function createAnswerCard({
  id = "",
  userName = "",
  time = "",
  date = "",
  content = ""
}) {
  return `<section class="question-card">
  <header class="question-card__header">
  <div class="question-card__avatar">
  <img src="/src/images/avatar.png" alt="avatar" />
  </div>

  <div class="question-card__question-title">${userName}</div>

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
                </header>

                <div class="question-card__wrapper">
              <p>${content}</p>

              </div>
              </section>`;
}

const { id } = searchToObject();

const questionsList = JSON.parse(localStorage.getItem("questions") ?? "[]");
const question = questionsList.find((q) => q.id === id);

const answers = JSON.parse(
  window.localStorage.getItem("answers") ?? "[]"
).filter(({ qId }) => qId === id);

updateAnswerList();

function updateAnswerList() {
  answersList.innerHTML = (answers ?? [])
    .map((answer) => createAnswerCard(answer))
    .join(" ");
}

mainHeaderTitle.innerText = question.title;
singleQuestion.innerHTML = createQuestionCard(question);

function addAnswers({ qId, userName = "کاربر", content = "" }) {
  answers.push({
    id: crypto.randomUUID(),
    qId,
    userName,
    content,
    time: new Date().toLocaleString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    date: new Date().toLocaleString("fa-IR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  });

  window.localStorage.setItem("answers", JSON.stringify(answers));
  updateAnswerList();
}

submitAnswer.addEventListener("click", () => {
  addAnswers({ qId: id, content: answerText.value, userName: "کاربر" });
  answerText.value = "";
});
