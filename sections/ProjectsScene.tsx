'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// WebGL particle system - much more efficient than full 3D scene
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = 200;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Use brand colors
        const colors = ['#00e5ff', '#9945ff', '#ff3d81'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update(mouseX: number, mouseY: number) {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse influence (subtle attraction)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - distance) / 10000;
          this.speedX += Math.cos(angle) * force;
          this.speedY += Math.sin(angle) * force;
        }
        
        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Limit speed
        const maxSpeed = 1;
        const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (currentSpeed > maxSpeed) {
          this.speedX = (this.speedX / currentSpeed) * maxSpeed;
          this.speedY = (this.speedY / currentSpeed) * maxSpeed;
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mousePosition.x, mousePosition.y);
        particlesArray[i].draw(ctx);
      }
      
      // Connect close particles with lines
      connectParticles(ctx, particlesArray);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    function connectParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10"
      style={{ background: 'transparent' }}
    />
  );
};

// Interactive cursor effect
const CursorEffect = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <>
      <motion.div
        className="hidden md:block fixed w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="hidden md:block fixed w-4 h-4 rounded-full bg-accent-secondary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          scale: isClicking ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 28,
          mass: 0.3,
        }}
      />
    </>
  );
};

// Floating text animation for tech keywords
const FloatingTechKeywords = () => {
  const keywords = [
    { text: "React", x: "10%", y: "20%", delay: 0 },
    { text: "TypeScript", x: "85%", y: "25%", delay: 0.5 },
    { text: "JavaScript", x: "20%", y: "75%", delay: 1.2 },
    { text: "Next.js", x: "80%", y: "70%", delay: 0.3 },
    { text: "TailwindCSS", x: "15%", y: "45%", delay: 0.8 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {keywords.map((keyword, index) => (
        <motion.div
          key={index}
          className="absolute text-sm md:text-base font-mono text-white/30"
          style={{ left: keyword.x, top: keyword.y }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [0, -20, 0] 
          }}
          transition={{
            duration: 6,
            delay: keyword.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {keyword.text}
        </motion.div>
      ))}
    </div>
  );
};

// Animated glow effect for accents
const GlowingAccents = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      <motion.div
        className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full"
        style={{ 
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(0, 229, 255, 0) 70%)',
          filter: 'blur(40px)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div
        className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full"
        style={{ 
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.15) 0%, rgba(153, 69, 255, 0) 70%)',
          filter: 'blur(40px)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
    </div>
  );
};

export default function ProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading complete after a short delay
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-black" ref={containerRef}>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-50 z-5 noise-bg pointer-events-none"></div>
      
      {/* Performance-optimized background effects */}
      {isLoaded && (
        <>
          <ParticleBackground />
          <GlowingAccents />
          <FloatingTechKeywords />
          <CursorEffect />
        </>
      )}
      
      {/* Content wrapper with scroll effects */}
      <motion.div 
        className="relative h-full flex items-center z-30"
        style={{ opacity, y, scale }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text content column */}
            <div className="space-y-8">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative inline-block">
                  <motion.div
                    className="bg-gradient-to-r from-accent-tertiary via-accent to-accent-secondary py-2 px-5 rounded-lg text-sm font-mono backdrop-blur-md border border-white/10"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      front-end developer
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl font-bold">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block"
                  >
                    Alireza
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="multicolor-gradient glow-text"
                  >
                    Sadeghi
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-xl text-white/70 max-w-lg"
                >
                  Computer Engineering Student & Creative Front-End Developer building innovative web experiences with cutting-edge technologies.
                </motion.p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <Link 
                  href="#projects"
                  className="relative overflow-hidden group bg-gradient-to-r from-accent to-accent-secondary text-black font-medium py-3 px-8 rounded-lg flex items-center gap-2"
                >
                  <motion.span
                    animate={{ x: [0, 100, 0] }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop", 
                      ease: "linear" 
                    }}
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <span className="relative z-10">Explore Projects</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                <Link 
                  href="#contact"
                  className="border border-white/20 text-white hover:border-accent hover:text-accent font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Contact Me
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex items-center gap-4 text-white/50"
              >
                <span className="h-px w-8 bg-white/30"></span>
                <span className="text-sm">Scroll to discover</span>
              </motion.div>
            </div>
            
            {/* Hero image column with animated gradient border */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative hidden md:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden p-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary rounded-2xl animate-spin-slow" />
                  <div className="absolute inset-0.5 bg-black rounded-2xl backdrop-blur-xl" />
                </div>
                
                {/* Profile image */}
                <div className="absolute inset-2 rounded-xl overflow-hidden">
                  <Image 
                    src="/images/profile.jpg"
                    alt="Alireza Sadeghi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Tech stack badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg"
                >
                  <div className="flex gap-2">
                    {['react', 'nextjs', 'typescript'].map((tech, i) => (
                      <div 
                        key={tech}
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ 
                          backgroundColor: i === 0 ? 'rgba(97, 218, 251, 0.2)' : 
                                           i === 1 ? 'rgba(0, 0, 0, 0.2)' : 
                                                    'rgba(49, 120, 198, 0.2)',
                          borderColor: i === 0 ? 'rgba(97, 218, 251, 0.3)' : 
                                       i === 1 ? 'rgba(255, 255, 255, 0.3)' : 
                                                'rgba(49, 120, 198, 0.3)',
                          borderWidth: '1px'
                        }}
                      >
                        <span className="text-xs font-bold" style={{ 
                          color: i === 0 ? '#61DAFB' : 
                                 i === 1 ? '#FFFFFF' : 
                                          '#3178C6'
                        }}>
                          {tech.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" stroke="url(#paint0_linear)" strokeWidth="2"/>
            <path d="M20 12V26M20 26L26 20M20 26L14 20" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00E5FF"/>
                <stop offset="1" stopColor="#9945FF"/>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="20" y1="12" x2="20" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00E5FF"/>
                <stop offset="1" stopColor="#9945FF"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Loading indicator that fades out after content loads */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-t-2 border-accent"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add custom styles for the animated gradient border */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
} 