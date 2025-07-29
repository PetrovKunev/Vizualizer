'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualizationCanvasProps {
  algorithm: string;
  isPlaying: boolean;
  speed: number;
}

export function VisualizationCanvas({
  algorithm,
  isPlaying,
  speed,
}: VisualizationCanvasProps) {
  const [data, setData] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 5, 77, 30]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  // Generate random data
  const generateRandomData = () => {
    const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 5);
    setData(newData);
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
  };

  // Basic bubble sort visualization (placeholder)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (algorithm === 'bubble-sort') {
        // Simple bubble sort step simulation
        const newData = [...data];
        const i = Math.floor(currentStep / data.length);
        const j = currentStep % data.length;

        if (i < data.length - 1 && j < data.length - i - 1) {
          setComparing([j, j + 1]);
          
          if (newData[j] > newData[j + 1]) {
            setSwapping([j, j + 1]);
            [newData[j], newData[j + 1]] = [newData[j + 1], newData[j]];
            setData(newData);
          }
          
          setCurrentStep(prev => prev + 1);
        } else {
          setSorted(prev => [...prev, data.length - i - 1]);
          if (i >= data.length - 2) {
            setSorted(Array.from({ length: data.length }, (_, index) => index));
            setComparing([]);
            setSwapping([]);
          }
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, data, algorithm, speed]);

  const maxValue = Math.max(...data);

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="card p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Visualization
          </h3>
          <button
            onClick={generateRandomData}
            className="btn-secondary text-sm"
          >
            Generate Random Data
          </button>
        </div>

        <div className="flex items-end justify-center space-x-2 h-96">
          <AnimatePresence>
            {data.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: swapping.includes(index) ? 1.1 : 1,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`algorithm-node mb-2 ${
                    sorted.includes(index)
                      ? 'sorted'
                      : swapping.includes(index)
                      ? 'swapping'
                      : comparing.includes(index)
                      ? 'comparing'
                      : ''
                  }`}
                  style={{
                    height: `${(value / maxValue) * 300}px`,
                    minHeight: '40px',
                  }}
                >
                  <span className="text-xs font-medium">{value}</span>
                </div>
                <span className="text-xs text-gray-500">{index}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-algorithm-compare"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-algorithm-swap"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-algorithm-sorted"></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>
    </div>
  );
}