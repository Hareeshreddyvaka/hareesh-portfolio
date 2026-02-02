import { motion } from 'framer-motion';
import profileImage from '../assets/profile.svg';
import { SectionHeading } from '../components/ui/SectionHeading';



const AboutSection: React.FC = () => (
  <section id="about" className="section-padding relative overflow-hidden bg-surface-dark">
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-900/20 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row items-center">
      <motion.div
        className="flex flex-1 flex-col gap-10"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          eyebrow="About"
          title="Engineer. Researcher. Builder."
          description="I architect intelligent products that are intentional, inclusive, and production-ready. Blending AI research rigor with full stack pragmatism, I build experiences that feel human and decisions that are data-backed."
          align="left"
        />
        <div className="grid gap-6">
          <div className="glass-panel p-8 rounded-3xl text-slate-400 leading-relaxed">
            <p>
              My academic journey at <span className="font-semibold text-primary-400">VIT Chennai</span>{' '}
              has been rooted in the intersection of AI and human-centric design. From deploying IBM watsonx.ai pipelines for
              customer insight to visualising deep learning internals with interactive canvases, I thrive on reducing technical
              complexity into actionable impact.
            </p>

          </div>


        </div>
      </motion.div>

      <motion.div
        className="relative flex flex-1 items-center justify-center"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative w-full max-w-md group">
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-cyan-400/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-surface-dark shadow-2xl">
            <motion.img
              src={profileImage}
              alt="Portrait of Vaka Hareesh Reddy"
              className="w-full grayscale hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface-dark via-surface-dark/90 to-transparent">
              <div className="glass-panel p-4 rounded-2xl border border-white/10">
                <p className="text-sm font-semibold text-white">AI & ML Research Focus</p>
                <p className="mt-1 text-xs text-slate-400">
                  Specialising in trustworthy ML, generative AI pipelines, and data storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;

