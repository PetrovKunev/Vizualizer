import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

// Helper function to convert array to linked list visualization
function arrayToLinkedListSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Visualizing linked list structure',
  });

  for (let i = 0; i < data.length; i++) {
    steps.push({
      type: 'highlight',
      indices: [i],
      description: `Node ${i}: value = ${data[i]}, next = ${i < data.length - 1 ? `node ${i + 1}` : 'null'}`,
    });
  }

  return steps;
}

export function generateLinkedListInsertionSteps(data: number[], insertIndex: number, insertValue: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Inserting value ${insertValue} at position ${insertIndex} in linked list`,
  });

  if (insertIndex < 0 || insertIndex > data.length) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid position ${insertIndex}. Position must be between 0 and ${data.length}`,
    });
    return steps;
  }

  // Insert at the beginning
  if (insertIndex === 0) {
    steps.push({
      type: 'set',
      indices: [0],
      values: [insertValue],
      description: `Inserted ${insertValue} at the beginning of the list`,
    });
  } else {
    // Insert at specific position
    steps.push({
      type: 'set',
      indices: [insertIndex],
      values: [insertValue],
      description: `Inserted ${insertValue} at position ${insertIndex}`,
    });
  }

  const newLength = data.length + 1;
  steps.push({
    type: 'complete',
    indices: [insertIndex],
    description: `Successfully inserted ${insertValue}. List now has ${newLength} nodes.`,
  });

  return steps;
}

export function generateLinkedListDeletionSteps(data: number[], deleteIndex: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: `Deleting node at position ${deleteIndex} from linked list`,
  });

  if (deleteIndex < 0 || deleteIndex >= data.length) {
    steps.push({
      type: 'highlight',
      indices: [],
      description: `Invalid position ${deleteIndex}. Position must be between 0 and ${data.length - 1}`,
    });
    return steps;
  }

  const deletedValue = data[deleteIndex];
  steps.push({
    type: 'highlight',
    indices: [deleteIndex],
    description: `Deleting node at position ${deleteIndex} with value ${deletedValue}`,
  });

  const newLength = data.length - 1;
  steps.push({
    type: 'remove',
    indices: [deleteIndex],
    description: `Successfully deleted ${deletedValue} from position ${deleteIndex}. List now has ${newLength} nodes.`,
  });

  return steps;
}

export function generateLinkedListTraversalSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Traversing the linked list from head to tail',
  });

  for (let i = 0; i < data.length; i++) {
    steps.push({
      type: 'compare',
      indices: [i],
      values: [data[i]],
      description: `Visiting node ${i}: value = ${data[i]}`,
    });

    if (i < data.length - 1) {
      steps.push({
        type: 'highlight',
        indices: [i, i + 1],
        description: `Moving from node ${i} to node ${i + 1}`,
      });
    }
  }

  steps.push({
    type: 'complete',
    indices: [],
    description: `Traversal complete. Visited all ${data.length} nodes.`,
  });

  return steps;
}

export const linkedListImplementation: AlgorithmImplementation = {
  info: {
    id: 'linked-list',
    name: 'Linked List',
    category: 'data-structure',
    description: 'A linear data structure where elements are stored in nodes, and each node contains a data field and a reference to the next node.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: true,
  },
  generateSteps: (data: number[]) => arrayToLinkedListSteps(data), // Default to visualization
  code: {
    javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at beginning - O(1)
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at position - O(n)
  insertAtPosition(data, position) {
    if (position === 0) {
      this.insertAtBeginning(data);
      return;
    }

    const newNode = new Node(data);
    let current = this.head;
    let count = 0;

    while (current && count < position - 1) {
      current = current.next;
      count++;
    }

    if (current) {
      newNode.next = current.next;
      current.next = newNode;
    }
  }

  // Delete at position - O(n)
  deleteAtPosition(position) {
    if (!this.head) return;

    if (position === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let count = 0;

    while (current && count < position - 1) {
      current = current.next;
      count++;
    }

    if (current && current.next) {
      current.next = current.next.next;
    }
  }

  // Traverse - O(n)
  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}`,
    csharp: `public class Node<T>
{
    public T Data { get; set; }
    public Node<T> Next { get; set; }

    public Node(T data)
    {
        Data = data;
        Next = null;
    }
}

public class LinkedList<T>
{
    private Node<T> head;

    // Insert at beginning - O(1)
    public void InsertAtBeginning(T data)
    {
        Node<T> newNode = new Node<T>(data);
        newNode.Next = head;
        head = newNode;
    }

    // Insert at position - O(n)
    public void InsertAtPosition(T data, int position)
    {
        if (position == 0)
        {
            InsertAtBeginning(data);
            return;
        }

        Node<T> newNode = new Node<T>(data);
        Node<T> current = head;
        int count = 0;

        while (current != null && count < position - 1)
        {
            current = current.Next;
            count++;
        }

        if (current != null)
        {
            newNode.Next = current.Next;
            current.Next = newNode;
        }
    }

    // Delete at position - O(n)
    public void DeleteAtPosition(int position)
    {
        if (head == null) return;

        if (position == 0)
        {
            head = head.Next;
            return;
        }

        Node<T> current = head;
        int count = 0;

        while (current != null && count < position - 1)
        {
            current = current.Next;
            count++;
        }

        if (current != null && current.Next != null)
        {
            current.Next = current.Next.Next;
        }
    }

    // Traverse - O(n)
    public void Traverse()
    {
        Node<T> current = head;
        while (current != null)
        {
            Console.WriteLine(current.Data);
            current = current.Next;
        }
    }
}`,
  },
}; 