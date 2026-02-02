import { SectionHeading } from '../components/ui/SectionHeading';
import { achievements } from '../data/achievements';
import { AchievementCard } from '../components/ui/AchievementCard';

const AchievementsSection: React.FC = () => (
  <section id="achievements" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.15),transparent_60%)]" />
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
      <SectionHeading
        eyebrow="Achievements"
        title="Validated impact & certifications"
        description="Recognition from industry leaders and academia underpinning the craft."
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement, index) => (
          <AchievementCard key={`${achievement.title}-${achievement.year}`} achievement={achievement} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default AchievementsSection;

