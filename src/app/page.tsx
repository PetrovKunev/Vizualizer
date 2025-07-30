'use client';

import { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AlgorithmVisualizer } from '@/components/visualization/AlgorithmVisualizer';
import { ControlPanel } from '@/components/controls/ControlPanel';
import { CodeViewer } from '@/components/ui/CodeViewer';

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  
  // Refs to store step control functions
  const stepControlsRef = useRef<{
    stepForward: () => void;
    stepBackward: () => void;
    reset: () => void;
  } | null>(null);

  const handleStepControls = useCallback((controls: {
    stepForward: () => void;
    stepBackward: () => void;
    reset: () => void;
  }) => {
    stepControlsRef.current = controls;
  }, []);

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
              onStepForward={() => stepControlsRef.current?.stepForward()}
              onStepBackward={() => stepControlsRef.current?.stepBackward()}
              onReset={() => stepControlsRef.current?.reset()}
            />
            
            <AlgorithmVisualizer 
              algorithmId={selectedAlgorithm}
              isPlaying={isPlaying}
              speed={speed}
              onPlayingChange={setIsPlaying}
              onStepControls={handleStepControls}
            />
          </div>
          
          <div className="w-80 border-l border-gray-200 bg-white">
            <CodeViewer algorithm={selectedAlgorithm} />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}