'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useRef } from 'react';
import { Environment, Float, OrbitControls, PerspectiveCamera, Stars, Text, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import FloatingModel from '@/components/FloatingModel';

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
              count={3000}
              factor={4}
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
      
      {/* Large circular rings using CSS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div 
          className="absolute rounded-full border-2 border-accent/30"
          style={{ 
            width: '600px', 
            height: '600px', 
            left: 'calc(50% - 300px)',
            top: 'calc(50% - 300px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.5, 
            scale: 1,
            rotate: 360,
            transition: {
              rotate: {
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              },
              opacity: { duration: 1.5 }
            }
          }}
        />
        
        <motion.div 
          className="absolute rounded-full border border-accent-secondary/20"
          style={{ 
            width: '800px', 
            height: '800px', 
            left: 'calc(50% - 400px)',
            top: 'calc(50% - 400px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.3, 
            scale: 1,
            rotate: -360,
            transition: {
              rotate: {
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              },
              opacity: { duration: 1.5 }
            }
          }}
        />
      </div>
      
      {/* Light beams using CSS */}
      <motion.div 
        className="absolute h-[300px] w-[3px] bg-accent/30 blur-[2px] rounded-full z-10 pointer-events-none"
        style={{ 
          left: '30%', 
          top: '20%',
          transformOrigin: 'center bottom',
          transform: 'rotate(25deg)',
        }}
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.7, 0.3], 
          scaleY: [1, 1.2, 1],
          transition: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }
        }}
      />
      
      <motion.div 
        className="absolute h-[400px] w-[3px] bg-accent-tertiary/30 blur-[2px] rounded-full z-10 pointer-events-none"
        style={{ 
          right: '25%', 
          bottom: '10%',
          transformOrigin: 'center bottom',
          transform: 'rotate(-35deg)',
        }}
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3], 
          scaleY: [1, 1.1, 1],
          transition: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }
        }}
      />

      {/* Overlay with content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-30">
        <div className="container mx-auto h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold"
          >
            <span className="multicolor-gradient glow-text">Alireza Sadeghi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mt-6"
          >
            Computer Engineering Student | Front-End Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <a
              href="#projects"
              className="button-glow bg-accent hover:bg-accent/90 text-black font-medium py-4 px-10 rounded-full flex items-center gap-2 transition-colors animated-border"
            >
              Explore Projects
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 