'use client';

import { useMemo, useCallback } from 'react';
import { AlgorithmStep } from '@/types/algorithm';

interface ControlFlowDiagramProps {
  algorithmId: string;
  data: number[];
  visualState: {
    comparing: number[];
    swapping: number[];
    sorted: number[];
    highlighted: number[];
    subarrays: number[][];
  };
  currentStep?: AlgorithmStep;
}

interface DiagramNode {
  index: number;
  label: string;
  sublabel?: (data: number[]) => string;
  x: number;
  y: number;
}

interface DiagramEdge {
  from: number;
  to: number;
  label?: string;
  labelOffset?: {
    x: number;
    y: number;
  };
}

interface ControlFlowConfig {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  branchNodes: number[];
  branchLabels: Record<number, string>;
  predictBranch: (data: number[]) => number | undefined;
  scenarioDetails: (data: number[]) => Array<{ label: string; value: string }>;
}

const CONTROL_FLOW_CONFIGS: Record<string, ControlFlowConfig> = {
  'for-loop': {
    nodes: [
      { index: 0, label: 'Start', x: 50, y: 12 },
      {
        index: 1,
        label: 'Initialization',
        sublabel: (data) => {
          const start = data[0] ?? 0;
          return `Set i = ${start}`;
        },
        x: 28,
        y: 32,
      },
      {
        index: 2,
        label: 'Condition',
        sublabel: (data) => {
          const end = data[1] ?? 5;
          return `Is i < ${end}?`;
        },
        x: 72,
        y: 32,
      },
      {
        index: 3,
        label: 'Loop Body',
        sublabel: () => 'Runs when the condition is true',
        x: 32,
        y: 68,
      },
      {
        index: 4,
        label: 'Update',
        sublabel: (data) => {
          const step = data[2] ?? 1;
          return `Increment i by ${step}`;
        },
        x: 68,
        y: 68,
      },
      { index: 5, label: 'End', x: 72, y: 90 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3, label: 'True', labelOffset: { x: -8, y: -2 } },
      { from: 2, to: 5, label: 'False', labelOffset: { x: 6, y: -2 } },
      { from: 3, to: 4 },
      { from: 4, to: 2, label: 'Next iteration', labelOffset: { x: 10, y: 4 } },
    ],
    branchNodes: [5, 3],
    branchLabels: {
      3: 'Loop body executes (condition true)',
      5: 'Loop exits when condition is false',
    },
    predictBranch: (data: number[]) => {
      if (data.length === 0) {
        return undefined;
      }
      const start = data[0] ?? 0;
      const end = data[1] ?? start + 4;
      const rawStep = data[2] ?? 1;
      const step = rawStep > 0 ? rawStep : 1;

      if (start < end && step > 0) {
        return 3;
      }

      return 5;
    },
    scenarioDetails: (data: number[]) => {
      const start = data[0] ?? 0;
      const end = data[1] ?? start + 4;
      const rawStep = data[2] ?? 1;
      const step = rawStep > 0 ? rawStep : 1;

      const iterations =
        start < end && step > 0 ? Math.ceil((end - start) / step) : 0;
      const finalValue = start + iterations * step;

      return [
        { label: 'Start', value: `i = ${start}` },
        { label: 'End (exclusive)', value: end.toString() },
        { label: 'Step', value: step.toString() },
        {
          label: 'Iterations',
          value: iterations > 0 ? iterations.toString() : '0 (skipped)',
        },
        {
          label: 'Value after loop',
          value: `i = ${finalValue}`,
        },
      ];
    },
  },
  'if-else': {
    nodes: [
      { index: 0, label: 'Start', x: 50, y: 10 },
      {
        index: 1,
        label: 'Condition',
        sublabel: (data) => {
          const value = data[0] ?? 0;
          const threshold = data[1] ?? 50;
          return `Is ${value} ≥ ${threshold}?`;
        },
        x: 50,
        y: 35,
      },
      {
        index: 2,
        label: 'If Block',
        sublabel: () => 'Runs when condition is true',
        x: 25,
        y: 65,
      },
      {
        index: 3,
        label: 'Else Block',
        sublabel: () => 'Runs when condition is false',
        x: 75,
        y: 65,
      },
      { index: 4, label: 'End', x: 50, y: 90 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2, label: 'True', labelOffset: { x: -8, y: -2 } },
      { from: 1, to: 3, label: 'False', labelOffset: { x: 8, y: -2 } },
      { from: 2, to: 4 },
      { from: 3, to: 4 },
    ],
    branchNodes: [2, 3],
    branchLabels: {
      2: 'If block (true branch)',
      3: 'Else block (false branch)',
    },
    predictBranch: (data: number[]) => {
      if (data.length === 0) {
        return undefined;
      }
      const value = data[0] ?? 0;
      const threshold = data[1] ?? 50;
      return value >= threshold ? 2 : 3;
    },
    scenarioDetails: (data: number[]) => {
      const value = data[0] ?? 0;
      const threshold = data[1] ?? 50;
      return [
        { label: 'Input value', value: value.toString() },
        { label: 'Threshold', value: threshold.toString() },
      ];
    },
  },
  'if-else-if-else': {
    nodes: [
      { index: 0, label: 'Start', x: 50, y: 8 },
      {
        index: 1,
        label: 'First Condition',
        sublabel: (data) => {
          const score = data[0] ?? 0;
          const firstThreshold = data[1] ?? 90;
          return `Is ${score} ≥ ${firstThreshold}?`;
        },
        x: 50,
        y: 28,
      },
      {
        index: 2,
        label: 'Else If Condition',
        sublabel: (data) => {
          const score = data[0] ?? 0;
          const secondThreshold = data[2] ?? 75;
          return `Is ${score} ≥ ${secondThreshold}?`;
        },
        x: 80,
        y: 50,
      },
      {
        index: 3,
        label: 'If Block',
        sublabel: () => 'Executed when the first condition is true',
        x: 25,
        y: 60,
      },
      {
        index: 4,
        label: 'Else If Block',
        sublabel: () => 'Executed when the else-if condition is true',
        x: 60,
        y: 82,
      },
      {
        index: 5,
        label: 'Else Block',
        sublabel: () => 'Executed when all conditions are false',
        x: 90,
        y: 82,
      },
      { index: 6, label: 'End', x: 50, y: 96 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 3, label: 'True', labelOffset: { x: -8, y: -2 } },
      { from: 1, to: 2, label: 'False', labelOffset: { x: 8, y: -2 } },
      { from: 3, to: 6 },
      { from: 2, to: 4, label: 'True', labelOffset: { x: -6, y: -2 } },
      { from: 2, to: 5, label: 'False', labelOffset: { x: 6, y: -2 } },
      { from: 4, to: 6 },
      { from: 5, to: 6 },
    ],
    branchNodes: [3, 4, 5],
    branchLabels: {
      3: 'If block (score ≥ first threshold)',
      4: 'Else-if block (score ≥ second threshold)',
      5: 'Else block (all conditions false)',
    },
    predictBranch: (data: number[]) => {
      if (data.length === 0) {
        return undefined;
      }
      const score = data[0] ?? 0;
      const firstThreshold = data[1] ?? 90;
      const secondThreshold = data[2] ?? 75;

      if (score >= firstThreshold) {
        return 3;
      }

      if (score >= secondThreshold) {
        return 4;
      }

      return 5;
    },
    scenarioDetails: (data: number[]) => {
      const score = data[0] ?? 0;
      const firstThreshold = data[1] ?? 90;
      const secondThreshold = data[2] ?? 75;

      return [
        { label: 'Score', value: score.toString() },
        { label: 'Excellent ≥', value: firstThreshold.toString() },
        { label: 'Pass ≥', value: secondThreshold.toString() },
      ];
    },
  },
};

type NodeState = 'idle' | 'active' | 'evaluating' | 'executed';

export function ControlFlowDiagram({
  algorithmId,
  data,
  visualState,
  currentStep,
}: ControlFlowDiagramProps) {
  const config = CONTROL_FLOW_CONFIGS[algorithmId];

  const nodeStateMap = useMemo(() => {
    const evaluating = new Set(visualState.comparing);
    const active = new Set([...visualState.highlighted, ...visualState.swapping]);
    const executed = new Set(visualState.sorted);

    return { evaluating, active, executed };
  }, [visualState]);

  const nodesByIndex = useMemo(() => {
    if (!config) {
      return new Map<number, DiagramNode>();
    }
    return new Map(config.nodes.map((node) => [node.index, node]));
  }, [config]);

  const scenarioDetails = useMemo(() => {
    if (!config) {
      return [];
    }
    return config.scenarioDetails(data);
  }, [config, data]);

  const predictedBranch = useMemo(() => {
    if (!config) {
      return undefined;
    }
    return config.predictBranch(data);
  }, [config, data]);

  const executedBranch = useMemo(() => {
    if (!config) {
      return undefined;
    }
    return config.branchNodes.find((index) => nodeStateMap.executed.has(index));
  }, [config, nodeStateMap]);

  const branchSummary = useMemo(() => {
    if (!config) {
      return undefined;
    }

    if (executedBranch !== undefined) {
      const label = config.branchLabels[executedBranch];
      return label ? `Executed branch: ${label}` : undefined;
    }

    if (predictedBranch !== undefined) {
      const label = config.branchLabels[predictedBranch];
      return label ? `Next branch: ${label}` : undefined;
    }

    return undefined;
  }, [config, executedBranch, predictedBranch]);

  const getNodeState = useCallback(
    (index: number): NodeState => {
      if (nodeStateMap.executed.has(index)) {
        return 'executed';
      }

      if (nodeStateMap.evaluating.has(index)) {
        return 'evaluating';
      }

      if (nodeStateMap.active.has(index)) {
        return 'active';
      }

      return 'idle';
    },
    [nodeStateMap],
  );

  if (!config) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-0">
        <div className="text-sm text-gray-500">Visualization coming soon.</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-0">
        <div className="text-sm text-gray-500">Preparing scenario...</div>
      </div>
    );
  }

  const renderNode = (node: DiagramNode) => {
    const state = getNodeState(node.index);
    const baseClass =
      'absolute flex flex-col items-center justify-center text-center px-4 py-3 rounded-lg border-2 min-w-[140px] max-w-[200px] shadow-sm transition-all duration-300';

    const stateClass: Record<NodeState, string> = {
      idle: 'bg-white border-gray-300 text-gray-700',
      active: 'bg-blue-50 border-blue-500 text-blue-700 shadow-md',
      evaluating: 'bg-algorithm-compare border-algorithm-compare text-white shadow-md',
      executed: 'bg-algorithm-sorted border-algorithm-sorted text-white shadow-md',
    };

    const descriptionClass: Record<NodeState, string> = {
      idle: 'text-gray-500',
      active: 'text-blue-600',
      evaluating: 'text-white/80',
      executed: 'text-white/80',
    };

    return (
      <div
        key={node.index}
        className={`${baseClass} ${stateClass[state]}`}
        style={{
          left: `${node.x}%`,
          top: `${node.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span className="text-sm font-semibold">{node.label}</span>
        {node.sublabel && (
          <span className={`mt-2 text-xs leading-tight ${descriptionClass[state]}`}>
            {node.sublabel(data)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-0 w-full">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {scenarioDetails.map((detail) => (
            <div
              key={detail.label}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm"
            >
              <span className="text-gray-500">{detail.label}:</span>{' '}
              <span className="font-semibold text-gray-900">{detail.value}</span>
            </div>
          ))}
          {branchSummary && (
            <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 shadow-sm">
              {branchSummary}
            </div>
          )}
        </div>

        {currentStep?.description && (
          <div className="text-xs md:text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded shadow-sm text-center max-w-2xl">
            {currentStep.description}
          </div>
        )}

        <div className="relative w-full max-w-4xl h-[420px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker
                id="arrow-head"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
              </marker>
            </defs>
            {config.edges.map((edge, index) => {
              const from = nodesByIndex.get(edge.from);
              const to = nodesByIndex.get(edge.to);
              if (!from || !to) {
                return null;
              }

              const midX = (from.x + to.x) / 2 + (edge.labelOffset?.x ?? 0);
              const midY = (from.y + to.y) / 2 + (edge.labelOffset?.y ?? 0);

              return (
                <g key={`${edge.from}-${edge.to}-${index}`}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    markerEnd="url(#arrow-head)"
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={midY}
                      fontSize={3}
                      fill="#2563eb"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {config.nodes.map(renderNode)}
        </div>
      </div>
    </div>
  );
}
