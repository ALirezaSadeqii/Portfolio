'use client';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useRef } from 'react';

// Alireza's actual GitHub projects
const projects = [
  {
    id: 1,
    title: 'Scroll-Parallax-Website',
    description: 'A website featuring smooth parallax scrolling effects, demonstrating advanced CSS animations and responsive design principles.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Parallax'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?parallax',
    githubUrl: 'https://github.com/ALirezaSadeqii/Scroll-Parallax-Website',
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Interactive weather application that provides real-time forecasts using geolocation. Allows users to check weather conditions for any location.',
    tags: ['JavaScript', 'API', 'CSS', 'Responsive'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?weather',
    githubUrl: 'https://github.com/ALirezaSadeqii/weatherApp',
  },
  {
    id: 3,
    title: 'Three.js Project',
    description: 'Exploration of 3D graphics programming using Three.js, creating interactive 3D scenes and animations for web applications.',
    tags: ['Three.js', 'JavaScript', '3D', 'WebGL'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?3d',
    githubUrl: 'https://github.com/ALirezaSadeqii/Threejs',
  },
  {
    id: 4,
    title: 'React Base Weather App',
    description: 'Weather application built with React, demonstrating component-based architecture and API integration in a React environment.',
    tags: ['React', 'API', 'JavaScript', 'Hooks'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?react',
    githubUrl: 'https://github.com/ALirezaSadeqii/reactBaseWeatherApp',
  },
  {
    id: 5,
    title: 'Movies Project',
    description: 'Interactive movie database application showcasing details about films, actors, and ratings. Features filtering and search functionality.',
    tags: ['JavaScript', 'API', 'CSS', 'Responsive'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?movies',
    githubUrl: 'https://github.com/ALirezaSadeqii/movies',
  },
  {
    id: 6,
    title: 'Album Project',
    description: 'Digital album application for organizing and displaying photo collections with smooth transitions and filtering options.',
    tags: ['JavaScript', 'CSS', 'Gallery', 'Responsive'],
    imageUrl: 'https://source.unsplash.com/random/600x400/?album',
    githubUrl: 'https://github.com/ALirezaSadeqii/album',
  },
];

export default function ProjectsList() {
  const containerRef = useRef<HTMLDivElement>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 min-h-screen bg-black noise-bg relative"
      ref={containerRef}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none"></div>
      
      {/* Glowing orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent-secondary/5 blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-80 h-80 rounded-full bg-accent-tertiary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 inline-block"
            whileInView={{ 
              y: [0, -10, 0],
              transition: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            }}
            viewport={{ once: true }}
          >
            <span className="multicolor-gradient glow-text">GitHub</span> Projects
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "150px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-0.5 bg-accent mx-auto my-6"
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Browse through my recent projects. Each project showcases different skills and technologies I've worked with.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 