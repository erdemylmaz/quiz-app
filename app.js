// let hasSetting = settingStatueDiv.classList.contains("active-setting");
hasSetting = true;

changeStatus = (e) => {
  if (hasSetting) {
    hasSetting = false;
    settingStatueDiv.classList.remove("active-setting");
  } else {
    hasSetting = true;
    settingStatueDiv.classList.add("active-setting");
  }
};

settingStatueDiv.addEventListener("click", changeStatus);

let positions = [];

initAnswers = (div, obj, hasSetting) => {
  let answersArea = div.querySelector(".answers");
  console.log(answersArea);

  //   select answers randomly
  let answers = [];

  for (let x = 0; x < 3; x++) {
    let randomNumber = Math.floor(Math.random() * questions.length);
    while (answers.indexOf(randomNumber) != -1) {
      randomNumber = Math.floor(Math.random() * questions.length);
    }

    answers.push(randomNumber);
  }

  if (answers.indexOf(obj.id) == -1) {
    let randomNumber = Math.floor(Math.random() * 2);
    answers[randomNumber] = obj.id;
  }

  //   init answers
  answers.map((answerID) => {
    let obj = questions[answerID];
    let div = document.createElement("div");
    div.className = "answer";
    div.setAttribute("data-value", answerID);

    div.innerHTML = `
		<div class="main-answer">${obj.answer}</div>
		  <div class="turkish-answer" data-value="${
        hasSetting ? obj.answerTurkish : ""
      }"></div>
	`;

    answersArea.appendChild(div);
  });
};

nextQuestion = (e) => {
  let currentQuestion = parseInt(e.currentTarget.dataset.index);

  //   questionsDiv.forEach((div) => {
  //     console.log(div.getBoundingClientRect().y);
  //   });

  //   let nextQuestionsPositionY = nextQuestion.getBoundingClientRect().y;

  //   console.log(currentQuestion + 1, questions.length);

  window.scrollTo({
    top: positions[currentQuestion + 1],
  });
};

checkAnswer = (e) => {
  let correctAnswerId = e.currentTarget.parentElement.dataset.correct;
  let checkedId = e.currentTarget.dataset.value;

  if (checkedId == correctAnswerId) {
    e.currentTarget.classList.add("correct-answer");
  } else {
    e.currentTarget.classList.add("wrong-answer");
    let answers = e.currentTarget.parentElement.querySelectorAll(".answer");

    answers.forEach((answer) => {
      if (answer.dataset.value == correctAnswerId) {
        answer.classList.add("correct-answer");
      }
    });
  }
};

initQuiz = (hasSetting) => {
  let randomList = [];

  for (let x = 0; x < questions.length; x++) {
    let randomNumber = Math.floor(Math.random() * questions.length);
    while (randomList.indexOf(randomNumber) != -1) {
      randomNumber = Math.floor(Math.random() * questions.length);
    }

    randomList.push(randomNumber);
  }

  let quizList = [];

  randomList.map((number) => {
    quizList.push(questions[number]);
  });

  quizList.map((obj, index) => {
    let div = document.createElement("div");
    div.className = "quiz";
    div.setAttribute("data-value", index);

    div.innerHTML = `
  <div class="quiz-title">
  	<div class="main-menu-btn"><i class="fas fa-arrow-left"></i></div>
  	<div class="main-title">${obj.question}</div>	
  	<div class="turkish-title" data-value="${
      hasSetting ? obj.questionTurkish : ""
    }"></div>
	</div>

	<div class="answers" data-correct = ${obj.id}>
	</div>

	${
    index != questions.length - 1
      ? `<div class="quiz-button" data-value="Next!" data-index=${index}></div>`
      : ""
  }

  `;

    initAnswers(div, obj, hasSetting);
    questionsDiv = document.querySelectorAll(".quiz");
    nextButtons = document.querySelectorAll(".quiz-button");
    answerButtons = div.querySelectorAll(".answer");
    let backBtn = div.querySelector(".main-menu-btn");

    backBtn.addEventListener("click", () => {
      mainScreen.style.display = "block";
      document.body.style.display = "flex";
      let quizs = document.querySelectorAll(".quiz");
      quizs.forEach((quiz) => {
        quiz.style.display = "none";
      });
    });

    nextButtons.forEach((btn) => {
      btn.addEventListener("click", nextQuestion);
    });

    answerButtons.forEach((btn) => {
      btn.addEventListener("click", checkAnswer);
    });

    if (index == questions.length - 1) {
      questionsDiv.forEach((div) => {
        positions.push(div.getBoundingClientRect().y);
      });
    }

    document.body.appendChild(div);
  });
};

// initQuiz(hasSetting);

function startQuiz() {
  // starting animation
  popUp.style.display = "flex";
  popUp.style.animationName = "popUpAnimation";
  setTimeout(() => {
    popUpTimer.textContent = "2";
  }, 1000);

  setTimeout(() => {
    popUpTimer.textContent = "1";
  }, 2000);

  setTimeout(() => {
    // change screen
    mainScreen.style.display = "none";
    document.body.style.display = "block";
    popUp.style.display = "none";

    initQuiz(hasSetting);
  }, 3000);
}

startQuizBtn.addEventListener("click", startQuiz);
