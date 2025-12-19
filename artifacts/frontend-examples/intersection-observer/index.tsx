"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw } from "lucide-react"

const javascriptCode = `// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Element is visible in viewport
        entry.target.classList.add('visible');
        console.log('Element entered viewport:', entry.target);
        console.log('Intersection ratio:', entry.intersectionRatio);
      } else {
        // Element left viewport
        entry.target.classList.remove('visible');
      }
    });
  },
  {
    // Options
    root: null, // Use viewport as root
    rootMargin: '0px', // No margin around root
    threshold: 0.5, // Trigger when 50% visible
  }
);

// Observe elements
const elements = document.querySelectorAll('.observe-me');
elements.forEach((el) => observer.observe(el));

// Cleanup when done
// observer.disconnect();`

const typescriptCode = `interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

function createScrollObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: ObserverOptions = {}
): IntersectionObserver {
  const defaultOptions: ObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => callback(entry));
    },
    { ...defaultOptions, ...options }
  );

  return observer;
}

// Usage with React hook
function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: ObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = createScrollObserver(
      (entry) => setIsIntersecting(entry.isIntersecting),
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}`

interface BoxState {
  id: number
  isIntersecting: boolean
  ratio: number
}

export default function IntersectionObserverVisualization() {
  const [boxes, setBoxes] = useState<BoxState[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      isIntersecting: false,
      ratio: 0,
    }))
  )
  const [threshold, setThreshold] = useState(0.5)
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])

  const reset = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
    setBoxes(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        isIntersecting: false,
        ratio: 0,
      }))
    )
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"))
          setBoxes((prev) =>
            prev.map((box) =>
              box.id === id
                ? {
                    ...box,
                    isIntersecting: entry.isIntersecting,
                    ratio: Math.round(entry.intersectionRatio * 100),
                  }
                : box
            )
          )
        })
      },
      {
        root: containerRef.current,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    boxRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Scrollable container */}
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-2">
            Scroll to observe elements (viewport simulation)
          </div>
          <div
            ref={containerRef}
            className="h-64 overflow-y-auto border border-white/10 rounded-lg bg-[oklch(0.12_0_0)] p-4 scroll-smooth"
          >
            <div className="space-y-4 py-32">
              {boxes.map((box, index) => (
                <motion.div
                  key={box.id}
                  ref={(el) => {
                    boxRefs.current[index] = el
                  }}
                  data-id={box.id}
                  className={`h-24 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    box.isIntersecting
                      ? "bg-green-500/80 text-white"
                      : "bg-white/10 text-muted-foreground"
                  }`}
                  animate={{
                    scale: box.isIntersecting ? 1 : 0.95,
                    opacity: box.isIntersecting ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Element {box.id + 1}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Status panel */}
        <div className="lg:w-64">
          <div className="text-sm text-muted-foreground mb-2">
            Observer Status
          </div>
          <div className="border border-white/10 rounded-lg bg-[oklch(0.12_0_0)] p-4 space-y-2">
            {boxes.map((box) => (
              <div
                key={box.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  Element {box.id + 1}
                </span>
                <span
                  className={`font-mono ${
                    box.isIntersecting ? "text-green-400" : "text-white/40"
                  }`}
                >
                  {box.ratio}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Scroll
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
        <p>
          <strong>Intersection Observer</strong> asynchronously observes changes
          in the intersection of a target element with an ancestor element or
          the viewport.
        </p>
        <p>
          <strong>Use cases:</strong> Lazy loading images, infinite scroll,
          animations on scroll, ad visibility tracking.
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          </TabsList>
          <TabsContent value="javascript">
            <pre className="bg-[oklch(0.18_0_0)] border border-white/10 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{javascriptCode}</code>
            </pre>
          </TabsContent>
          <TabsContent value="typescript">
            <pre className="bg-[oklch(0.18_0_0)] border border-white/10 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{typescriptCode}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
