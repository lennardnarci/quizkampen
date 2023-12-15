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
const questionText = document.querySelector('.question-text')
const answerText1 = document.querySelector('.c-one .card-text')
const answerText2 = document.querySelector('.c-two .card-text')
const answerText3 = document.querySelector('.c-three .card-text')
const answerText4 = document.querySelector('.c-four .card-text')

let question
let answer1
let answer2
let answer3
let answer4

startbutton.addEventListener(('click'), () => {
    startGame()
})

function startGame() {
    containerDiv.classList.remove('start')
    startbuttons.remove()
    console.log('Start')
    loadNextQuestion()
    
}

function loadNextQuestion() {
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