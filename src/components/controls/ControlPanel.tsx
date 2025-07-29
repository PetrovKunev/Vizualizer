'use client';

import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { ALL_ALGORITHMS } from '@/constants/algorithms';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  selectedAlgorithm: string;
  onReset?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
}

export function ControlPanel({
  isPlaying,
  onPlayPause,
  speed,
  onSpeedChange,
  selectedAlgorithm,
  onReset,
  onStepForward,
  onStepBackward,
}: ControlPanelProps) {
  const algorithm = ALL_ALGORITHMS.find(a => a.id === selectedAlgorithm);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={onStepBackward}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isPlaying}
            >
              <SkipBack className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={onPlayPause}
              className="flex items-center space-x-2 btn-primary"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={onStepForward}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isPlaying}
            >
              <SkipForward className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={onReset}
              className="flex items-center space-x-2 btn-secondary"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Speed:</label>
            <input
              type="range"
              min={100}
              max={2000}
              step={100}
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-500">{speed}ms</span>
          </div>
        </div>

        {algorithm && (
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Time Complexity:</span>
              <div className="flex space-x-4 mt-1">
                <span className="text-green-600">Best: {algorithm.timeComplexity.best}</span>
                <span className="text-yellow-600">Avg: {algorithm.timeComplexity.average}</span>
                <span className="text-red-600">Worst: {algorithm.timeComplexity.worst}</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Space:</span>
              <span className="text-blue-600 ml-1">{algorithm.spaceComplexity}</span>
            </div>
            {algorithm.stable !== undefined && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Stable:</span>
                <span className={`ml-1 ${algorithm.stable ? 'text-green-600' : 'text-red-600'}`}>
                  {algorithm.stable ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}