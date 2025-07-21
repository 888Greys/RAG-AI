"use client";

import { motion } from "framer-motion";
import { BotIcon, UserIcon } from "./icons";
import { ReactNode } from "react";
import { Markdown } from "./markdown";

export const Message = ({
  role,
  content,
}: {
  role: string;
  content: string | ReactNode;
}) => {
  const isAssistant = role === "assistant";
  
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
        {isAssistant && (
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <BotIcon />
          </div>
        )}
        
        <div className={`max-w-[80%] ${isAssistant ? 'order-2' : 'order-1'}`}>
          <div className={`
            px-4 py-3 rounded-2xl
            ${isAssistant 
              ? 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }
          `}>
            {isAssistant ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{content as string}</Markdown>
              </div>
            ) : (
              <div className="text-white">
                <Markdown>{content as string}</Markdown>
              </div>
            )}
          </div>
          
          {isAssistant && (
            <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span>🧠 Knowledge Base</span>
              <span>•</span>
              <span>Powered by Groq</span>
            </div>
          )}
        </div>

        {!isAssistant && (
          <div className="flex-shrink-0 w-8 h-8 bg-zinc-300 dark:bg-zinc-600 rounded-full flex items-center justify-center order-2">
            <UserIcon />
          </div>
        )}
      </div>
    </motion.div>
  );
};
