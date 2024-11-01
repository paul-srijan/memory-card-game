document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
  
    const cards = [
      "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍒", "🍒",
      "🍉", "🍉", "🍑", "🍑", "🍍", "🍍", "🥥", "🥥"
    ];
    let score = 0;
    let flippedCards = [];
    let matchedCards = 0;
    let timer;
    let timeElapsed = 0;
  
    // Shuffle and initialize game
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function startGame() {
      shuffle(cards);
      gameBoard.innerHTML = "";
      matchedCards = 0;
      flippedCards = [];
      score = 0;
      timeElapsed = 0;
      scoreDisplay.textContent = score;
      timerDisplay.textContent = timeElapsed;
      cards.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
      });
      clearInterval(timer);
      timer = setInterval(updateTimer, 1000);
    }
  
    function flipCard() {
      if (flippedCards.length === 2) return;
  
      const card = this;
      if (flippedCards.includes(card)) return;
  
      card.textContent = card.dataset.symbol;
      card.classList.add("flip");
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  
    function checkForMatch() {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards += 2;
        score += 10;
        scoreDisplay.textContent = score;
        if (matchedCards === cards.length) {
          clearInterval(timer);
          alert(`You win! Score: ${score}, Time: ${timeElapsed} seconds`);
        }
        flippedCards = [];
      } else {
        score -= 2;
        scoreDisplay.textContent = score;
        setTimeout(() => {
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          flippedCards = [];
        }, 1000);
      }
    }
  
    function updateTimer() {
      timeElapsed++;
      timerDisplay.textContent = timeElapsed;
    }
  
    startGame();
  });
  