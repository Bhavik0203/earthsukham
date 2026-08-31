"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-10 md:p-16 text-center shadow-2xl"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-500/30"
        >
          <Code className="text-white w-10 h-10" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 mb-6 tracking-tight">
          Development by Bhavik
        </h1>
        
        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
          Welcome to the demo space. This environment is configured with premium aesthetics, dynamic animations, and optimal performance in mind.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Sparkles className="w-5 h-5" />
            <span>Explore Features</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-neutral-800/80 text-white font-medium py-3 px-8 rounded-full border border-neutral-700 hover:bg-neutral-700 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <span>View Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}