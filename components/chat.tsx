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
    title: "Company Policies",
    label: "What's the vacation policy?",
    action: "What's the company vacation policy?",
    icon: "🏢",
  },
  {
    title: "Technical Docs",
    label: "How do I authenticate with the API?",
    action: "How do I authenticate with the API?",
    icon: "⚙️",
  },
  {
    title: "Product Info",
    label: "What are the system requirements?",
    action: "What are the system requirements for the product?",
    icon: "📋",
  },
  {
    title: "Expense Policy",
    label: "How do I submit expenses?",
    action: "What's the expense reimbursement process?",
    icon: "💰",
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
      {/* Header */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">KB</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Internal Knowledge Base
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Powered by AI • {messages.length > 0 ? `${messages.length} messages` : 'Ready to help'}
              </p>
            </div>
          </div>
          
          {/* Knowledge Base Status */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Knowledge Base Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">🧠</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Welcome to your Knowledge Base
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                    Ask questions about company policies, technical documentation, or product specifications. 
                    I'll search through your knowledge base to provide accurate answers.
                  </p>
                </div>
              </motion.div>

              {/* Suggested Actions */}
              <div className="w-full max-w-2xl">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 text-center">
                  Try asking about:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      className="group p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{suggestedAction.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {suggestedAction.title}
                          </h4>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
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

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Something went wrong
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {error.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-700">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about policies, technical docs, or product info..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-zinc-300 disabled:to-zinc-400 text-white rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <span>↗</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <span>💡 Tip: Ask specific questions for better results</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Powered by Groq + RAG</span>
              </div>
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
