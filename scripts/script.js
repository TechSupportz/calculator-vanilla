class Calculator {
	constructor(previousOutText, currentOutText) {
		this.previousOutText = previousOutText
		this.currentOutText = currentOutText
		this.clear()
	}

	clear() {
		this.previousOut = ""
		this.currentOut = ""
		this.operation = undefined
	}

	delete() {
		this.currentOut = this.currentOut.toString().slice(0, -1)
	}

	appendNumber(number) {
		if (number === "." && this.currentOut.includes(".")) {
			return
		}

		this.currentOut = this.currentOut.toString() + number.toString()
	}

	chooseOperation(operation) { 
		if (this.currentOut === "") {
			return
		}

		if (this.previousOut !== "") {
			this.equal()
		}

		this.operation = operation
		this.previousOut = this.currentOut.toString()
		this.currentOut = ""
	}

	equal() {
		let result
		const prev = parseFloat(this.previousOut)
		const curr = parseFloat(this.currentOut)

		if (isNaN(prev) || isNaN(curr)) return

		switch (this.operation) {
			case "+":
				result = prev + curr
				break
			case "-":
				result = prev - curr
				break
			case "×":
				result = prev * curr
				break
			case "÷":
				result = prev / curr
				break
			default:
				return
		}

		this.currentOut = result
		this.operation = undefined

		if (this.currentOut == "69") {
			this.previousOut = "( ͡° ͜ʖ ͡°)"
			console.log(this.previousOut)
		} else {
			this.previousOut = ""
		}
	}

	updateDisplay() {
		if (this.operation != null) {
			this.previousOutText.innerText = `${this.previousOut} ${this.operation}`
		} else {
			this.previousOutText.innerText = this.previousOut
		}
		this.currentOutText.innerText = this.currentOut
	}
}

const numberButton = document.querySelectorAll("[data-number]")
const operationButton = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-del]")
const clearButton = document.querySelector("[data-AC]")
const previousOutText = document.querySelector("[data-previous-out]")
const currentOutText = document.querySelector("[data-current-out]")

const calculator = new Calculator(previousOutText, currentOutText)

numberButton.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButton.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalButton.addEventListener("click", (button) => {
	calculator.equal()
	calculator.updateDisplay()
})

clearButton.addEventListener("click", (button) => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener("click", (button) => {
	calculator.delete()
	calculator.updateDisplay()
})
