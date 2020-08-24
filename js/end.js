const recentScore = document.getElementById('totalscore');
const username = document.getElementById('username');
const saveButton = document.getElementById('saveScore');
const SHOW_HIGH_SCORES = 3; 

const highScores = JSON.parse(localStorage.getItem('highscores')) || [];
recentScore.innerText = localStorage.mostRecentScore;
username.addEventListener('keyup', () => {
    saveButton.disabled = !username.value;
});

function saveHighscore(event) {
    event.preventDefault();

    const score = {
        score: localStorage.mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(SHOW_HIGH_SCORES);
    localStorage.setItem('highscores', JSON.stringify(highScores));
    window.location.assign('/index.html');
}