'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Mesh, TextureLoader } from 'three';

export default function Earth3D({ scale = 2.5 }) {
  const earthRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [textures, setTextures] = useState<any>({
    map: null,
    bumpMap: null,
    specularMap: null,
    cloudsMap: null,
  });

  useEffect(() => {
    const loader = new TextureLoader();
    // Using NASA textures that we would download in a real implementation
    // For the demo we'll use colors instead
    setTextures({
      map: null,
      bumpMap: null,
      specularMap: null,
      cloudsMap: null,
    });
  }, []);

  useFrame((state, delta) => {
    if (earthRef.current) {
      // Slow rotation of the earth
      earthRef.current.rotation.y += delta * (hovered ? 0.5 : 0.2);
    }
  });

  return (
    <group>
      {/* Earth mesh */}
      <Sphere 
        ref={earthRef} 
        args={[1, 64, 64]} 
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color="#1E40AF"
          emissive="#1E3A8A"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>
      
      {/* Atmosphere */}
      <Sphere args={[1.01, 64, 64]} scale={scale}>
        <meshPhongMaterial 
          color="#60A5FA"
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
} 