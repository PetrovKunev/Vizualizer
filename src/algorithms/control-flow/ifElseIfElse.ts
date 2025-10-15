import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

const IF_ELSE_IF_ELSE_NODE_INDICES = {
  START: 0,
  FIRST_CONDITION: 1,
  SECOND_CONDITION: 2,
  IF_BLOCK: 3,
  ELSE_IF_BLOCK: 4,
  ELSE_BLOCK: 5,
  END: 6,
} as const;

export function generateIfElseIfElseSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const score = data[0] ?? 0;
  const firstThreshold = data[1] ?? 90;
  const secondThreshold = data[2] ?? 75;

  const isExcellent = score >= firstThreshold;
  const isPass = score >= secondThreshold;

  steps.push({
    type: 'highlight',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.START],
    description: 'Entry point of the conditional chain.',
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.START],
    description: 'Start node processed. Evaluating the first condition.',
  });

  steps.push({
    type: 'compare',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.FIRST_CONDITION],
    values: [score, firstThreshold],
    description: `First condition: is score ${score} ≥ ${firstThreshold}?`,
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.FIRST_CONDITION],
    description: `First condition resolved to ${isExcellent ? 'true' : 'false'}.`,
  });

  if (isExcellent) {
    steps.push({
      type: 'highlight',
      indices: [IF_ELSE_IF_ELSE_NODE_INDICES.IF_BLOCK],
      description: 'First condition is true. Execute the if-block.',
    });
    steps.push({
      type: 'complete',
      indices: [IF_ELSE_IF_ELSE_NODE_INDICES.IF_BLOCK],
      description: 'If-block executed. No further conditions are checked.',
    });
  } else {
    steps.push({
      type: 'highlight',
      indices: [IF_ELSE_IF_ELSE_NODE_INDICES.SECOND_CONDITION],
      description: 'First condition is false. Evaluate the else-if condition.',
    });

    steps.push({
      type: 'compare',
      indices: [IF_ELSE_IF_ELSE_NODE_INDICES.SECOND_CONDITION],
      values: [score, secondThreshold],
      description: `Else-if condition: is score ${score} ≥ ${secondThreshold}?`,
    });

    steps.push({
      type: 'complete',
      indices: [IF_ELSE_IF_ELSE_NODE_INDICES.SECOND_CONDITION],
      description: `Else-if condition resolved to ${isPass ? 'true' : 'false'}.`,
    });

    if (isPass) {
      steps.push({
        type: 'highlight',
        indices: [IF_ELSE_IF_ELSE_NODE_INDICES.ELSE_IF_BLOCK],
        description: 'Else-if condition is true. Execute the else-if block.',
      });
      steps.push({
        type: 'complete',
        indices: [IF_ELSE_IF_ELSE_NODE_INDICES.ELSE_IF_BLOCK],
        description: 'Else-if block executed.',
      });
    } else {
      steps.push({
        type: 'highlight',
        indices: [IF_ELSE_IF_ELSE_NODE_INDICES.ELSE_BLOCK],
        description: 'All previous conditions are false. Execute the else block.',
      });
      steps.push({
        type: 'complete',
        indices: [IF_ELSE_IF_ELSE_NODE_INDICES.ELSE_BLOCK],
        description: 'Else block executed.',
      });
    }
  }

  steps.push({
    type: 'highlight',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.END],
    description: 'Exit the conditional chain.',
  });

  steps.push({
    type: 'complete',
    indices: [IF_ELSE_IF_ELSE_NODE_INDICES.END],
    description: 'Finished evaluating the conditional statement.',
  });

  return steps;
}

export const ifElseIfElseImplementation: AlgorithmImplementation = {
  info: {
    id: 'if-else-if-else',
    name: 'If / Else If / Else',
    category: 'control-flow',
    description: 'Evaluates conditions in sequence until one branch executes or the final else block runs.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(1)',
  },
  generateInitialData: () => {
    const score = Math.floor(Math.random() * 101);
    const firstThreshold = 90;
    const secondThreshold = 75;
    return [score, firstThreshold, secondThreshold];
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateIfElseIfElseSteps(data),
  code: {
    javascript: `function evaluateScore(score) {
  if (score >= 90) {
    return 'Excellent';
  } else if (score >= 75) {
    return 'Pass';
  } else {
    return 'Try again';
  }
}`,
    csharp: `public static string EvaluateScore(int score)
{
    if (score >= 90)
    {
        return "Excellent";
    }
    else if (score >= 75)
    {
        return "Pass";
    }
    else
    {
        return "Try again";
    }
}`,
  },
};
