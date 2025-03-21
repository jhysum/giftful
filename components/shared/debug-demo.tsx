"use client";

import { useDebugClasses } from "@/lib/hooks/use-debug";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugDemo() {
  const { debugMode, withDebug } = useDebugClasses();

  return (
    <div className={withDebug("p-4 space-y-4", "container")}>
      <h2 className={withDebug("text-2xl font-bold", "text")}>Debug Demo</h2>
      <Card className={withDebug("", "container")}>
        <CardHeader>
          <CardTitle className={withDebug("", "text")}>
            Debug Mode: {debugMode ? "ON" : "OFF"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={withDebug("mb-4", "text")}>
            This component demonstrates the debug visualization. Toggle the
            debug button in the bottom right corner to turn debugging on/off.
          </p>
          <div className={withDebug("grid grid-cols-2 gap-4", "container")}>
            <Button className={withDebug("", "interactive")}>
              Interactive Element
            </Button>
            <input
              type="text"
              placeholder="Input field"
              className={withDebug("border rounded p-2", "interactive")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
