"use client";

import Link from "next/link";
import { Form } from "@/components/form";
import { SubmitButton } from "@/components/submit-button";
import { register, RegisterActionState } from "../actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    },
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-8 sm:gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-white text-xl sm:text-2xl">🎓</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold dark:text-zinc-50">Join KCA University</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create your account to access the Knowledge Base
          </p>
        </div>
        <Form action={formAction}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign in
            </Link>
            {" instead."}
          </p>
        </Form>
      </div>
    </div>
  );
}
