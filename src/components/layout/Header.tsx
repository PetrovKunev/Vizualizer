'use client';

import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Algorithm Visualizer
          </h1>
          <span className="text-sm text-gray-500">
            Interactive learning platform for algorithms and data structures
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}