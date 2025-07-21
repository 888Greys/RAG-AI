"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Files } from "@/components/files";
import { AnimatePresence, motion } from "framer-motion";
import { FileIcon } from "@/components/icons";
import { Message as PreviewMessage } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { Session } from "next-auth";

const suggestedActions = [
  {
    title: "Library Access",
    label: "How do I access the e-library?",
    action: "How do I access the KCA University e-library?",
    icon: "📚",
  },
  {
    title: "APA Formatting",
    label: "How do I format citations?",
    action: "How do I format citations in APA 7th edition?",
    icon: "📝",
  },
  {
    title: "Admission Info",
    label: "What are admission requirements?",
    action: "What are the admission requirements for KCA University?",
    icon: "🎓",
  },
  {
    title: "Student Services",
    label: "What services are available?",
    action: "What student services are available at KCA University?",
    icon: "🏫",
  },
];

export function Chat({
  id,
  initialMessages,
  session,
}: {
  id: string;
  initialMessages: Array<Message>;
  session: Session | null;
}) {
  const [selectedFilePathnames, setSelectedFilePathnames] = useState<
    Array<string>
  >([]);
  const [isFilesVisible, setIsFilesVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted !== false && session && session.user) {
      localStorage.setItem(
        `${session.user.email}/selected-file-pathnames`,
        JSON.stringify(selectedFilePathnames),
      );
    }
  }, [selectedFilePathnames, isMounted, session]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session && session.user) {
      setSelectedFilePathnames(
        JSON.parse(
          localStorage.getItem(
            `${session.user.email}/selected-file-pathnames`,
          ) || "[]",
        ),
      );
    }
  }, [session]);

  const { messages, handleSubmit, input, setInput, append, error, isLoading } = useChat({
    body: { id, selectedFilePathnames },
    initialMessages,
    onFinish: () => {
      window.history.replaceState({}, "", `/${id}`);
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-col h-dvh bg-gradient-to-br from-slate-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Mobile-Optimized Header */}
      <div className="flex-shrink-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs sm:text-sm font-bold">KB</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                KCA University
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                AI Assistant • {messages.length > 0 ? `${messages.length} msgs` : 'Ready'}
              </p>
            </div>
          </div>
          
          {/* Mobile Status Indicator */}
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex-shrink-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs hidden sm:inline">Active</span>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Chat Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-6"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 px-2">
              {/* Mobile Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3 sm:space-y-4"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-white text-xl sm:text-2xl">🎓</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Welcome to KCA AI Assistant
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-sm sm:max-w-md leading-relaxed">
                    Ask questions about admission, library services, APA formatting, and anything related to KCA University.
                  </p>
                </div>
              </motion.div>

              {/* Mobile-Optimized Suggested Actions */}
              <div className="w-full max-w-lg">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 text-center">
                  Popular questions:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {suggestedActions.map((suggestedAction, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={async () => {
                        append({
                          role: "user",
                          content: suggestedAction.action,
                        });
                      }}
                      className="group p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 text-left active:scale-95"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl flex-shrink-0">{suggestedAction.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base">
                            {suggestedAction.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 truncate">
                            {suggestedAction.label}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <PreviewMessage
                  key={`${id}-${index}`}
                  role={message.role}
                  content={message.content}
                />
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </>
          )}
        </div>

        {/* Mobile Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-3 sm:mx-4 mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <span className="text-red-500 flex-shrink-0">⚠️</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Something went wrong
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 break-words">
                  {error.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile-Optimized Input Area */}
        <div className="flex-shrink-0 p-3 sm:p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-700 safe-area-inset-bottom">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-end gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about KCA University..."
                  disabled={isLoading}
                  className="w-full px-3 sm:px-4 py-3 pr-10 sm:pr-12 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 text-sm sm:text-base"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-zinc-300 disabled:to-zinc-400 text-white rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 active:scale-95 flex-shrink-0"
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base hidden sm:inline">Thinking...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm sm:text-base">Send</span>
                    <span className="text-sm sm:text-base">↗</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Mobile-friendly tips */}
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-center">
              💡 Ask about admission, library, or APA formatting
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isFilesVisible && (
          <Files
            setIsFilesVisible={setIsFilesVisible}
            selectedFilePathnames={selectedFilePathnames}
            setSelectedFilePathnames={setSelectedFilePathnames}
          />
        )}
      </AnimatePresence>
    </div>
  );
}