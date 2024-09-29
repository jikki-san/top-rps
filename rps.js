const choices = ["rock", "paper", "scissors"];

const capitalize = (str) => str[0].toUpperCase() + str.substring(1);

function getComputerChoice() {
  const choiceIndex = Math.floor(Math.random() * choices.length);
  return choices[choiceIndex];
}

function updateResultDisplay(msg) {
  const resultDisplay = document.querySelector("#results");
  resultDisplay.textContent = msg;
}

function updateScores(winner) {
  const humanScoreDisplay = document.querySelector("#humanScore");
  const cpuScoreDisplay = document.querySelector("#cpuScore");
  let currentHumanScore = +humanScoreDisplay.textContent;
  let currentCpuScore = +cpuScoreDisplay.textContent;

  if (winner === "human") {
    currentHumanScore += 1;
    humanScoreDisplay.textContent = `Human: ${currentHumanScore}`;
    if (currentHumanScore === 5) {
      updateWinner("Human");
    }
  } else if (winner === "computer") {
    currentCpuScore += 1;
    cpuScoreDisplay.textContent = `CPU: ${currentCpuScore}`;
    if (currentCpuScore === 5) {
      updateWinner("CPU");
    }
  }
}

function updateWinner(winner) {
  const winDisplay = document.querySelector("#winner");
  winDisplay.textContent = `${winner} wins!`;
}

function playRound(humanChoice, computerChoice) {
  const humanChoiceIndex = choices.findIndex(
    (choice) => choice === humanChoice
  );
  const computerChoiceIndex = choices.findIndex(
    (choice) => choice === computerChoice
  );

  if (humanChoiceIndex === computerChoiceIndex) {
    updateResultDisplay(`Tie game! You both played ${humanChoice}.`);
    return;
  }

  const event = new CustomEvent("win");
  let scoreDiv;

  if (humanChoiceIndex === (computerChoiceIndex + 1) % choices.length) {
    updateResultDisplay(
      `You win! ${capitalize(humanChoice)} beats ${computerChoice}.`
    );
    scoreDiv = document.querySelector("#humanScore");
  } else if (computerChoiceIndex === (humanChoiceIndex + 1) % choices.length) {
    updateResultDisplay(
      `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`
    );
    scoreDiv = document.querySelector("#cpuScore");
  }

  scoreDiv.dispatchEvent(event);
}

function getHumanChoice(event) {
  let humanChoiceIndex;

  switch (event.target.id) {
    case "rock":
      humanChoiceIndex = 0;
      break;
    case "paper":
      humanChoiceIndex = 1;
      break;
    case "scissors":
      humanChoiceIndex = 2;
      break;
  }

  playRound(choices[humanChoiceIndex], getComputerChoice());
}

const buttonContainer = document.querySelector("#buttonContainer");
buttonContainer.addEventListener("click", getHumanChoice);

const humanScoreDisplay = document.querySelector("#humanScore");
humanScoreDisplay.addEventListener("win", (event) => {
  let currentScore = +event.target.textContent;
  currentScore += 1;
  event.target.textContent = currentScore;
  if (currentScore === 5) {
    const gameWin = new CustomEvent("gameover", {
      detail: {
        winner: "human",
      },
    });
    const winDisplay = document.querySelector("#winner");
    winDisplay.dispatchEvent(gameWin);
  }
});

const cpuScoreDisplay = document.querySelector("#cpuScore");
cpuScoreDisplay.addEventListener("win", (event) => {
  let currentScore = +event.target.textContent;
  currentScore += 1;
  event.target.textContent = currentScore;
  if (currentScore === 5) {
    const gameWin = new CustomEvent("gameover", {
      detail: {
        winner: "computer",
      },
    });
    const winDisplay = document.querySelector("#winner");
    winDisplay.dispatchEvent(gameWin);
  }
});

const winDisplay = document.querySelector("#winner");
winDisplay.addEventListener("gameover", (event) => {
  event.target.textContent = `${capitalize(event.detail.winner)} wins!`;
});
