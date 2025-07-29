'use client';

import { getAlgorithmImplementation } from '@/lib/algorithmRegistry';

interface CodeViewerProps {
  algorithm: string;
}

export function CodeViewer({ algorithm }: CodeViewerProps) {
  const algorithmImplementation = getAlgorithmImplementation(algorithm);
  const algorithmInfo = algorithmImplementation?.info;
  const code = algorithmImplementation?.code || '// Code not available';

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Implementation</h3>
        {algorithmInfo && (
          <p className="text-sm text-gray-600 mt-1">{algorithmInfo.name}</p>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm font-mono text-gray-800 whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
      
      {algorithmInfo && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{algorithmInfo.description}</p>
        </div>
      )}
    </div>
  );
}