// Import useState hook from React to store calculator values
import { useState } from "react"

import { Button } from "@/components/ui/button"


const Calculator = () => {

  // Stores what is currently shown on the calculator screen default "0"
  const [currentInput, setCurrentInput] = useState("0")

  // Stores the previous number 
  const [previousInput, setPreviousInput] = useState<string | null>(null)

  // Stores the operator 
  const [operator, setOperator] = useState<string | null>(null)

  // run when number sis clicked
  const handleNumberClick = (num: string) => {
   
  // If the screen shows 0 then replace it Otherwise add the number at the end
    if (currentInput === "0") {
      setCurrentInput(num)
    } else {
      setCurrentInput(currentInput + num)
    }
  }

  // Runs when "." button is clicked
  const handleDecimal = () => {
    // Prevent adding more than one dot
    if (!currentInput.includes(".")) {
      setCurrentInput(currentInput + ".")
    }
  }

  // Runs when an operator (+ - * ÷) is clicked
  const handleOperator = (op: string) => {
    // Save current number as previous
    setPreviousInput(currentInput)

    // Save selected operator
    setOperator(op)

    // Reset screen for next number
    setCurrentInput("0")
  }

  // Runs when "=" button is clicked
  const calculate = () => {
    // If we don’t have enough data, stop
    if (!previousInput || !operator) return

    // Convert string values to numbers
    const prev = parseFloat(previousInput)
    const current = parseFloat(currentInput)

    let result = 0

    // Decide calculation based on operator
    switch (operator) {
      case "+":
        result = prev + current
        break
      case "-":
        result = prev - current
        break
      case "*":
        result = prev * current
        break
      case "÷":
        if (current === 0) {
          setCurrentInput("Error")   // show Error on screen
          setPreviousInput(null)
          setOperator(null)
          return
        }
        result = prev / current
        break
    }

    // Show result on screen
    setCurrentInput(result.toString())

    // Reset stored values
    setPreviousInput(null)
    setOperator(null)
  }

  // Clears everything
  const clearAll = () => {
    setCurrentInput("0")
    setPreviousInput(null)
    setOperator(null)
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">

      {/* Calculator body */}
      <div className="w-80 bg-black rounded-xl p-4 shadow-lg">

        {/* Display Screen */}
        <div className="bg-gray-700 text-white text-right text-3xl p-4 rounded mb-4">
          {currentInput}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">

          
          <Button variant="secondary" onClick={() => handleNumberClick("7")}>7</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("8")}>8</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("9")}>9</Button>

          {/* Clear as C*/}
          <Button className="bg-green-600 text-white" onClick={clearAll}>C</Button>

          <Button variant="secondary" onClick={() => handleNumberClick("4")}>4</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("5")}>5</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("6")}>6</Button>

          
          <Button variant="destructive" onClick={() => handleOperator("÷")}>÷</Button>


          <Button variant="secondary" onClick={() => handleNumberClick("1")}>1</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("2")}>2</Button>
          <Button variant="secondary" onClick={() => handleNumberClick("3")}>3</Button>


          <Button variant="destructive" onClick={() => handleOperator("*")}>*</Button>


          <Button variant="secondary" onClick={() => handleNumberClick("0")}>0</Button>

          {/* Decimal */}
          <Button variant="secondary" onClick={handleDecimal}>.</Button>

          <Button variant="destructive" onClick={() => handleOperator("+")}>+</Button>
          <Button variant="destructive" onClick={() => handleOperator("-")}>-</Button>

          {/* Equals to button */}
          <Button
            className="col-span-4 bg-orange-400 hover:bg-orange-500 text-white"
            onClick={calculate}
          >
            =
          </Button>

        </div>
      </div>
    </div>
  )
}


export default Calculator  // Export component for  Router
