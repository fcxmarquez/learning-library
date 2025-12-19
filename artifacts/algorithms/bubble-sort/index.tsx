"use client"

import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, Pause } from "lucide-react"

const pythonCode = `def bubble_sort(arr):
    n = len(arr)

    for i in range(n - 1):
        # Flag to optimize if no swaps occur
        swapped = False

        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if out of order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # If no swaps, array is sorted
        if not swapped:
            break

    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)  # [11, 12, 22, 25, 34, 64, 90]`

const javascriptCode = `function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Flag to optimize if no swaps occur
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if out of order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps, array is sorted
    if (!swapped) break;
  }

  return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = bubbleSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]`

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

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="python">
            <pre className="bg-[oklch(0.18_0_0)] border border-white/10 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{pythonCode}</code>
            </pre>
          </TabsContent>
          <TabsContent value="javascript">
            <pre className="bg-[oklch(0.18_0_0)] border border-white/10 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{javascriptCode}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
