import { createServerSupabaseClient } from "@/lib/supabase/server";
import LoginForm from "@/components/auth/login-form";

export default async function LoginPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
