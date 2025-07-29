'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAlgorithmImplementation, generateRandomArray } from '@/lib/algorithmRegistry';
import { useAnimationControls } from '@/hooks/useAnimation/useAnimationControls';
import { AlgorithmStep } from '@/types/algorithm';

interface AlgorithmVisualizerProps {
  algorithmId: string;
  isPlaying: boolean;
  speed: number;
  onPlayingChange: (playing: boolean) => void;
  onStepControls?: (controls: {
    stepForward: () => void;
    stepBackward: () => void;
    reset: () => void;
  }) => void;
}

export function AlgorithmVisualizer({
  algorithmId,
  isPlaying,
  speed,
  onPlayingChange,
  onStepControls,
}: AlgorithmVisualizerProps) {
  const [data, setData] = useState<number[]>([]);
  const [visualState, setVisualState] = useState({
    comparing: [] as number[],
    swapping: [] as number[],
    sorted: [] as number[],
    highlighted: [] as number[],
    subarrays: [] as number[][], // For merge sort and other divide-and-conquer algorithms
  });

  // Generate initial data only on client side to prevent hydration mismatch
  useEffect(() => {
    if (data.length === 0) {
      setData(generateRandomArray(10));
    }
  }, [data.length, algorithmId]);

  const algorithm = getAlgorithmImplementation(algorithmId);
  const steps = useMemo(() => {
    return algorithm ? algorithm.generateSteps(data) : [];
  }, [algorithm, data]);

  const animationControls = useAnimationControls({
    steps,
    speed,
    onStepChange: (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        const step = steps[stepIndex];
        updateVisualState(step);
      }
    },
  });

  // Pass step controls to parent component
  useEffect(() => {
    if (onStepControls) {
      onStepControls({
        stepForward: animationControls.stepForward,
        stepBackward: animationControls.stepBackward,
        reset: animationControls.reset,
      });
    }
  }, [animationControls.stepForward, animationControls.stepBackward, animationControls.reset, onStepControls]);

  const updateVisualState = (step: AlgorithmStep) => {
    setVisualState(prev => {
      const newState = { ...prev };
      
      // Reset all states
      newState.comparing = [];
      newState.swapping = [];
      newState.highlighted = [];

      switch (step.type) {
        case 'compare':
          newState.comparing = step.indices;
          break;
        case 'swap':
          newState.swapping = step.indices;
          // Update the actual data for swaps
          if (step.values && step.indices.length === 2) {
            const newData = [...data];
            [newData[step.indices[0]], newData[step.indices[1]]] = [step.values[0], step.values[1]];
            setData(newData);
          }
          break;
        case 'highlight':
          newState.highlighted = step.indices;
          break;
        case 'complete':
          newState.sorted = [...prev.sorted, ...step.indices];
          break;
        case 'set':
          // Handle set operations (like in merge sort and adding new elements)
          if (step.values && step.indices.length === 1) {
            const newData = [...data];
            const index = step.indices[0];
            const value = step.values[0];
            
            // If the index is beyond the current array length, add the element
            if (index >= newData.length) {
              newData.push(value);
            } else {
              // Otherwise, set the value at the existing index
              newData[index] = value;
            }
            setData(newData);
          }
          break;
        case 'remove':
          // Handle remove operations for data structures
          if (step.indices.length === 1) {
            const newData = [...data];
            // Always use the appropriate method for each data structure
            if (algorithmId === 'stack') {
              // Stack always removes from the end (LIFO)
              newData.pop();
            } else if (algorithmId === 'queue') {
              // Queue always removes from the beginning (FIFO)
              newData.shift();
            } else {
              // For list and linkedList, remove at specific index
              const index = step.indices[0];
              if (index >= 0 && index < newData.length) {
                newData.splice(index, 1);
              }
            }
            setData(newData);
          }
          break;
      }

      return newState;
    });
  };

  // Sync external play state with internal controls
  useEffect(() => {
    if (isPlaying && !animationControls.isPlaying) {
      animationControls.play();
    } else if (!isPlaying && animationControls.isPlaying) {
      animationControls.pause();
    }
  }, [isPlaying, animationControls]);

  // Update external play state when internal state changes
  useEffect(() => {
    onPlayingChange(animationControls.isPlaying);
  }, [animationControls.isPlaying, onPlayingChange]);

  const generateNewData = () => {
    const newData = generateRandomArray(10);
    setData(newData);
    setVisualState({
      comparing: [],
      swapping: [],
      sorted: [],
      highlighted: [],
      subarrays: [],
    });
    animationControls.reset();
  };

  const maxValue = data.length > 0 ? Math.max(...data) : 1;
  const currentStep = steps[animationControls.currentStep];

  // Enhanced visualization for complex algorithms
  const isComplexAlgorithm = algorithmId.includes('merge') || algorithmId.includes('quick') || algorithmId.includes('graph') || algorithmId.includes('tree');
  
  // Check if this is a special data structure
  const isStack = algorithmId === 'stack';
  const isQueue = algorithmId === 'queue';
  const isLinkedList = algorithmId === 'linked-list';

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="card p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {algorithm?.info.name || 'Algorithm Visualization'}
            </h3>
            {currentStep && (
              <p className="text-sm text-gray-600 mt-1">{currentStep.description}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={animationControls.stepBackward}
              disabled={!animationControls.canStepBackward || animationControls.isPlaying}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              Step Back
            </button>
            <button
              onClick={animationControls.stepForward}
              disabled={!animationControls.canStepForward || animationControls.isPlaying}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              Step Forward
            </button>
            <button
              onClick={animationControls.reset}
              className="btn-secondary text-sm"
            >
              Reset
            </button>
            <button
              onClick={generateNewData}
              className="btn-secondary text-sm"
            >
              Generate New Data
            </button>
            {/* Data structure specific buttons */}
            {(isStack || isQueue || isLinkedList) && (
              <div className="flex space-x-2 ml-4">
                {isStack && (
                  <>
                    <button
                      onClick={() => {
                        const newValue = Math.floor(Math.random() * 90) + 10;
                        const newData = [...data, newValue];
                        setData(newData);
                        setVisualState({
                          comparing: [],
                          swapping: [],
                          sorted: [],
                          highlighted: [newData.length - 1],
                          subarrays: [],
                        });
                        // Reset animation controls
                        animationControls.reset();
                      }}
                      className="btn-primary text-sm"
                    >
                      Push
                    </button>
                    <button
                      onClick={() => {
                        if (data.length > 0) {
                          const newData = [...data];
                          newData.pop();
                          setData(newData);
                          setVisualState({
                            comparing: [],
                            swapping: [],
                            sorted: [],
                            highlighted: [],
                            subarrays: [],
                          });
                          // Reset animation controls
                          animationControls.reset();
                        }
                      }}
                      disabled={data.length === 0}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      Pop
                    </button>
                  </>
                )}
                {isQueue && (
                  <>
                    <button
                      onClick={() => {
                        const newValue = Math.floor(Math.random() * 90) + 10;
                        const newData = [...data, newValue];
                        setData(newData);
                        setVisualState({
                          comparing: [],
                          swapping: [],
                          sorted: [],
                          highlighted: [newData.length - 1],
                          subarrays: [],
                        });
                        // Reset animation controls
                        animationControls.reset();
                      }}
                      className="btn-primary text-sm"
                    >
                      Enqueue
                    </button>
                    <button
                      onClick={() => {
                        if (data.length > 0) {
                          const newData = [...data];
                          newData.shift();
                          setData(newData);
                          setVisualState({
                            comparing: [],
                            swapping: [],
                            sorted: [],
                            highlighted: [],
                            subarrays: [],
                          });
                          // Reset animation controls
                          animationControls.reset();
                        }
                      }}
                      disabled={data.length === 0}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      Dequeue
                    </button>
                  </>
                )}
                {isLinkedList && (
                  <>
                    <button
                      onClick={() => {
                        const newValue = Math.floor(Math.random() * 90) + 10;
                        const newData = [...data, newValue];
                        setData(newData);
                        setVisualState({
                          comparing: [],
                          swapping: [],
                          sorted: [],
                          highlighted: [newData.length - 1],
                          subarrays: [],
                        });
                        // Reset animation controls
                        animationControls.reset();
                      }}
                      className="btn-primary text-sm"
                    >
                      Add Node
                    </button>
                    <button
                      onClick={() => {
                        if (data.length > 0) {
                          const newData = [...data];
                          newData.pop();
                          setData(newData);
                          setVisualState({
                            comparing: [],
                            swapping: [],
                            sorted: [],
                            highlighted: [],
                            subarrays: [],
                          });
                          // Reset animation controls
                          animationControls.reset();
                        }
                      }}
                      disabled={data.length === 0}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      Remove Node
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced visualization for complex algorithms */}
        {isComplexAlgorithm && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Enhanced visualization mode for {algorithm?.info.name}</span>
            </div>
          </div>
        )}

        {/* Stack-specific visualization */}
        {isStack && (
          <div className="flex flex-col items-center justify-center h-[600px]">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-sm text-gray-600">Stack (LIFO - Last In, First Out)</div>
              
              {/* Operation indicator - moved to top with more space */}
              {currentStep && (
                <div className="text-xs text-blue-600 font-medium bg-blue-100 px-3 py-2 rounded max-w-64 text-center shadow-sm">
                  {currentStep.description}
                </div>
              )}
              
              <div className="relative">
                {/* Stack container */}
                <div className="w-32 h-80 bg-gray-100 border-2 border-gray-300 rounded-lg flex flex-col-reverse overflow-hidden">
                  {data.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      Empty Stack
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {data.map((value, index) => (
                        <motion.div
                          key={`stack-${index}-${value}`}
                          layout
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: visualState.highlighted.includes(index) ? 1.05 : 1,
                          }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.3 }}
                          className={`w-full h-8 flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                            visualState.highlighted.includes(index)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white border-b border-gray-200'
                          }`}
                        >
                          {value}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
              
              {/* Status information - moved to bottom with more space */}
              <div className="flex flex-col items-center space-y-3">
                <div className="text-sm text-gray-600 text-center">
                  Stack has {data.length} elements. {data.length > 0 ? `Top element is ${data[data.length - 1]}` : 'Stack is empty'}
                </div>
                <div className="text-xs text-gray-500 text-center max-w-md">
                  Stack operations: Push (add to top), Pop (remove from top), Peek (view top element)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Queue-specific visualization */}
        {isQueue && (
          <div className="flex flex-col items-center justify-center h-[600px]">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-sm text-gray-600">Queue (FIFO - First In, First Out)</div>
              
              {/* Operation indicator - moved to top with more space */}
              {currentStep && (
                <div className="text-xs text-blue-600 font-medium bg-blue-100 px-3 py-2 rounded max-w-64 text-center shadow-sm">
                  {currentStep.description}
                </div>
              )}
              
              <div className="relative">
                {/* Queue container */}
                <div className="w-96 h-20 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  {data.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                      Empty Queue
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {data.map((value, index) => (
                        <motion.div
                          key={`queue-${index}-${value}`}
                          layout
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            scale: visualState.highlighted.includes(index) ? 1.05 : 1,
                          }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className={`h-full w-16 flex items-center justify-center text-xs font-medium transition-all duration-300 border-r border-gray-200 ${
                            visualState.highlighted.includes(index)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white'
                          }`}
                        >
                          {value}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
                
                {/* Front indicator - moved further left */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 font-bold bg-white px-3 py-2 rounded shadow-md border-2 border-gray-300 z-10">
                  FRONT
                </div>
                
                {/* Rear indicator - moved further right */}
                <div className="absolute -right-14 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 font-bold bg-white px-3 py-2 rounded shadow-md border-2 border-gray-300 z-10">
                  REAR
                </div>
              </div>
              
              {/* Status information - moved to bottom with more space */}
              <div className="flex flex-col items-center space-y-3">
                <div className="text-sm text-gray-600 text-center">
                  Queue has {data.length} elements. {data.length > 0 ? `Front element is ${data[0]}` : 'Queue is empty'}
                </div>
                <div className="text-xs text-gray-500 text-center max-w-md">
                  Queue operations: Enqueue (add to rear), Dequeue (remove from front), Peek (view front element)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Linked List visualization */}
        {isLinkedList && (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-sm text-gray-600 mb-4">Linked List</div>
            {data.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 text-sm">Empty Linked List</div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                {/* Operation indicator */}
                {currentStep && (
                  <div className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                    {currentStep.description}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <AnimatePresence mode="popLayout">
                    {data.map((value, index) => (
                      <motion.div
                        key={`node-${index}-${value}`}
                        layout
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: visualState.highlighted.includes(index) ? 1.1 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                          visualState.highlighted.includes(index)
                            ? 'bg-blue-500 text-white border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}>
                          <div className="text-lg font-bold">{value}</div>
                          <div className="text-xs opacity-60">Node {index}</div>
                        </div>
                        {index < data.length - 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="ml-2 mr-2"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                    {data.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 font-mono"
                      >
                        NULL
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
            <div className="text-xs text-gray-500 mt-2 text-center max-w-md">
              Linked List operations: Add Node (append), Remove Node (delete), Traverse (visit all nodes)
            </div>
          </div>
        )}

        {/* Generic bar chart visualization for other algorithms */}
        {!isStack && !isQueue && !isLinkedList && (
          <div className="flex items-end justify-center space-x-2 h-96">
            {data.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {data.map((value, index) => (
                  <motion.div
                    key={`bar-${index}-${value}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: visualState.swapping.includes(index) ? 1.1 : 1,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`algorithm-node mb-2 ${
                        visualState.sorted.includes(index)
                          ? 'sorted'
                          : visualState.swapping.includes(index)
                          ? 'swapping'
                          : visualState.comparing.includes(index)
                          ? 'comparing'
                          : visualState.highlighted.includes(index)
                          ? 'highlighted'
                          : ''
                      }`}
                      style={{
                        height: `${(value / maxValue) * 300}px`,
                        minHeight: '30px',
                      }}
                    >
                      <span className="text-xs font-medium">{value}</span>
                    </div>
                    <span className="text-xs text-gray-600">{index}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-algorithm-compare"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-algorithm-swap"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-algorithm-current"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-algorithm-sorted"></div>
              <span>Sorted</span>
            </div>
            {isComplexAlgorithm && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <span>Enhanced</span>
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            Step {animationControls.currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
}