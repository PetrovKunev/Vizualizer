import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

// Graph representation for visualization
interface GraphNode {
  id: number;
  value: number;
  neighbors: number[];
}

export function generateDepthFirstSearchSteps(data: number[]): AlgorithmStep[] {
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
  const stack: number[] = [];
  const startNode = 0;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Depth-First Search traversal',
  });

  function dfs(nodeId: number): void {
    if (visited.has(nodeId)) return;

    steps.push({
      type: 'highlight',
      indices: [nodeId],
      description: `Visiting node ${nodeId} with value ${graph[nodeId].value}`,
    });

    visited.add(nodeId);
    stack.push(nodeId);

    steps.push({
      type: 'complete',
      indices: [nodeId],
      description: `Marked node ${nodeId} as visited`,
    });

    // Visit all neighbors
    for (const neighborId of graph[nodeId].neighbors) {
      if (!visited.has(neighborId)) {
        steps.push({
          type: 'compare',
          indices: [nodeId, neighborId],
          values: [graph[nodeId].value, graph[neighborId].value],
          description: `Exploring edge from node ${nodeId} to neighbor ${neighborId}`,
        });

        dfs(neighborId);
      }
    }
  }

  dfs(startNode);

  steps.push({
    type: 'highlight',
    indices: Array.from(visited),
    description: `DFS traversal complete. Visited ${visited.size} nodes.`,
  });

  return steps;
}

export const depthFirstSearchImplementation: AlgorithmImplementation = {
  info: {
    id: 'depth-first-search',
    name: 'Depth-First Search',
    category: 'graph',
    description: 'Traverses a graph by exploring as far as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
  },
  generateSteps: generateDepthFirstSearchSteps,
  code: {
    javascript: `function depthFirstSearch(graph, startNode) {
  const visited = new Set();
  const result = [];
  
  function dfs(node) {
    if (visited.has(node)) return;
    
    visited.add(node);
    result.push(node);
    
    // Visit all neighbors
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }
  
  dfs(startNode);
  return result;
}`,
    csharp: `public static List<int> DepthFirstSearch(Dictionary<int, List<int>> graph, int startNode)
{
    var visited = new HashSet<int>();
    var result = new List<int>();
    
    void Dfs(int node)
    {
        if (visited.Contains(node)) return;
        
        visited.Add(node);
        result.Add(node);
        
        // Visit all neighbors
        if (graph.ContainsKey(node))
        {
            foreach (var neighbor in graph[node])
            {
                if (!visited.Contains(neighbor))
                {
                    Dfs(neighbor);
                }
            }
        }
    }
    
    Dfs(startNode);
    return result;
}`,
  },
}; 