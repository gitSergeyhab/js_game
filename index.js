const start = document.querySelector('#start');
const game = document.querySelector('#game');
const app = document.querySelector('.app');
const resultHeader = document.querySelector('#result-header');

const time = document.querySelector('#time');
const gameTime = document.querySelector('#game-time');
const result = document.querySelector('#result');

let score = 0;
let gameOver = false;

time.textContent = gameTime.value;

const startGame = () => {
    gameOver = false;
    resultHeader.classList.add('hide');
    result.textContent = 0;
    score = 0;
    start.style.display = 'none';
    game.style.backgroundColor = 'white';
    app.style.backgroundColor = 'gray';
    gameTime.setAttribute('disabled', 'true');
}

const prepareNewGame = () => {
    start.style.display = 'block';
    game.style.backgroundColor = 'gray';
    app.style.backgroundColor = 'white';
    time.textContent = gameTime.value;
    game.innerHTML = '';
    gameTime.removeAttribute('disabled');
}

const randomSize = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const randomColor = () => {
    const colors = ['black', 'red', 'yellow', 'green', 'blue', 'orange'];
    return colors[Math.floor(colors.length * Math.random())];
}

const randomPosition = (size) => {
    const {width, height} = game.getBoundingClientRect();
    const figureWidth = randomSize(0, width - size);
    const figureHeight = randomSize(0, height - size);
    return [figureWidth, figureHeight];
}


const showFigure = () => {
    game.innerHTML = '';

    const figure = document.createElement('div');
    const size = randomSize(30, 100);
    const sizes = randomPosition(size);

    figure.style.backgroundColor = randomColor();
    figure.style.width = size + 'px';
    figure.style.height = size + 'px';
    figure.style.borderRadius = randomSize(0, 50) + '%';
    figure.style.position = 'absolute';
    figure.style.left = sizes[0] + 'px';
    figure.style.top = sizes[1] + 'px';
    figure.classList.add('click-it');

    game.insertAdjacentElement('afterbegin', figure);
}


const finishGame = () => {
    time.textContent = 0;
    gameOver = true;
    resultHeader.classList.remove('hide');
    result.textContent = score;
}

gameTime.addEventListener('input', () => time.textContent = gameTime.value)

game.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('click-it')) {
        if (!gameOver) {
            score++;
            showFigure();
        }
    }
})

start.addEventListener('click', () => {
    startGame();
    const interval = setInterval(() => {
        let nextTime = (parseFloat(time.textContent) - 0.1).toFixed(1);
        if (nextTime > 0) {
            time.textContent = nextTime;
        } else {
            clearInterval(interval);
            finishGame();
            prepareNewGame()
        }
    }, 100);
    showFigure();
});


