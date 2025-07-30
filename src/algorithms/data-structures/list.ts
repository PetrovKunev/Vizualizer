import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateListAddSteps(data: number[], addValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Adding value ${addValue} to the end of the list`,
  });

  // Add the new element to the end of the list
  const newIndex = data.length;
  steps.push({
    type: 'set',
    indices: [newIndex],
    values: [addValue],
    description: `Added ${addValue} to the end of the list at index ${newIndex}`,
  });

  const newLength = newIndex + 1;
  steps.push({
    type: 'complete',
    indices: [newIndex],
    description: `List now has ${newLength} elements. Last element is ${addValue}`,
  });

  return steps;
}

export function generateListRemoveSteps(data: number[], removeIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Removing element at index ${removeIndex} from the list`,
  });

  if (removeIndex < 0 || removeIndex >= data.length) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid index ${removeIndex}. Index must be between 0 and ${data.length - 1}`,
    });
    return steps;
  }

  const removedValue = data[removeIndex];
  steps.push({
    type: 'highlight',
    indices: [removeIndex],
    description: `Removing element ${removedValue} at index ${removeIndex}`,
  });

  const newLength = data.length - 1;
  steps.push({
    type: 'remove',
    indices: [removeIndex],
    description: `Successfully removed ${removedValue} from index ${removeIndex}. List now has ${newLength} elements.`,
  });

  return steps;
}

export function generateListGetSteps(data: number[], getIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Getting element at index ${getIndex} from the list`,
  });

  if (getIndex < 0 || getIndex >= data.length) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid index ${getIndex}. Index must be between 0 and ${data.length - 1}`,
    });
    return steps;
  }

  const value = data[getIndex];
  steps.push({
    type: 'highlight',
    indices: [getIndex],
    description: `Element at index ${getIndex} is ${value}`,
  });

  steps.push({
    type: 'complete',
    indices: [getIndex],
    description: `Successfully retrieved ${value} from index ${getIndex}`,
  });

  return steps;
}

export function generateListSetSteps(data: number[], setIndex: number, setValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Setting element at index ${setIndex} to value ${setValue}`,
  });

  if (setIndex < 0 || setIndex >= data.length) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid index ${setIndex}. Index must be between 0 and ${data.length - 1}`,
    });
    return steps;
  }

  const oldValue = data[setIndex];
  steps.push({
    type: 'highlight',
    indices: [setIndex],
    description: `Current value at index ${setIndex} is ${oldValue}`,
  });

  steps.push({
    type: 'set',
    indices: [setIndex],
    values: [setValue],
    description: `Changed value at index ${setIndex} from ${oldValue} to ${setValue}`,
  });

  steps.push({
    type: 'complete',
    indices: [setIndex],
    description: `Successfully updated index ${setIndex} to ${setValue}. List has ${data.length} elements.`,
  });

  return steps;
}

export const listImplementation: AlgorithmImplementation = {
  info: {
    id: 'list',
    name: 'List',
    category: 'data-structure',
    description: 'A dynamic array that can grow and shrink. Provides fast access by index and supports add, remove, get, and set operations.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateListAddSteps(data, value || 20), // Default add operation
  code: {
    javascript: `class List {
  constructor() {
    this.items = [];
  }

  // Add - O(1) amortized
  add(element) {
    this.items.push(element);
  }

  // Remove at index - O(n)
  remove(index) {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Index out of bounds');
    }
    return this.items.splice(index, 1)[0];
  }

  // Get at index - O(1)
  get(index) {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Index out of bounds');
    }
    return this.items[index];
  }

  // Set at index - O(1)
  set(index, value) {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Index out of bounds');
    }
    this.items[index] = value;
  }

  // Size - O(1)
  size() {
    return this.items.length;
  }

  // Is empty - O(1)
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    csharp: `public class List<T>
{
    private List<T> items = new List<T>();

    // Add - O(1) amortized
    public void Add(T item)
    {
        items.Add(item);
    }

    // Remove at index - O(n)
    public T RemoveAt(int index)
    {
        if (index < 0 || index >= items.Count)
        {
            throw new ArgumentOutOfRangeException(nameof(index));
        }
        
        T item = items[index];
        items.RemoveAt(index);
        return item;
    }

    // Get at index - O(1)
    public T Get(int index)
    {
        if (index < 0 || index >= items.Count)
        {
            throw new ArgumentOutOfRangeException(nameof(index));
        }
        return items[index];
    }

    // Set at index - O(1)
    public void Set(int index, T value)
    {
        if (index < 0 || index >= items.Count)
        {
            throw new ArgumentOutOfRangeException(nameof(index));
        }
        items[index] = value;
    }

    // Count - O(1)
    public int Count => items.Count;

    // Is empty - O(1)
    public bool IsEmpty => items.Count == 0;
}`,
  },
}; 