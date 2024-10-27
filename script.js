let questions = []
let filteredQuestions = []
let currentPage = 1
let pageSize = 30
let totalPages = 1
let counterStart = 1

fetch('questions.json')
	.then(response => response.json())
	.then(data => {
		questions = data
		filteredQuestions = questions
		displayQuestions(filteredQuestions)
	})

function displayQuestions(questionArray) {
	const quizDiv = document.getElementById('quiz')
	quizDiv.innerHTML = ''

	counterStart = (currentPage - 1) * pageSize + 1
	document.body.style.counterReset = `question-counter ${counterStart - 1}`

	const start = (currentPage - 1) * pageSize
	const end = start + pageSize
	const paginatedQuestions = questionArray.slice(start, end)

	paginatedQuestions.forEach(question => {
		const questionDiv = document.createElement('div')
		questionDiv.classList.add('question')

		if (question.image) {
			const questionImage = document.createElement('img')
			questionImage.src = question.image
			questionDiv.appendChild(questionImage)
		}

		const questionText = document.createElement('h3')
		questionText.innerText = question.id + '. ' + question.question
		questionDiv.appendChild(questionText)

		const optionsDiv = document.createElement('div')
		optionsDiv.classList.add('options')
		question.options.forEach((option, index) => {
			const letters = ['A', 'B', 'C', 'D']
			const button = document.createElement('button')
			button.innerText = `${letters[index]}. ${option}`
			button.onclick = () => checkAnswer(question, index, button)
			optionsDiv.appendChild(button)
		})

		questionDiv.appendChild(optionsDiv)
		quizDiv.appendChild(questionDiv)
	})

	updatePaginationInfo(questionArray.length)
}

function updatePaginationInfo(totalQuestions) {
	totalPages = Math.ceil(totalQuestions / pageSize)
	const pageInfo = document.getElementById('pageInfo')
	pageInfo.innerText = `Page ${currentPage} of ${totalPages}`

	document.querySelector('button[onclick="previousPage()"]').disabled = currentPage === 1
	document.querySelector('button[onclick="nextPage()"]').disabled = currentPage === totalPages
}

function checkAnswer(question, selectedOption, button) {
	if (selectedOption === question.correctAnswer) {
		button.style.backgroundColor = '#91ee94'
	} else {
		button.style.backgroundColor = '#fea4a4'
	}
}

function filterQuestions() {
	counterStart = 1

	const filterByIds = document.getElementById('filterByIds').checked
	const questionIdsInput = document.getElementById('questionIds').value.trim()
	const from = parseInt(document.getElementById('from').value)
	const to = parseInt(document.getElementById('to').value)
	pageSize = parseInt(document.getElementById('pageSize').value)

	if (filterByIds && questionIdsInput) {
		const questionIds = questionIdsInput
			.split(',')
			.map(id => parseInt(id.trim()))
			.filter(id => !isNaN(id))

		filteredQuestions = questions.filter(q => questionIds.includes(q.id))
		localStorage.setItem('savedQuestionIds', questionIdsInput)
	} else {
		filteredQuestions = questions.filter(q => q.id >= from && q.id <= to)
	}

	currentPage = 1
	displayQuestions(filteredQuestions)
}

function shuffleQuestions() {
	counterStart = 1

	if (filteredQuestions.length === 0) {
		alert('Please filter questions first!')
		return
	}

	for (let i = filteredQuestions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]]
	}

	currentPage = 1
	displayQuestions(filteredQuestions)
}

function previousPage() {
	if (currentPage > 1) {
		currentPage--
		displayQuestions(filteredQuestions)
		scrollToTop()
	}
}

function nextPage() {
	if (currentPage < totalPages) {
		currentPage++
		displayQuestions(filteredQuestions)
		scrollToTop()
	}
}

function updatePageSize() {
	pageSize = parseInt(document.getElementById('pageSize').value)
	currentPage = 1
	displayQuestions(filteredQuestions)
}

function toggleIdInput() {
	const questionIdsInput = document.getElementById('questionIds')
	const filterByIds = document.getElementById('filterByIds').checked

	questionIdsInput.disabled = !filterByIds
}

document.addEventListener('DOMContentLoaded', () => {
	const savedIds = localStorage.getItem('savedQuestionIds')
	if (savedIds) {
		document.getElementById('questionIds').value = savedIds
	}
})

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

function filterAndShuffle() {
	filterQuestions()
	shuffleQuestions()
}

function handleEnter(event) {
	if (event.key === 'Enter') {
		filterAndShuffle()
	}
}

