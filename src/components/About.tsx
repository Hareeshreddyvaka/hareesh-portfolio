import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe, Smartphone, Cloud } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', level: 85, icon: Code },
    { name: 'Backend Development', level: 75, icon: Database },
    { name: 'UI/UX Design', level: 70, icon: Palette },
    { name: 'Mobile Development (React Native)', level: 65, icon: Smartphone },
    { name: 'Cloud & DevOps (GCP, Docker)', level: 60, icon: Cloud },
    { name: 'Data Science & ML', level: 80, icon: Globe },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            I’m Vaka Hareesh Reddy — a Computer Science Engineer specializing in AI & Machine Learning at VIT Chennai.  
            I love solving problems, building web apps, and exploring the latest in AI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Story & Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Story */}
            <div className="bg-dark-300 rounded-2xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I’m passionate about technology and innovation, with a strong interest in Artificial Intelligence, Machine Learning,
                and Web Development. I enjoy turning ideas into reality through coding, research, and creative problem-solving.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Beyond coding, I like exploring new tech, experimenting with projects, and sharing knowledge with peers.
                I believe in continuous learning and applying skills to build impactful solutions.
              </p>
            </div>

            {/* Education */}
            <div className="bg-dark-300 rounded-2xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary-400">
                    B.Tech in Computer Science (AI & ML)
                  </h4>
                  <p className="text-gray-400">VIT Chennai • 2023 – Present</p>
                  <p className="text-gray-400">Current CGPA: 7.6 • Credits: 61.5</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400">High School (10th Grade)</h4>
                  <p className="text-gray-400">Completed in 2021 • Focus on Mathematics & Science</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Skills */}
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
