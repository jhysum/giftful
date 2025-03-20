"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase/client";
import GiftSuggestions from "@/components/gift/gift-suggestions";

interface Contact {
  id: number;
  name: string;
  relationship_type: string;
  interests: string | null;
  important_dates: Array<{
    id: number;
    event_type: string;
    date: string;
  }>;
}

interface ContactDetailProps {
  id: string;
}

export default function ContactDetail({ id }: ContactDetailProps) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const { data, error } = await supabase
          .from("contacts")
          .select(
            `
            id,
            name,
            relationship_type,
            interests,
            important_dates(id, event_type, date)
          `
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        setContact(data);
      } catch (err) {
        console.error("Error fetching contact:", err);
        setError("Failed to load contact details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [id]);

  if (loading) {
    return <div>Loading contact details...</div>;
  }

  if (error || !contact) {
    return <div className="text-red-500">{error || "Contact not found"}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{contact.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Relationship:</span>{" "}
                  {contact.relationship_type}
                </p>
                {contact.interests && (
                  <p>
                    <span className="font-medium">Interests:</span>{" "}
                    {contact.interests}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent>
              {contact.important_dates.length > 0 ? (
                <ul className="space-y-2">
                  {contact.important_dates.map((date) => (
                    <li key={date.id} className="flex justify-between">
                      <span>{date.event_type}</span>
                      <span>{format(new Date(date.date), "MMMM d")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No important dates added yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Gift Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <GiftSuggestions
                relationship={contact.relationship_type}
                interests={contact.interests || ""}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
