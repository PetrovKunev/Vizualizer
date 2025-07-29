import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateArrayAccessSteps(data: number[], targetIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Array Access operation',
  });

  if (targetIndex >= 0 && targetIndex < data.length) {
    steps.push({
      type: 'highlight',
      indices: [targetIndex],
      description: `Accessing element at index ${targetIndex}: ${data[targetIndex]}`,
    });
  } else {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Index ${targetIndex} is out of bounds. Array length is ${data.length}`,
    });
  }

  return steps;
}

export function generateArraySearchSteps(data: number[], targetValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Searching for value ${targetValue} in array`,
  });

  for (let i = 0; i < data.length; i++) {
    steps.push({
      type: 'compare',
      indices: [i],
      values: [data[i]],
      description: `Checking element at index ${i}: ${data[i]}`,
    });

    if (data[i] === targetValue) {
      steps.push({
        type: 'complete',
        indices: [i],
        description: `Found ${targetValue} at index ${i}!`,
      });
      return steps;
    }
  }

  steps.push({
    type: 'highlight',
    indices: [],
    description: `Value ${targetValue} not found in array`,
  });

  return steps;
}

export function generateArrayInsertionSteps(data: number[], insertIndex: number, insertValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Inserting value ${insertValue} at index ${insertIndex}`,
  });

  if (insertIndex >= 0 && insertIndex <= arr.length) {
    // Shift elements to make space
    for (let i = arr.length; i > insertIndex; i--) {
      arr[i] = arr[i - 1];
      steps.push({
        type: 'set',
        indices: [i],
        values: [arr[i]],
        description: `Shifting element from position ${i - 1} to ${i}`,
      });
    }

    // Insert the new value
    arr[insertIndex] = insertValue;
    steps.push({
      type: 'set',
      indices: [insertIndex],
      values: [insertValue],
      description: `Inserting ${insertValue} at index ${insertIndex}`,
    });

    steps.push({
      type: 'complete',
      indices: [insertIndex],
      description: `Successfully inserted ${insertValue} at index ${insertIndex}`,
    });
  } else {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid insertion index ${insertIndex}`,
    });
  }

  return steps;
}

export const arrayImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: (data: number[]) => generateArraySearchSteps(data, 5), // Default search for value 5
  code: {
    javascript: `// Array Access - O(1)
const element = array[index];

// Array Search - O(n)
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}

// Array Insertion - O(n)
function insertAt(array, index, value) {
  array.splice(index, 0, value);
  return array;
}`,
    csharp: `// Array Access - O(1)
int element = array[index];

// Array Search - O(n)
public static int LinearSearch(int[] array, int target)
{
    for (int i = 0; i < array.Length; i++)
    {
        if (array[i] == target)
        {
            return i;
        }
    }
    return -1;
}

// Array Insertion - O(n)
public static void InsertAt(int[] array, int index, int value)
{
    // Shift elements to make space
    for (int i = array.Length - 1; i > index; i--)
    {
        array[i] = array[i - 1];
    }
    array[index] = value;
}`,
  },
}; 