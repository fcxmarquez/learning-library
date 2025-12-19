"use client"

import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Pause } from "lucide-react"

interface ArrayBar {
  value: number
  state: "default" | "comparing" | "sorted"
}

function generateRandomArray(size: number): ArrayBar[] {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * 100) + 10,
    state: "default" as const,
  }))
}

export default function BubbleSortVisualization() {
  const [array, setArray] = useState<ArrayBar[]>(() => generateRandomArray(12))
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState<string>("")

  const reset = useCallback(() => {
    setArray(generateRandomArray(12))
    setIsRunning(false)
    setCurrentStep("")
  }, [])

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    setIsRunning(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Mark comparing elements
        arr[j].state = "comparing"
        arr[j + 1].state = "comparing"
        setArray([...arr])
        setCurrentStep(`Comparing ${arr[j].value} and ${arr[j + 1].value}`)
        await sleep(300)

        if (arr[j].value > arr[j + 1].value) {
          // Swap
          setCurrentStep(`Swapping ${arr[j].value} and ${arr[j + 1].value}`)
          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setArray([...arr])
          await sleep(300)
        }

        // Reset comparing state
        arr[j].state = "default"
        arr[j + 1].state = "default"
        setArray([...arr])
      }
      // Mark as sorted
      arr[n - 1 - i].state = "sorted"
      setArray([...arr])
    }
    arr[0].state = "sorted"
    setArray([...arr])
    setCurrentStep("Sorting complete!")
    setIsRunning(false)
  }

  const getBarColor = (state: ArrayBar["state"]) => {
    switch (state) {
      case "comparing":
        return "bg-yellow-500"
      case "sorted":
        return "bg-green-500"
      default:
        return "bg-primary"
    }
  }

  const maxValue = Math.max(...array.map((bar) => bar.value))

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-center gap-1 h-64">
        {array.map((bar, index) => (
          <motion.div
            key={index}
            layout
            className={`w-8 rounded-t ${getBarColor(bar.state)}`}
            style={{ height: `${(bar.value / maxValue) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-xs text-center text-white font-medium pt-1">
              {bar.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground min-h-6">
        {currentStep}
      </div>

      <div className="flex justify-center gap-2">
        <Button onClick={bubbleSort} disabled={isRunning}>
          {isRunning ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start
            </>
          )}
        </Button>
        <Button variant="outline" onClick={reset} disabled={isRunning}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
        <p>
          <strong>Bubble Sort</strong> repeatedly steps through the list,
          compares adjacent elements, and swaps them if they are in the wrong
          order.
        </p>
        <p>
          <strong>Time Complexity:</strong> O(n²) | <strong>Space:</strong> O(1)
        </p>
      </div>
    </div>
  )
}
