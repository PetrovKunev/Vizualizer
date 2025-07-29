'use client';

import { useState } from 'react';
import { getAlgorithmImplementation } from '@/lib/algorithmRegistry';

interface CodeViewerProps {
  algorithm: string;
}

export function CodeViewer({ algorithm }: CodeViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const algorithmImplementation = getAlgorithmImplementation(algorithm);
  const algorithmInfo = algorithmImplementation?.info;
  const codeObject = algorithmImplementation?.code || {};
  
  const availableLanguages = Object.keys(codeObject);
  const currentCode = codeObject[selectedLanguage] || '// Code not available';

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Implementation</h3>
        {algorithmInfo && (
          <p className="text-sm text-gray-600 mt-1">{algorithmInfo.name}</p>
        )}
        
        {availableLanguages.length > 1 && (
          <div className="flex space-x-1 mt-3">
            {availableLanguages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedLanguage === language
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm font-mono text-gray-800 whitespace-pre-wrap">
          <code>{currentCode}</code>
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