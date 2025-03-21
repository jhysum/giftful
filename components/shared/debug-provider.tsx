"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type DebugContextType = {
  debugMode: boolean;
  toggleDebugMode: () => void;
};

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debugMode, setDebugMode] = useState(false);

  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev);
  };

  return (
    <DebugContext.Provider value={{ debugMode, toggleDebugMode }}>
      {children}
      {debugMode && (
        <style jsx global>{`
          /* Use attribute selectors instead of element selectors to avoid conflicts */
          [data-debug] * {
            outline: 1px solid rgba(255, 0, 0, 0.2);
          }

          /* Container elements */
          [data-debug] div:not([class*="shadcn"]),
          [data-debug] section:not([class*="shadcn"]),
          [data-debug] article:not([class*="shadcn"]),
          [data-debug] aside:not([class*="shadcn"]),
          [data-debug] nav:not([class*="shadcn"]),
          [data-debug] header:not([class*="shadcn"]),
          [data-debug] footer:not([class*="shadcn"]),
          [data-debug] main:not([class*="shadcn"]) {
            background-color: rgba(255, 0, 0, 0.05);
          }

          /* Interactive elements */
          [data-debug] button:not([class*="shadcn"]),
          [data-debug] a:not([class*="shadcn"]),
          [data-debug] input:not([class*="shadcn"]),
          [data-debug] textarea:not([class*="shadcn"]),
          [data-debug] select:not([class*="shadcn"]) {
            background-color: rgba(0, 0, 255, 0.05);
          }

          /* Text elements */
          [data-debug] h1:not([class*="shadcn"]),
          [data-debug] h2:not([class*="shadcn"]),
          [data-debug] h3:not([class*="shadcn"]),
          [data-debug] h4:not([class*="shadcn"]),
          [data-debug] h5:not([class*="shadcn"]),
          [data-debug] h6:not([class*="shadcn"]),
          [data-debug] p:not([class*="shadcn"]),
          [data-debug] span:not([class*="shadcn"]) {
            background-color: rgba(0, 255, 0, 0.05);
          }

          /* Add debug classes to complement the attribute-based styling */
          .debug-container {
            outline: 1px solid rgba(255, 0, 0, 0.5) !important;
            background-color: rgba(255, 0, 0, 0.05) !important;
          }

          .debug-interactive {
            outline: 1px solid rgba(0, 0, 255, 0.5) !important;
            background-color: rgba(0, 0, 255, 0.05) !important;
          }

          .debug-text {
            outline: 1px solid rgba(0, 255, 0, 0.5) !important;
            background-color: rgba(0, 255, 0, 0.05) !important;
          }
        `}</style>
      )}
      <div className="fixed bottom-4 right-4 z-50" data-debug-control>
        <button
          onClick={toggleDebugMode}
          className="bg-slate-800 text-white px-3 py-1 rounded-md text-xs shadow-md hover:bg-slate-700"
        >
          {debugMode ? "Debug: ON" : "Debug: OFF"}
        </button>
      </div>
      {/* Add a data attribute to the document body when debug mode is on */}
      {debugMode && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.body.setAttribute('data-debug', 'true');
          `,
          }}
        />
      )}
      {!debugMode && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.body.removeAttribute('data-debug');
          `,
          }}
        />
      )}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error("useDebug must be used within a DebugProvider");
  }
  return context;
}
