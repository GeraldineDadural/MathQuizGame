const operations = ['+', '-', '*', '/'];
const totalQuestions = 2000;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", function () {
    generateQuestions();
    loadQuestion();
    document.getElementById("next-button").addEventListener("click", loadNextQuestion);
});

function generateQuestions() {
    for (let i = 0; i < totalQuestions; i++) {
        const num1 = getRandomInt(1, 10);
        const num2 = getRandomInt(1, 10);
        const operation = operations[getRandomInt(0, operations.length - 1)];
        let question = `${num1} ${operation} ${num2} =`;
        let correctAnswer;

        switch (operation) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = Math.round((num1 / num2) * 10) / 10;
                break;
        }

        const choices = generateChoices(correctAnswer);
        questions.push({ question, choices, correct: correctAnswer });
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChoices(correctAnswer) {
    const choices = [correctAnswer];
    while (choices.length < 3) {
        const randomChoice = getRandomInt(correctAnswer - 10, correctAnswer + 10);
        if (!choices.includes(randomChoice)) {
            choices.push(randomChoice);
        }
    }
    return shuffleArray(choices);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("next-button");
    feedbackElement.innerHTML = "";
    nextButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.className = "btn btn-outline-dark";
        button.addEventListener("click", () => {
            checkAnswer(choice, button);
            nextButton.disabled = false;
        });
        choicesElement.appendChild(button);
    });

    updateProgressBar();
}

function checkAnswer(selectedChoice, button) {
    const feedbackElement = document.getElementById("feedback");
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice === currentQuestion.correct) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        score++;
        button.classList.add("btn-success");
    } else {
        feedbackElement.textContent = "Oops! Try again.";
        feedbackElement.style.color = "red";
        button.classList.add("btn-danger");
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = `<h2>Well Done! Your score is ${score} out of ${totalQuestions}.</h2>`;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}