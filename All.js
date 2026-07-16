let quizQuestions = [
  {
    question: "What is JavaScript?",
    options: [
      "Programming Language",
      "Database",
      "Browser",
      "Operating System"
    ],
    answer: "Programming Language"
  },

  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: [
      "let",
      "int",
      "string",
      "float"
    ],
    answer: "let"
  },

  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      "//",
      "/* */",
      "#",
      "<!-- -->"
    ],
    answer: "//"
  },

  {
    question: "Which function is used to print output in the browser console?",
    options: [
      "console.log()",
      "print()",
      "document.write()",
      "echo()"
    ],
    answer: "console.log()"
  },

  {
    question: "Which company developed JavaScript?",
    options: [
      "Netscape",
      "Google",
      "Microsoft",
      "Apple"
    ],
    answer: "Netscape"
  },

  {
    question: "Which operator is used for strict equality?",
    options: [
      "===",
      "==",
      "=",
      "!="
    ],
    answer: "==="
  },

  {
    question: "Which method adds an element to the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    answer: "push()"
  },

  {
    question: "Which loop is used when the number of iterations is known?",
    options: [
      "for",
      "while",
      "do...while",
      "switch"
    ],
    answer: "for"
  },

  {
    question: "Which keyword is used to create a function?",
    options: [
      "function",
      "method",
      "create",
      "define"
    ],
    answer: "function"
  },

  {
    question: "Which event occurs when a button is clicked?",
    options: [
      "onclick",
      "onload",
      "onchange",
      "onmouseover"
    ],
    answer: "onclick"
  }
];

let index = 0;
let id;
let score = 0;

let submitted = [];
let userAnswers = [];

function getData(index) {

  clearInterval(id);

  let minute = 1;
  let second = 0;

  document.querySelectorAll(".timer span")[0].innerText = "01";
  document.querySelectorAll(".timer span")[1].innerText = "00";

  if (index == quizQuestions.length - 1) {
    document.querySelector(".next").disabled = true;
    document.querySelector(".next").classList.add("no-cursor");
  }
  else {
    document.querySelector(".next").disabled = false;
    document.querySelector(".next").classList.remove("no-cursor");
  }

  if (index == 0) {
    document.querySelector(".previous").disabled = true;
    document.querySelector(".previous").classList.add("no-cursor");
  }
  else {
    document.querySelector(".previous").disabled = false;
    document.querySelector(".previous").classList.remove("no-cursor");
  }

  document.querySelector(".questionList").innerHTML = `
        <article>

        <h2>${quizQuestions[index].question}</h2>

        <main>

        <aside>
        <input type="radio" name="option">
        <label>${quizQuestions[index].options[0]}</label>
        </aside>

        <aside>
        <input type="radio" name="option">
        <label>${quizQuestions[index].options[1]}</label>
        </aside>

        <aside>
        <input type="radio" name="option">
        <label>${quizQuestions[index].options[2]}</label>
        </aside>

        <aside>
        <input type="radio" name="option">
        <label>${quizQuestions[index].options[3]}</label>
        </aside>

        </main>

        </article>
    `;
  // Previous માં જઈએ ત્યારે જૂનો Answer ફરી Select થાય
  let radios = document.querySelectorAll("input[name='option']");
  let labels = document.querySelectorAll("label");

  if (userAnswers[index]) {

    labels.forEach((label, i) => {

      if (label.innerText == userAnswers[index]) {
        radios[i].checked = true;
      }

    });

  }

  // જો આ Question Submit થઈ ગયો હોય તો Radio Disable
  if (submitted[index]) {

    radios.forEach((radio) => {
      radio.disabled = true;
    });

  }

  // Timer Start
  id = setInterval(() => {

    if (second == 0) {

      if (minute == 0) {

        clearInterval(id);

        alert("Time Over");

        submitted[index] = true;

        document
          .querySelectorAll("input[name='option']")
          .forEach((radio) => {
            radio.disabled = true;
          });

        return;
      }

      minute--;
      second = 59;

    } else {

      second--;

    }

    document.querySelectorAll(".timer span")[0].innerText =
      minute.toString().padStart(2, "0");

    document.querySelectorAll(".timer span")[1].innerText =
      second.toString().padStart(2, "0");

  }, 1000);

} getData(index);

// NEXT BUTTON
document.querySelector(".next").onclick = function () {

  if (!submitted[index]) {
    alert("Please Submit Your Answer First.");
    return;
  }

  if (index < quizQuestions.length - 1) {
    index++;
    getData(index);
  }

}

// PREVIOUS BUTTON
document.querySelector(".previous").onclick = function () {

  if (index > 0) {
    index--;
    getData(index);
  }

}

// SUBMIT BUTTON
document.querySelector(".btn").onclick = function () {

  let option = document.querySelector("input[name='option']:checked");

  if (option == null) {
    alert("Please Select an Option");
    return;
  }

  // Answer પહેલાથી Submit થઈ ગયો હોય
  if (submitted[index]) {
    alert("Answer Already Submitted");
    return;
  }

  let userAnswer = option.nextElementSibling.innerText;

  userAnswers[index] = userAnswer;

  if (userAnswer == quizQuestions[index].answer) {

    score++;

    option.nextElementSibling.style.color = "green";

  } else {

    option.nextElementSibling.style.color = "red";

    let labels = document.querySelectorAll("label");

    labels.forEach((label) => {

      if (label.innerText == quizQuestions[index].answer) {
        label.style.color = "green";
      }

    });

  }

  submitted[index] = true;

  clearInterval(id);
    document
  .querySelectorAll("input[name='option']")
  .forEach((radio) => {
    radio.disabled = true;
  });

if (index == quizQuestions.length - 1) {

  setTimeout(() => {

    clearInterval(id);

    document.querySelector(".questionList").innerHTML = `
            <div style="text-align:center; padding:40px;">
                <h1>🎉 Quiz Completed 🎉</h1>
                <h2>Your Score</h2>
                <h1>${score} / ${quizQuestions.length}</h1>
            </div>
        `;

    document.querySelector(".button").style.display = "none";
    document.querySelector(".timer").style.display = "none";

  }, 500);

}
