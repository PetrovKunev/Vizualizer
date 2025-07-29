import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateQuickSortSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  const n = arr.length;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Quick Sort algorithm',
  });

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);

      steps.push({
        type: 'complete',
        indices: [pi],
        description: `Pivot element ${arr[pi]} is now in its final position`,
      });

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      type: 'highlight',
      indices: [high],
      description: `Selecting pivot element ${pivot} at position ${high}`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        values: [arr[j], pivot],
        description: `Comparing element ${arr[j]} at position ${j} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          steps.push({
            type: 'swap',
            indices: [i, j],
            values: [arr[j], arr[i]],
            description: `Swapping elements at positions ${i} and ${j}: ${arr[j]} and ${arr[i]}`,
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }

    if (i + 1 !== high) {
      steps.push({
        type: 'swap',
        indices: [i + 1, high],
        values: [pivot, arr[i + 1]],
        description: `Placing pivot ${pivot} in its final position by swapping with element at position ${i + 1}`,
      });
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    }

    return i + 1;
  }

  quickSortHelper(0, n - 1);

  steps.push({
    type: 'complete',
    indices: Array.from({ length: n }, (_, index) => index),
    description: 'All elements are now sorted!',
  });

  return steps;
}

export const quickSortImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: generateQuickSortSteps,
  code: {
    javascript: `function quickSort(arr) {
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSortHelper(arr, low, pi - 1);
    quickSortHelper(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    csharp: `public static void QuickSort(int[] arr)
{
    QuickSortHelper(arr, 0, arr.Length - 1);
}

private static void QuickSortHelper(int[] arr, int low, int high)
{
    if (low < high)
    {
        int pi = Partition(arr, low, high);
        QuickSortHelper(arr, low, pi - 1);
        QuickSortHelper(arr, pi + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high)
{
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    
    return i + 1;
}`,
  },
}; 