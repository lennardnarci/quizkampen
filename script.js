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

startbutton.addEventListener(('click'), () => {
    startGame()
    console.log('button pressed')
})

function startGame() {
    containerDiv.classList.remove('start')
    startbuttons.remove()
    console.log('Start')
    const question = getRandomQuestion()
    console.log(question['question'])
    questionText.innerHTML = question['question']
}