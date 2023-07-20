const questions= [
    {
        title: 'Как зовут автора приложения?',
        answer: ['Денис', 'Максим', 'Святослав', 'Алехандро'],
        correct: 2
    },
    {
        title: 'Был ли в сущности феодализм в России?',
        answer: ['Да', 'Нет', 'Нет, и я даже больше скажу: его и в Азии не было', 'Что такое феодализм?'],
        correct: 3
    },
    {
        title: 'С известным каким сериалом можно сравнить период раздробленности на Руси?',
        answer: ['Игра престолов', 'Кухня', 'Физрук', 'Дружба - это чудо!'],
        correct: 1
    },
    {
        title: 'Как вы думаете: это последний вопрос?',
        answer: ['Да', 'Нет'],
        correct: 1
    }
]

const headerContainer = document.getElementById('header')
const listContainer = document.getElementById('list')
const submitBtn = document.getElementById('submit')

let score = 0
let questionIndex = 0

function clearPage() {
    listContainer.classList.remove('shake')
    headerContainer.innerHTML = ''
    listContainer.innerHTML = ''
}

function showQuestions() { 
    const headerTemplate = `<h2 class="title"> %title% </h2>`
    const title = headerTemplate.replace('%title%', questions[questionIndex]['title'])
    headerContainer.innerHTML = title
    for (const [index,answerText] of questions[questionIndex]['answer'].entries()) {
        const questionTemplate = 
            `<li>
                <label>
                    <input value = %value% type = "radio" class = "answer" name = "answer"/>
                    <span>%answer%</span>
                </label>
            </li>`
        const answer =questionTemplate.replace('%answer%', answerText).replace('%value%', index)
        listContainer.innerHTML += answer   
    }
}

function checkAnswer() {
    const checkedAnswer = listContainer.querySelector('input[type = "radio"]:checked')
    if(!checkedAnswer) {
        submitBtn.blur()
        return
    }
    const labelCorrect = checkedAnswer.parentNode
    console.log(labelCorrect);
    const userAnswer = +checkedAnswer.value + 1
    if(userAnswer === questions[questionIndex]['correct']) {
        score++
        labelCorrect.classList.add('correct')
    } else {
        labelCorrect.classList.add('wrong')
        listContainer.classList.add('shake')
    }
    setTimeout(next, 1000)
}

function next() {
    if(questionIndex === questions.length - 1) {
        clearPage()
        showResult()
    } else {
        questionIndex++
        clearPage()
        showQuestions()
    }
}

function showResult() {
    const resultTemplate = `
    <h2 class = "title">%title%</h2>
    <h3 class = "summary">%message%</h3>`

    let title, message

    if(score === questions.length) {
        title = `Набрали аж ${score} из ${questions.length}!`
        message = 'Вы большие молодцы!'
    } else if((score*100)/questions.length >= 50) {
        title = `Неплохо, неплохо: ${score} из ${questions.length}!`
        message = 'Молодчик! Но можно еще лучше!'
    } else {
        title = `Эхххх, не получилось! Всего лишь ${score} из ${questions.length}`
        message = 'Попробуй еще раз.'
    }
    const finalMessage = resultTemplate.replace('%title%', title).replace('%message%', message)

    headerContainer.innerHTML = finalMessage
    submitBtn.blur()
    submitBtn.innerText = 'Начать заново'
    submitBtn.classList.add('next')
    submitBtn.addEventListener('click', () => {
        history.go()
    })
}

submitBtn.addEventListener('click', () => {
    checkAnswer()
})

clearPage()
showQuestions()
