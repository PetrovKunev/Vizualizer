'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AlgorithmVisualizer } from '@/components/visualization/AlgorithmVisualizer';
import { ControlPanel } from '@/components/controls/ControlPanel';
import { CodeViewer } from '@/components/ui/CodeViewer';

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  return (
    <div className="flex h-screen">
      <Sidebar 
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmSelect={setSelectedAlgorithm}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <ControlPanel
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              speed={speed}
              onSpeedChange={setSpeed}
              selectedAlgorithm={selectedAlgorithm}
            />
            
            <AlgorithmVisualizer 
              algorithmId={selectedAlgorithm}
              isPlaying={isPlaying}
              speed={speed}
              onPlayingChange={setIsPlaying}
            />
          </div>
          
          <div className="w-80 border-l border-gray-200 bg-white">
            <CodeViewer algorithm={selectedAlgorithm} />
          </div>
        </div>
      </div>
    </div>
  );
}