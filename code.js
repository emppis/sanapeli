'use strict'
const input = document.querySelector('input')
const button = document.querySelector('button')

let words = []
let word = ''
let guess = ''
let attempts = 0
let gameOver = false

loadWords().then(() => {
    word = getRandomWord()
})


function loadWords() {
    return fetch('data/viisikirjaimiset.txt')
        .then(response => response.text())
        .then(text => {
            words = text.split('\n').map(w => w.trim().toLowerCase())
        })
}


function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

function getLetterColors() {

    let wordColors = ['black', 'black', 'black', 'black', 'black']
    const wordCopy = word.split("")

    for (let i = 0; i < 5; i++) {
        if (guess[i] === word[i]){
            wordColors[i] = 'green'
            wordCopy[i] = ''
        }
    }

    for (let i = 0; i < 5; i++) {
        if (wordColors[i] === 'green'){
            continue
        } if (wordCopy.includes(guess[i])){
            wordColors[i] = 'orange'
            const index = wordCopy.indexOf(guess[i])
            if (index !== -1) {
                wordCopy[index] = ''
            }
        }
    }
    return wordColors
}

function checkRows() {
  for (let r = 1; r <= 6; r++) {
    const row = document.getElementById('row' + r)
    let isEmpty = true

    for (let i = 0; i < 5; i++) {
      if (row.children[i].textContent !== '') {
        isEmpty = false
        break
      }
    }

    if (isEmpty) {
      checkLetters(row)
      break
    }
  }
}


function checkLetters(row) {

    if (!word) return

    const colors = getLetterColors()

    for (let i = 0; i < 5; i++) {
    
    const cell = row.children[i]
    cell.textContent = guess[i]
    cell.style.color = colors[i]
    }

    let greens = 0 
    for (let c = 0; c < 5; c++){
        if (colors[c] === 'green'){
            greens += 1
        }
    }

    if (greens === 5) {
        alert(`Voitit pelin ${attempts} arvauksella!`)
        gameOver = true
    }

    if (greens < 5 && attempts === 6) {
        alert(`Peli päättyi, oikea sana oli: ${word}`)
        gameOver = true
    }
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (gameOver || attempts >= 6) return
        guess = input.value.toLowerCase()

        if (input.value.length !== 5) {
            alert('Sanassa pitää olla viisi merkkiä!')
            return
        }
        if (!words.includes(guess)) {
            alert('Sanaa ei löydy sanalistasta!')
            return
        }

        attempts++
        checkRows();
        input.value = ''
    }
})


button.addEventListener('click', () => {


    for (let r = 1; r <= 6; r++) {
        const row = document.getElementById('row' + r)
        for (let i = 0; i < 5; i++) {
            const cell = row.children[i]
            cell.textContent = ''
            cell.style.color = 'black'
        }
    }
    attempts = 0
    input.value = ''
    gameOver = false
    word = getRandomWord()
})