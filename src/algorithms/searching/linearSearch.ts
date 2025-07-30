import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateLinearSearchSteps(data: number[], target: number = 25): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];

  steps.push({
    type: 'highlight',
    indices: [],
    description: `Starting Linear Search for target value ${target}`,
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: 'compare',
      indices: [i],
      values: [arr[i]],
      description: `Checking element at position ${i}: ${arr[i]} == ${target}?`,
    });

    if (arr[i] === target) {
      steps.push({
        type: 'complete',
        indices: [i],
        description: `Target ${target} found at position ${i}!`,
      });
      return steps;
    }
  }

  steps.push({
    type: 'highlight',
    indices: [],
    description: `Target ${target} not found in the array`,
  });

  return steps;
}

export const linearSearchImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: (data: number[], operation?: string, value?: number) => generateLinearSearchSteps(data, value || 5),
  code: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,
    csharp: `public static int LinearSearch(int[] arr, int target)
{
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] == target)
        {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}`,
  },
}; 