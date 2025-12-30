import { Button } from "@/components/ui/button"

const Calculator = () => {
  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-500">
      {/* Calculator Wrapper */}
      <div className="w-80  bg-black rounded-xl p-4 shadow-lg">
        
        {/* Display Screen */}
        <div className="bg-gray-700 text-white text-right text-3xl p-4 rounded mb-4">
          0
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="secondary">7</Button>
          <Button variant="secondary">8</Button>
          <Button variant="secondary">9</Button>
          <Button className=" bg-green-600 text-white hover:bg-green-900">C</Button>

          {/* Row 2 */}
          <Button variant="secondary">4</Button>
          <Button variant="secondary">5</Button>
          <Button variant="secondary">6</Button>
          <Button variant="destructive">÷</Button>

          {/* Row 3 */}
          <Button variant="secondary">1</Button>
          <Button variant="secondary">2</Button>
          <Button variant="secondary">3</Button>
          <Button variant="destructive">*</Button>

          {/* Row 4 */}
          <Button variant="secondary">0</Button>
          <Button variant="secondary">.</Button>
          <Button variant="destructive">+</Button>
          <Button variant="destructive">-</Button>

          {/* Row 5 */}
          <Button className="col-span-4 bg-orange-400 hover:bg-orange-500 text-white">
            =
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
