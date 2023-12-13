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

