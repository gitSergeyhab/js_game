const start = document.querySelector('#start');
const game = document.querySelector('#game');
const app = document.querySelector('.app')

const time = document.querySelector('#time');
const gameTime = document.querySelector('#game-time');

let score = 0;
time.textContent = gameTime.value;

const hideElement = (elem) => {
    elem.style.display = 'none';
    game.style.backgroundColor = 'white';
    app.style.backgroundColor = 'gray';
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

game.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('click-it')) {
        showFigure();
        score++;
    }
})

start.addEventListener('click', () => {
    hideElement(start);
    const interval = setInterval(() => {
        let nextTime = (parseFloat(time.textContent) - 0.1).toFixed(1);
        if (nextTime > 0) {
            time.textContent = nextTime;
        } else {
            time.textContent = 0;
            clearInterval(interval);
        }
        console.log(time.textContent);
    }, 100);
    showFigure();
});

