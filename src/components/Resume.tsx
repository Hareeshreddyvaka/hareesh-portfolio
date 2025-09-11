import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Award, GraduationCap, Code } from 'lucide-react';

const Resume = () => {
  const education = [
    {
      degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
      school: 'Vellore Institute of Technology, Chennai',
      period: '2023 – Present',
      details:
        'Currently in 4th semester with a CGPA of 7.6 and 61.5 credits earned. Specialized coursework in Artificial Intelligence, Machine Learning, and Computer Science fundamentals.',
    },
    {
      degree: 'Higher Secondary Education (12th)',
      school: '—',
      period: 'Completed 2023',
      details: 'Focused on Mathematics, Physics, and Computer Science.',
    },
    {
      degree: 'Secondary Education (10th)',
      school: '—',
      period: 'Completed 2021',
      details: 'Strong foundation in core sciences and mathematics.',
    },
  ];

  const achievements = [
    {
      title: 'Naive Bayes Classifier Project',
      organization: 'Academic Project',
      year: '2025',
    },
    {
      title: 'Car Rental Customer Feedback Analyzer',
      organization: 'GENAI Project with IBM Watsonx.ai',
      year: '2025',
    },
    {
      title: 'SVM Classifier Implementation',
      organization: 'Academic Project',
      year: '2025',
    },
    {
      title: 'Earthquake & Flood Prediction',
      organization: 'Research Project',
      year: '2025',
    },
  ];

  const skills = [
    'C', 'C++', 'Java', 'Python',
    'HTML', 'CSS', 'JavaScript', 'React.js',
    'SQL', 'R', 'Node.js', 'Flask', 'FastAPI',
    'Git', 'Docker', 'Google Cloud',
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
            Download my complete resume or explore my academic journey, achievements, and skills
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/resume.pdf" // place your resume file inside public/
              download
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Download size={18} />
              Download Resume
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary-500 text-primary-400 rounded-full font-semibold hover:bg-primary-500/10 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Eye size={18} />
              View Online
            </motion.a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-secondary-500/20 rounded-lg">
                <GraduationCap size={24} className="text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-300 rounded-xl p-6 border border-secondary-500/20 hover:border-secondary-500/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
                      <p className="text-secondary-400 font-semibold">{edu.school}</p>
                    </div>
                    <span className="bg-secondary-500/20 text-secondary-400 px-3 py-1 rounded-full text-sm font-medium">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{edu.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Award size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Projects & Achievements</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((a, index) => (
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
                        <h4 className="font-bold text-white">{a.title}</h4>
                        <p className="text-yellow-400 text-sm">{a.organization}</p>
                      </div>
                      <span className="text-gray-400 font-semibold">{a.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <Code size={24} className="text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
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
