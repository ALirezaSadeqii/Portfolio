'use client';
import { motion } from 'framer-motion';

// Skill categories with their respective technologies
const skillCategories = [
  {
    name: 'Frontend Development',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML & CSS', level: 90 },
      { name: 'Front-End Development', level: 85 },
      { name: 'Web Development', level: 85 },
    ]
  },
  {
    name: 'Tools & Software',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    skills: [
      { name: 'ERP Software', level: 75 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma', level: 70 },
    ]
  },
  {
    name: 'Languages & Frameworks',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: [
      { name: 'English (C2 Advanced)', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'RESTful APIs', level: 75 },
      { name: 'Responsive Design', level: 90 },
      { name: 'TypeScript', level: 70 },
    ]
  }
];

// Tech stack for the interactive grid
const techStack = [
  { name: 'React.js', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', color: '#F7DF1E' },
  { name: 'HTML5', icon: '/icons/html5.svg', color: '#E34F26' },
  { name: 'CSS3', icon: '/icons/css3.svg', color: '#1572B6' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', color: '#06B6D4' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#FFFFFF' },
  { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
  { name: 'ERP Software', icon: '/icons/database.svg', color: '#4285F4' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
];

// SkillBar component for visualizing skill proficiency
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-accent-secondary">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

// TechIcon component for the interactive grid
function TechIcon({ name, delay }: { name: string; delay: number }) {
  const tech = techStack.find(t => t.name === name);
  if (!tech) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        transition: { duration: 0.2 }
      }}
      className="flex flex-col items-center justify-center glass-bg p-4 rounded-lg text-center aspect-square"
    >
      <div className="w-12 h-12 mb-3 mx-auto flex items-center justify-center">
        <div 
          className="relative w-10 h-10 rounded-full" 
          style={{ background: `radial-gradient(circle, ${tech.color}30 0%, transparent 70%)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Generic icon fallback */}
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect width="24" height="24" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
        </div>
      </div>
      <span className="font-medium text-sm">{tech.name}</span>
    </motion.div>
  );
}

export default function SkillsSection() {
  // Selection of skills for the grid display
  const displayedTech = [
    'React.js', 'JavaScript', 'HTML5', 
    'CSS3', 'Tailwind CSS', 'Next.js', 
    'Git', 'ERP Software', 'TypeScript'
  ];

  return (
    <section id="skills" className="py-24 min-h-screen bg-black noise-bg relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none"></div>
      
      {/* Glowing orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent-tertiary/5 blur-3xl"></div>
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
            My <span className="multicolor-gradient glow-text">Skills</span>
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
            Here are the technologies I work with and my proficiency level in each area
          </motion.p>
        </motion.div>

        {/* Skills Grid with proficiency bars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="glass-bg p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-accent">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skill.name} 
                    name={skill.name} 
                    level={skill.level} 
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Icons Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Technologies I <span className="text-gradient">Work With</span>
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {displayedTech.map((tech, index) => (
              <TechIcon key={tech} name={tech} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 