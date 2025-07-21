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
      className="w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex gap-2 sm:gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
        {isAssistant && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <BotIcon />
          </div>
        )}
        
        <div className={`max-w-[85%] sm:max-w-[80%] ${isAssistant ? 'order-2' : 'order-1'}`}>
          <div className={`
            px-3 sm:px-4 py-2 sm:py-3 rounded-2xl
            ${isAssistant 
              ? 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }
          `}>
            {isAssistant ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm sm:text-base">
                <Markdown>{content as string}</Markdown>
              </div>
            ) : (
              <div className="text-white text-sm sm:text-base">
                <Markdown>{content as string}</Markdown>
              </div>
            )}
          </div>
          
          {isAssistant && (
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span>🎓 KCA Assistant</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">AI Powered</span>
            </div>
          )}
        </div>

        {!isAssistant && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-zinc-300 dark:bg-zinc-600 rounded-full flex items-center justify-center order-2">
            <UserIcon />
          </div>
        )}
      </div>
    </motion.div>
  );
};
