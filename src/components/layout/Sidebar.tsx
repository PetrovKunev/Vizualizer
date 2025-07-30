'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ALL_ALGORITHMS } from '@/constants/algorithms';
import { AlgorithmInfo } from '@/types/algorithm';

interface SidebarProps {
  selectedAlgorithm: string;
  onAlgorithmSelect: (algorithmId: string) => void;
}

export function Sidebar({ selectedAlgorithm, onAlgorithmSelect }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sorting']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const groupedAlgorithms = ALL_ALGORITHMS.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  }, {} as Record<string, AlgorithmInfo[]>);

  const categoryNames = {
    sorting: 'Sorting Algorithms',
    searching: 'Searching Algorithms',
    graph: 'Graph Algorithms',
    tree: 'Tree Algorithms',
    'data-structure': 'Data Structures',
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Algorithms</h2>
        
        <nav className="space-y-2">
          {Object.entries(groupedAlgorithms).map(([category, algorithms]) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {expandedCategories.includes(category) ? (
                  <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                )}
                <span className="font-medium text-gray-700">
                  {categoryNames[category as keyof typeof categoryNames]}
                </span>
              </button>
              
              {expandedCategories.includes(category) && (
                <div className="ml-6 mt-2 space-y-1">
                  {algorithms.map((algorithm) => (
                    <button
                      key={algorithm.id}
                      onClick={() => onAlgorithmSelect(algorithm.id)}
                      className={`block w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        selectedAlgorithm === algorithm.id
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {algorithm.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}