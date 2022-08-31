const getDeckButton = document.querySelector(".button-getDeck");
const drawCardsButton = document.querySelector(".button-drawTwo");
const header = document.querySelector(".header");
const scorePlayer1DOM = document.querySelector(".scorePlayer1");
const scorePlayer2DOM = document.querySelector(".scorePlayer2");
const statusDOM = document.querySelector(".game-status");

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let status = "";

let deck_ID = "";
const cardsList = [...document.querySelectorAll(".card-slot")];
const fetchCards = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(resp => resp.json())
    .then(data => {
      document.querySelector(".game-status").textContent = "Deck Loaded!";
      deck_ID = data.deck_id;
    });
};
const drawTwo = () => {
  fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deck_ID}/draw/?count=2`
  )
    .then(resp => resp.json())
    .then(data => {
      const cardImages = data.cards.map(card => {
        return `
            <img src='${card.image}' class='card card-image'/>
            `;
      });
      //Assign card images to card slots
      cardsList.forEach((card, index) => {
        return (card.innerHTML = cardImages[index]);
      });
      [...document.querySelectorAll(".score-holder")].forEach(score => {
        score.style.display = "block";
      });
      return data;
    })
    .then(data => {
      const valuesArray = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "JACK",
        "QUEEN",
        "KING",
        "ACE",
      ];
      const card1 = data.cards[0].value;
      const card2 = data.cards[1].value;
      const card1Value = valuesArray.findIndex(card => card === card1);
      const card2Value = valuesArray.findIndex(card => card === card2);
      if (card1Value > card2Value) {
        scorePlayer1++;
        scorePlayer1DOM.textContent = `score: ${scorePlayer1}`;
        statusDOM.innerHTML = `<span>Player1 drew:</span> <span class='card-value'>${valuesArray[card1Value]}</span><span>and wins this round!</span>`;
        // return {
        //   status: "Player1 is Victorious",
        //   scorePlayer: scorePlayer1,
        //   remainingCards: data.remaining,
        // };
      } else if (card2Value > card1Value) {
        scorePlayer2++;
        scorePlayer2DOM.textContent = `score: ${scorePlayer2}`;
        statusDOM.innerHTML = `<span>Player2 drew:</span> <span class='card-value'>${valuesArray[card2Value]}</span><span>and wins this round!</span>`;
        // return "Player2 is Victorious";
        // return {
        //   status: "Player1 is Victorious",
        //   scorePlayer: scorePlayer2,
        //   remainingCards: data.remaining,
        // };
      } else {
        statusDOM.innerHTML = `<span>Both players drew:</span><span class='card-value'>${valuesArray[card2Value]}</span><span>It's a tie!</span>`;

        // return "Tie!";
      }
      document.querySelector(
        ".cards-quantity"
      ).innerHTML = `cards remaining: <h4 class='cards-quantity-number'>${data.remaining}</h4>`;
      if (data.remaining === 0) {
        drawCardsButton.disabled = true;
        if (scorePlayer1 > scorePlayer2) {
          statusDOM.innerHTML = `<span>Player1 wins</span><span>with score of </span><span class='card-value'>${scorePlayer1}</span>`;
        } else if (scorePlayer2 > scorePlayer1) {
          statusDOM.innerHTML = `<span>Player2 wins</span><span>with score of </span><span class='card-value'>${scorePlayer2}</span>`;
        } else {
          if (scorePlayer1 > scorePlayer2) {
            statusDOM.innerHTML = `<span>It's a tie!</span><span>both players reached score of </span><span class='card-value'>${scorePlayer1}</span>`;
          }
        }
        // header.style.order = 3;
        // drawCardsButton.style.order = 0;
      }
    });
  // .then(data => {
  //   console.log(data);
  //   const { status, scorePlayer, remainingCards } = data;
  //   console.log(status);
  //   document.querySelector(".game-status").innerHTML = status;
  //   if (remainingCards === 0) {
  //     // statusDOM.innerHTML = status;
  //   }
  // });
};
getDeckButton.addEventListener("click", fetchCards);
drawCardsButton.addEventListener("click", drawTwo);
