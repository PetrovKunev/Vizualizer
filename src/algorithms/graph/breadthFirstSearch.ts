import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

// Graph representation for visualization
interface GraphNode {
  id: number;
  value: number;
  neighbors: number[];
}

export function generateBreadthFirstSearchSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  // Create a simple graph from the data
  const graph: GraphNode[] = data.map((value, index) => ({
    id: index,
    value,
    neighbors: [
      (index + 1) % data.length, // Connect to next node
      (index + 2) % data.length, // Connect to node 2 steps away
    ].filter(neighbor => neighbor !== index) // Avoid self-loops
  }));

  const visited = new Set<number>();
  const queue: number[] = [];
  const startNode = 0;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Breadth-First Search traversal',
  });

  // Initialize queue with start node
  queue.push(startNode);
  visited.add(startNode);

  steps.push({
    type: 'highlight',
    indices: [startNode],
    description: `Starting BFS from node ${startNode} with value ${graph[startNode].value}`,
  });

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    steps.push({
      type: 'compare',
      indices: [currentNode],
      values: [graph[currentNode].value],
      description: `Processing node ${currentNode} from queue`,
    });

    steps.push({
      type: 'complete',
      indices: [currentNode],
      description: `Visited node ${currentNode}`,
    });

    // Explore all neighbors
    for (const neighborId of graph[currentNode].neighbors) {
      if (!visited.has(neighborId)) {
        steps.push({
          type: 'highlight',
          indices: [currentNode, neighborId],
          values: [graph[currentNode].value, graph[neighborId].value],
          description: `Adding unvisited neighbor ${neighborId} to queue`,
        });

        visited.add(neighborId);
        queue.push(neighborId);
      }
    }
  }

  steps.push({
    type: 'highlight',
    indices: Array.from(visited),
    description: `BFS traversal complete. Visited ${visited.size} nodes.`,
  });

  return steps;
}

export const breadthFirstSearchImplementation: AlgorithmImplementation = {
  info: {
    id: 'breadth-first-search',
    name: 'Breadth-First Search',
    category: 'graph',
    description: 'Traverses a graph by exploring all neighbors at the current depth before moving to the next level.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateBreadthFirstSearchSteps(data),
  code: {
    javascript: `function breadthFirstSearch(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  
  visited.add(startNode);
  
  while (queue.length > 0) {
    const currentNode = queue.shift();
    result.push(currentNode);
    
    // Explore all neighbors
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`,
    csharp: `public static List<int> BreadthFirstSearch(Dictionary<int, List<int>> graph, int startNode)
{
    var visited = new HashSet<int>();
    var queue = new Queue<int>();
    var result = new List<int>();
    
    queue.Enqueue(startNode);
    visited.Add(startNode);
    
    while (queue.Count > 0)
    {
        var currentNode = queue.Dequeue();
        result.Add(currentNode);
        
        // Explore all neighbors
        if (graph.ContainsKey(currentNode))
        {
            foreach (var neighbor in graph[currentNode])
            {
                if (!visited.Contains(neighbor))
                {
                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
    
    return result;
}`,
  },
}; 