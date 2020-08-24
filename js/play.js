const currentCounter = document.getElementById('counter');
const maxQues = document.getElementById('max-ques');
const question = document.getElementById('question');
const options = Array.from(document.getElementsByClassName("choice-text"));
const progressBar = document.getElementById('progress');
// for (let i in options) {
//     console.log(i, options[i].innerHTML)
// }
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        "question": "To help you look up a command by its description rather than its name",
        "option1": "find",
        "option2": "Not possible",
        "option3": "which",
        "option4": "apropos",
        "answer" : 4
    },

    {
        "question": "How to check the mannual page of 'grep' command?",
        "option1": "man grep",
        "option2": "grep man",
        "option3": "help grep",
        "option4": "which grep",
        "answer" : 1
    },

    {
        "question": "Shortcut to cancel a command which you don't want to run?",
        "option1": "^X",
        "option2": "^A",
        "option3": "^R",
        "option4": "^C",
        "answer" : 4
    },

    {
        "question": "What is the mistake in that statement <span>/home/coder ls -l</span>?",
        "option1": "This statement is correct.",
        "option2": "The argument should be in middle",
        "option3": "The argument should be in end of the command",
        "option4": "The option should be in starting of statement",
        "answer" : 3
    }
]

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = questions.length;

let startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    maxQues.innerHTML = MAX_QUESTION;
    getNewQuestion();
}

let setHeader = () => {
    headup.getElementById('counter').innerHTML = questionCounter;
    headup.getElementById('max-ques').innerHTML = MAX_QUESTION;
}
let getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTION) {
        //show results page
        progressBar.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
        localStorage.setItem('mostRecentScore', score);
        return window.location.replace("/end.html");
    }
    
    progressBar.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
    questionCounter++;
    // score+=CORRECT_BONUS;
    currentCounter.innerHTML = questionCounter;
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    question.innerHTML = currentQuestion.question;
    options.forEach(option => {
        const number = option.dataset['number'];
        option.innerHTML = currentQuestion['option' + number];
    });
    availableQuestions.splice(randomIndex, 1);
    acceptingAnswers = true;
}

let updateScore = (result, item) => {
    const questionDiv = item.parentElement;
    var classToAdd = result ? 'success' : 'failure';
    console.log(item, result);
    score+=CORRECT_BONUS;
    questionDiv.classList.add(classToAdd);
    return classToAdd
} 
options.forEach(option => {
    option.addEventListener('click', event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = event.target;
        const selectedAnswer = selectedOption.dataset['number'];
        var result = (currentQuestion['answer'] == selectedAnswer);
        var addedClass = updateScore(result, event.target);
        setTimeout(() => {
            event.target.parentElement.classList.remove(addedClass);
            getNewQuestion();
            
        }, 1000);
        // getNewQuestion();
    });
})
startQuiz();