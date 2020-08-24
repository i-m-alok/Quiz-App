const recentScore = document.getElementById('totalscore');
const username = document.getElementById('username');
const saveButton = document.getElementById('saveScore');

const highScores = JSON.parse(localStorage.getItem('highscores')) || [];
recentScore.innerText = localStorage.mostRecentScore;
username.addEventListener('keyup', () => {
    saveButton.disabled = !username.value;
});

function saveHighscore(event) {
    event.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
}