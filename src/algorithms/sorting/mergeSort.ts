import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateMergeSortSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...data];
  const n = arr.length;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Merge Sort algorithm',
  });

  function mergeSortHelper(left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        type: 'highlight',
        indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        description: `Dividing array from position ${left} to ${right} at midpoint ${mid}`,
      });

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  function merge(left: number, mid: number, right: number): void {
    const leftSize = mid - left + 1;
    const rightSize = right - mid;
    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);

    // Copy data to temporary arrays
    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < rightSize; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    steps.push({
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      description: `Merging sorted subarrays from positions ${left}-${mid} and ${mid + 1}-${right}`,
    });

    let i = 0, j = 0, k = left;

    while (i < leftSize && j < rightSize) {
      steps.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        values: [leftArray[i], rightArray[j]],
        description: `Comparing ${leftArray[i]} from left subarray with ${rightArray[j]} from right subarray`,
      });

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        steps.push({
          type: 'set',
          indices: [k],
          values: [leftArray[i]],
          description: `Placing ${leftArray[i]} from left subarray at position ${k}`,
        });
        i++;
      } else {
        arr[k] = rightArray[j];
        steps.push({
          type: 'set',
          indices: [k],
          values: [rightArray[j]],
          description: `Placing ${rightArray[j]} from right subarray at position ${k}`,
        });
        j++;
      }
      k++;
    }

    // Copy remaining elements
    while (i < leftSize) {
      arr[k] = leftArray[i];
      steps.push({
        type: 'set',
        indices: [k],
        values: [leftArray[i]],
        description: `Placing remaining element ${leftArray[i]} from left subarray at position ${k}`,
      });
      i++;
      k++;
    }

    while (j < rightSize) {
      arr[k] = rightArray[j];
      steps.push({
        type: 'set',
        indices: [k],
        values: [rightArray[j]],
        description: `Placing remaining element ${rightArray[j]} from right subarray at position ${k}`,
      });
      j++;
      k++;
    }

    steps.push({
      type: 'complete',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      description: `Subarray from position ${left} to ${right} is now sorted`,
    });
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    type: 'complete',
    indices: Array.from({ length: n }, (_, index) => index),
    description: 'All elements are now sorted!',
  });

  return steps;
}

export const mergeSortImplementation: AlgorithmImplementation = {
  info: {
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
  generateSteps: (data: number[], operation?: string, value?: number) => generateMergeSortSteps(data),
  code: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}`,
    csharp: `public static void MergeSort(int[] arr)
{
    MergeSortHelper(arr, 0, arr.Length - 1);
}

private static void MergeSortHelper(int[] arr, int left, int right)
{
    if (left < right)
    {
        int mid = (left + right) / 2;
        
        MergeSortHelper(arr, left, mid);
        MergeSortHelper(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }
}

private static void Merge(int[] arr, int left, int mid, int right)
{
    int leftSize = mid - left + 1;
    int rightSize = right - mid;
    
    int[] leftArray = new int[leftSize];
    int[] rightArray = new int[rightSize];
    
    // Copy data to temporary arrays
    for (int i = 0; i < leftSize; i++)
        leftArray[i] = arr[left + i];
    for (int j = 0; j < rightSize; j++)
        rightArray[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < leftSize && j < rightSize)
    {
        if (leftArray[i] <= rightArray[j])
        {
            arr[k] = leftArray[i];
            i++;
        }
        else
        {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < leftSize)
    {
        arr[k] = leftArray[i];
        i++;
        k++;
    }
    
    while (j < rightSize)
    {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}`,
  },
}; 