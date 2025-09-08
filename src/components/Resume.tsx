import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Award, Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and implemented CI/CD pipelines.',
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Built responsive web applications with React and TypeScript. Collaborated with design team to create pixel-perfect user interfaces.',
    },
    {
      title: 'Junior Web Developer',
      company: 'WebSolutions Ltd.',
      period: '2019 - 2020',
      description: 'Developed and maintained WordPress websites and custom web applications. Gained experience in PHP, MySQL, and JavaScript.',
    },
  ];

  const achievements = [
    {
      title: 'AWS Certified Developer',
      organization: 'Amazon Web Services',
      year: '2023',
    },
    {
      title: 'React Developer Certification',
      organization: 'Meta',
      year: '2022',
    },
    {
      title: 'Best Innovation Award',
      organization: 'TechCorp Inc.',
      year: '2023',
    },
  ];

  return (
    <section id="resume" className="py-20 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Download my complete resume or view my professional journey below
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Download size={18} />
              Download Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary-500 text-primary-400 rounded-full font-semibold hover:bg-primary-500/10 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Eye size={18} />
              View Online
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <Briefcase size={24} className="text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-300 rounded-xl p-6 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-lg">{job.title}</h4>
                      <p className="text-primary-400 font-semibold">{job.company}</p>
                    </div>
                    <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-secondary-500/20 rounded-lg">
                  <GraduationCap size={24} className="text-secondary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              
              <div className="bg-dark-300 rounded-xl p-6 border border-secondary-500/20">
                <h4 className="font-bold text-white text-lg mb-2">Bachelor of Computer Science</h4>
                <p className="text-secondary-400 font-semibold mb-2">University of Technology</p>
                <p className="text-gray-400">2018 - 2022 • GPA: 3.8/4.0</p>
                <p className="text-gray-400 mt-3">
                  Specialized in Software Engineering and Web Technologies. 
                  Graduated Magna Cum Laude with honors.
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Award size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-dark-300 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <p className="text-yellow-400 text-sm">{achievement.organization}</p>
                      </div>
                      <span className="text-gray-400 font-semibold">{achievement.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;