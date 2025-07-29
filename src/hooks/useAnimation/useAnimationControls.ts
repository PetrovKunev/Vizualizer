'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AlgorithmStep } from '@/types/algorithm';

interface UseAnimationControlsProps {
  steps: AlgorithmStep[];
  speed: number;
  onStepChange?: (step: number) => void;
}

export function useAnimationControls({
  steps,
  speed,
  onStepChange,
}: UseAnimationControlsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentStep(0);
    onStepChange?.(0);
  }, [pause, onStepChange]);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, steps.length, onStepChange]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, onStepChange]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  }, [steps.length, onStepChange]);

  // Handle auto-play
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          onStepChange?.(next);
          
          if (next >= steps.length - 1) {
            setIsPlaying(false);
            return prev + 1;
          }
          return next;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed, onStepChange]);

  return {
    currentStep,
    isPlaying,
    canStepForward: currentStep < steps.length - 1,
    canStepBackward: currentStep > 0,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    goToStep,
    togglePlayPause: isPlaying ? pause : play,
  };
}