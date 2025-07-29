import { AlgorithmInfo } from '@/types/algorithm';

export const ALGORITHM_CATEGORIES = {
  SORTING: 'sorting',
  SEARCHING: 'searching',
  GRAPH: 'graph',
  TREE: 'tree',
  DATA_STRUCTURE: 'data-structure',
} as const;

export const SORTING_ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    description: 'Finds the minimum element from unsorted part and puts it at the beginning.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    description: 'Builds the final sorted array one item at a time.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    description: 'Divides the array into halves, sorts them, and merges them back.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    description: 'Selects a pivot element and partitions the array around it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
  },
];

export const SEARCHING_ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    description: 'Searches for an element by checking every element until the target is found.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    description: 'Searches a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1)',
  },
];

export const GRAPH_ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'depth-first-search',
    name: 'Depth-First Search',
    category: 'graph',
    description: 'Traverses a graph by exploring as far as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
  },
  {
    id: 'breadth-first-search',
    name: 'Breadth-First Search',
    category: 'graph',
    description: 'Traverses a graph by exploring all neighbors at the current depth before moving to the next level.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
  },
];

export const TREE_ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'binary-tree-traversal',
    name: 'Binary Tree Traversal',
    category: 'tree',
    description: 'Traverses a binary tree using inorder traversal (left, root, right).',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(h)',
  },
];

export const DATA_STRUCTURE_ALGORITHMS: AlgorithmInfo[] = [
  {
    id: 'array',
    name: 'Array',
    category: 'data-structure',
    description: 'A linear data structure that stores elements in contiguous memory locations. Supports random access, insertion, and deletion operations.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'data-structure',
    description: 'A LIFO (Last In, First Out) data structure where elements are added and removed from the same end (top).',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'data-structure',
    description: 'A FIFO (First In, First Out) data structure where elements are added at the rear and removed from the front.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'data-structure',
    description: 'A linear data structure where elements are stored in nodes, and each node contains a data field and a reference to the next node.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  {
    id: 'list',
    name: 'List',
    category: 'data-structure',
    description: 'A dynamic array that can grow and shrink. Provides fast access by index and supports add, remove, get, and set operations.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
];

export const ALL_ALGORITHMS = [
  ...SORTING_ALGORITHMS,
  ...SEARCHING_ALGORITHMS,
  ...GRAPH_ALGORITHMS,
  ...TREE_ALGORITHMS,
  ...DATA_STRUCTURE_ALGORITHMS,
];