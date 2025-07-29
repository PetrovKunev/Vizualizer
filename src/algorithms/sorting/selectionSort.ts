import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateSelectionSortSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  const n = arr.length;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Selection Sort algorithm',
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      type: 'highlight',
      indices: [i],
      description: `Finding minimum element in unsorted portion starting from position ${i}`,
    });

    // Find minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        indices: [minIdx, j],
        values: [arr[minIdx], arr[j]],
        description: `Comparing current minimum ${arr[minIdx]} at position ${minIdx} with ${arr[j]} at position ${j}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'highlight',
          indices: [minIdx],
          description: `New minimum found: ${arr[minIdx]} at position ${minIdx}`,
        });
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [arr[minIdx], arr[i]],
        description: `Swapping minimum element ${arr[minIdx]} with element at position ${i}`,
      });

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    steps.push({
      type: 'complete',
      indices: [i],
      description: `Element at position ${i} is now in its correct position`,
    });
  }

  // Mark the last element as sorted
  steps.push({
    type: 'complete',
    indices: [n - 1],
    description: 'All elements are now sorted!',
  });

  return steps;
}

export const selectionSortImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: generateSelectionSortSteps,
  code: {
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find minimum element
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap minimum with first element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`,
    csharp: `public static void SelectionSort(int[] arr)
{
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++)
    {
        int minIdx = i;
        
        // Find minimum element
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIdx])
            {
                minIdx = j;
            }
        }
        
        // Swap minimum with first element
        if (minIdx != i)
        {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
  },
};