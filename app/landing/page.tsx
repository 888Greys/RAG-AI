"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">KB</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                KCA University AI Assistant
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-3xl">🎓</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Your AI-Powered
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Knowledge Base</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant answers about KCA University - from admission requirements to library services, 
              APA formatting, and everything in between. No more searching through PDFs!
            </p>
            
            {/* Preview Notice */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚧</span>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Preview Version
                </h3>
              </div>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                This app is currently in preview! We're working hard to upload all KCA University documents. 
                Soon, it will know everything about KCA University. The developer is quite busy, but if you're 
                willing to contribute documents or help improve the system, you're very welcome!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
              >
                Try It Now - Free!
              </Link>
              <a
                href="https://github.com/888Greys/RAG-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Why KCA Students Love This App
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Stop wasting time searching through PDFs. Get instant, accurate answers about everything KCA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast Answers",
                description: "Get responses in 1-3 seconds using Groq's ultra-fast AI inference"
              },
              {
                icon: "📚",
                title: "Library & E-Library Help",
                description: "Access guides for KCA's library services, e-library, and research resources"
              },
              {
                icon: "📝",
                title: "APA Formatting Assistant",
                description: "Get help with APA 7th edition citations and formatting guidelines"
              },
              {
                icon: "🎓",
                title: "Admission Information",
                description: "Find requirements, deadlines, and processes for KCA University programs"
              },
              {
                icon: "📱",
                title: "Mobile-First Design",
                description: "Perfect for students on the go - optimized for smartphones and tablets"
              },
              {
                icon: "🔍",
                title: "Smart Search",
                description: "Advanced RAG technology finds the most relevant information from university documents"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              How Our AI Works
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Advanced RAG (Retrieval Augmented Generation) technology powers intelligent responses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Document Processing",
                  description: "University documents are processed and converted into searchable chunks with AI embeddings"
                },
                {
                  step: "2", 
                  title: "Smart Classification",
                  description: "Your question is analyzed to determine if it needs knowledge base information"
                },
                {
                  step: "3",
                  title: "Intelligent Retrieval",
                  description: "HyDE (Hypothetical Document Embeddings) finds the most relevant information"
                },
                {
                  step: "4",
                  title: "AI Response Generation",
                  description: "Groq's Llama 4 Scout generates accurate answers using retrieved context"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Next.js 15", desc: "React Framework" },
                  { name: "Groq AI", desc: "Ultra-fast LLM" },
                  { name: "Supabase", desc: "Database & Auth" },
                  { name: "Google AI", desc: "Embeddings" },
                  { name: "Vercel", desc: "Deployment" },
                  { name: "TypeScript", desc: "Type Safety" },
                  { name: "Tailwind CSS", desc: "Styling" },
                  { name: "Framer Motion", desc: "Animations" }
                ].map((tech, index) => (
                  <div key={index} className="bg-white dark:bg-zinc-800 rounded-lg p-3">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                      {tech.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Help Us Build the Ultimate KCA Knowledge Base
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're looking for contributors to help make this the most comprehensive 
              KCA University resource. Your help can benefit thousands of students!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">🤝 How You Can Help</h3>
                <ul className="text-left space-y-2 opacity-90">
                  <li>• Share KCA University documents</li>
                  <li>• Report missing information</li>
                  <li>• Suggest new features</li>
                  <li>• Help with testing and feedback</li>
                  <li>• Contribute code improvements</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">📞 Get In Touch</h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/254715558014"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="text-xl">📱</span>
                    <span>WhatsApp: +254715558014</span>
                  </a>
                  <a
                    href="https://github.com/888Greys/RAG-AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-800 hover:bg-gray-900 px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="text-xl">💻</span>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">🎯 Our Vision</h3>
              <p className="opacity-90">
                To create the most comprehensive, AI-powered knowledge base for KCA University students. 
                A single place where any student can get instant, accurate answers about university life, 
                academics, services, and procedures. Together, we can make studying at KCA easier for everyone!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Ready to Transform Your KCA Experience?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            Join hundreds of KCA students already using our AI assistant for instant answers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
            >
              Start Using It Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
            >
              Already Have Account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">KB</span>
                </div>
                <span className="text-lg font-semibold">KCA University AI</span>
              </div>
              <p className="text-zinc-400">
                Empowering KCA University students with AI-powered knowledge access.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/register" className="block text-zinc-400 hover:text-white transition-colors">
                  Get Started
                </Link>
                <Link href="/login" className="block text-zinc-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <a
                  href="https://github.com/888Greys/RAG-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a
                  href="https://wa.me/254715558014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  WhatsApp: +254715558014
                </a>
                <p className="text-zinc-400">
                  Built with ❤️ for KCA University students
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-400">
            <p>&copy; 2024 KCA University AI Assistant. Open source and built for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}