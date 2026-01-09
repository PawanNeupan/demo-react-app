
import { useEffect, useState } from "react"


// - API should NOT be called on every key press
export function useDebounce<T>(value: T, delay = 500): T {

  // Store the debounced value
  // Initially, it is the same as the input value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

   
    return () => clearTimeout(timer)

  }, [value, delay])

  return debouncedValue
}
