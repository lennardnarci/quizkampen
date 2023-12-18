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
let questionNumber = 0
const totalQuestionsAmount = 10
const maxQuestionTime = 10000;

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
const questionText = document.querySelector('.question-text')
const answerText1 = document.querySelector('.c-one .card-text')
const answerText2 = document.querySelector('.c-two .card-text')
const answerText3 = document.querySelector('.c-three .card-text')
const answerText4 = document.querySelector('.c-four .card-text')

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

/* Lägga till ikoner */
/* Korrekt ikon */
const correctIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const correctIconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

correctIconSvg.setAttribute('viewBox', '10 10 100 100')

correctIconPath.setAttribute('d','M45 80.8504L24.15 60.0004L17.05 67.0504L45 95.0004L105 35.0004L97.95 27.9504L45 80.8504Z');
correctIconPath.setAttribute('fill', 'black')

correctIconSvg.appendChild(correctIconPath);
/* Inkorrekt ikon */
const incorrectIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const incorrectIconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

incorrectIconSvg.setAttribute('viewBox', '10 10 100 100')

incorrectIconPath.setAttribute('d','M95 32.05L87.95 25L60 52.95L32.05 25L25 32.05L52.95 60L25 87.95L32.05 95L60 67.05L87.95 95L95 87.95L67.05 60L95 32.05Z');
incorrectIconPath.setAttribute('fill', 'black')

incorrectIconSvg.appendChild(incorrectIconPath);


let question

startbutton.addEventListener(('click'), () => {
    startGame()
})

for(let i = 0; i < answers.length; i++){
    answers[i].addEventListener(('click'), () => {
        console.log(checkAnswer(i))
        if (checkAnswer(i) === true) {
            progress.push(checkAnswer(i))
            correctAnswer(i)
            console.log(progress)
        } else {
            progress.push(checkAnswer(i))
            incorrectAnswer(i)
            console.log(progress)
        }
    })
}

function startGame() {
    containerDiv.classList.remove('start')
    startbuttons.remove()
    console.log('Start')
    loadNextQuestion()
    
}

function loadNextQuestion() {
    questionNumber++

    if (questionNumber < totalQuestionsAmount) {
       loadQuestion()
    } else {
        //EndGame
    }
    
    
}

function loadQuestion() {
    question = getRandomQuestion() 
    
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

function correctAnswer(i) {
    answers[i].classList.add('correct');
            answers[i].prepend(correctIconSvg)
            setTimeout(() => {
                loadNextQuestion()
                answers[i].classList.remove('correct')
                document.activeElement.blur()
                correctIconSvg.remove()
            }, 3000)
}

function incorrectAnswer(i) {
    answers[i].classList.add('incorrect');
            answers[i].prepend(incorrectIconSvg)
            setTimeout(() => {
                loadNextQuestion()
                answers[i].classList.remove('incorrect')
                document.activeElement.blur()
                incorrectIconSvg.remove()
            }, 3000)
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