# Repo guidelines

## Description

This repo is a collection and library of personal knowledge of different topics in software engineering, from programming languages, design patterns, resources, best practices, frontend, backend, algorithms, datastructures, etc. 

## Sections

Each section opens a subsection with cards, each card has to have a title, description and tags system. The content has to be searchable. Each of them opens an artifact which will be described in the following points.

- Resources: A collection of resources for different topics in software engineering, this place is like an agregator of different resources, each one has to have tags and a system to filter them by tags or search by keywords. Once opened is like a documentation page, with the content displayed.

- Algorithms and data structures, it's a place where each algorithm or data structure is explained by using an artifact, which is interactable software with animations and visualizations. All the code related has to be inside that section/directory. Are like independent artifacts

- Frontend: A collection of frontend exercises and examples, like algorithms section, the code related has to be inside that section/directory.

The content will be always client side

## Code Rules

### Commits

* Commits should be brief and follow the conventional commit message format.

### Style guidelines

* Follow the same style than shadcn/ui. Use the components library and the styles. If needed any new component, use the command `bunx --bun shadcn@latest add <component>` For example `bunx --bun shadcn@latest add button`.

### Libraries
- UI side: shadcn/ui, tailwindcss, lucide-react
- Animations: motion.

### Special notes
* Framer motion now is motion and has their separated documentation.