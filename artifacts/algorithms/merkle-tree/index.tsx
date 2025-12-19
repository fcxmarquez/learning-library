"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Plus,
  Trash2,
  AlertTriangle,
  Check,
  Hash,
} from "lucide-react"

const pythonCode = `import hashlib
from typing import List, Optional

class MerkleNode:
    """A node in the Merkle tree."""
    def __init__(self, left: Optional['MerkleNode'] = None,
                 right: Optional['MerkleNode'] = None,
                 data: Optional[str] = None):
        self.left = left
        self.right = right
        self.data = data

        if data is not None:
            # Leaf node: hash the data directly
            self.hash = self._hash(data)
        else:
            # Internal node: hash the concatenation of children
            left_hash = left.hash if left else ""
            right_hash = right.hash if right else ""
            self.hash = self._hash(left_hash + right_hash)

    def _hash(self, data: str) -> str:
        """Compute SHA-256 hash of data."""
        return hashlib.sha256(data.encode()).hexdigest()

class MerkleTree:
    """A Merkle tree implementation."""
    def __init__(self, data_blocks: List[str]):
        self.data_blocks = data_blocks
        self.root = self._build_tree(data_blocks)

    def _build_tree(self, data_blocks: List[str]) -> Optional[MerkleNode]:
        """Build the Merkle tree from data blocks."""
        if not data_blocks:
            return None

        # Create leaf nodes
        nodes = [MerkleNode(data=block) for block in data_blocks]

        # If odd number of nodes, duplicate the last one
        if len(nodes) % 2 == 1:
            nodes.append(nodes[-1])

        # Build tree bottom-up
        while len(nodes) > 1:
            next_level = []
            for i in range(0, len(nodes), 2):
                left = nodes[i]
                right = nodes[i + 1] if i + 1 < len(nodes) else nodes[i]
                parent = MerkleNode(left=left, right=right)
                next_level.append(parent)
            nodes = next_level

        return nodes[0]

    def get_root_hash(self) -> str:
        """Get the Merkle root hash."""
        return self.root.hash if self.root else ""

    def get_proof(self, index: int) -> List[tuple]:
        """Get the proof path for verifying a data block."""
        if index < 0 or index >= len(self.data_blocks):
            return []

        proof = []
        nodes = [MerkleNode(data=block) for block in self.data_blocks]

        if len(nodes) % 2 == 1:
            nodes.append(nodes[-1])

        current_index = index

        while len(nodes) > 1:
            next_level = []
            for i in range(0, len(nodes), 2):
                left = nodes[i]
                right = nodes[i + 1] if i + 1 < len(nodes) else nodes[i]

                if i == current_index or i + 1 == current_index:
                    if current_index % 2 == 0:
                        proof.append((right.hash, "right"))
                    else:
                        proof.append((left.hash, "left"))

                parent = MerkleNode(left=left, right=right)
                next_level.append(parent)

            current_index //= 2
            nodes = next_level

        return proof

    def verify(self, data: str, index: int, proof: List[tuple]) -> bool:
        """Verify that data at index is part of the tree."""
        current_hash = hashlib.sha256(data.encode()).hexdigest()

        for sibling_hash, position in proof:
            if position == "left":
                current_hash = hashlib.sha256(
                    (sibling_hash + current_hash).encode()
                ).hexdigest()
            else:
                current_hash = hashlib.sha256(
                    (current_hash + sibling_hash).encode()
                ).hexdigest()

        return current_hash == self.get_root_hash()

# Example usage
data = ["Block A", "Block B", "Block C", "Block D"]
tree = MerkleTree(data)

print(f"Merkle Root: {tree.get_root_hash()[:16]}...")
print(f"Proof for Block B: {tree.get_proof(1)}")
print(f"Verification: {tree.verify('Block B', 1, tree.get_proof(1))}")`

const javascriptCode = `const crypto = require('crypto');

class MerkleNode {
  constructor(left = null, right = null, data = null) {
    this.left = left;
    this.right = right;
    this.data = data;

    if (data !== null) {
      // Leaf node: hash the data directly
      this.hash = this._hash(data);
    } else {
      // Internal node: hash the concatenation of children
      const leftHash = left ? left.hash : "";
      const rightHash = right ? right.hash : "";
      this.hash = this._hash(leftHash + rightHash);
    }
  }

  _hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

class MerkleTree {
  constructor(dataBlocks) {
    this.dataBlocks = dataBlocks;
    this.root = this._buildTree(dataBlocks);
  }

  _buildTree(dataBlocks) {
    if (dataBlocks.length === 0) return null;

    // Create leaf nodes
    let nodes = dataBlocks.map(block => new MerkleNode(null, null, block));

    // If odd number of nodes, duplicate the last one
    if (nodes.length % 2 === 1) {
      nodes.push(nodes[nodes.length - 1]);
    }

    // Build tree bottom-up
    while (nodes.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = i + 1 < nodes.length ? nodes[i + 1] : nodes[i];
        const parent = new MerkleNode(left, right);
        nextLevel.push(parent);
      }
      nodes = nextLevel;
    }

    return nodes[0];
  }

  getRootHash() {
    return this.root ? this.root.hash : "";
  }

  getProof(index) {
    if (index < 0 || index >= this.dataBlocks.length) return [];

    const proof = [];
    let nodes = this.dataBlocks.map(block => new MerkleNode(null, null, block));

    if (nodes.length % 2 === 1) {
      nodes.push(nodes[nodes.length - 1]);
    }

    let currentIndex = index;

    while (nodes.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = i + 1 < nodes.length ? nodes[i + 1] : nodes[i];

        if (i === currentIndex || i + 1 === currentIndex) {
          if (currentIndex % 2 === 0) {
            proof.push({ hash: right.hash, position: "right" });
          } else {
            proof.push({ hash: left.hash, position: "left" });
          }
        }

        const parent = new MerkleNode(left, right);
        nextLevel.push(parent);
      }
      currentIndex = Math.floor(currentIndex / 2);
      nodes = nextLevel;
    }

    return proof;
  }

  verify(data, index, proof) {
    let currentHash = crypto.createHash('sha256').update(data).digest('hex');

    for (const { hash: siblingHash, position } of proof) {
      if (position === "left") {
        currentHash = crypto.createHash('sha256')
          .update(siblingHash + currentHash)
          .digest('hex');
      } else {
        currentHash = crypto.createHash('sha256')
          .update(currentHash + siblingHash)
          .digest('hex');
      }
    }

    return currentHash === this.getRootHash();
  }
}

// Example usage
const data = ["Block A", "Block B", "Block C", "Block D"];
const tree = new MerkleTree(data);

console.log(\`Merkle Root: \${tree.getRootHash().slice(0, 16)}...\`);
console.log(\`Proof for Block B:\`, tree.getProof(1));
console.log(\`Verification: \${tree.verify("Block B", 1, tree.getProof(1))}\`);`

// Simple hash function for visualization (not cryptographically secure)
function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return Math.abs(hash).toString(16).padStart(8, "0").toUpperCase()
}

interface TreeNode {
  id: string
  hash: string
  data?: string
  left?: TreeNode
  right?: TreeNode
  level: number
  position: number
  isLeaf: boolean
  isDuplicate?: boolean
}

interface AnimationStep {
  type: "hash-leaf" | "combine-hashes" | "complete" | "tamper-detected"
  nodeId: string
  description: string
  highlightNodes: string[]
  affectedNodes?: string[]
}

function buildMerkleTree(dataBlocks: string[]): {
  root: TreeNode | null
  allNodes: TreeNode[]
  steps: AnimationStep[]
} {
  if (dataBlocks.length === 0) {
    return { root: null, allNodes: [], steps: [] }
  }

  const steps: AnimationStep[] = []
  const allNodes: TreeNode[] = []
  let nodeIdCounter = 0

  // Create leaf nodes
  let nodes: TreeNode[] = dataBlocks.map((data, index) => {
    const node: TreeNode = {
      id: `node-${nodeIdCounter++}`,
      hash: simpleHash(data),
      data,
      level: 0,
      position: index,
      isLeaf: true,
    }
    allNodes.push(node)
    steps.push({
      type: "hash-leaf",
      nodeId: node.id,
      description: `Hash data "${data}" to create leaf node`,
      highlightNodes: [node.id],
    })
    return node
  })

  // If odd number of nodes, duplicate the last one
  if (nodes.length > 1 && nodes.length % 2 === 1) {
    const lastNode = nodes[nodes.length - 1]
    const duplicateNode: TreeNode = {
      id: `node-${nodeIdCounter++}`,
      hash: lastNode.hash,
      data: lastNode.data,
      level: 0,
      position: nodes.length,
      isLeaf: true,
      isDuplicate: true,
    }
    nodes.push(duplicateNode)
    allNodes.push(duplicateNode)
    steps.push({
      type: "hash-leaf",
      nodeId: duplicateNode.id,
      description: `Duplicate last node "${lastNode.data}" (odd number of leaves)`,
      highlightNodes: [duplicateNode.id, lastNode.id],
    })
  }

  let level = 1

  // Build tree bottom-up
  while (nodes.length > 1) {
    const nextLevel: TreeNode[] = []

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i]
      const right = nodes[i + 1] || nodes[i]
      const combinedHash = simpleHash(left.hash + right.hash)

      const parent: TreeNode = {
        id: `node-${nodeIdCounter++}`,
        hash: combinedHash,
        left,
        right,
        level,
        position: Math.floor(i / 2),
        isLeaf: false,
      }

      nextLevel.push(parent)
      allNodes.push(parent)

      steps.push({
        type: "combine-hashes",
        nodeId: parent.id,
        description: `Combine hashes: ${left.hash.slice(0, 6)}... + ${right.hash.slice(0, 6)}... = ${combinedHash.slice(0, 6)}...`,
        highlightNodes: [parent.id, left.id, right.id],
      })
    }

    nodes = nextLevel
    level++
  }

  steps.push({
    type: "complete",
    nodeId: nodes[0].id,
    description: `Merkle tree complete! Root hash: ${nodes[0].hash}`,
    highlightNodes: [nodes[0].id],
  })

  return { root: nodes[0], allNodes, steps }
}

function getAffectedNodes(
  root: TreeNode | null,
  modifiedLeafId: string
): string[] {
  if (!root) return []

  const affected: string[] = []

  function findPath(node: TreeNode): boolean {
    if (node.id === modifiedLeafId) {
      affected.push(node.id)
      return true
    }

    if (node.left && findPath(node.left)) {
      affected.push(node.id)
      return true
    }

    if (node.right && findPath(node.right)) {
      affected.push(node.id)
      return true
    }

    return false
  }

  findPath(root)
  return affected
}

export default function MerkleTreeVisualization() {
  const [dataBlocks, setDataBlocks] = useState<string[]>([
    "Block A",
    "Block B",
    "Block C",
    "Block D",
  ])
  const [newBlockInput, setNewBlockInput] = useState("")
  const [tree, setTree] = useState<{
    root: TreeNode | null
    allNodes: TreeNode[]
    steps: AnimationStep[]
  }>(() => buildMerkleTree(["Block A", "Block B", "Block C", "Block D"]))

  const [currentStep, setCurrentStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [stepDescription, setStepDescription] = useState("")

  // Tamper detection state
  const [tamperMode, setTamperMode] = useState(false)
  const [tamperedIndex, setTamperedIndex] = useState<number | null>(null)
  const [tamperedValue, setTamperedValue] = useState("")
  const [affectedNodes, setAffectedNodes] = useState<string[]>([])
  const [originalRoot, setOriginalRoot] = useState<string>("")

  const animationRef = useRef<NodeJS.Timeout | null>(null)

  const rebuildTree = useCallback((blocks: string[]) => {
    const newTree = buildMerkleTree(blocks)
    setTree(newTree)
    setCurrentStep(-1)
    setHighlightedNodes([])
    setStepDescription("")
    setTamperMode(false)
    setTamperedIndex(null)
    setAffectedNodes([])
    if (newTree.root) {
      setOriginalRoot(newTree.root.hash)
    }
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    rebuildTree(dataBlocks)
  }, [dataBlocks, rebuildTree])

  const addBlock = useCallback(() => {
    if (newBlockInput.trim()) {
      const newBlocks = [...dataBlocks, newBlockInput.trim()]
      setDataBlocks(newBlocks)
      rebuildTree(newBlocks)
      setNewBlockInput("")
    }
  }, [dataBlocks, newBlockInput, rebuildTree])

  const removeBlock = useCallback(
    (index: number) => {
      if (dataBlocks.length > 2) {
        const newBlocks = dataBlocks.filter((_, i) => i !== index)
        setDataBlocks(newBlocks)
        rebuildTree(newBlocks)
      }
    },
    [dataBlocks, rebuildTree]
  )

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < tree.steps.length) {
        setCurrentStep(step)
        const currentStepData = tree.steps[step]
        setHighlightedNodes(currentStepData.highlightNodes)
        setStepDescription(currentStepData.description)
      } else if (step < 0) {
        setCurrentStep(-1)
        setHighlightedNodes([])
        setStepDescription("")
      }
    },
    [tree.steps]
  )

  const stepForward = useCallback(() => {
    goToStep(Math.min(currentStep + 1, tree.steps.length - 1))
  }, [currentStep, goToStep, tree.steps.length])

  const stepBackward = useCallback(() => {
    goToStep(Math.max(currentStep - 1, -1))
  }, [currentStep, goToStep])

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (isPlaying && currentStep < tree.steps.length - 1) {
      animationRef.current = setTimeout(() => {
        goToStep(currentStep + 1)
      }, 1500 / speed)
    } else if (isPlaying && currentStep >= tree.steps.length - 1) {
      // Use setTimeout to avoid synchronous setState in effect
      animationRef.current = setTimeout(() => {
        setIsPlaying(false)
      }, 0)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isPlaying, currentStep, speed, goToStep, tree.steps.length])

  // Initialize original root when tree changes
  const currentRootHash = tree.root?.hash
  useEffect(() => {
    if (currentRootHash && !tamperMode) {
      // Use setTimeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        setOriginalRoot(currentRootHash)
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [currentRootHash, tamperMode])

  const startTamperDetection = useCallback(
    (index: number) => {
      setTamperMode(true)
      setTamperedIndex(index)
      setTamperedValue(dataBlocks[index])
      setIsPlaying(false)
      setCurrentStep(tree.steps.length - 1)
      setHighlightedNodes([])
      setStepDescription(
        'Tamper detection mode: Modify the data block and see how it affects the tree'
      )
    },
    [dataBlocks, tree.steps.length]
  )

  const applyTamper = useCallback(() => {
    if (tamperedIndex === null) return

    // Create modified data blocks
    const modifiedBlocks = [...dataBlocks]
    modifiedBlocks[tamperedIndex] = tamperedValue

    // Build new tree with modified data
    const newTree = buildMerkleTree(modifiedBlocks)
    setTree(newTree)

    // Find the leaf node that was modified
    const leafNodes = newTree.allNodes.filter((n) => n.isLeaf && !n.isDuplicate)
    const modifiedLeaf = leafNodes[tamperedIndex]

    if (modifiedLeaf && newTree.root) {
      const affected = getAffectedNodes(newTree.root, modifiedLeaf.id)
      setAffectedNodes(affected)
      setHighlightedNodes(affected)

      const rootChanged = newTree.root.hash !== originalRoot
      setStepDescription(
        rootChanged
          ? `TAMPER DETECTED! Root hash changed from ${originalRoot.slice(0, 8)}... to ${newTree.root.hash.slice(0, 8)}...`
          : "Data unchanged - root hash matches"
      )
    }
  }, [dataBlocks, tamperedIndex, tamperedValue, originalRoot])

  const exitTamperMode = useCallback(() => {
    setTamperMode(false)
    setTamperedIndex(null)
    setAffectedNodes([])
    rebuildTree(dataBlocks)
  }, [dataBlocks, rebuildTree])

  // Calculate tree dimensions for visualization
  const getTreeDepth = (node: TreeNode | null): number => {
    if (!node) return 0
    return (
      1 + Math.max(getTreeDepth(node.left || null), getTreeDepth(node.right || null))
    )
  }

  const treeDepth = tree.root ? getTreeDepth(tree.root) : 0

  // Render a tree node
  const renderNode = (node: TreeNode, x: number, y: number, width: number): React.ReactNode => {
    const isHighlighted = highlightedNodes.includes(node.id)
    const isAffected = affectedNodes.includes(node.id)
    const nodeStepIndex = tree.steps.findIndex((s) => s.nodeId === node.id)
    const isVisible = tamperMode || currentStep === -1 || nodeStepIndex <= currentStep

    const nodeWidth = 90
    const nodeHeight = 60
    const verticalGap = 80

    // Check if children are visible (for drawing connecting lines)
    const leftStepIndex = node.left ? tree.steps.findIndex((s) => s.nodeId === node.left!.id) : -1
    const rightStepIndex = node.right ? tree.steps.findIndex((s) => s.nodeId === node.right!.id) : -1
    const isLeftChildVisible = tamperMode || currentStep === -1 || (leftStepIndex !== -1 && leftStepIndex <= currentStep)
    const isRightChildVisible = tamperMode || currentStep === -1 || (rightStepIndex !== -1 && rightStepIndex <= currentStep)

    return (
      <g key={node.id}>
        {/* Lines to children - only show when both parent and child are visible */}
        {node.left && isVisible && isLeftChildVisible && (
          <motion.line
            x1={x}
            y1={y + nodeHeight / 2}
            x2={x - width / 4}
            y2={y + verticalGap}
            stroke={isAffected ? "#ef4444" : isHighlighted ? "#22c55e" : "#4b5563"}
            strokeWidth={isHighlighted || isAffected ? 3 : 2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {node.right && isVisible && isRightChildVisible && (
          <motion.line
            x1={x}
            y1={y + nodeHeight / 2}
            x2={x + width / 4}
            y2={y + verticalGap}
            stroke={isAffected ? "#ef4444" : isHighlighted ? "#22c55e" : "#4b5563"}
            strokeWidth={isHighlighted || isAffected ? 3 : 2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Node rectangle - only render if visible */}
        {isVisible && (
          <>
            <motion.rect
              x={x - nodeWidth / 2}
              y={y - nodeHeight / 2}
              width={nodeWidth}
              height={nodeHeight}
              rx={8}
              fill={
                isAffected
                  ? "#7f1d1d"
                  : isHighlighted
                    ? "#14532d"
                    : node.isLeaf
                      ? "#1e3a5f"
                      : "#1f2937"
              }
              stroke={
                isAffected
                  ? "#ef4444"
                  : isHighlighted
                    ? "#22c55e"
                    : node.isLeaf
                      ? "#3b82f6"
                      : "#6b7280"
              }
              strokeWidth={isHighlighted || isAffected ? 3 : 2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {/* Node content */}
            <motion.text
              x={x}
              y={y - 8}
              textAnchor="middle"
              fill={isAffected ? "#fca5a5" : isHighlighted ? "#86efac" : "#e5e7eb"}
              fontSize={10}
              fontFamily="monospace"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {node.hash.slice(0, 8)}
            </motion.text>

            {node.isLeaf && node.data && (
              <motion.text
                x={x}
                y={y + 12}
                textAnchor="middle"
                fill={isAffected ? "#fca5a5" : "#9ca3af"}
                fontSize={9}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {node.data.length > 10 ? node.data.slice(0, 10) + "..." : node.data}
              </motion.text>
            )}

            {node.isDuplicate && (
              <motion.text
                x={x}
                y={y + 22}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={8}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                (duplicate)
              </motion.text>
            )}

            {/* Root label */}
            {tree.root?.id === node.id && (
              <motion.text
                x={x}
                y={y - nodeHeight / 2 - 10}
                textAnchor="middle"
                fill="#a78bfa"
                fontSize={12}
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                MERKLE ROOT
              </motion.text>
            )}
          </>
        )}

        {/* Always render children recursively to ensure leaf nodes appear */}
        {node.left &&
          renderNode(
            node.left,
            x - width / 4,
            y + verticalGap,
            width / 2
          )}
        {node.right &&
          renderNode(
            node.right,
            x + width / 4,
            y + verticalGap,
            width / 2
          )}
      </g>
    )
  }

  const svgWidth = Math.max(600, Math.pow(2, treeDepth) * 100)
  const svgHeight = treeDepth * 80 + 100

  return (
    <div className="space-y-6">
      {/* Visualization Area */}
      <div className="border border-white/10 rounded-lg bg-[oklch(0.12_0_0)] p-4 overflow-x-auto">
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="min-w-[600px]"
        >
          {tree.root &&
            renderNode(tree.root, svgWidth / 2, 50, svgWidth * 0.8)}
        </svg>
      </div>

      {/* Step description */}
      <div
        className={`text-center text-sm min-h-8 p-2 rounded ${
          tamperMode && affectedNodes.length > 0
            ? "bg-red-500/20 text-red-400 border border-red-500/50"
            : "text-muted-foreground"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepDescription}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            {tamperMode && affectedNodes.length > 0 && (
              <AlertTriangle className="h-4 w-4" />
            )}
            {stepDescription || "Click Play to visualize tree construction"}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={stepBackward}
          disabled={currentStep <= -1 || isPlaying || tamperMode}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {isPlaying ? (
          <Button onClick={pause} disabled={tamperMode}>
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        ) : (
          <Button
            onClick={play}
            disabled={currentStep >= tree.steps.length - 1 || tamperMode}
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={stepForward}
          disabled={currentStep >= tree.steps.length - 1 || isPlaying || tamperMode}
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Slider
            value={[speed]}
            onValueChange={([v]) => setSpeed(v)}
            min={0.5}
            max={3}
            step={0.5}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground w-8">{speed}x</span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {tree.steps.length}
        </span>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / tree.steps.length) * 100}%`,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Data Input Section */}
      <div className="border-t pt-4 space-y-4">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Hash className="h-4 w-4" />
          Data Blocks
        </h4>

        <div className="flex flex-wrap gap-2">
          {dataBlocks.map((block, index) => (
            <motion.div
              key={index}
              layout
              className="flex items-center gap-1 bg-blue-500/20 border border-blue-500/50 rounded px-2 py-1"
            >
              <span className="text-sm">{block}</span>
              {!tamperMode && dataBlocks.length > 2 && (
                <button
                  onClick={() => removeBlock(index)}
                  className="text-red-400 hover:text-red-300 ml-1"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
              {!tamperMode && (
                <button
                  onClick={() => startTamperDetection(index)}
                  className="text-yellow-400 hover:text-yellow-300 ml-1"
                  title="Test tamper detection"
                >
                  <AlertTriangle className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {!tamperMode && (
          <div className="flex gap-2">
            <Input
              placeholder="Add new data block..."
              value={newBlockInput}
              onChange={(e) => setNewBlockInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addBlock()}
              className="max-w-xs"
            />
            <Button onClick={addBlock} disabled={!newBlockInput.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Block
            </Button>
          </div>
        )}

        {/* Tamper Detection Mode */}
        {tamperMode && tamperedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 space-y-3"
          >
            <h5 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Tamper Detection Mode
            </h5>
            <p className="text-sm text-muted-foreground">
              Modify the data block below and click &quot;Apply Change&quot; to see how
              changing a single piece of data affects the entire Merkle tree.
            </p>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                Original: &quot;{dataBlocks[tamperedIndex]}&quot;
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                value={tamperedValue}
                onChange={(e) => setTamperedValue(e.target.value)}
                placeholder="Enter modified value..."
                className="max-w-xs"
              />
              <Button
                onClick={applyTamper}
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Change
              </Button>
              <Button variant="outline" onClick={exitTamperMode}>
                Exit Mode
              </Button>
            </div>
            {affectedNodes.length > 0 && (
              <p className="text-sm text-red-400">
                {affectedNodes.length} node(s) affected by this change (highlighted in red)
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Description Section */}
      <div className="text-sm text-muted-foreground space-y-4 border-t pt-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">What is a Merkle Tree?</h4>
          <p>
            A <strong>Merkle tree</strong> (or hash tree) is a tree data structure where
            every leaf node contains the hash of a data block, and every non-leaf node
            contains the hash of its children. The root hash (Merkle root) provides a
            single fingerprint that represents all the data in the tree.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">How It Works</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Each data block is hashed to create leaf nodes</li>
            <li>If there is an odd number of leaves, the last one is duplicated</li>
            <li>Adjacent nodes are paired and their hashes are concatenated and hashed</li>
            <li>This process repeats until a single root hash remains</li>
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Why Merkle Trees Matter</h4>
          <p>
            The key property is that changing any data block changes all hashes up to the
            root. This enables efficient verification: to prove data is part of the tree,
            you only need O(log n) hashes instead of all the data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Time Complexity</h4>
            <ul className="space-y-1">
              <li><strong>Building:</strong> O(n) - hash each block once, create n-1 parent nodes</li>
              <li><strong>Verification:</strong> O(log n) - only need proof path from leaf to root</li>
              <li><strong>Update:</strong> O(log n) - only need to rehash nodes on path to root</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Space Complexity</h4>
            <ul className="space-y-1">
              <li><strong>Storage:</strong> O(n) - 2n-1 nodes for n data blocks</li>
              <li><strong>Proof size:</strong> O(log n) - compact verification proofs</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Real-World Use Cases</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li><strong>Bitcoin/Ethereum:</strong> Transaction verification in blocks</li>
            <li><strong>Git:</strong> Content-addressable storage for commits and files</li>
            <li><strong>IPFS:</strong> Content verification in distributed file systems</li>
            <li><strong>Certificate Transparency:</strong> Auditable public key certificates</li>
            <li><strong>Amazon DynamoDB:</strong> Anti-entropy protocol for replication</li>
            <li><strong>Apache Cassandra:</strong> Detecting inconsistencies between replicas</li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="python">
            <CodeBlock code={pythonCode} language="python" />
          </TabsContent>
          <TabsContent value="javascript">
            <CodeBlock code={javascriptCode} language="javascript" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
