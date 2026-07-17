const questions = [
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
      "var",
      "int",
      "string",
      "define"
    ],
    answer: "var"
  },

  {
    question: "Which method is used to print output in the console?",
    options: [
      "console.log()",
      "print()",
      "display()",
      "write()"
    ],
    answer: "console.log()"
  },

  {
    question: "Which symbol is used for single line comments in JavaScript?",
    options: [
      "//",
      "/* */",
      "#",
      "<!-- -->"
    ],
    answer: "//"
  },

  {
    question: "Which data type is used to store true or false values?",
    options: [
      "String",
      "Boolean",
      "Number",
      "Object"
    ],
    answer: "Boolean"
  },

  {
    question: "Which method adds a new element at the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    answer: "push()"
  },

  {
    question: "Which operator is used to compare both value and type?",
    options: [
      "==",
      "=",
      "===",
      "!="
    ],
    answer: "==="
  },

  {
    question: "Which function is used to convert JSON string into object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()"
    ],
    answer: "JSON.parse()"
  },

  {
    question: "Which loop is used to execute a block of code a specific number of times?",
    options: [
      "for loop",
      "if statement",
      "switch",
      "function"
    ],
    answer: "for loop"
  },

  {
    question: "Which keyword is used to create a function in JavaScript?",
    options: [
      "function",
      "method",
      "create",
      "def"
    ],
    answer: "function"
  }
];

let index = 0;
var id;
var timeUpQuestions = [];
var nextQuestions = [];
var score = 0;

function getData(index) {
  document.querySelectorAll(".timer span")[0].innerText = "01";
  document.querySelectorAll(".timer span")[1].innerText = "00";

  if (index == questions.length - 1) {
    document.querySelector(".next").disabled = true;
    document.querySelector(".next").classList.add("no-cursor");
  } else if (index == 0) {
    document.querySelector(".pre").disabled = true;
    document.querySelector(".pre").classList.add("no-cursor");
  } else if (index != 0) {
    document.querySelector(".pre").classList.remove("no-cursor");
    document.querySelector(".pre").disabled = false;
    document.querySelector(".next").disabled = false;
    document.querySelector(".next").classList.remove("no-cursor");
  }

  document.querySelector(".questionlist").innerHTML = `
         <article>
                <h2>${questions[index].question}</h2>
                <main>

                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[0]}" id="id1">
                    <label for="id1">${questions[index].options[0]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[1]}" id="id2">
                    <label for="id2">${questions[index].options[1]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[2]}" id="id3">
                    <label for="id3">${questions[index].options[2]}</label>
                    </aside>
                    <aside><input type="radio" name="mcq" form="myform" value="${questions[index].options[3]}" id="id4">
                    <label for="id4">${questions[index].options[3]}</label>
                    </aside>
                </main>
        </article>
    `;

  setTimeout(() => {
    document.querySelectorAll(".timer span")[0].innerText = "00";
    document.querySelectorAll(".timer span")[1].innerText = "59";
  }, 1000);

  setTimeout(() => {
    id = setInterval(() => {
      if (document.querySelectorAll(".timer span")[1].innerText == "0") {
        clearInterval(id);
        timeUpQuestions.push(index);

        if (index < questions.length - 1) {
          index++;
          getData(index);
        } else {
          document.querySelector("form").requestSubmit();
        }
        return;
      }
      document.querySelectorAll(".timer span")[1].innerText--;
    }, 1000);
  }, 1000);
}

getData(index);

document.querySelector(".next").onclick = function (event) {
  event.preventDefault();
  document.querySelector("form").requestSubmit();
};

document.querySelector(".pre").onclick = function (event) {
  event.preventDefault();
  index--;
  getData(index);
};

document.querySelector("form").onsubmit = function (event) {
  event.preventDefault();
  clearInterval(id);

  let options = document.querySelectorAll("input[name='mcq']");

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value == questions[index].answer) {
        score++;
      }
      break;
    }
  }

  if (index == questions.length - 1) {
    document.querySelector(".wrapper").style.display = "none";
    document.body.classList.add("final");

    let attempt;
    let wrong = attempt - score;
    let percentage = (score / questions.length) * 100;

    let result;

    if (percentage >= 40) {
      result = "Pass";
    } else {
      result = "Fail";
    }
    document.querySelector(".finalans").innerHTML = `
    Total Questions : ${questions.length} <br>
    Attempted : ${attempt} <br>
    Correct : ${score} <br>
    Wrong : ${wrong} <br>
    Final Score : ${score} / ${questions.length} <br>
    Percentage : ${percentage.toFixed(2)}% <br>
    Result : ${result}
`;

  }

  index++;
  getData(index);
};