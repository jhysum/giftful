"use client";

import { useDebug } from "@/components/shared/debug-provider";
import { cn } from "@/lib/utils";

export type DebugElementType = 'container' | 'interactive' | 'text';

export const useDebugClasses = () => {
  const { debugMode } = useDebug();
  
  const getDebugClass = (elementType: DebugElementType = 'container') => {
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
    className: string = '',
    elementType: DebugElementType = 'container'
  ) => {
    return cn(className, debugMode ? getDebugClass(elementType) : '');
  };

  // Adds a data-debug-type attribute to help with styling
  const debugProps = (elementType: DebugElementType = 'container') => {
    if (!debugMode) return {};
    
    return {
      'data-debug-type': elementType,
      className: getDebugClass(elementType)
    };
  };

  return {
    debugMode,
    getDebugClass,
    withDebug,
    debugProps
  };
}; 