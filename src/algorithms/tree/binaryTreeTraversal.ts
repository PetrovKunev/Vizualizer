import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

// Binary Tree Node representation
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function generateBinaryTreeTraversalSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  
  // Create a simple binary tree from the data
  function createTree(values: number[], index: number = 0): TreeNode | null {
    if (index >= values.length) return null;
    
    return {
      value: values[index],
      left: createTree(values, 2 * index + 1),
      right: createTree(values, 2 * index + 2),
    };
  }

  const root = createTree(data);
  if (!root) return steps;

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Starting Binary Tree Inorder Traversal',
  });

  function inorderTraversal(node: TreeNode | null, nodeIndex: number): void {
    if (!node) return;

    // Visit left subtree
    if (node.left) {
      steps.push({
        type: 'highlight',
        indices: [nodeIndex],
        description: `Moving to left child of node ${nodeIndex} (value: ${node.value})`,
      });
      inorderTraversal(node.left, 2 * nodeIndex + 1);
    }

    // Visit current node
    steps.push({
      type: 'compare',
      indices: [nodeIndex],
      values: [node.value],
      description: `Visiting node ${nodeIndex} with value ${node.value}`,
    });

    steps.push({
      type: 'complete',
      indices: [nodeIndex],
      description: `Processed node ${nodeIndex}`,
    });

    // Visit right subtree
    if (node.right) {
      steps.push({
        type: 'highlight',
        indices: [nodeIndex],
        description: `Moving to right child of node ${nodeIndex} (value: ${node.value})`,
      });
      inorderTraversal(node.right, 2 * nodeIndex + 2);
    }
  }

  inorderTraversal(root, 0);

  steps.push({
    type: 'highlight',
    indices: [],
    description: 'Inorder traversal complete',
  });

  return steps;
}

export const binaryTreeTraversalImplementation: AlgorithmImplementation = {
  info: {
    id: 'binary-tree-traversal',
    name: 'Binary Tree Traversal',
    category: 'tree',
    description: 'Traverses a binary tree using inorder traversal (left, root, right).',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(h)',
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateBinaryTreeTraversalSteps(data),
  code: {
    javascript: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function inorderTraversal(root) {
  const result = [];
  
  function inorder(node) {
    if (!node) return;
    
    // Visit left subtree
    inorder(node.left);
    
    // Visit current node
    result.push(node.value);
    
    // Visit right subtree
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}`,
    csharp: `public class TreeNode
{
    public int Value { get; set; }
    public TreeNode Left { get; set; }
    public TreeNode Right { get; set; }
    
    public TreeNode(int value)
    {
        Value = value;
        Left = null;
        Right = null;
    }
}

public static List<int> InorderTraversal(TreeNode root)
{
    var result = new List<int>();
    
    void Inorder(TreeNode node)
    {
        if (node == null) return;
        
        // Visit left subtree
        Inorder(node.Left);
        
        // Visit current node
        result.Add(node.Value);
        
        // Visit right subtree
        Inorder(node.Right);
    }
    
    Inorder(root);
    return result;
}`,
  },
}; 