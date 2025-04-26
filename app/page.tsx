import ProjectsScene from '@/sections/ProjectsScene';
import ProjectsList from '@/sections/ProjectsList';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <ProjectsScene />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsList />
      <ContactSection />
    </>
  );
}
