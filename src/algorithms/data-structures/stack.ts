import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateStackSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  // If stack is empty, start with a push operation
  if (data.length === 0) {
    const pushValue = Math.floor(Math.random() * 90) + 10; // Random value between 10-99
    
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Starting with an empty stack. Pushing value ${pushValue} onto the stack.`,
    });

    steps.push({
      type: 'set',
      indices: [0],
      values: [pushValue],
      description: `Added ${pushValue} to the top of the stack.`,
    });

    steps.push({
      type: 'complete',
      indices: [0],
      description: `Successfully added element to the stack.`,
    });
  } else {
    // Show current stack state
    steps.push({
      type: 'highlight',
      indices: [data.length - 1], // Highlight top element
      description: `Current stack has ${data.length} elements.`,
    });

    // Simulate a push operation
    const pushValue = Math.floor(Math.random() * 90) + 10;
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Pushing value ${pushValue} onto the stack.`,
    });

    steps.push({
      type: 'set',
      indices: [data.length],
      values: [pushValue],
      description: `Added ${pushValue} to the top of the stack.`,
    });

    steps.push({
      type: 'complete',
      indices: [data.length],
      description: `Successfully added element to the stack.`,
    });
  }

  return steps;
}

export function generateStackPushSteps(data: number[], pushValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Pushing value ${pushValue} onto the stack`,
  });

  // Add the new element to the top of the stack
  const newIndex = data.length;
  steps.push({
    type: 'set',
    indices: [newIndex],
    values: [pushValue],
    description: `Added ${pushValue} to the top of the stack at index ${newIndex}`,
  });

  const newLength = newIndex + 1;
  steps.push({
    type: 'complete',
    indices: [newIndex],
    description: `Stack now has ${newLength} elements. Top element is ${pushValue}`,
  });

  return steps;
}

export function generateStackPopSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Popping element from the top of the stack',
  });

  if (data.length === 0) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: 'Stack is empty. Cannot pop from empty stack.',
    });
    return steps;
  }

  const poppedValue = data[data.length - 1];
  steps.push({
    type: 'highlight',
    indices: [data.length - 1],
    description: `Popping element ${poppedValue} from the top of the stack`,
  });

  const newLength = data.length - 1;
  steps.push({
    type: 'remove',
    indices: [data.length - 1],
    description: `Successfully popped ${poppedValue}. Stack now has ${newLength} elements.`,
  });

  return steps;
}

export function generateStackPeekSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Peeking at the top element of the stack',
  });

  if (data.length === 0) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: 'Stack is empty. Cannot peek empty stack.',
    });
    return steps;
  }

  const topValue = data[data.length - 1];
  steps.push({
    type: 'highlight',
    indices: [data.length - 1],
    description: `Top element of the stack is ${topValue}`,
  });

  steps.push({
    type: 'complete',
    indices: [data.length - 1],
    description: `Peek operation complete. Top element: ${topValue}`,
  });

  return steps;
}

export const stackImplementation: AlgorithmImplementation = {
  info: {
    id: 'stack',
    name: 'Stack',
    category: 'data-structure',
    description: 'A LIFO (Last In, First Out) data structure where elements are added and removed from the same end (top).',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateStackSteps(data), // Use the new function
  code: {
    javascript: `class Stack {
  constructor() {
    this.items = [];
  }

  // Push - O(1)
  push(element) {
    this.items.push(element);
  }

  // Pop - O(1)
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek - O(1)
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    csharp: `public class Stack<T>
{
    private List<T> items = new List<T>();

    // Push - O(1)
    public void Push(T item)
    {
        items.Add(item);
    }

    // Pop - O(1)
    public T Pop()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Stack is empty");
        }
        
        T item = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return item;
    }

    // Peek - O(1)
    public T Peek()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Stack is empty");
        }
        return items[items.Count - 1];
    }

    public bool IsEmpty()
    {
        return items.Count == 0;
    }
}`,
  },
}; 