import { AlgorithmStep, AlgorithmImplementation } from '@/types/algorithm';

const FOR_LOOP_NODE_INDICES = {
  START: 0,
  INITIALIZATION: 1,
  CONDITION: 2,
  BODY: 3,
  UPDATE: 4,
  END: 5,
} as const;

const MAX_RANDOM_START = 3;
const MIN_LOOP_SPAN = 3;
const MAX_LOOP_SPAN = 6;

export function generateForLoopSteps(data: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  const startValue = data[0] ?? 0;
  const endValue = data[1] ?? startValue + 4;
  const rawStepValue = data[2] ?? 1;
  const stepValue = rawStepValue > 0 ? rawStepValue : 1;

  let currentValue = startValue;
  let iteration = 0;

  steps.push({
    type: 'highlight',
    indices: [FOR_LOOP_NODE_INDICES.START],
    description: 'Entry point of the for loop control flow.',
  });

  steps.push({
    type: 'complete',
    indices: [FOR_LOOP_NODE_INDICES.START],
    description: 'Start node processed. Proceeding to the initialization clause.',
  });

  steps.push({
    type: 'highlight',
    indices: [FOR_LOOP_NODE_INDICES.INITIALIZATION],
    description: `Initialization clause runs. Set i = ${startValue}.`,
  });

  steps.push({
    type: 'complete',
    indices: [FOR_LOOP_NODE_INDICES.INITIALIZATION],
    description: `Initialization complete. Counter set to i = ${currentValue}.`,
  });

  while (true) {
    steps.push({
      type: 'compare',
      indices: [FOR_LOOP_NODE_INDICES.CONDITION],
      values: [currentValue, endValue],
      description: `Iteration ${iteration + 1}: evaluate condition i < ${endValue}. Is ${currentValue} < ${endValue}?`,
    });

    const conditionHolds = currentValue < endValue;

    steps.push({
      type: 'complete',
      indices: [FOR_LOOP_NODE_INDICES.CONDITION],
      description: `Condition evaluated to ${conditionHolds ? 'true' : 'false'}.`,
    });

    if (!conditionHolds) {
      break;
    }

    steps.push({
      type: 'highlight',
      indices: [FOR_LOOP_NODE_INDICES.BODY],
      description: `Iteration ${iteration + 1}: loop body executes with i = ${currentValue}.`,
    });

    steps.push({
      type: 'complete',
      indices: [FOR_LOOP_NODE_INDICES.BODY],
      description: 'Loop body execution complete for this iteration.',
    });

    steps.push({
      type: 'highlight',
      indices: [FOR_LOOP_NODE_INDICES.UPDATE],
      description: `Update clause runs. Increment i by ${stepValue}.`,
    });

    currentValue += stepValue;

    steps.push({
      type: 'complete',
      indices: [FOR_LOOP_NODE_INDICES.UPDATE],
      description: `Counter updated. Next iteration will use i = ${currentValue}.`,
    });

    iteration += 1;
  }

  steps.push({
    type: 'highlight',
    indices: [FOR_LOOP_NODE_INDICES.END],
    description: `Exit the loop after ${iteration} ${iteration === 1 ? 'iteration' : 'iterations'}.`,
  });

  steps.push({
    type: 'complete',
    indices: [FOR_LOOP_NODE_INDICES.END],
    description: 'Loop execution finished. Control passes to the next statement.',
  });

  return steps;
}

export const forLoopImplementation: AlgorithmImplementation = {
  info: {
    id: 'for-loop',
    name: 'For Loop',
    category: 'control-flow',
    description: 'Demonstrates the initialization, condition, update, and body execution of a for loop construct.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
  },
  generateInitialData: () => {
    const start = Math.floor(Math.random() * (MAX_RANDOM_START + 1));
    const span = Math.floor(Math.random() * (MAX_LOOP_SPAN - MIN_LOOP_SPAN + 1)) + MIN_LOOP_SPAN;
    const end = start + span;
    const step = Math.random() < 0.3 ? 2 : 1;
    return [start, end, step];
  },
  generateSteps: (data: number[], operation?: string, value?: number) => generateForLoopSteps(data),
  code: {
    javascript: `function repeatAction(start, end, step) {
  for (let i = start; i < end; i += step) {
    console.log(\`Iteration with i = \${i}\`);
  }
}

repeatAction(0, 5, 1);`,
    csharp: `public static void RepeatAction(int start, int end, int step)
{
    for (int i = start; i < end; i += step)
    {
        Console.WriteLine($"Iteration with i = {i}");
    }
}

RepeatAction(0, 5, 1);`,
  },
};
