let questions = []
let filteredQuestions = []
let currentPage = 1
let pageSize = 20
let totalPages = 1 // Track total pages globally

// Load questions from JSON file
fetch('questions.json')
	.then(response => response.json())
	.then(data => {
		questions = data
		filteredQuestions = questions // Initialize filteredQuestions with all questions
		displayQuestions(filteredQuestions)
	})

// Display the questions for the current page
function displayQuestions(questionArray) {
	const quizDiv = document.getElementById('quiz')
	quizDiv.innerHTML = '' // Clear previous content

	// Calculate pagination details
	const start = (currentPage - 1) * pageSize
	const end = start + pageSize
	const paginatedQuestions = questionArray.slice(start, end)

	// Display questions for the current page
	paginatedQuestions.forEach(question => {
		const questionDiv = document.createElement('div')
		questionDiv.classList.add('question')

		const questionText = document.createElement('h3')
		questionText.innerText = question.id + '. ' + question.question
		questionDiv.appendChild(questionText)

		const optionsDiv = document.createElement('div')
		optionsDiv.classList.add('options')
		question.options.forEach((option, index) => {
			let letter = ''
			switch (index) {
				case 0:
					letter = 'A'
					break
				case 1:
					letter = 'B'
					break
				case 2:
					letter = 'C'
					break
				case 3:
					letter = 'D'
					break
				default:
					break
			}

			const button = document.createElement('button')
			button.innerText = `${letter}. ${option}`
			button.onclick = () => checkAnswer(question, index, button)
			optionsDiv.appendChild(button)
		})

		questionDiv.appendChild(optionsDiv)
		quizDiv.appendChild(questionDiv)
	})

	updatePaginationInfo(questionArray.length)
}

// Update the pagination info
function updatePaginationInfo(totalQuestions) {
	totalPages = Math.ceil(totalQuestions / pageSize) // Calculate total pages
	const pageInfo = document.getElementById('pageInfo')
	pageInfo.innerText = `Page ${currentPage} of ${totalPages}`

	// Disable/enable pagination buttons based on the page
	document.querySelector('button[onclick="previousPage()"]').disabled = currentPage === 1
	document.querySelector('button[onclick="nextPage()"]').disabled = currentPage === totalPages
}

// Check the selected answer
function checkAnswer(question, selectedOption, button) {
	if (selectedOption === question.correctAnswer) {
		button.style.backgroundColor = '#4caf50'
	} else {
		button.style.backgroundColor = '#f95959'
	}
}

// Filter questions by range
function filterQuestions() {
	const from = parseInt(document.getElementById('from').value)
	const to = parseInt(document.getElementById('to').value)
	pageSize = parseInt(document.getElementById('pageSize').value)

	filteredQuestions = questions.filter(q => q.id >= from && q.id <= to)
	currentPage = 1 // Reset to the first page
	displayQuestions(filteredQuestions)
}

// Shuffle questions in the selected range
function shuffleQuestions() {
	if (filteredQuestions.length === 0) {
		alert('Please filter questions first!')
		return
	}

	// Shuffle the filtered questions array
	for (let i = filteredQuestions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]]
	}

	currentPage = 1 // Reset to the first page after shuffle
	displayQuestions(filteredQuestions)
}

// Navigate to the previous page
function previousPage() {
	if (currentPage > 1) {
		currentPage--
		displayQuestions(filteredQuestions)
	}
}

// Navigate to the next page
function nextPage() {
	if (currentPage < totalPages) {
		currentPage++
		displayQuestions(filteredQuestions)
	}
}

function updatePageSize() {
	pageSize = parseInt(document.getElementById('pageSize').value)
	currentPage = 1 // Reset to the first page after changing page size
	displayQuestions(filteredQuestions)
}

