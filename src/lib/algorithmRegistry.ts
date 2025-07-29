import { AlgorithmImplementation } from '@/types/algorithm';
import { bubbleSortImplementation } from '@/algorithms/sorting/bubbleSort';
import { selectionSortImplementation } from '@/algorithms/sorting/selectionSort';

export const algorithmRegistry: Record<string, AlgorithmImplementation> = {
  'bubble-sort': bubbleSortImplementation,
  'selection-sort': selectionSortImplementation,
};

export function getAlgorithmImplementation(algorithmId: string): AlgorithmImplementation | null {
  return algorithmRegistry[algorithmId] || null;
}

export function generateRandomArray(length: number = 10, min: number = 5, max: number = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}