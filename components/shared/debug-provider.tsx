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
          * {
            outline: 1px solid rgba(255, 0, 0, 0.2) !important;
          }

          div,
          section,
          article,
          aside,
          nav,
          header,
          footer,
          main {
            background-color: rgba(255, 0, 0, 0.05) !important;
          }

          button,
          a,
          input,
          textarea,
          select {
            background-color: rgba(0, 0, 255, 0.05) !important;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          span {
            background-color: rgba(0, 255, 0, 0.05) !important;
          }
        `}</style>
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleDebugMode}
          className="bg-slate-800 text-white px-3 py-1 rounded-md text-xs shadow-md hover:bg-slate-700"
        >
          {debugMode ? "Debug: ON" : "Debug: OFF"}
        </button>
      </div>
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
