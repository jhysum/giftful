"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

interface GiftSuggestion {
  id: number;
  name: string;
  description: string;
  price: number;
  is_favorite: boolean;
}

interface GiftSuggestionsProps {
  relationship: string;
  interests: string;
}

export default function GiftSuggestions({
  relationship,
  interests,
}: GiftSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const { data, error } = await supabase
          .from("gift_suggestions")
          .select("*")
          .eq("is_favorite", true);

        if (error) throw error;
        setSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching gift suggestions:", err);
        setError("Failed to load gift suggestions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  if (loading) {
    return <div>Loading gift suggestions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id}>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{suggestion.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {suggestion.description}
            </p>
            <p className="font-medium mb-4">${suggestion.price}</p>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}

      {suggestions.length === 0 && (
        <div className="col-span-full text-center py-4">
          <p className="text-muted-foreground">
            No gift suggestions available yet.
          </p>
        </div>
      )}
    </div>
  );
}
