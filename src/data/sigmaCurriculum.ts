import {
  asCategoryId,
  asChapterId,
  type ArchitectureBlueprint,
  type ChapterId,
  type ComplexityCurve,
  type CurriculumChapter,
  type CurriculumTrack
} from '../types/curriculum';

const createChapter = (
  id: string,
  trackId: CurriculumTrack['id'],
  trackLabel: string,
  categoryId: string,
  categoryTitle: string,
  title: string,
  overview: string,
  complexityOrPattern: string,
  keywords: readonly string[]
): CurriculumChapter => ({
  id: asChapterId(id),
  trackId,
  trackLabel,
  categoryId: asCategoryId(categoryId),
  categoryTitle,
  title,
  overview,
  complexityOrPattern,
  keywords
});

export const SIGMA_TRACKS: readonly CurriculumTrack[] = [
  {
    id: 'frontend',
    label: 'Frontend Web Architecture',
    shortLabel: 'Frontend',
    badge: 'HTML5 · CSS3 · Tailwind · Bootstrap',
    summary:
      'Semantic document architecture, CSS cascade specificity, Box Model layout geometry, Flexbox alignment, responsive media queries, Bootstrap 12-column grids, and Tailwind CSS v4 utility engineering.',
    categories: [
      {
        id: asCategoryId('fe-intro'),
        trackId: 'frontend',
        title: 'Introduction & Web Protocols',
        chapters: [
          createChapter(
            'fe-what-is-web',
            'frontend',
            'Frontend Web Architecture',
            'fe-intro',
            'Introduction & Web Protocols',
            'What is Web?',
            'Foundational history of the World Wide Web, hypertext protocols, DNS resolution, and browser rendering engines.',
            'HTTP/HTTPS · DNS',
            ['web', 'internet', 'browser', 'protocol', 'dns']
          ),
          createChapter(
            'fe-client-server',
            'frontend',
            'Frontend Web Architecture',
            'fe-intro',
            'Introduction & Web Protocols',
            'Client-Server Architecture',
            'General distributed architecture governing web applications via stateless HTTP request and response lifecycles.',
            'Request / Response Cycle',
            ['client', 'server', 'http', 'request', 'response', 'architecture']
          ),
          createChapter(
            'fe-dev-env',
            'frontend',
            'Frontend Web Architecture',
            'fe-intro',
            'Introduction & Web Protocols',
            'Setting Developer Environment',
            'Configuring local engineering workstations, code editors, browser DevTools inspection, and live-reload workflows.',
            'Workstation Tooling',
            ['environment', 'vscode', 'devtools', 'setup']
          )
        ]
      },
      {
        id: asCategoryId('fe-html'),
        trackId: 'frontend',
        title: 'Semantic HTML5',
        chapters: [
          createChapter(
            'fe-html-structure',
            'frontend',
            'Frontend Web Architecture',
            'fe-html',
            'Semantic HTML5',
            'Structure',
            'Constructing accessible, SEO-ready DOM trees using semantic landmarks, document metadata, and valid nesting.',
            'DOM Tree Semantics',
            ['html', 'structure', 'dom', 'semantic', 'landmarks']
          ),
          createChapter(
            'fe-html-tags',
            'frontend',
            'Frontend Web Architecture',
            'fe-html',
            'Semantic HTML5',
            'Tags in HTML',
            'Mastering structural and media elements including headings (<h1>-<h6>), paragraphs (<p>), anchors (<a>), and responsive images (<img>).',
            'HTML5 Elements',
            ['tags', 'h1', 'anchor', 'img', 'html5']
          ),
          createChapter(
            'fe-block-inline',
            'frontend',
            'Frontend Web Architecture',
            'fe-html',
            'Semantic HTML5',
            'Block v/s Inline',
            'Distinguishing block-level formatting contexts from inline flow elements and controlling document layout behavior.',
            'Block Formatting Context',
            ['block', 'inline', 'display', 'flow']
          ),
          createChapter(
            'fe-html-tables',
            'frontend',
            'Frontend Web Architecture',
            'fe-html',
            'Semantic HTML5',
            'Tables',
            'Structuring multi-dimensional tabular datasets with <thead>, <tbody>, semantic scope attributes, and cell spanning.',
            'Structured Data Grid',
            ['tables', 'thead', 'tbody', 'tr', 'td']
          ),
          createChapter(
            'fe-html-forms',
            'frontend',
            'Frontend Web Architecture',
            'fe-html',
            'Semantic HTML5',
            'Forms',
            'Engineering accessible input controls, native constraint validation, labels, fieldsets, and payload encoding.',
            'Input & Validation',
            ['forms', 'input', 'validation', 'labels', 'accessibility']
          )
        ]
      },
      {
        id: asCategoryId('fe-css-core'),
        trackId: 'frontend',
        title: 'CSS3 Cascade, Specificity & Box Model',
        chapters: [
          createChapter(
            'fe-css-intro',
            'frontend',
            'Frontend Web Architecture',
            'fe-css-core',
            'CSS3 Cascade, Specificity & Box Model',
            'Introduction to CSS',
            'Stylesheet attachment architectures (external, internal, inline) and browser CSSOM style resolution.',
            'CSSOM Cascade',
            ['css', 'stylesheet', 'cssom', 'styling']
          ),
          createChapter(
            'fe-css-selectors',
            'frontend',
            'Frontend Web Architecture',
            'fe-css-core',
            'CSS3 Cascade, Specificity & Box Model',
            'Understanding Selectors & Specificity',
            'Element, class, ID selectors, structural combinators, pseudo-classes, pseudo-elements, and deterministic specificity weight calculation.',
            'Specificity Tuple (a,b,c)',
            ['selectors', 'specificity', 'combinators', 'pseudo-classes', 'pseudo-elements']
          ),
          createChapter(
            'fe-box-model',
            'frontend',
            'Frontend Web Architecture',
            'fe-css-core',
            'CSS3 Cascade, Specificity & Box Model',
            'Box Model & CSS Units',
            'Content, padding, border, and margin geometry with border-box sizing alongside absolute (px) and relative (rem, em, vw, vh, %) units.',
            'Box Geometry · Fluid Units',
            ['box model', 'margin', 'padding', 'border', 'units', 'rem', 'vw']
          ),
          createChapter(
            'fe-transitions-transforms',
            'frontend',
            'Frontend Web Architecture',
            'fe-css-core',
            'CSS3 Cascade, Specificity & Box Model',
            'CSS Transitions & Transforms',
            'GPU-composited 2D/3D coordinate transformations (translate, scale, rotate) and cubic-bezier transition shorthands.',
            'Compositor Layer (120fps)',
            ['transition', 'transform', 'animation', 'gpu', 'shorthand']
          )
        ]
      },
      {
        id: asCategoryId('fe-layout-frameworks'),
        trackId: 'frontend',
        title: 'Flexbox, Responsive Media & UI Frameworks',
        chapters: [
          createChapter(
            'fe-flexbox',
            'frontend',
            'Frontend Web Architecture',
            'fe-layout-frameworks',
            'Flexbox, Responsive Media & UI Frameworks',
            'Flexbox Layout & Properties',
            'Main-axis and cross-axis distribution via flex-direction, justify-content, align-items, align-self, flex-wrap, and flex grow/shrink sizing.',
            '1D Axis Distribution',
            ['flexbox', 'justify-content', 'align-items', 'flex-wrap', 'axis']
          ),
          createChapter(
            'fe-media-queries',
            'frontend',
            'Frontend Web Architecture',
            'fe-layout-frameworks',
            'Flexbox, Responsive Media & UI Frameworks',
            'Responsive Designs & Media Queries',
            'Mobile-first viewport meta rules and adaptive breakpoint queries across mobile, tablet, and desktop viewports.',
            'Adaptive Viewports',
            ['responsive', 'media queries', 'viewport', 'breakpoints']
          ),
          createChapter(
            'fe-bootstrap',
            'frontend',
            'Frontend Web Architecture',
            'fe-layout-frameworks',
            'Flexbox, Responsive Media & UI Frameworks',
            'Bootstrap Components & Grid System',
            'Rapid UI composition using Bootstrap Navbars, cards, buttons, and its responsive 12-column container/row/col grid system.',
            '12-Column Grid System',
            ['bootstrap', 'grid', 'navbar', 'cards', 'components']
          ),
          createChapter(
            'fe-tailwind',
            'frontend',
            'Frontend Web Architecture',
            'fe-layout-frameworks',
            'Flexbox, Responsive Media & UI Frameworks',
            'Tailwind CSS & Custom Layers',
            'Utility-first design systems, responsive modifiers, typography/spacing scales, and custom abstractions using @apply and @layer.',
            'Atomic Utility CSS',
            ['tailwind', 'apply', 'layer', 'utility', 'responsive']
          ),
          createChapter(
            'fe-css-major-project',
            'frontend',
            'Frontend Web Architecture',
            'fe-layout-frameworks',
            'Flexbox, Responsive Media & UI Frameworks',
            'CSS Major Project',
            'End-to-end production interface engineered by synthesizing semantic HTML5, responsive Flexbox/Grid layouts, and design tokens.',
            'Capstone UI Architecture',
            ['project', 'css project', 'frontend capstone', 'ui']
          )
        ]
      }
    ]
  },
  {
    id: 'javascript',
    label: 'JavaScript (ES6+), Async & Tooling',
    shortLabel: 'JS & Tooling',
    badge: 'ES6+ · Closures · Event Loop · Git',
    summary:
      'Execution contexts, lexical closures, prototype chains, ES6 classes, non-blocking Event Loop concurrency, Promises/async-await, DOM orchestration, CLI mastery, and Git branching workflows.',
    categories: [
      {
        id: asCategoryId('js-fundamentals'),
        trackId: 'javascript',
        title: 'Core JavaScript, Functions & Data Structures',
        chapters: [
          createChapter(
            'js-intro-basics',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-fundamentals',
            'Core JavaScript, Functions & Data Structures',
            'Intro to JS, Variables, Conditionals & Loops',
            'Dynamic typing, let/const block bindings, operators, control-flow branching, and iterative loop constructs.',
            'ECMAScript Runtime',
            ['javascript', 'variables', 'operators', 'conditionals', 'loops']
          ),
          createChapter(
            'js-functions-scope',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-fundamentals',
            'Core JavaScript, Functions & Data Structures',
            'Scope, Function Declarations vs. Expressions & Arrays',
            'Lexical scope resolution, hoisting differences between declarations and expressions, and array mutation/slicing via splice and slice.',
            'Lexical Scope · O(n) Slice',
            ['scope', 'function expression', 'function declaration', 'arrays', 'splice', 'slice']
          ),
          createChapter(
            'js-objects',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-fundamentals',
            'Core JavaScript, Functions & Data Structures',
            'Objects, Nested Structures & Iteration',
            'Key-value property access via dot and bracket notation, nested object modeling, property deletion, and object key iteration.',
            'O(1) Property Lookup',
            ['objects', 'nested objects', 'iteration', 'properties']
          ),
          createChapter(
            'js-dom-events',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-fundamentals',
            'Core JavaScript, Functions & Data Structures',
            'DOM Manipulation & Event Handling',
            'Querying and mutating live DOM nodes, registering event listeners, event bubbling/delegation, and reactive UI updates.',
            'DOM Event Delegation',
            ['dom', 'events', 'event listener', 'manipulation']
          )
        ]
      },
      {
        id: asCategoryId('js-advanced-async'),
        trackId: 'javascript',
        title: 'Closures, Prototypes & Asynchronous Concurrency',
        chapters: [
          createChapter(
            'js-iife-closures',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-advanced-async',
            'Closures, Prototypes & Asynchronous Concurrency',
            'IIFE & Lexical Closures',
            'Encapsulating private state using Immediately Invoked Function Expressions and persistent lexical closure environments.',
            'Lexical Environment Retention',
            ['closures', 'iife', 'encapsulation', 'lexical']
          ),
          createChapter(
            'js-prototypes-classes',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-advanced-async',
            'Closures, Prototypes & Asynchronous Concurrency',
            'Arrow Functions, "this", Prototypes & Classes',
            'Lexical "this" binding in arrow functions vs. dynamic call-site invocation, prototype delegation chains, and ES6 class inheritance.',
            'Prototype Chain Delegation',
            ['arrow functions', 'this keyword', 'prototypes', 'class', 'inheritance']
          ),
          createChapter(
            'js-async-event-loop',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-advanced-async',
            'Closures, Prototypes & Asynchronous Concurrency',
            'Callbacks, Timed Events, Event Loop, Promises & Async/Await',
            'Non-blocking concurrency across Call Stack, Web APIs, Microtask Queue, and Callback Queue using setTimeout, Promises, and async/await.',
            'Microtask / Macrotask Queue',
            ['promises', 'callbacks', 'settimeout', 'event loop', 'async await']
          ),
          createChapter(
            'js-ajax-apis',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-advanced-async',
            'Closures, Prototypes & Asynchronous Concurrency',
            'AJAX, REST APIs & JSON',
            'Asynchronous HTTP data fetching, JSON serialization/deserialization, and dynamic client-side API integration.',
            'Async JSON Payloads',
            ['ajax', 'api', 'json', 'fetch', 'async requests']
          )
        ]
      },
      {
        id: asCategoryId('js-git-terminal'),
        trackId: 'javascript',
        title: 'Git Version Control, CLI & JS Capstone',
        chapters: [
          createChapter(
            'js-git-workflow',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-git-terminal',
            'Git Version Control, CLI & JS Capstone',
            'Git, Branches & Collaborative Workflows',
            'Distributed version control, branch isolation, atomic commits, push/pull synchronization, and pull-request code review workflows.',
            'DAG Commit History',
            ['git', 'branches', 'commits', 'pull requests', 'workflow']
          ),
          createChapter(
            'js-terminal-project',
            'javascript',
            'JavaScript (ES6+), Async & Tooling',
            'js-git-terminal',
            'Git Version Control, CLI & JS Capstone',
            'Mastering Terminal & JS Major Project',
            'Command-line directory navigation, file system operations, and building a full interactive JavaScript Major Project.',
            'POSIX CLI · JS Capstone',
            ['terminal', 'cli', 'commands', 'paths', 'js major project']
          )
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    label: 'Backend, Databases & React',
    shortLabel: 'MERN & SQL',
    badge: 'Node · Express MVC · SQL · MongoDB · React',
    summary:
      'Server-side Node.js runtimes, Express MVC architecture, middleware pipelines, EJS templating, relational SQL queries, MongoDB/Mongoose ODM, authentication, and React component lifecycles.',
    categories: [
      {
        id: asCategoryId('be-node-express'),
        trackId: 'fullstack',
        title: 'Node.js & Express MVC Server Architecture',
        chapters: [
          createChapter(
            'be-node-server',
            'fullstack',
            'Backend, Databases & React',
            'be-node-express',
            'Node.js & Express MVC Server Architecture',
            'Node.js Runtime, HTTP Servers & Nodemon',
            'Event-driven server-side JavaScript execution, spinning up custom HTTP servers, and automated hot-reloading with nodemon.',
            'Single-Threaded Event I/O',
            ['nodejs', 'server', 'nodemon', 'runtime']
          ),
          createChapter(
            'be-express-mvc',
            'fullstack',
            'Backend, Databases & React',
            'be-node-express',
            'Node.js & Express MVC Server Architecture',
            'Express Framework, MVC Architecture, EJS & Middleware',
            'Separation of concerns via Model-View-Controller, modular Express routing, server-side EJS templates, and composable middleware chains.',
            'MVC Pipeline Architecture',
            ['express', 'mvc', 'ejs', 'middleware', 'template engine']
          )
        ]
      },
      {
        id: asCategoryId('be-databases-mega'),
        trackId: 'fullstack',
        title: 'Relational SQL, MongoDB & Backend Mega Project',
        chapters: [
          createChapter(
            'be-sql-databases',
            'fullstack',
            'Backend, Databases & React',
            'be-databases-mega',
            'Relational SQL, MongoDB & Backend Mega Project',
            'Database Fundamentals & Relational SQL',
            'Persistent storage architectures, relational schema modeling, primary/foreign keys, and structured SQL query execution.',
            'ACID Relational Queries',
            ['database', 'sql', 'queries', 'relational']
          ),
          createChapter(
            'be-mongodb-mongoose',
            'fullstack',
            'Backend, Databases & React',
            'be-databases-mega',
            'Relational SQL, MongoDB & Backend Mega Project',
            'MongoDB CRUD & Mongoose ODM',
            'Document-oriented BSON persistence, complete CRUD operations, and schema-enforced Mongoose object-document mapping.',
            'BSON Document Store',
            ['mongodb', 'crud', 'mongoose', 'nosql', 'schema']
          ),
          createChapter(
            'be-mega-project',
            'fullstack',
            'Backend, Databases & React',
            'be-databases-mega',
            'Relational SQL, MongoDB & Backend Mega Project',
            'Full-Stack Mega Project (REST APIs, Auth & Deployment)',
            'Production backend engineering integrating RESTful APIs, schema validation, centralized error handling, Express Router, authentication, and cloud deployment.',
            'End-to-End Production API',
            ['mega project', 'rest api', 'validation', 'error handling', 'authentication', 'deployment']
          )
        ]
      },
      {
        id: asCategoryId('fe-react'),
        trackId: 'fullstack',
        title: 'React Component Engineering',
        chapters: [
          createChapter(
            'be-react-core',
            'fullstack',
            'Backend, Databases & React',
            'fe-react',
            'React Component Engineering',
            'React Components, Styling, Lifecycle & Material UI',
            'Declarative component composition, props/state architecture, component lifecycle methods, Material UI integration, and a full React Project.',
            'Virtual DOM Reconciliation',
            ['react', 'components', 'lifecycle', 'material ui', 'react project']
          )
        ]
      }
    ]
  },
  {
    id: 'dsa',
    label: 'Java & Data Structures & Algorithms',
    shortLabel: 'Java & DSA',
    badge: 'Java · Trees · Graphs · Segment Trees · DP',
    summary:
      'Rigorous algorithmic problem solving in Java: complexity analysis, recursion/backtracking, bit manipulation, OOP, linear structures, balanced BSTs, heaps, hashing, tries, shortest-path graphs, segment trees, and dynamic programming.',
    categories: [
      {
        id: asCategoryId('dsa-java-core'),
        trackId: 'dsa',
        title: 'Java Foundations, Loops & Memory Model',
        chapters: [
          createChapter(
            'dsa-basics-java',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-java-core',
            'Java Foundations, Loops & Memory Model',
            'Flowcharts, Pseudocode, Java Data Types & Conditionals',
            'Algorithmic flowchart modeling, JVM bytecode execution, primitive data types, I/O streams, operators, and conditional branching.',
            'JVM Execution Model',
            ['java', 'flowcharts', 'pseudocode', 'data types', 'conditionals', 'operators']
          ),
          createChapter(
            'dsa-loops-patterns-fn',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-java-core',
            'Java Foundations, Loops & Memory Model',
            'Loops, Algorithmic Patterns & Pass-by-Value Functions',
            'Nested loop invariants (Butterfly, Floyd’s Triangle, Rhombus), call-stack frames, pass-by-value semantics, and lexical scope.',
            'O(n²) Pattern Synthesis',
            ['loops', 'patterns', 'butterfly', 'floyd', 'functions', 'pass by value']
          )
        ]
      },
      {
        id: asCategoryId('dsa-arrays-strings'),
        trackId: 'dsa',
        title: 'Arrays, Searching, Sorting & Strings',
        chapters: [
          createChapter(
            'dsa-arrays-sorting',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-arrays-sorting',
            'Arrays, Searching, Sorting & Strings',
            '1D/2D Arrays, Binary Search & Sorting Algorithms',
            'Contiguous memory layout, Linear & Binary Search, Selection, Bubble, Insertion, and linear-time Count Sort.',
            'O(log n) Search · O(n + k) Sort',
            ['arrays', '2d arrays', 'binary search', 'linear search', 'sorting', 'count sort']
          ),
          createChapter(
            'dsa-strings',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-arrays-sorting',
            'Arrays, Searching, Sorting & Strings',
            'Strings & Mutable StringBuilder',
            'Immutable String Pool internals versus amortized O(1) append operations using mutable StringBuilder buffers.',
            'O(1) Amortized Append',
            ['strings', 'stringbuilder', 'string pool', 'java strings']
          )
        ]
      },
      {
        id: asCategoryId('dsa-paradigms-oop'),
        trackId: 'dsa',
        title: 'Recursion, Bitwise, Complexity, Greedy & OOP',
        chapters: [
          createChapter(
            'dsa-recursion-dc',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-paradigms-oop',
            'Recursion, Bitwise, Complexity, Greedy & OOP',
            'Recursion, Mathematical Induction, Backtracking & Divide-and-Conquer',
            'State-space tree exploration, backtracking pruning, and recursive Divide & Conquer algorithms including Merge Sort and Quick Sort.',
            'O(n log n) Divide & Conquer',
            ['recursion', 'backtracking', 'divide and conquer', 'merge sort', 'quick sort', 'induction']
          ),
          createChapter(
            'dsa-bit-complexity-greedy',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-paradigms-oop',
            'Recursion, Bitwise, Complexity, Greedy & OOP',
            'Bit Manipulation, Asymptotic Complexity & Greedy Algorithms',
            'Bitwise masking, O(log n) fast exponentiation, formal Big-O time/space complexity analysis, and greedy choice proofs.',
            'O(log n) Fast Exp · Big-O',
            ['bit manipulation', 'fast exponentiation', 'time complexity', 'space complexity', 'greedy']
          ),
          createChapter(
            'dsa-oop-collections',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-paradigms-oop',
            'Recursion, Bitwise, Complexity, Greedy & OOP',
            'Object-Oriented Programming & Java Collections (ArrayList)',
            'Four pillars of OOP (Abstraction, Encapsulation, Inheritance, Polymorphism), constructors, static members, interfaces, and dynamic ArrayLists.',
            'SOLID · Dynamic Array',
            ['oop', 'abstraction', 'encapsulation', 'inheritance', 'polymorphism', 'interfaces', 'arraylist']
          )
        ]
      },
      {
        id: asCategoryId('dsa-linear-trees'),
        trackId: 'dsa',
        title: 'Linked Lists, Stacks, Queues, Trees & Heaps',
        chapters: [
          createChapter(
            'dsa-linked-lists',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-linear-trees',
            'Linked Lists, Stacks, Queues, Trees & Heaps',
            'Linked Lists & In-Place Pointer Algorithms',
            'Node insertion/deletion, fast-slow midpoint detection, merging sorted lists, Linked List Merge Sort, and iterative/recursive reversal.',
            'O(1) Pointer Rewiring',
            ['linked list', 'midpoint', 'merge sort linked list', 'reverse linked list']
          ),
          createChapter(
            'dsa-stacks-queues',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-linear-trees',
            'Linked Lists, Stacks, Queues, Trees & Heaps',
            'Stacks, Queues & Circular Queues',
            'LIFO/FIFO abstractions built over dynamic arrays, linked nodes, and modulo-indexed Circular Queues.',
            'O(1) Push / Pop / Enqueue',
            ['stacks', 'queues', 'circular queue', 'lifo', 'fifo']
          ),
          createChapter(
            'dsa-trees-bst',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-linear-trees',
            'Linked Lists, Stacks, Queues, Trees & Heaps',
            'Binary Trees, Binary Search Trees & Balanced BSTs',
            'DFS/BFS tree traversals, tree diameter, height, Lowest Common Ancestor (LCA), BST search/insert/delete, and balanced BST invariants.',
            'O(h) Tree Operations',
            ['binary tree', 'bst', 'lca', 'diameter', 'traversals', 'balanced bst']
          ),
          createChapter(
            'dsa-heaps-pq',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-linear-trees',
            'Linked Lists, Stacks, Queues, Trees & Heaps',
            'Heaps, Heap Sort & Priority Queues',
            'Complete Binary Tree array representation, Min/Max heapify sift operations, O(n log n) in-place Heap Sort, and Priority Queues.',
            'O(log n) Extract-Min/Max',
            ['heaps', 'priority queue', 'heap sort', 'min heap', 'max heap', 'cbt']
          )
        ]
      },
      {
        id: asCategoryId('dsa-advanced-dp'),
        trackId: 'dsa',
        title: 'Hashing, Tries, Graphs, Segment Trees & DP',
        chapters: [
          createChapter(
            'dsa-hashing-tries',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-advanced-dp',
            'Hashing, Tries, Graphs, Segment Trees & DP',
            'Hashing (HashMap/HashSet) & Prefix Tries',
            'Custom hash function design, collision resolution, and TrieNode prefix trees supporting O(m) insert, search, and deletion.',
            'O(1) Hash · O(m) Trie',
            ['hashing', 'hashmap', 'hashset', 'tries', 'prefix tree', 'trienode']
          ),
          createChapter(
            'dsa-graphs',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-advanced-dp',
            'Hashing, Tries, Graphs, Segment Trees & DP',
            'Graphs: BFS, DFS, MST (Kruskal/Prim) & Shortest Paths (Dijkstra/Bellman-Ford)',
            'Directed/weighted graph representations, cycle detection, Minimum Spanning Trees (Kruskal & Prim), and Dijkstra & Bellman-Ford shortest paths.',
            'O((V + E) log V) Dijkstra',
            ['graphs', 'bfs', 'dfs', 'dijkstra', 'bellman ford', 'kruskal', 'prim', 'mst']
          ),
          createChapter(
            'dsa-segment-trees',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-advanced-dp',
            'Hashing, Tries, Graphs, Segment Trees & DP',
            'Segment Trees & Range Queries',
            'Binary interval tree construction and logarithmic-time range sum/min/max queries with point updates.',
            'O(log n) Range Query',
            ['segment trees', 'range queries', 'interval tree']
          ),
          createChapter(
            'dsa-dynamic-programming',
            'dsa',
            'Java & Data Structures & Algorithms',
            'dsa-advanced-dp',
            'Hashing, Tries, Graphs, Segment Trees & DP',
            'Dynamic Programming (Memoization, Tabulation & Classical DP)',
            'Optimal substructure and overlapping subproblems across 0/1 Knapsack, Fibonacci, Longest Common Subsequence (LCS), Catalan Numbers, Edit Distance, and Matrix Chain Multiplication.',
            'O(n·W) / O(n³) State DP',
            ['dynamic programming', 'dp', 'memoization', 'tabulation', 'knapsack', 'lcs', 'edit distance', 'catalan', 'mcm']
          )
        ]
      }
    ]
  }
];

export const ALL_CHAPTERS: readonly CurriculumChapter[] = SIGMA_TRACKS.flatMap((track) =>
  track.categories.flatMap((category) => category.chapters)
);

export const CHAPTER_BY_ID: ReadonlyMap<ChapterId, CurriculumChapter> = new Map(
  ALL_CHAPTERS.map((chapter) => [chapter.id, chapter])
);

export const ARCHITECTURE_BLUEPRINTS: readonly ArchitectureBlueprint[] = [
  {
    id: 'mern-mega-architecture',
    title: 'Full-Stack MERN Mega Architecture',
    badge: 'Backend & Full-Stack Capstone',
    domain: 'Node.js · Express MVC · MongoDB / Mongoose · REST APIs',
    summary:
      'Production-grade multi-tier web application implementing strict MVC separation, composable middleware pipelines, Zod/Mongoose schema validation, role-based authentication, and centralized error boundaries.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose ODM', 'EJS / React', 'REST JSON'],
    algorithmicHighlights: [
      'Compound B-Tree indexes on MongoDB collections for O(log n) query resolution',
      'O(1) Map-based rate-limiter and session token lookup in Express middleware',
      'Deterministic error-handling middleware preventing stack-trace leakage'
    ],
    layers: [
      {
        name: 'Router & Middleware Pipeline',
        responsibility: 'Request parsing, authentication guards, input sanitization, and Express Router dispatch.',
        contract: 'Express Middleware (req, res, next) -> Validated DTO'
      },
      {
        name: 'MVC Controller & Service Layer',
        responsibility: 'Stateless business logic orchestration decoupled from transport and storage details.',
        contract: 'Async Controller -> Domain Result | Typed AppError'
      },
      {
        name: 'Mongoose ODM & Relational SQL Persistence',
        responsibility: 'Schema-validated BSON documents and normalized relational SQL queries.',
        contract: 'Indexed Collection / Table -> ACID / Atomic Write'
      }
    ]
  },
  {
    id: 'java-dsa-solver-engine',
    title: 'Java Algorithmic & Graph Optimization Suite',
    badge: 'Java + DSA (300+ Problems)',
    domain: 'Java · Graphs · Segment Trees · Dynamic Programming · Tries',
    summary:
      'Modular Java implementation library covering asymptotic complexity optimization across weighted graph routing, prefix-tree autocomplete, range-query segment trees, and multi-dimensional dynamic programming.',
    stack: ['Java', 'Collections Framework', 'PriorityQueue', 'HashMap', 'Custom Trie & Segment Tree'],
    algorithmicHighlights: [
      'Dijkstra’s shortest-path routing with binary Min-Heap PriorityQueue in O((V + E) log V)',
      'Prefix Trie autocomplete supporting O(m) insertion, search, and prefix deletion',
      'Tabulated & memoized DP solvers for Knapsack, LCS, Edit Distance, and Matrix Chain Multiplication'
    ],
    layers: [
      {
        name: 'Linear & Hierarchical Structures',
        responsibility: 'Custom Linked Lists, Circular Queues, Balanced BSTs, and Complete Binary Tree Heaps.',
        contract: 'O(1) – O(log n) Structural Invariants'
      },
      {
        name: 'Graph & Range Query Engine',
        responsibility: 'Adjacency-list weighted graphs (BFS, DFS, Kruskal, Prim, Bellman-Ford) and Segment Trees.',
        contract: 'O(log n) Range Query · O(E log V) MST'
      },
      {
        name: 'Dynamic Programming State Engine',
        responsibility: 'Bottom-up tabulation and top-down memoization eliminating exponential recursion.',
        contract: 'O(2ⁿ) -> Polynomial State Transition'
      }
    ]
  },
  {
    id: 'edge-portfolio-architecture',
    title: 'basantkoiri.com.np Edge Static Architecture',
    badge: '0.1% Web Systems Craft',
    domain: 'React 19 · TypeScript · Tailwind CSS v4 · GitHub Pages + Cloudflare CDN',
    summary:
      'Zero-CLS, sub-50ms INP static web architecture deployed via automated GitHub Actions CI/CD to GitHub Pages behind Cloudflare’s global edge proxy with strict CSP security headers.',
    stack: ['React 19', 'Strict TypeScript', 'Tailwind CSS v4', 'HTML5 Canvas', 'GitHub Actions', 'Cloudflare CDN'],
    algorithmicHighlights: [
      'In-memory PrefixTrie compiled at boot for O(m + k) sub-millisecond curriculum search',
      'IntersectionObserver-gated 120fps HTML5 Canvas Dijkstra/BFS simulation',
      'Blocking <head> theme script achieving 0ms Flash of Unstyled Content (FOUC)'
    ],
    layers: [
      {
        name: 'Design Token & Typography Layer',
        responsibility: 'OKLCH perceptually uniform color system with fluid clamp() scales and metric-matched font fallbacks.',
        contract: 'CLS = 0.00 · WCAG 2.2 AA Contrast >= 7.2:1'
      },
      {
        name: 'Algorithmic Client State Layer',
        responsibility: 'Exhaustive discriminated union FSMs paired with O(1) Map indexes and PrefixTrie search.',
        contract: 'INP <= 50ms · Zero Any / Unsafe Casts'
      },
      {
        name: 'Cloudflare & GitHub Pages Edge Layer',
        responsibility: 'Automated typecheck/build CI pipeline, CNAME domain routing, and strict security headers.',
        contract: 'CSP + HSTS + Immutable Asset Caching'
      }
    ]
  }
];

export const COMPLEXITY_CURVES: readonly ComplexityCurve[] = [
  {
    id: 'o-1',
    notation: 'O(1)',
    name: 'Constant Time',
    colorToken: 'var(--accent-emerald)',
    curriculumExamples: ['HashMap / HashSet Lookup', 'Stack Push / Pop', 'Array Index Access'],
    evaluate: () => 1
  },
  {
    id: 'o-log-n',
    notation: 'O(log n)',
    name: 'Logarithmic Time',
    colorToken: 'var(--accent-cyan)',
    curriculumExamples: ['Binary Search', 'Balanced BST Search', 'Heap Insert / Extract', 'Segment Tree Query'],
    evaluate: (n: number) => Math.max(1, Math.log2(Math.max(2, n)))
  },
  {
    id: 'o-n',
    notation: 'O(n)',
    name: 'Linear Time',
    colorToken: 'var(--accent-indigo)',
    curriculumExamples: ['Count Sort', 'Linked List Reversal', 'Tree Diameter / LCA DFS', 'Kadane / Two-Pointer'],
    evaluate: (n: number) => n
  },
  {
    id: 'o-n-log-n',
    notation: 'O(n log n)',
    name: 'Linearithmic Time',
    colorToken: 'var(--accent-amber)',
    curriculumExamples: ['Merge Sort', 'Quick Sort (Avg)', 'Heap Sort', 'Kruskal MST'],
    evaluate: (n: number) => n * Math.max(1, Math.log2(Math.max(2, n)))
  },
  {
    id: 'o-n-2',
    notation: 'O(n²)',
    name: 'Quadratic Time',
    colorToken: 'oklch(0.68 0.18 25)',
    curriculumExamples: ['Bubble / Selection / Insertion Sort', 'Edit Distance DP Table', 'LCS 2D Tabulation'],
    evaluate: (n: number) => n * n
  }
];