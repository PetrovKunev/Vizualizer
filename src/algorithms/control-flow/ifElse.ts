import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

const IF_ELSE_NODE_INDICES = {
  START: 0,
  CONDITION: 1,
  IF_BLOCK: 2,
  ELSE_BLOCK: 3,
  END: 4,
} as const;

export function generateIfElseSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const value = data[0] ?? 0;
  const threshold = data[1] ?? 50;
  const conditionResult = value >= threshold;

  steps.push({
    type: 'highlight',
    indices: [IF_ELSE_NODE_INDICES.START],
    description: 'Entry point of the conditional statement.',
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_NODE_INDICES.START],
    description: 'Start node processed. Proceeding to evaluate the condition.',
  });

  steps.push({
    type: 'compare',
    indices: [IF_ELSE_NODE_INDICES.CONDITION],
    values: [value, threshold],
    description: `Evaluate condition: is ${value} ≥ ${threshold}?`,
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_NODE_INDICES.CONDITION],
    description: `Condition evaluated and resolved to ${conditionResult ? 'true' : 'false'}.`,
  });

  if (conditionResult) {
    steps.push({
      type: 'highlight',
      indices: [IF_ELSE_NODE_INDICES.IF_BLOCK],
      description: 'Condition is true. Execute the if-block.',
    });
    steps.push({
      type: 'complete',
      indices: [IF_ELSE_NODE_INDICES.IF_BLOCK],
      description: 'If-block executed.',
    });
  } else {
    steps.push({
      type: 'highlight',
      indices: [IF_ELSE_NODE_INDICES.ELSE_BLOCK],
      description: 'Condition is false. Execute the else-block.',
    });
    steps.push({
      type: 'complete',
      indices: [IF_ELSE_NODE_INDICES.ELSE_BLOCK],
      description: 'Else-block executed.',
    });
  }

  steps.push({
    type: 'highlight',
    indices: [IF_ELSE_NODE_INDICES.END],
    description: 'Exit the conditional statement.',
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_NODE_INDICES.END],
    description: 'Conditional execution complete.',
  });

  return steps;
}

export const ifElseImplementation: AlgorithmImplementation = {
  info: {
    id: 'if-else',
    name: 'If / Else',
    category: 'control-flow',
    description: 'Evaluates a condition and runs either the if-block or the else-block based on the result.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(1)',
  },
  generateInitialData: () => {
    const value = Math.floor(Math.random() * 100);
    const threshold = 50;
    return [value, threshold];
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateIfElseSteps(data),
  code: {
    javascript: `function evaluate(number) {
  const threshold = 50;

  if (number >= threshold) {
    return 'Number is at least 50';
  } else {
    return 'Number is below 50';
  }
}`,
    csharp: `public static string Evaluate(int number)
{
    const int threshold = 50;

    if (number >= threshold)
    {
        return "Number is at least 50";
    }
    else
    {
        return "Number is below 50";
    }
}`,
  },
};
