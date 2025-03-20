"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkSession = async () => {
      console.log("[LoginForm] Checking session...");
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("[LoginForm] Session check result:", { session, error });
      if (session) {
        console.log("[LoginForm] Session exists, redirecting to dashboard...");
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("[LoginForm] Attempting to sign in...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log("[LoginForm] Sign in result:", { data, error });

      if (error) throw error;

      if (data.session) {
        console.log("[LoginForm] Sign in successful, session:", data.session);

        // Get the redirect URL from search params or default to dashboard
        const redirectTo = searchParams.get("redirectedFrom") || "/dashboard";
        console.log("[LoginForm] Redirecting to:", redirectTo);

        // Show success toast
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });

        // Ensure the session is properly set and cookies are available
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("[LoginForm] Session error:", sessionError);
          throw sessionError;
        }

        if (!currentSession) {
          console.error("[LoginForm] No session after sign in");
          throw new Error("Failed to establish session");
        }

        console.log("[LoginForm] Session verified, proceeding with navigation");

        // Force a hard navigation to ensure the middleware picks up the new session
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error("[LoginForm] Error signing in:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
