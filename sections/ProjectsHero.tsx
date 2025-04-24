'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ProjectsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size on client
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div ref={ref} className="parallax-section overflow-hidden relative">
      {/* Animated background */}
      <motion.div 
        className="parallax-layer absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"
        style={{ y: backgroundY }}
      />
      
      {/* Particles */}
      <div className="parallax-layer">
        {windowSize.width > 0 && Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              opacity: Math.random() * 0.5 + 0.3,
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: Math.random() * 0.6 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * 200 + 400],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div 
        className="parallax-layer flex flex-col items-center justify-center px-6 text-center z-10"
        style={{ y: textY }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-gradient">Projects</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/70 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A collection of my work showcasing my skills and creativity
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <a 
            href="#projects" 
            className="bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-full flex items-center gap-2 transition-colors"
          >
            Explore Projects
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 6L12 11L17 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
} 