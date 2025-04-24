'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function ContactParallax() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Fixed positions for shapes instead of dynamic generation
  const shapes = [
    { id: 1, x: '10%', y: '20%', size: 100, shape: 'circle', color: 'accent', depth: 0.3 },
    { id: 2, x: '80%', y: '15%', size: 120, shape: 'square', color: 'accent-secondary', depth: 0.5 },
    { id: 3, x: '25%', y: '60%', size: 80, shape: 'circle', color: 'white', depth: 0.4 },
    { id: 4, x: '70%', y: '70%', size: 150, shape: 'square', color: 'accent', depth: 0.6 },
    { id: 5, x: '40%', y: '30%', size: 90, shape: 'circle', color: 'accent-secondary', depth: 0.3 },
    { id: 6, x: '60%', y: '50%', size: 110, shape: 'square', color: 'white', depth: 0.5 },
    { id: 7, x: '15%', y: '80%', size: 130, shape: 'circle', color: 'accent', depth: 0.4 },
    { id: 8, x: '85%', y: '40%', size: 100, shape: 'square', color: 'accent-secondary', depth: 0.6 },
    { id: 9, x: '50%', y: '20%', size: 120, shape: 'circle', color: 'white', depth: 0.3 },
    { id: 10, x: '30%', y: '90%', size: 140, shape: 'square', color: 'accent', depth: 0.5 },
    { id: 11, x: '75%', y: '85%', size: 90, shape: 'circle', color: 'accent-secondary', depth: 0.4 },
    { id: 12, x: '20%', y: '40%', size: 110, shape: 'square', color: 'white', depth: 0.6 },
  ];

  return (
    <div ref={ref} className="parallax-section overflow-hidden relative">
      {/* Main background */}
      <div className="parallax-layer absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      {/* Shapes layer */}
      <div className="parallax-layer">
        {shapes.map(shape => (
          <motion.div
            key={shape.id}
            className={`absolute ${
              shape.shape === 'circle' ? 'rounded-full' : 'rounded-md'
            } opacity-10 blur-xl ${
              shape.color === 'accent' ? 'bg-accent' : 
              shape.color === 'accent-secondary' ? 'bg-accent-secondary' : 
              'bg-white'
            }`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
            }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, shape.depth * 100, 0],
              scale: [1, 1 + shape.depth * 0.2, 1]
            }}
            transition={{
              duration: 5 + shape.depth * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div 
        className="parallax-layer flex flex-col items-center justify-center px-6 text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in <span className="text-gradient">Touch</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/70 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I'm always open to new opportunities and collaborations.
          Feel free to reach out!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#contact-form" 
            className="bg-accent hover:bg-accent/90 text-black font-medium py-3 px-8 rounded-full transition-colors"
          >
            Contact Form
          </a>
          <a 
            href="#social" 
            className="bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-full transition-colors"
          >
            Social Links
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 6L12 11L17 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
} 