'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useRef } from 'react';
import { Environment, Float, OrbitControls, PerspectiveCamera, Stars, Text, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import FloatingModel from '@/components/FloatingModel';
import Link from 'next/link';

function Scene() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  // Positions for orbit models in a more interesting formation
  const orbitPositions = [
    [-4, 0, 0],
    [4, 1, -2],
    [0, -3, 2],
    [3, 3, -3],
    [-3, 2, 3],
    [2, -2, -4],
    [-2, -4, -1],
    [1, 4, 1]
  ];

  return (
    <group ref={groupRef}>
      {/* Center object - interactive glowing sphere */}
      <Float
        speed={3}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        position={[0, 0, 0]}
      >
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial 
            color="#000000" 
            emissive="#00e5ff" 
            emissiveIntensity={1} 
            metalness={0.9} 
            roughness={0.1} 
            toneMapped={false}
          />
        </mesh>
        
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[1.3, 32, 32]} />
          <meshBasicMaterial 
            color="#00e5ff" 
            transparent={true} 
            opacity={0.1} 
            toneMapped={false}
          />
        </mesh>
      </Float>

      {/* 3D floating text */}
      <Float
        position={[0, 0.5, -3]}
        rotation={[0, Math.PI, 0]}
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.2}
      >
        <Text
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          PORTFOLIO
        </Text>
      </Float>

      {/* Orbit models with various colors and properties */}
      {orbitPositions.map((position, index) => (
        <FloatingModel 
          key={index}
          position={position as [number, number, number]} 
          scale={0.5 + Math.random() * 0.4}
          distortSpeed={1 + Math.random() * 2}
          distortIntensity={0.2 + Math.random() * 0.3}
          color1={index % 3 === 0 ? '#00e5ff' : index % 3 === 1 ? '#9945ff' : '#ff3d81'}
          color2={index % 3 === 1 ? '#00e5ff' : index % 3 === 2 ? '#9945ff' : '#ff3d81'}
          color3={index % 3 === 2 ? '#00e5ff' : index % 3 === 0 ? '#9945ff' : '#ff3d81'}
        />
      ))}

      {/* Additional small floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          speed={3}
          rotationIntensity={10}
          floatIntensity={5}
        >
          <mesh scale={0.1 + Math.random() * 0.1}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color={
                i % 3 === 0 ? '#00e5ff' :
                i % 3 === 1 ? '#9945ff' : '#ff3d81'
              } 
              transparent
              opacity={0.7}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Tech symbols config for CSS-based floating elements
const techSymbols = [
  { text: "</>", color: "#00e5ff", size: "text-4xl", left: "10%", top: "20%", animationDelay: "0s" },
  { text: "{ }", color: "#9945ff", size: "text-5xl", right: "15%", top: "25%", animationDelay: "0.5s" },
  { text: "JS", color: "#f0db4f", size: "text-3xl", left: "20%", bottom: "30%", animationDelay: "1s" },
  { text: "⚛️", color: "#61dafb", size: "text-5xl", right: "20%", bottom: "20%", animationDelay: "1.5s" },
];

export default function ProjectsScene() {
  return (
    <section id="home" className="h-screen w-full relative noise-bg overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={5}
              fade
              speed={1}
            />
            <Environment preset="night" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Background diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
      
      {/* CSS-based floating tech symbols */}
      {techSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className={`absolute ${symbol.size} font-bold z-20 select-none pointer-events-none`}
          style={{
            color: symbol.color,
            left: symbol.left,
            right: symbol.right,
            top: symbol.top,
            bottom: symbol.bottom,
            textShadow: `0 0 15px ${symbol.color}`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 0.7, 
            y: [0, -15, 0],
            transition: {
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: parseFloat(symbol.animationDelay),
              },
              opacity: { duration: 1.5 }
            }
          }}
        >
          {symbol.text}
        </motion.div>
      ))}
      
      {/* Glowing lines */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"
          style={{ top: '30%' }}
          animate={{ 
            translateX: ['-100%', '100%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-accent-secondary to-transparent opacity-20"
          style={{ top: '65%' }}
          animate={{ 
            translateX: ['100%', '-100%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: 2
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 bg-accent/10 backdrop-blur-sm border border-accent/20 py-1 px-4 rounded-full"
            >
              <span className="text-accent text-sm font-medium">Frontend Developer & Computer Engineering Student</span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span>Hi, I'm</span>
                <span className="multicolor-gradient glow-text">Alireza Sadeghi</span>
              </div>
            </motion.h1>
            
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-8">
                I build modern web experiences with a focus on responsive design, 
                interactive animations, and clean code.
              </p>
              
              {/* Call to action buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#projects"
                  className="button-glow bg-accent hover:bg-accent/90 text-black font-medium py-3 px-8 rounded-lg flex items-center gap-2 transition-all duration-300 group"
                >
                  View Projects
                  <motion.svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </Link>
                
                <Link 
                  href="#contact"
                  className="bg-transparent border border-white/20 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-white/50 text-sm mb-2">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L12 18L17 13" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
} 