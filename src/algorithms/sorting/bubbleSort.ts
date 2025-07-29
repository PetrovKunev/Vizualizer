import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateBubbleSortSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  const n = arr.length;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Bubble Sort algorithm',
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare step
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [arr[j], arr[j + 1]],
        description: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} vs ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap step
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j + 1], arr[j]],
          description: `Swapping ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}`,
        });

        // Perform the actual swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

    // Mark the last element as sorted
    steps.push({
      type: 'complete',
      indices: [n - i - 1],
      description: `Element at position ${n - i - 1} is now in its correct position`,
    });
  }

  // Mark the first element as sorted (it's the only one left)
  steps.push({
    type: 'complete',
    indices: [0],
    description: 'All elements are now sorted!',
  });

  return steps;
}

export const bubbleSortImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: generateBubbleSortSteps,
  code: {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
    csharp: `public static void BubbleSort(int[] arr)
{
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1])
            {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  },
};