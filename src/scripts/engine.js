const state = {
    view: {
squares: document.querySelectorAll(".square"),
enemy: document.querySelector(".enemy"),
timeLeft: document.querySelector("#time-left"),
score: document.querySelector("#score"),
lives: document.querySelector("#lives"),

    },

    values: { 
        
        gameVelocity: 800,
        hitPosition: 0, 
        result: 0,
        currentTime: 60,
        lives: 5,

    },

    actions: {
        timeId: null,
        countDownTimeId: null,
        speedIncreaseId: null,
    },
};

function playSound(audioName){
    let audio = new Audio(`src/audios/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function endGame() {
    state.values.currentTime = 0; 
    state.values.lives = Math.max(0, state.values.lives);
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = `x${state.values.lives}`;

        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        clearInterval(state.actions.speedIncreaseId);

        setTimeout(() => {
            alert("Game Over! O seu resultado foi: " + state.values.result);
            startGame();
        }, 100);
    }


function countDown() {
    if (state.values.currentTime > 0) {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
    }

    if (state.values.currentTime <= 0 || state.values.lives === 0) {
        endGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square)=>{
     square.addEventListener("mousedown", () => {
      if (state.values.currentTime > 0) {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");

    }   else if (state.values.lives > 0) {
        state.values.lives--;
        if (state.values.lives < 0) state.values.lives = 0; // Garante que nunca fique negativo
        state.view.lives.textContent = `x${state.values.lives}`;
        playSound("miss");
    }
    
    if (state.values.lives === 0) {
        endGame();
    }
}
      });
    });
  }

function increaseSpeed() {
    state.values.gameVelocity *= 0.85;
    clearInterval(state.actions.timeId);
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function startGame() {
    
    state.values.currentTime = 60;
    state.values.result = 0;
    state.values.gameVelocity = 800;
    state.values.lives = 5;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = `x${state.values.lives}`;

    
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timeId);
    clearInterval(state.actions.speedIncreaseId);

    
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimeId = setInterval(countDown, 1000);
    state.actions.speedIncreaseId = setInterval(increaseSpeed, 10000);
}

function initialize() {
    addListenerHitBox();
    startGame();
}

initialize();

