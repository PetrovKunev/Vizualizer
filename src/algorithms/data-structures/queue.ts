import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

export function generateQueueEnqueueSteps(data: number[], enqueueValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Enqueuing value ${enqueueValue} to the queue`,
  });

  // Add the new element to the end of the queue
  const newIndex = data.length;
  steps.push({
    type: 'set',
    indices: [newIndex],
    values: [enqueueValue],
    description: `Added ${enqueueValue} to the end of the queue`,
  });

  const newLength = newIndex + 1;
  const frontElement = data.length > 0 ? data[0] : enqueueValue;
  steps.push({
    type: 'complete',
    indices: [newIndex],
    description: `Queue now has ${newLength} elements. Front: ${frontElement}, Back: ${enqueueValue}`,
  });

  return steps;
}

export function generateQueueDequeueSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Dequeuing element from the front of the queue',
  });

  if (data.length === 0) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: 'Queue is empty. Cannot dequeue from empty queue.',
    });
    return steps;
  }

  const dequeuedValue = data[0];
  steps.push({
    type: 'highlight',
    indices: [0],
    description: `Dequeuing element ${dequeuedValue} from the front of the queue`,
  });

  const newLength = data.length - 1;
  steps.push({
    type: 'remove',
    indices: [0],
    description: `Successfully dequeued ${dequeuedValue}. Queue now has ${newLength} elements.`,
  });

  return steps;
}

export function generateQueuePeekSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Peeking at the front element of the queue',
  });

  if (data.length === 0) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: 'Queue is empty. Cannot peek empty queue.',
    });
    return steps;
  }

  const frontValue = data[0];
  steps.push({
    type: 'highlight',
    indices: [0],
    description: `Front element of the queue is ${frontValue}`,
  });

  steps.push({
    type: 'complete',
    indices: [0],
    description: `Peek operation complete. Front element: ${frontValue}`,
  });

  return steps;
}

export const queueImplementation: AlgorithmImplementation = {
  info: {
    id: 'queue',
    name: 'Queue',
    category: 'data-structure',
    description: 'A FIFO (First In, First Out) data structure where elements are added at the rear and removed from the front.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  generateSteps: (data: number[], operation: string = 'enqueue', value?: number) => {
    switch (operation) {
      case 'enqueue':
        return generateQueueEnqueueSteps(data, value || Math.floor(Math.random() * 90) + 10);
      case 'dequeue':
        return generateQueueDequeueSteps(data);
      case 'peek':
        return generateQueuePeekSteps(data);
      default:
        return generateQueueEnqueueSteps(data, value || Math.floor(Math.random() * 90) + 10);
    }
  },
  code: {
    javascript: `class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue - O(1)
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue - O(1)
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  // Peek - O(1)
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    csharp: `public class Queue<T>
{
    private List<T> items = new List<T>();

    // Enqueue - O(1)
    public void Enqueue(T item)
    {
        items.Add(item);
    }

    // Dequeue - O(1)
    public T Dequeue()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Queue is empty");
        }
        
        T item = items[0];
        items.RemoveAt(0);
        return item;
    }

    // Peek - O(1)
    public T Peek()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Queue is empty");
        }
        return items[0];
    }

    public bool IsEmpty()
    {
        return items.Count == 0;
    }
}`,
  },
}; 