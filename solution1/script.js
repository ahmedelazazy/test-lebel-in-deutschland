let questions = []
let filteredQuestions = []

// Load questions from JSON file
fetch('questions.json')
	.then(response => response.json())
	.then(data => {
		questions = data
		displayQuestions(questions)
	})

// Display the questions
function displayQuestions(questionArray) {
	const quizDiv = document.getElementById('quiz')
	quizDiv.innerHTML = '' // Clear previous content

	questionArray.forEach(question => {
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
			button.innerText = ${letter}. ${option}
			button.onclick = () => checkAnswer(question, index, button)
			optionsDiv.appendChild(button)
		})

		questionDiv.appendChild(optionsDiv)
		quizDiv.appendChild(questionDiv)
	})
}

// Check the selected answer
function checkAnswer(question, selectedOption, button) {
	if (selectedOption === question.correctAnswer) {
		button.style.backgroundColor = '#4caf50'
		// alert('Correct!')
	} else {
		button.style.backgroundColor = '#f95959'
		// alert('Wrong answer!')
	}
}

// Filter questions by range
function filterQuestions() {
	const from = parseInt(document.getElementById('from').value)
	const to = parseInt(document.getElementById('to').value)

	filteredQuestions = questions.filter(q => q.id >= from && q.id <= to)
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

	displayQuestions(filteredQuestions)
}