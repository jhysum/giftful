"use client";

import { useDebug } from "@/components/shared/debug-provider";
import { cn } from "@/lib/utils";

export const useDebugClasses = () => {
  const { debugMode } = useDebug();
  
  const getDebugClass = (elementType: 'container' | 'interactive' | 'text' = 'container') => {
    if (!debugMode) return '';
    
    const classMap = {
      container: 'debug-container',
      interactive: 'debug-interactive',
      text: 'debug-text'
    };
    
    return classMap[elementType];
  };
  
  // Helper to append debug classes to existing Tailwind classes
  const withDebug = (
    className: string,
    elementType: 'container' | 'interactive' | 'text' = 'container'
  ) => {
    return cn(className, getDebugClass(elementType));
  };

  return {
    debugMode,
    getDebugClass,
    withDebug
  };
}; 