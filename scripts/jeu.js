const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'HTML est considéré comme ______ ?',
        choice1: 'Langage de programmation',
        choice2: 'Langage POO',
        choice3: 'Langage de haut niveau',
        choice4: 'Langage de balisage',
        answer: 4,
    },
    {
        question:
            "HTML utilise des ______?",
        choice1: "Balises définis par l’utilisateur",
        choice2: "Balises prédéfinis",
        choice3: "Balises fixes définis par le langage",
        choice4: "Balises uniquement pour les liens",
        answer: 3,
    },
    {
        question: "Si nous souhaitons définir le style d’un seule élément, quel sélecteur css utiliserons-nous?",
        choice1: "id",
        choice2: "test",
        choice3: "class",
        choice4: "name",
        answer: 1,
    },
    {
        question: "La balise HTML qui spécifie un style CSS intégré dans un élément est appelée ____?",
        choice1: "design",
        choice2: "style",
        choice3: "modify",
        choice4: "define",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/pages/fin.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()