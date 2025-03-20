import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Giftful - Gift Planning Made Easy",
  description:
    "Track important dates and get personalized gift suggestions for your loved ones.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Giftful
              </Link>

              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost">Dashboard</Button>
                    </Link>
                    <Link href="/contacts">
                      <Button variant="ghost">Contacts</Button>
                    </Link>
                    <form action="/auth/signout" method="post">
                      <Button variant="ghost" type="submit">
                        Sign Out
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t mt-8">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} Giftful. All rights reserved.
            </p>
          </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
