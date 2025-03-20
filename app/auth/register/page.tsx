import { createServerSupabaseClient } from "@/lib/supabase/server";
import RegisterForm from "@/components/auth/register-form";

export default async function RegisterPage() {
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
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
