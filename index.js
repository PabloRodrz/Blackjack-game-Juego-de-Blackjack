document.getElementById("game").hidden = true
let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message = ''
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById('cards-el')
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById('player-el')
let player = {
  name: '',
  money: 0
}
const getRandomCard = () => {
  return Math.floor(Math.random() * 13) + 1
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('submit-btn').addEventListener('click', addPlayer)
})

const addPlayer = (ev) => {
  ev.preventDefault()
  let x = document.getElementById('input').value;
  if (!/^[A-zÀ-ú]*$/g.test(x)) {
    swal("Oh, no!", "You've to fill with your name", "warning")
    return false;
  }
  else if (x === "") {
    swal("Oh, no!", "You've to fill with your name", "warning")
    return false;
  }else{
    swal('Welcome!', ' ', 'success', {
      buttons: false,
      timer: 1500,  
    })

  }
    player.name = document.getElementById('input').value,
    player.money = 200

  document.getElementById('form').hidden = true
  document.getElementById("game").hidden = false
  playerEl.textContent = player.name + ': $' + player.money
}

const startGame = () => {
  document.getElementById('start-btn').disabled = true
  isAlive = true
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  sum = firstCard + secondCard
  cards = [firstCard, secondCard]
  renderGame()
}

const renderGame = () => {
  cardsEl.textContent = 'Cards: '
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += ' ' + cards[i]
  }

  sumEl.textContent = 'Sum: '
  sumEl.textContent += sum
  if (sum <= 20) {
    message = 'Do you want to draw a new card?'
  } else if (sum === 21) {
    message = "You've got Blackjack!"
    hasBlackjack = true
    player.money += 25
    document.getElementById('reset-btn').hidden = false
    document.getElementById('playagain-btn').hidden = false
  } else {
    message = "You're out of the game"
    isAlive = false
    player.money -= 25
    document.getElementById('reset-btn').hidden = false
    document.getElementById('playagain-btn').hidden = false
  }
  messageEl.textContent = message;
  playerEl.textContent = player.name + ': $' + player.money
}

const newCard = () => {
  if(isAlive === true && hasBlackjack === false){
    console.log('asd')
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
  }
}

const playAgain = () => {
  hasBlackjack = false
  cardsEl.textContent = 'Cards: '
  cards = []
  sumEl.textContent = 'Sum: '
  sum = 0
  document.getElementById('start-btn').disabled = false
  document.getElementById('newcard-btn').disabled = false
  document.getElementById('playagain-btn').hidden = true  
  document.getElementById('reset-btn').hidden = true
  messageEl.textContent = 'Want to play a round?'
}

const reset = () => {
  swal({
    title: "Are you sure?",
    text: "This will restart the entire game!",
    icon: "error",
    buttons: ['Cancel', 'Delete'],
    dangerMode: true,
    closeOnClickOutside: false
  })
  .then((willDelete) => {
    if (willDelete) {
      console.log('asd')
      document.getElementById('form').hidden = false
      document.getElementById("game").hidden = true
      player.name = ''
      player.money = 0
    } else {
    }
  });
}

