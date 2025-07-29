import { AlgorithmImplementation } from '@/types/algorithm';
import { bubbleSortImplementation } from '@/algorithms/sorting/bubbleSort';
import { selectionSortImplementation } from '@/algorithms/sorting/selectionSort';
import { insertionSortImplementation } from '@/algorithms/sorting/insertionSort';
import { mergeSortImplementation } from '@/algorithms/sorting/mergeSort';
import { quickSortImplementation } from '@/algorithms/sorting/quickSort';
import { linearSearchImplementation } from '@/algorithms/searching/linearSearch';
import { binarySearchImplementation } from '@/algorithms/searching/binarySearch';
import { depthFirstSearchImplementation } from '@/algorithms/graph/depthFirstSearch';
import { breadthFirstSearchImplementation } from '@/algorithms/graph/breadthFirstSearch';
import { binaryTreeTraversalImplementation } from '@/algorithms/tree/binaryTreeTraversal';
import { arrayImplementation } from '@/algorithms/data-structures/array';
import { stackImplementation } from '@/algorithms/data-structures/stack';
import { queueImplementation } from '@/algorithms/data-structures/queue';
import { linkedListImplementation } from '@/algorithms/data-structures/linkedList';
import { listImplementation } from '@/algorithms/data-structures/list';

export const algorithmRegistry: Record<string, AlgorithmImplementation> = {
  'bubble-sort': bubbleSortImplementation,
  'selection-sort': selectionSortImplementation,
  'insertion-sort': insertionSortImplementation,
  'merge-sort': mergeSortImplementation,
  'quick-sort': quickSortImplementation,
  'linear-search': linearSearchImplementation,
  'binary-search': binarySearchImplementation,
  'depth-first-search': depthFirstSearchImplementation,
  'breadth-first-search': breadthFirstSearchImplementation,
  'binary-tree-traversal': binaryTreeTraversalImplementation,
  'array': arrayImplementation,
  'stack': stackImplementation,
  'queue': queueImplementation,
  'linked-list': linkedListImplementation,
  'list': listImplementation,
};

export function getAlgorithmImplementation(algorithmId: string): AlgorithmImplementation | null {
  return algorithmRegistry[algorithmId] || null;
}

export function generateRandomArray(length: number = 10, min: number = 5, max: number = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}