'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 min-h-screen bg-black noise-bg relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none"></div>
      
      {/* Glowing orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-accent-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 inline-block"
            whileInView={{ 
              y: [0, -10, 0],
              transition: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            }}
            viewport={{ once: true }}
          >
            About <span className="multicolor-gradient glow-text">Me</span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "150px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-0.5 bg-accent mx-auto my-6"
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with animated border */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto lg:ml-auto w-full max-w-md aspect-square"
          >
            <div className="animated-border glass-bg w-full h-full rounded-2xl p-3">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image 
                  src="/images/projects/pic.jpg" 
                  alt="Alireza Sadeghi" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div 
              className="absolute -top-5 -right-5 bg-black/80 backdrop-blur-md border border-accent/20 rounded-full py-2 px-4 text-accent font-medium"
              whileInView={{ 
                y: [0, -10, 0],
                transition: { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
              }}
              viewport={{ once: true }}
            >
              Front-End Developer
            </motion.div>

            <motion.div 
              className="absolute -bottom-5 -left-5 bg-black/80 backdrop-blur-md border border-accent-secondary/20 rounded-full py-2 px-4 text-accent-secondary font-medium"
              whileInView={{ 
                y: [0, 10, 0],
                transition: { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.5 }
              }}
              viewport={{ once: true }}
            >
              React Specialist
            </motion.div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Hello! I'm <span className="text-gradient">Alireza Sadeghi</span>
            </h3>
            
            <p className="text-white/70 leading-relaxed">
              I'm a Computer Engineering Student and Front-End Developer based in Istanbul, Turkey.
              Currently working as a Frontend Developer at Birleşik Yazılım and as a Software Developer at Planrota.
            </p>

            <p className="text-white/70 leading-relaxed">
              Experienced software developer with a passion for innovation and a proven track record of delivering efficient solutions. 
              Adept at collaborative problem-solving and staying up-to-date with the latest technologies. 
              Committed to excellence, I thrive in fast-paced environments and value open communication.
            </p>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white">alirezasadeghi2300@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent-secondary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white">Istanbul, Turkey</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <Link
                href="/resume.pdf"
                target="_blank" 
                className="button-glow bg-accent hover:bg-accent/90 text-black font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </Link>
              
              <Link
                href="https://github.com/ALirezaSadeqii/"
                target="_blank"
                className="button-glow bg-transparent border border-accent/50 text-white hover:bg-accent/10 font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 