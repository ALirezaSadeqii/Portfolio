'use client';
import { motion } from 'framer-motion';

// Experience data
const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Birleşik Yazılım',
    period: 'Aug 2022 - Present · 2 yrs 9 mos',
    description: 'Currently thriving at Birlesik Yazilim where I wear multiple hats – from spearheading website development to conquering internship milestones. Expertly navigating the realm of BI reports, ticket resolutions, and beyond. Passionately bridging classroom knowledge with real-world applications.',
    skills: ['Web Development', 'Front-End Development', 'JavaScript', 'React.js'],
    color: '#00e5ff',
  },
  {
    title: 'Software Developer',
    company: 'Planrota',
    period: 'Jul 2024 - Present · 10 mos',
    description: 'Working as a part-time Software Developer remotely for Planrota based in Estonia.',
    skills: ['JavaScript', 'React.js', 'Front-End Development'],
    color: '#9945ff',
  }
];

// Education data
const education = [
  {
    degree: 'Bachelor\'s degree, Computer Engineering',
    institution: 'İstanbul Aydin University',
    period: 'Sep 2023 - Present',
    description: 'I am thrilled to announce that I have embarked on a new educational journey as I begin my bachelor\'s degree at Istanbul Aydin University. 🌟',
    color: '#9945ff',
  },
  {
    degree: 'Associate\'s degree, Computer Programming',
    institution: 'İstanbul Aydin University',
    period: 'Sep 2021 - Jun 2023',
    description: 'I have recently completed my Associate Degree in computer programming at Aydin University, GPA of 3.49.',
    color: '#00e5ff',
  }
];

// Certifications
const certifications = [
  {
    title: 'React Basics',
    issuer: 'Meta',
    date: 'Apr 2024',
    credentialId: 'VWSJRTUM8QR5',
    color: '#00e5ff',
  },
  {
    title: 'Test of English as a Foreign Language',
    issuer: 'EFSET English Certificate',
    date: 'Sep 2023',
    description: '73/100 (C2 advanced)',
    color: '#9945ff',
  }
];

// Timeline Item component
function TimelineItem({ 
  title, 
  subtitle, 
  period, 
  description, 
  skills, 
  color, 
  index, 
  isLast = false
}: { 
  title: string; 
  subtitle: string; 
  period: string; 
  description: string; 
  skills?: string[]; 
  color: string;
  index: number;
  isLast?: boolean;
}) {
  return (
    <div className="relative pl-8 mb-10">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-3 bottom-0 w-px bg-white/20" />
      )}
      
      {/* Timeline dot */}
      <motion.div 
        className="absolute left-0 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: color, backgroundColor: `${color}20` }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      </motion.div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold">
            {title}
          </h3>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10">
            {period}
          </span>
        </div>
        
        <h4 className="text-lg text-accent mb-3">{subtitle}</h4>
        
        <p className="text-white/70 mb-4">{description}</p>
        
        {skills && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="text-xs bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 min-h-screen bg-black noise-bg relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none"></div>
      
      {/* Glowing orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent-secondary/5 blur-3xl"></div>
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
            My <span className="multicolor-gradient glow-text">Experience</span>
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
            My professional journey in web development and design
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-bg p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Work Experience
            </h3>
            
            <div className="relative">
              {experiences.map((experience, index) => (
                <TimelineItem
                  key={experience.company + experience.title}
                  title={experience.title}
                  subtitle={experience.company}
                  period={experience.period}
                  description={experience.description}
                  skills={experience.skills}
                  color={experience.color}
                  index={index}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Education & Achievements */}
          <div className="space-y-10">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-bg p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education
              </h3>
              
              <div className="relative">
                {education.map((edu, index) => (
                  <TimelineItem
                    key={edu.degree}
                    title={edu.degree}
                    subtitle={edu.institution}
                    period={edu.period}
                    description={edu.description}
                    color={edu.color}
                    index={index}
                    isLast={index === education.length - 1}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-bg p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Projects & Achievements
              </h3>
              
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent">•</span>
                  <span>Created responsive parallax scrolling websites with advanced CSS animations</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent">•</span>
                  <span>Developed interactive weather applications with real-time forecasts using APIs</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent">•</span>
                  <span>Built 3D web experiences using Three.js and WebGL technologies</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent">•</span>
                  <span>Designed and implemented interactive movie database applications with filtering capabilities</span>
                </motion.li>
              </ul>
            </motion.div>
            
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="glass-bg p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Licenses & Certifications
              </h3>
              
              <ul className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.li 
                    key={cert.title}
                    className="border-l-2 pl-4 py-1"
                    style={{ borderColor: cert.color }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-bold text-lg mb-1">{cert.title}</h4>
                    <p className="text-white/70 mb-1">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <span className="bg-white/5 px-2 py-1 rounded">{cert.date}</span>
                      {cert.credentialId && (
                        <span className="text-xs text-white/50">Credential ID: {cert.credentialId}</span>
                      )}
                      {cert.description && (
                        <span className="text-accent">{cert.description}</span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 