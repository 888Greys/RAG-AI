import { auth, signOut } from "@/app/(auth)/auth";
import Link from "next/link";
import { History } from "./history";

export const Navbar = async () => {
  let session = await auth();

  return (
    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm absolute top-0 left-0 w-full border-b border-zinc-200 dark:border-zinc-700 py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-between z-50 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <History />
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">KB</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            KCA University KB
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {session && (
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="truncate max-w-32">Signed in as {session.user?.email}</span>
          </div>
        )}
        
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Sign out
            </button>
          </form>
        ) : (
          <Link
            href="login"
            className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};