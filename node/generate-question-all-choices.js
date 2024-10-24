const fs = require('fs')
const questions = require('../questions.json')

const text = questions
	.map(questionObj => {
		const { id, question, options, correctAnswer } = questionObj

		return `
    <p>
      <div class="bold">${id}. ${question}</div>
      <div${correctAnswer === 0 ? ' class="answer"' : ''}>A. ${options[0]}</div>
        <div${correctAnswer === 1 ? ' class="answer"' : ''}>B. ${options[1]}</div>
        <div${correctAnswer === 2 ? ' class="answer"' : ''}>C. ${options[2]}</div>
        <div${correctAnswer === 3 ? ' class="answer"' : ''}>D. ${options[3]}</div>
        <br />
    </p>
  `
	})
	.join('')

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <title>Questions</title>
  </head>
  <body>
  <style>
  body{
  font-family: Arial;
  }
  .bold{
  font-weight: bold;}
  .answer{
  color: green;
  font-weight: bold;
  }
  </style>
    ${text}
  </body> 
</html>
`

//save html to file
fs.writeFileSync('questions-all.html', htmlTemplate)

