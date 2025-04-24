'use client';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture, Float, Sphere, useTexture } from '@react-three/drei';
import { Mesh, Color, Vector3 } from 'three';
import * as THREE from 'three';

interface FloatingModelProps {
  position: [number, number, number];
  scale?: number;
  distortSpeed?: number;
  distortIntensity?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  glowIntensity?: number;
  rotationFactor?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export default function FloatingModel({ 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1,
  distortSpeed = 2,
  distortIntensity = 0.3,
  color1 = '#00e5ff',
  color2 = '#9945ff',
  color3 = '#ff3d81',
  glowIntensity = 0.15,
  rotationFactor = 1,
  onClick,
  interactive = true
}: FloatingModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const positionVector = useMemo(() => new Vector3(...position), [position]);
  
  const color1Obj = useMemo(() => new Color(color1), [color1]);
  const color2Obj = useMemo(() => new Color(color2), [color2]);
  const color3Obj = useMemo(() => new Color(color3), [color3]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Apply subtle distortion animation
      const time = clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.3 * rotationFactor;
      meshRef.current.rotation.y = Math.sin(time / 2) * 0.2 * rotationFactor;
      
      // Pulse the scale slightly with more intensity when hovered
      const hoverFactor = hovered ? 0.12 : 0.05;
      const pulseSpeed = hovered ? 3 : 2;
      const pulse = 1 + Math.sin(time * pulseSpeed) * hoverFactor;
      meshRef.current.scale.setScalar(scale * pulse);
      
      // If hovered, emit more particles or increase glow
      if (meshRef.current.material && 'distort' in (meshRef.current.material as any)) {
        (meshRef.current.material as any).distort = hovered ? 
          distortIntensity * 1.5 : 
          distortIntensity + Math.sin(time * 2) * 0.05;
      }
    }
  });

  const geometry = useMemo(() => {
    // Randomly select one of three geometries
    const random = Math.random();
    if (random < 0.33) {
      return <dodecahedronGeometry args={[1.5, 2]} />; // More detailed dodecahedron
    } else if (random < 0.66) {
      return <icosahedronGeometry args={[1.5, 2]} />; // Icosahedron (20-sided)
    } else {
      return <octahedronGeometry args={[1.5, 2]} />; // Octahedron (8-sided)
    }
  }, []);

  const handlePointerOver = () => {
    if (interactive) {
      setHovered(true);
      document.body.style.cursor = onClick ? 'pointer' : 'grab';
    }
  };

  const handlePointerOut = () => {
    if (interactive) {
      setHovered(false);
      document.body.style.cursor = 'default';
    }
  };

  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  // Create a custom noise texture for the material
  const noiseTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const value = Math.random() * 255;
        context.fillStyle = `rgb(${value},${value},${value})`;
        context.fillRect(x, y, 1, 1);
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={hovered ? 0.8 : 0.5} 
      floatIntensity={hovered ? 0.8 : 0.5}
      position={positionVector}
    >
      <mesh 
        ref={meshRef} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {geometry}
        <MeshDistortMaterial 
          distort={distortIntensity} 
          speed={distortSpeed}
          roughness={0.2}
          metalness={0.8}
          toneMapped={false}
          wireframe={Math.random() > 0.7} // 30% chance to be wireframe
          bumpMap={noiseTexture}
          bumpScale={0.05}
          envMapIntensity={hovered ? 1.2 : 0.8}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={[color1, color2, color3]}
            size={1024}
          />
        </MeshDistortMaterial>
      </mesh>

      {/* Add a glowing halo effect */}
      <Sphere args={[1.7, 32, 32]} scale={scale * (hovered ? 1.15 : 1.05)}>
        <meshBasicMaterial
          color={color1}
          transparent
          opacity={hovered ? glowIntensity * 1.5 : glowIntensity}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Add a secondary glow for more depth */}
      <Sphere args={[1.9, 16, 16]} scale={scale * (hovered ? 1.25 : 1.15)}>
        <meshBasicMaterial
          color={color2}
          transparent
          opacity={hovered ? glowIntensity * 0.8 : glowIntensity * 0.5}
          toneMapped={false}
        />
      </Sphere>
    </Float>
  );
} 