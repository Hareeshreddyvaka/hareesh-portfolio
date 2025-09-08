import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe, Smartphone, Cloud } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', level: 90, icon: Code },
    { name: 'Backend Development', level: 85, icon: Database },
    { name: 'UI/UX Design', level: 80, icon: Palette },
    { name: 'Mobile Development', level: 75, icon: Smartphone },
    { name: 'Cloud & DevOps', level: 70, icon: Cloud },
    { name: 'Web Performance', level: 88, icon: Globe },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate developer with 5+ years of experience creating digital solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-dark-300 rounded-2xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer with a keen eye for design and a love for creating 
                seamless user experiences. With over 5 years in the industry, I've had the privilege of 
                working with startups and established companies to bring their digital visions to life.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                projects, or sharing my knowledge through blog posts and mentoring junior developers.
              </p>
            </div>

            <div className="bg-dark-300 rounded-2xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary-400">Bachelor of Computer Science</h4>
                  <p className="text-gray-400">University of Technology • 2018-2022</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400">Full Stack Web Development</h4>
                  <p className="text-gray-400">Tech Bootcamp • 2022</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Skills & Expertise</h3>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-dark-300 rounded-xl p-6 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <skill.icon size={20} className="text-primary-400" />
                    </div>
                    <span className="font-semibold text-white">{skill.name}</span>
                  </div>
                  <span className="text-primary-400 font-semibold">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;