const choices = ["rock", "paper", "scissors"];

const capitalize = (str) => str[0].toUpperCase() + str.substring(1);

function getComputerChoice() {
  const choiceIndex = Math.floor(Math.random() * choices.length);
  return choices[choiceIndex];
}

function getHumanChoice() {
  const choice = prompt("Rock, paper, or scissors?");
  // TODO: Add input validation to ensure only one of these three elements is chosen
  return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  const humanChoiceIndex = choices.findIndex(
    (choice) => choice === humanChoice
  );
  const computerChoiceIndex = choices.findIndex(
    (choice) => choice === computerChoice
  );
  // TODO: Add input validation (e.g. we don't find one or both of the indices)
  if (humanChoiceIndex === (computerChoiceIndex + 1) % choices.length) {
    console.log(`You win! ${capitalize(humanChoice)} beats ${computerChoice}.`);
    return "human";
  } else if (computerChoiceIndex === (humanChoiceIndex + 1) % choices.length) {
    console.log(
      `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`
    );
    return "computer";
  } else {
    console.log(`Tie game! You both played ${humanChoice}.`);
    return "draw";
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  // TODO: refactor to ignore ties in the round count
  for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const roundWinner = playRound(humanChoice, computerChoice);

    if (roundWinner === "human") {
      humanScore += 1;
    } else if (roundWinner === "computer") {
      computerScore += 1;
    }
  }

  console.log(`Final Scores: Human ${humanScore} - CPU ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("You win!");
  } else if (humanScore < computerScore) {
    console.log("You lose!");
  } else {
    console.log("Draw!");
  }
}

playGame();
