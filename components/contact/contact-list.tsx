"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase/client";

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

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContacts() {
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
          .order("name");

        if (error) throw error;
        setContacts(data || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <Card key={contact.id} className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">{contact.name}</CardTitle>
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

              {contact.important_dates.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Important Dates:</p>
                  <ul className="space-y-1">
                    {contact.important_dates.map((date) => (
                      <li key={date.id} className="text-sm">
                        {date.event_type}:{" "}
                        {format(new Date(date.date), "MMMM d")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4">
                <Link href={`/contacts/${contact.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {contacts.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground mb-4">No contacts added yet.</p>
          <Link href="/contacts/add">
            <Button>Add Your First Contact</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
