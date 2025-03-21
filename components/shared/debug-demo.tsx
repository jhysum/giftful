"use client";

import { useDebugClasses } from "@/lib/hooks/use-debug";
import { useDebug } from "@/components/shared/debug-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugDemo() {
  const { debugMode } = useDebug();
  const { withDebug, debugProps } = useDebugClasses();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Debug Visualization Tools</h2>

      {/* Demo section with manual class application */}
      <Card>
        <CardHeader>
          <CardTitle>Method 1: Using withDebug()</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section demonstrates using the withDebug() helper to add debug
            classes.
          </p>

          <div className={withDebug("p-4 border rounded-md", "container")}>
            <h3 className={withDebug("text-lg font-medium mb-2", "text")}>
              Container Element
            </h3>
            <p className={withDebug("mb-4 text-sm", "text")}>
              Text is highlighted in green when debug mode is active.
            </p>
            <Button className={withDebug("", "interactive")}>
              Interactive Element
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Demo section with data attributes */}
      <Card>
        <CardHeader>
          <CardTitle>Method 2: Using debugProps()</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section demonstrates using the debugProps() helper to add data
            attributes.
          </p>

          <div className="p-4 border rounded-md" {...debugProps("container")}>
            <h3 className="text-lg font-medium mb-2" {...debugProps("text")}>
              Container with Data Attributes
            </h3>
            <p className="mb-4 text-sm" {...debugProps("text")}>
              Elements receive data-debug-type attributes when debug mode is
              active.
            </p>
            <Button variant="outline" {...debugProps("interactive")}>
              Interactive Element
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status section */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                debugMode ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <p>
              Debug Mode: <strong>{debugMode ? "ON" : "OFF"}</strong>
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Toggle the debug button in the bottom right corner to turn debugging
            on/off.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
