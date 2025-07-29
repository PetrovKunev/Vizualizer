import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateInsertionSortSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  const n = arr.length;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Insertion Sort algorithm',
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      type: 'highlight',
      indices: [i],
      description: `Selecting element ${key} at position ${i} to insert into sorted portion`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [arr[j], key],
        description: `Comparing ${arr[j]} with ${key}: ${arr[j]} > ${key}, so shifting ${arr[j]} right`,
      });

      arr[j + 1] = arr[j];
      j--;
    }

    if (j + 1 !== i) {
      steps.push({
        type: 'set',
        indices: [j + 1],
        values: [key],
        description: `Inserting ${key} at position ${j + 1}`,
      });
      arr[j + 1] = key;
    }

    steps.push({
      type: 'complete',
      indices: Array.from({ length: i + 1 }, (_, index) => index),
      description: `Elements from position 0 to ${i} are now sorted`,
    });
  }

  steps.push({
    type: 'complete',
    indices: Array.from({ length: n }, (_, index) => index),
    description: 'All elements are now sorted!',
  });

  return steps;
}

export const insertionSortImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: generateInsertionSortSteps,
  code: {
    javascript: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}`,
    csharp: `public static void InsertionSort(int[] arr)
{
    int n = arr.Length;
    
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}`,
  },
}; 