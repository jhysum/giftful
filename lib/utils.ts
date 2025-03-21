import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Debug helper function - allows adding debug classes conditionally
export function debugClasses(debugMode: boolean, elementType: 'container' | 'interactive' | 'text' = 'container'): string {
  if (!debugMode) return '';
  
  const classMap = {
    container: 'debug-container',
    interactive: 'debug-interactive',
    text: 'debug-text'
  };
  
  return classMap[elementType];
}
