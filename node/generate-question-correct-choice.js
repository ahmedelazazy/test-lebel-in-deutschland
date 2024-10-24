const fs = require('fs')
const questions = require('../questions.json')

const LETTER = {
	0: 'A',
	1: 'B',
	2: 'C',
	3: 'D',
}

const text = questions.map(question => ({
	q: question.id + '. ' + question.question,
	a: LETTER[question.correctAnswer] + '. ' + question.options[question.correctAnswer],
}))

const html = text
	.map(
		question => `
  <p>
    <div>${question.q}</div>
    <div style="font-weight: bold; color: green;">${question.a}</div>
    <br />
  </p>
`,
	)
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
  font-weight: bold;
  color: green;}
  </style>
    ${html}
  </body> 
</html>
`

//save html to file
fs.writeFileSync('questions.html', htmlTemplate)

