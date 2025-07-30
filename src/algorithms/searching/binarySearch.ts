import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateBinarySearchSteps(data: number[], target: number = 25): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data].sort((a, b) => a - b); // Binary search requires sorted array

  steps.push({
    type: 'highlight',
    indices: [],
    description: `Starting Binary Search for target value ${target} in sorted array`,
  });

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: 'highlight',
      indices: [left, right],
      description: `Search range: positions ${left} to ${right}`,
    });

    steps.push({
      type: 'compare',
      indices: [mid],
      values: [arr[mid]],
      description: `Checking middle element at position ${mid}: ${arr[mid]} == ${target}?`,
    });

    if (arr[mid] === target) {
      steps.push({
        type: 'complete',
        indices: [mid],
        description: `Target ${target} found at position ${mid}!`,
      });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({
        type: 'highlight',
        indices: [mid],
        description: `${arr[mid]} < ${target}, searching right half`,
      });
      left = mid + 1;
    } else {
      steps.push({
        type: 'highlight',
        indices: [mid],
        description: `${arr[mid]} > ${target}, searching left half`,
      });
      right = mid - 1;
    }
  }

  steps.push({
    type: 'highlight',
    indices: [],
    description: `Target ${target} not found in the array`,
  });

  return steps;
}

export const binarySearchImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: (data: number[], operation?: string, value?: number) => generateBinarySearchSteps(data, value || 5),
  code: {
    javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}`,
    csharp: `public static int BinarySearch(int[] arr, int target)
{
    int left = 0;
    int right = arr.Length - 1;
    
    while (left <= right)
    {
        int mid = (left + right) / 2;
        
        if (arr[mid] == target)
        {
            return mid; // Found
        }
        else if (arr[mid] < target)
        {
            left = mid + 1; // Search right half
        }
        else
        {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}`,
  },
}; 