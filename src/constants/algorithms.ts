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

export const ALL_ALGORITHMS = [
  ...SORTING_ALGORITHMS,
  ...SEARCHING_ALGORITHMS,
];