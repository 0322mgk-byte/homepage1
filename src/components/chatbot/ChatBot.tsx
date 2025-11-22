"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      parts: [{ text: input }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: "죄송합니다. 잠시 후 다시 시도해주세요." }],
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: data.response }],
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "네트워크 오류가 발생했습니다. 다시 시도해주세요." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9999] w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform ring-4 ring-primary/30"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 0 0 rgba(107, 70, 193, 0)"
            : ["0 0 0 0 rgba(107, 70, 193, 0.4)", "0 0 0 20px rgba(107, 70, 193, 0)", "0 0 0 0 rgba(107, 70, 193, 0.4)"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="fixed bottom-10 right-28 z-[9999] bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          >
            무엇이든 물어보세요!
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[9999] w-[350px] h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-500 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI MONEY 상담봇</h3>
                <p className="text-xs text-white/80">무엇이든 물어보세요!</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">안녕하세요! AI MONEY 상담봇입니다.</p>
                  <p className="text-xs mt-1">특강에 대해 궁금한 점을 물어보세요!</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-gray-800 text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
