const questions = [

    {
        question: "Which language is used for web styling?",
        options: ["HTML", "Python", "CSS", "C++"],
        answer: 2
    },

    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        answer: 1
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Process Unit",
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Power Unit"
        ],
        answer: 1
    },

    {
        question: "Which tag is used for JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: 0
    }

];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    document.getElementById("timer").innerText =
        "Time: " + timeLeft;

    timer = setInterval(function () {

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time: " + timeLeft;

        if (timeLeft <= 0) {
            nextQuestion();
        }

    }, 1000);

    let q = questions[currentQuestion];

    document.getElementById("question").innerText =
        q.question;

    document.getElementById("progress").innerText =
        `Question: ${currentQuestion + 1}/${questions.length}`;

    for (let i = 0; i < 4; i++) {

        let btn = document.getElementById("btn" + i);

        btn.innerText = q.options[i];

        btn.classList.remove("correct");
        btn.classList.remove("wrong");

        btn.disabled = false;
    }
}

function checkAnswer(selected) {

    clearInterval(timer);

    let correctAnswer =
        questions[currentQuestion].answer;

    for (let i = 0; i < 4; i++) {

        let btn = document.getElementById("btn" + i);

        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.add("correct");
        }
    }

    if (selected === correctAnswer) {

        score++;

    } else {

        document.getElementById("btn" + selected)
            .classList.add("wrong");
    }

    document.getElementById("score").innerText =
        "Score: " + score;

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        clearInterval(timer);

        document.querySelector(".quiz-box").innerHTML = `
            <h2>Quiz Completed 🎉</h2>

            <h3>
                Your Final Score:
                ${score}/${questions.length}
            </h3>

            <button onclick="location.reload()">
                Restart Quiz
            </button>
        `;

        return;
    }

    loadQuestion();
}

loadQuestion();