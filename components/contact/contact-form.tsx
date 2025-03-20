"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

type ContactFormData = {
  name: string;
  relationship_type: string;
  interests: string;
};

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    relationship_type: "",
    interests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: user } = await supabase.auth.getUser();

      if (!user.user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("contacts").insert([
        {
          ...formData,
          user_id: user.user.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact added successfully!",
      });

      router.push("/contacts");
      router.refresh();
    } catch (error) {
      console.error("Error adding contact:", error);
      toast({
        title: "Error",
        description: "Failed to add contact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationship_type">Relationship Type</Label>
        <Input
          id="relationship_type"
          name="relationship_type"
          value={formData.relationship_type}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interests (Optional)</Label>
        <Textarea
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="Enter interests separated by commas"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Contact"}
      </Button>
    </form>
  );
}
