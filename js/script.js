const allButtons = document.querySelectorAll('.button')
const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.sign')
const equalButton = document.querySelector('.equal')
const allClearButton = document.querySelector('.all-clear')
const clearButton = document.querySelector('.clear')
const plusMinusButton = document.querySelector('.plus-minus')
const dotButton = document.querySelector('.coma')
const expression = document.querySelector('.expression')
const resultTextElement = document.querySelector('.result-text-element')
const equalSign = document.querySelector('.result__equal')

let firstOperand, secondOperand, operator, result

//---adding animation to all buttons when touched---
allButtons.forEach((button) => {
	button.addEventListener('touchstart', () => {
		button.classList.add('button-animation-for-touch')

		setTimeout(() => {
			button.classList.remove('button-animation-for-touch')
		}, 200)
	})
})

//---checking an element if it is an integer and splitting it into classes---
function isInteger(element) {
	if (Number.isInteger(+element)) {
		return element.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	} else {
		return element.toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ')
	}
}

//---display the expression on the screen---
function showExpression() {
	if (firstOperand.length + operator.length + secondOperand.length <= 12) {
		expression.style.fontSize = 38 + 'px'
	} else if (
		firstOperand.length + operator.length + secondOperand.length > 12 &&
		firstOperand.length + operator.length + secondOperand.length <= 14
	) {
		expression.style.fontSize = 32 + 'px'
	} else if (
		firstOperand.length + operator.length + secondOperand.length > 14 &&
		firstOperand.length + operator.length + secondOperand.length <= 18
	) {
		expression.style.fontSize = 26 + 'px'
	} else if (
		firstOperand.length + operator.length + secondOperand.length >= 18 &&
		firstOperand.length + operator.length + secondOperand.length <= 22
	) {
		expression.style.fontSize = 20 + 'px'
	} else if (
		firstOperand.length + operator.length + secondOperand.length >
		22
	) {
		expression.style.fontSize = 16 + 'px'
	}

	expression.textContent =
		isInteger(firstOperand) + operator + isInteger(secondOperand)
}

//---display the result on the screen---
function showResult() {
	if (result.toString().length <= 7) {
		resultTextElement.style.fontSize = 58 + 'px'
	} else if (result.toString().length > 7 && result.toString().length <= 9) {
		resultTextElement.style.fontSize = 48 + 'px'
	} else if (result.toString().length > 9 && result.toString().length <= 11) {
		resultTextElement.style.fontSize = 38 + 'px'
	} else if (result.toString().length > 11 && result.toString().length <= 14) {
		resultTextElement.style.fontSize = 28 + 'px'
	} else if (result.toString().length > 14) {
		resultTextElement.style.fontSize = 22 + 'px'
	}

	resultTextElement.textContent = isInteger(result)

	equalSign.style.visibility = 'visible'
}

//---all clear---
function allClear() {
	expression.textContent = ''
	resultTextElement.textContent = ''
	equalSign.style.visibility = 'hidden'
	firstOperand = ''
	secondOperand = ''
	operator = ''
	result = ''
}
allClear()

allClearButton.addEventListener('click', allClear)
allClearButton.addEventListener('touchstart', (event) => {
	event.preventDefault()
	allClear()
})

//---clear the last character entered---
function clear() {
	equalSign.style.visibility = 'hidden'
	if (
		(firstOperand.length === 1 && operator === '' && secondOperand === '') ||
		(firstOperand.length === 2 &&
			firstOperand[0] === '-' &&
			operator === '' &&
			secondOperand === '')
	) {
		allClear()
	} else if (operator === '' && secondOperand === '') {
		firstOperand = firstOperand.slice(0, -1)
	} else if (operator !== '' && secondOperand === '') {
		operator = operator.slice(0, -1)
	} else if (secondOperand.length === 2 && secondOperand[0] === '-') {
		secondOperand = ''
	} else {
		secondOperand = secondOperand.slice(0, -1)
		result = ''
		resultTextElement.textContent = ''
	}

	showExpression()
}

clearButton.addEventListener('click', clear)
clearButton.addEventListener('touchstart', (event) => {
	event.preventDefault()
	clear()
})

//---adding numbers---
function addNumbers() {
	if (operator === '') {
		firstOperand += this.value
		if (firstOperand[0] === '0' && +firstOperand[1] >= 0) {
			firstOperand = firstOperand.slice(1)
		}
	} else if (operator !== '' && result === '') {
		secondOperand += this.value
		if (secondOperand[0] === '0' && +secondOperand[1] >= 0) {
			secondOperand = secondOperand.slice(1)
		}
	}

	showExpression()
}

numberButtons.forEach((button) => {
	button.addEventListener('click', addNumbers)
	button.addEventListener('touchstart', (event) => {
		event.preventDefault()
		addNumbers.call(button)
	})
})

//---adding a decimal point---
function addDecimalPoint() {
	if (
		!firstOperand.includes(this.value) &&
		firstOperand.length >= 1 &&
		operator === ''
	) {
		firstOperand += this.value
	} else if (firstOperand === '') {
		firstOperand = '0' + this.value
	} else if (
		!secondOperand.includes(this.value) &&
		secondOperand.length >= 1 &&
		firstOperand !== '' &&
		result.toString() === ''
	) {
		secondOperand += this.value
	} else if (firstOperand !== '' && secondOperand === '' && operator !== '') {
		secondOperand = '0' + this.value
	}

	showExpression()
}

dotButton.addEventListener('click', addDecimalPoint)
dotButton.addEventListener('touchstart', (event) => {
	event.preventDefault()
	addDecimalPoint.call(dotButton)
})

//---converting the operand to negative and back---
function convertOperandToNegativeAndBack() {
	if (firstOperand !== '' && secondOperand === '') {
		firstOperand = (+firstOperand * -1).toString()
	} else if (secondOperand !== '' && result === '') {
		secondOperand = (+secondOperand * -1).toString()
	}

	showExpression()
}

plusMinusButton.addEventListener('click', convertOperandToNegativeAndBack)
plusMinusButton.addEventListener('touchstart', (event) => {
	event.preventDefault()
	convertOperandToNegativeAndBack()
})

//---adding a mathematical sign---
function addSign() {
	if (firstOperand !== '' && firstOperand.slice(-1) !== '.') {
		operator = this.value
	}
	if (result !== '') {
		firstOperand = result.toString()
		operator = this.value
		secondOperand = ''
		result = ''
		resultTextElement.textContent = ''
		equalSign.style.visibility = 'hidden'
	}

	showExpression()
}

operationButtons.forEach((button) => {
	button.addEventListener('click', addSign)
	button.addEventListener('touchstart', (event) => {
		event.preventDefault()
		addSign.call(button)
	})
})

//---сalculation of the result---
function calculation() {
	switch (operator) {
		case '/':
			result =
				Math.round((+firstOperand / +secondOperand) * 10000000000) /
				10000000000
			break
		case '*':
			result =
				Math.round(+firstOperand * +secondOperand * 10000000000) /
				10000000000
			break
		case '-':
			result =
				Math.round((+firstOperand - +secondOperand) * 10000000000) /
				10000000000
			break
		case '+':
			result =
				Math.round((+firstOperand + +secondOperand) * 10000000000) /
				10000000000
			break
		case '%':
			result = +secondOperand * (+firstOperand / 100)
			break
	}
}

function getResult() {
	if (
		operator === '' ||
		secondOperand === '' ||
		secondOperand.slice(-1) === '.'
	) {
		return
	} else if (operator === '/' && secondOperand === '0') {
		resultTextElement.textContent = 'err'
	} else {
		calculation()
		showResult()
	}
}

equalButton.addEventListener('click', getResult)
equalButton.addEventListener('touchstart', (event) => {
	event.preventDefault()
	getResult()
})
