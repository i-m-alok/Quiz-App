const scoreTable = document.getElementById("highscore-table");

let addHighScore = () => {
    for (let i of JSON.parse(localStorage.getItem('highscores'))) {
        // console.log(i);
        let row = document.createElement('tr');
        let nameCol = document.createElement('td');
        let scoreCol = document.createElement('td');

        let name = document.createTextNode(i['name']);
        let score = document.createTextNode(i['score']);

        console.log(i['name'], i['score'], name, score);
        nameCol.appendChild(name);
        scoreCol.appendChild(score);
        // console.log(nameCol, scoreCol);
        row.appendChild(nameCol);
        row.appendChild(scoreCol);

        scoreTable.appendChild(row);
    };
};

addHighScore();