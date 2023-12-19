async function loadQuestions() {
    try {
      const response = await fetch('questions.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Kunde inte ladda frågor:', error);
    }
}

let questions = [] 
let progress = []
let Score = 0
let questionNumber = 0
const totalQuestionsAmount = 10
const maxQuestionTime = 10000;
let timerInterval;

loadQuestions()
  .then((data) => {
    for(let question of data){
        questions.push(question)
    }
})

  console.log(questions)

function getRandomQuestion() {
    const randomNumber = Math.floor(Math.random() * questions.length)
    return questions[randomNumber]
}


const containerDiv = document.querySelector('.container')
const startbuttons = document.querySelector('.startbuttons')
const startbutton = document.querySelector('.startbutton')

const qNumber = document.querySelector('.qnumber')
const timerElem = document.querySelector('.timer')
const questionText = document.querySelector('.question-text')
const answerText1 = document.querySelector('.c-one .card-text')
const answerText2 = document.querySelector('.c-two .card-text')
const answerText3 = document.querySelector('.c-three .card-text')
const answerText4 = document.querySelector('.c-four .card-text')

const cardDiv = document.querySelector('.cards')
const answer1 = document.querySelector('.c-one')
const answer2 = document.querySelector('.c-two')
const answer3 = document.querySelector('.c-three')
const answer4 = document.querySelector('.c-four')
const answers = [
    answer1, 
    answer2, 
    answer3, 
    answer4
]

const progressIcons = document.querySelectorAll('.result')

/* Lägga till ikoner */
/* Korrekt ikon */
const correctIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const correctIconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

correctIconSvg.setAttribute('viewBox', '10 10 100 100')

correctIconPath.setAttribute('d','M45 80.8504L24.15 60.0004L17.05 67.0504L45 95.0004L105 35.0004L97.95 27.9504L45 80.8504Z');
correctIconPath.setAttribute('fill', 'black')

correctIconSvg.appendChild(correctIconPath)
/* Inkorrekt ikon */
const incorrectIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const incorrectIconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

incorrectIconSvg.setAttribute('viewBox', '10 10 100 100')

incorrectIconPath.setAttribute('d','M95 32.05L87.95 25L60 52.95L32.05 25L25 32.05L52.95 60L25 87.95L32.05 95L60 67.05L87.95 95L95 87.95L67.05 60L95 32.05Z');
incorrectIconPath.setAttribute('fill', 'black')

incorrectIconSvg.appendChild(incorrectIconPath)
/* Timeout ikon */
const timeoutIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const timeoutIconPath1 = document.createElementNS('http://www.w3.org/2000/svg','path');
const timeoutIconPath2 = document.createElementNS('http://www.w3.org/2000/svg','path');

timeoutIconSvg.setAttribute('viewBox', '10 10 100 100')
timeoutIconSvg.setAttribute('class', 'timeout')

timeoutIconPath1.setAttribute('d','M42.0127 24.0068H78.0127V39.5468L63.0127 54.5468L67.2727 58.7468L84.0127 42.0068V18.0068H36.0127V27.5468L42.0127 33.5468V24.0068Z');
timeoutIconPath1.setAttribute('fill', 'black')

timeoutIconPath2.setAttribute('d','M17.5832 17.5803L13.3232 21.8403L52.7432 61.2603L36.0032 78.0003V102H84.0032V92.4603L98.1632 106.62L102.423 102.36L17.5832 17.5803ZM78.0032 96.0003H42.0032V80.4603L57.0032 65.4603L78.0032 86.4603V96.0003Z');
timeoutIconPath2.setAttribute('fill', 'black')

timeoutIconSvg.appendChild(timeoutIconPath1)
timeoutIconSvg.appendChild(timeoutIconPath2)


let question

startbutton.addEventListener(('click'), () => {
    startGame()
})

for(let i = 0; i < answers.length; i++){
    answers[i].addEventListener(('click'), () => {
        console.log(checkAnswer(i))
        if (checkAnswer(i) === true) {
            progress.push(checkAnswer(i))
            correctAnswer(i, questionNumber - 1)
            console.log(progress)
        } else {
            progress.push(checkAnswer(i))
            incorrectAnswer(i, questionNumber - 1)
            console.log(progress)
        }
    })
}

function startGame() {
    containerDiv.classList.remove('start')
    startbutton.remove()
    startbuttons.style.display = "none";
    console.log('Start')
    loadNextQuestion()
    
}
// Funktion som ger en ny fråga vid klick.
function loadNextQuestion() {
    questionNumber++

    if (questionNumber <= totalQuestionsAmount) {
       loadQuestion()
       startTimer()
    } else {
        Showscore()
    }
    
    
}

function loadQuestion() {
    question = getRandomQuestion() 
    
    timerElem.innerHTML = '00:10'
    console.log(question['question'])
    questionText.innerHTML = question['question']

    console.log(question['answers'][0]['text'])
    answerText1.innerHTML = question['answers'][0]['text']
    console.log(question['answers'][1]['text'])
    answerText2.innerHTML = question['answers'][1]['text']
    console.log(question['answers'][2]['text'])
    answerText3.innerHTML = question['answers'][2]['text']
    console.log(question['answers'][3]['text'])
    answerText4.innerHTML = question['answers'][3]['text']

    //Tar bort frågan från frågearrayen
    //Så man inte får samma fråga flera gånger
    const index = questions.indexOf(question)
    questions.splice(index, 1)

    //Ändrar i UI så att man kan se vilken fråga man är på
    qNumber.innerHTML = "Fråga " + questionNumber + " av 10"
}

function checkAnswer(x) {
    if (question['answers'][x]['correct'] === 'true') {
        return true
    }
    else if (question['answers'][x]['correct'] === 'false'){
        return false
    }
}



function playCorrectSound() {
  let correctaudio = new Audio("sounds/correct.mp3");
  correctaudio.play();
}


function correctAnswer(i, x) {
    clearInterval(timerInterval)
    disableAnswerButtons()
    Score++
    answers[i].classList.add('correct')
    answers[i].prepend(correctIconSvg)

    progressIcons[x].classList.add('correct')
    progressIcons[x].prepend(correctIconSvg.cloneNode(true))

   
    setTimeout(() => {
        loadNextQuestion()
        enableAnswerButtons()
        answers[i].classList.remove('correct')

        progressIcons[x].classList.remove('current-q')
        if (questionNumber <= totalQuestionsAmount) {
            progressIcons[x+1].classList.add('current-q')
        }

        document.activeElement.blur()
        correctIconSvg.remove()
    }, 3000)
    
    playCorrectSound();    
}


function playIncorrectSound() {
  let incorrectaudio = new Audio("sounds/wrong.mp3"); 
  incorrectaudio.volume = 0.5;
  incorrectaudio.play();
}


function incorrectAnswer(i, x) {
    clearInterval(timerInterval)
    disableAnswerButtons()

    answers[i].classList.add('incorrect')
    answers[i].prepend(incorrectIconSvg)

    progressIcons[x].classList.add('incorrect')
    progressIcons[x].prepend(incorrectIconSvg.cloneNode(true))

    setTimeout(() => {
        loadNextQuestion()
        enableAnswerButtons()
        answers[i].classList.remove('incorrect')
        
        progressIcons[x].classList.remove('current-q')
        if (questionNumber <= totalQuestionsAmount) {
            progressIcons[x+1].classList.add('current-q')
        }
        
        document.activeElement.blur()
        incorrectIconSvg.remove()
    }, 3000)

    playIncorrectSound();
}

function playtimeoutSound() {
  let timeoutaudio = new Audio("sounds/timeout.mp3"); 
  timeoutaudio.volume = 0.5;
  timeoutaudio.play();
}

function startTimer() {
    let timeRemaining = maxQuestionTime / 1000; 
  
    //Uppdaterar timern varje sekund
    timerInterval = setInterval(() => {
      timeRemaining--;
  
      //Visar tid kvar i formatet 00:00
      timerElem.innerHTML = "00:" + String(timeRemaining).padStart(2, '0')
  
      //Kolla om tiden runnit ut
      if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer
        handleTimeOut(questionNumber - 1);
        playtimeoutSound();
      }
    }, 1000);
   
  }

  function handleTimeOut(x) {
    console.log('timed out')
    disableAnswerButtons()

    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.add('incorrect')
      answers[i].prepend(timeoutIconSvg.cloneNode(true))
    }
    progressIcons[x].classList.add('incorrect')
    progressIcons[x].prepend(timeoutIconSvg.cloneNode(true))

    setTimeout(() => {
      loadNextQuestion()
      enableAnswerButtons()

      for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('incorrect')
      }

      progressIcons[x].classList.remove('current-q')
      if (questionNumber <= totalQuestionsAmount) {
          progressIcons[x+1].classList.add('current-q')
      }
      
      const timeoutIcons = document.querySelectorAll('.card .timeout')
      timeoutIcons.forEach((elem) => {
        elem.remove()
      })
    }, 3000)
  }

  function disableAnswerButtons() {
    answers.forEach(button => {
      button.disabled = true;
    });
  }
  
  function enableAnswerButtons() {
    answers.forEach(button => {
      button.disabled = false;
    });
  }

  function updateProgress() {
    //for (let i = 0; i < progress.length; i++) {
        
    //}
  }

  function Showscore(){
    questionText.innerHTML = "Du har fått " + Score + " av " + totalQuestionsAmount + " poäng!"
    cardDiv.remove()
    const playAgainButton = document.createElement('button');
    //skapar 3 element
    playAgainButton.classList.add('startbutton');
    const playAgaintext = document.createElement('h1');
    playAgaintext.textContent = 'Spela igen';
    playAgaintext.classList.add('startbutton-text')
    playAgainButton.appendChild(playAgaintext)
    startbuttons.style.display = "flex";
    startbuttons.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', () => {
        questionText.innerHTML = ''; 
        location.reload()
 
    });


  }


/*
Correct svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
    <path d="M45 80.8504L24.15 60.0004L17.05 67.0504L45 95.0004L105 35.0004L97.95 27.9504L45 80.8504Z" fill="black"/>
</svg>

Incorrect svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
    <path d="M95 32.05L87.95 25L60 52.95L32.05 25L25 32.05L52.95 60L25 87.95L32.05 95L60 67.05L87.95 95L95 87.95L67.05 60L95 32.05Z" fill="black"/>
</svg>
*/