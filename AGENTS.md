# Repo guidelines

## Description

This repo is a collection and library of personal knowledge of different topics in software engineering, from programming languages, design patterns, resources, best practices, frontend, backend, algorithms, datastructures, etc. 

## Collections

Each section opens a subsection with cards. Each card has a title, description, and tags. The content is searchable and filterable by tags. Each card opens an artifact specific to its section type.

There are three types of artifacts:

### 1. Resources (Read-only artifacts)

Documentation-style content for learning concepts. These are **not interactive software**, just well-structured text content.

**Structure:**
- Clear explanations written for easy learning
- Examples and diagrams when helpful
- Code snippets with syntax highlighting when needed
- Stored as MDX files in `content/resources/`

**Purpose:** Aggregator of knowledge, references, best practices, and curated information.

### 2. Algorithms & Data Structures (Interactive artifacts)

Interactive visualizations with animations to understand how algorithms work.

**Structure (three parts):**
1. **Interactive area** - Visualization with controls (play, pause, reset, speed, step-by-step, etc.). Don't spare on controls to improve the learning experience.
2. **Description** - Explanation of the algorithm, time/space complexity, and related information.
3. **Code examples** - Implementation in **Python** and **JavaScript** with syntax highlighting.

**Location:** Each artifact is self-contained in `artifacts/algorithms/[name]/`

### 3. Frontend Examples (Interactive artifacts)

Interactive demonstrations of frontend concepts, patterns, and APIs.

**Structure (three parts):**
1. **Interactive area** - Live demonstration with controls to experiment and learn. Don't spare on controls to improve the learning experience.
2. **Description** - Explanation of the concept, use cases, and related information.
3. **Code examples** - Implementation in **React (TypeScript)** and **CSS** when needed, with syntax highlighting.

**Location:** Each artifact is self-contained in `artifacts/frontend-examples/[name]/`

## Code Rules

### Commits

* Commits should be brief and follow the conventional commit message format.

### Style guidelines

* Follow the same style than shadcn/ui. Use the components library and the styles. If needed any new component, use the command `bunx --bun shadcn@latest add <component>` For example `bunx --bun shadcn@latest add button`.
* All code snippets has to have their own sintax highlighting.

### Libraries
- UI side: shadcn/ui, tailwindcss, lucide-react
- Animations: motion.

### Special notes
* Framer motion now is motion and has their separated documentation.
* This repo uses bun as package manager.

### Workflow
* After done the task, run the command `bun run build` to build the project, `bunx tsx --noEmit` and `bun run lint` to check for any errors.