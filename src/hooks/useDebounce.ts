// Import React hooks
// useState → to store a value
// useEffect → to run code when value changes
import { useEffect, useState } from "react"

// ================================
// CUSTOM DEBOUNCE HOOK
// ================================

// This hook delays updating a value
// until the user STOPS typing
// Example use case:
// - Search input
// - API should NOT be called on every key press
export function useDebounce<T>(value: T, delay = 500): T {

  // Store the debounced value
  // Initially, it is the same as the input value
  const [debouncedValue, setDebouncedValue] = useState(value)

  // useEffect runs whenever:
  // - value changes
  // - delay changes
  useEffect(() => {

    // setTimeout waits for "delay" milliseconds
    // After delay → update debouncedValue
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // CLEANUP FUNCTION
    // This runs BEFORE the next effect executes
    // It clears the previous timer
    // Very important to avoid multiple timers running
    return () => clearTimeout(timer)

  }, [value, delay]) // 👈 effect runs when value or delay changes

  // Return the debounced value
  // This value updates ONLY after the delay
  return debouncedValue
}
