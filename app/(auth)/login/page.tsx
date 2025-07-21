"use client";

import Link from "next/link";
import { Form } from "@/components/form";
import { SubmitButton } from "@/components/submit-button";
import { useActionState, useEffect } from "react";
import { login, LoginActionState } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    },
  );

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!");
    } else if (state.status === "success") {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  }, [state.status, router]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2">
            <span className="text-white text-xl sm:text-2xl">🎓</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold dark:text-zinc-50">Welcome Back</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Sign in to access KCA University Knowledge Base
          </p>
        </div>

        {/* Developer Message */}
        <div className="mx-4 sm:mx-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🚧</span>
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-200">
              Preview Version - Developer Message
            </h4>
          </div>
          <div className="space-y-3 text-amber-700 dark:text-amber-300">
            <p className="text-xs leading-relaxed">
              <strong>Hey KCA Students!</strong> This app is in preview. We&apos;re uploading all KCA University documents. 
              If you&apos;re willing to contribute documents or help improve the system, you&apos;re very welcome!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-2">
                <h5 className="font-semibold text-amber-800 dark:text-amber-200 text-xs mb-1 flex items-center gap-1">
                  <span>💻</span> GitHub
                </h5>
                <a
                  href="https://github.com/888Greys/RAG-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs break-all"
                >
                  888Greys/RAG-AI
                </a>
              </div>
              
              <div className="bg-white/50 dark:bg-zinc-800/50 rounded-lg p-2">
                <h5 className="font-semibold text-amber-800 dark:text-amber-200 text-xs mb-1 flex items-center gap-1">
                  <span>📱</span> WhatsApp
                </h5>
                <a
                  href="https://wa.me/254715558014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:underline text-xs"
                >
                  +254715558014
                </a>
              </div>
            </div>
            
            <p className="text-xs italic">
              🤝 Open source - contributions welcome!
            </p>
          </div>
        </div>

        <Form action={formAction}>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
            {" for free."}
          </p>
        </Form>
      </div>
    </div>
  );
}
