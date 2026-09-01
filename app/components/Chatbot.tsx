'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { qaPairs } from './data/chatbot-qa';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track already asked questions
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  // Get next 2 unused questions
  const getNextQuestions = (exclude: string[]) =>
    qaPairs
      .map(q => q.question)
      .filter(q => !exclude.includes(q))
      .slice(0, 2);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Ask me about Earth Sukham or let me know how I can assist you.",
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      options: qaPairs.slice(0, 2).map(q => q.question),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuestionClick = (question: string) => {
    const qa = qaPairs.find(q => q.question === question);
    if (!qa) return;

    const updatedUsed = [...usedQuestions, question];
    setUsedQuestions(updatedUsed);

    // removed duplicate setUsedQuestions call

    const nextOptions = qaPairs
      .map(q => q.question)
      .filter(q => ![...updatedUsed].includes(q)) // Use updatedUsed immediately
      .slice(0, 2);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: question,
        sender: 'user',
        timestamp: new Date(),
      },
      {
        id: Date.now() + 1,
        text: qa.answer,
        sender: 'bot',
        timestamp: new Date(),
        options: nextOptions.length ? nextOptions : undefined,
      },
    ]);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => setIsOpen(true)}
          className="fixed right-5 bottom-5 z-50 group"
        >
          <motion.span
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-[6px] rounded-full bg-gradient-to-r from-[#C19B54] via-[#D4A373] to-[#C19B54] blur-xl"
          />
          <div className="relative rounded-full p-4 bg-[#B58A3D] shadow-lg"> {/* Earth Sukham Gold theme */}
            <Bot size={20} className="text-white" />
          </div>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed right-5 bottom-5 z-50 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#B58A3D] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={20} />
                </motion.div>
                <div>
                  <h3 className="text-sm font-semibold">Earth Sukham Assistant</h3>
                  <span className="text-[11px] text-white/70">Online • Ready to help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-[#efeae2] px-3 py-4 space-y-3 ">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                    }`}
                >
                  {message.sender === 'bot' ? (
                    <div className="flex items-start gap-4 max-w-[85%]">
                      <div className="w-12 h-10 rounded-full bg-[#B58A3D] flex items-center justify-center">
                        <Bot size={16} className="text-white gap-4" />
                      </div>

                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 w-full">
                        <p className="text-xs text-gray-800">{message.text}</p>

                        {/* ✅ NON-REPEATING QUESTION SUGGESTIONS */}
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map(option => (
                              <motion.button
                                key={option}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleQuestionClick(option)}
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-xs text-gray-900 hover:bg-gray-100 transition"
                              >
                                {option}
                                <span className="float-right text-gray-500">
                                  ›
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        )}

                        <span className="text-[10px] text-gray-500 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[85%]">
                      <div className="bg-[#B58A3D] text-white rounded-2xl rounded-br-none px-4 py-3">
                        <p className="text-xs">{message.text}</p>
                        <span className="text-xs text-white/70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
