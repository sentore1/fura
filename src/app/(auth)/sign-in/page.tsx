import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFB] px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-3 text-center">
              <Image src="/fura-logo.png" alt="Fura Laundry" width={48} height={48} className="mx-auto object-contain" />
              <h1 className="text-2xl font-bold tracking-tight font-grotesk text-[#1A2332]">Welcome Back</h1>
              <p className="text-sm text-[#5A6A7A]">
                Don&apos;t have an account?{" "}
                <Link
                  className="text-[#0066CC] font-medium hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#1A2332]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-[#1A2332]">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-[#5A6A7A] hover:text-[#0066CC] hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white"
              pendingText="Signing in..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>

            <FormMessage message={message} />
          </form>
        </div>
      </div>
    </>
  );
}
