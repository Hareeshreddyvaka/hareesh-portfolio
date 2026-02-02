import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { skillCategories } from '../data/skills';
import { SkillCategoryCard } from '../components/ui/SkillCategoryCard';

const SkillsSection: React.FC = () => (
  <section id="skills" className="section-padding relative overflow-hidden bg-surface-dark">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-900/20 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20">
      <SectionHeading
        eyebrow="Skills"
        title="A full-stack of intelligence"
        description="Pragmatic mastery across languages, frameworks, and tooling to ideate, build, deploy, and iterate on machine learning experiences end-to-end."
      />
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:gap-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {skillCategories.map((category) => (
          <SkillCategoryCard key={category.title} category={category} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;

