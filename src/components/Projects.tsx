import React from 'react';
import { motion, easeOut } from 'framer-motion'; // ✅ import easeOut properly
import { ExternalLink, Github, Play } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Car Rental Customer Feedback Analyzer',
      description:
        'A GenAI-powered project using IBM watsonx.ai to analyze customer reviews and feedback for car rental services. Provides sentiment analysis, keyword extraction, and actionable insights.',
      image:
        'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['IBM Watsonx.ai', 'Python', 'NLP', 'Flask'],
      demoLink: '#',
      githubLink: '#',
      featured: true,
    },
    {
      title: 'Naive Bayes Classifier Suite',
      description:
        'Implemented Naive Bayes models for categorical, Gaussian, multinomial, and Bernoulli features. Evaluated using confusion matrix, ROC, AUC, precision, recall, and F1-score.',
      image:
        'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Scikit-learn', 'Matplotlib', 'Pandas'],
      demoLink: '#',
      githubLink: '#',
      featured: false,
    },
    {
      title: 'SVM Classifier (Binary & Multi-Class)',
      description:
        'Built SVM classifiers with different kernels (linear, RBF, polynomial) for binary and multi-class datasets. Compared performance with confusion matrices and ROC curves.',
      image:
        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Scikit-learn', 'NumPy', 'Matplotlib'],
      demoLink: '#',
      githubLink: '#',
      featured: false,
    },
    {
      title: 'Earthquake & Flood Prediction (Multimodal Deep Learning)',
      description:
        'Research project using multimodal deep learning models for natural disaster prediction by combining geospatial, environmental, and sensor data.',
      image:
        'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Deep Learning', 'TensorFlow', 'Keras', 'Python'],
      demoLink: '#',
      githubLink: '#',
      featured: true,
    },
    {
      title: 'Chain Restaurant Web App',
      description:
        'A responsive web app for a chain restaurant with menu browsing, order placement, and location-based search functionality.',
      image:
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      demoLink: '#',
      githubLink: '#',
      featured: false,
    },
    {
      title: 'Personal AI Assistant (I su)',
      description:
        'An ongoing mobile app project for creating a personal AI agent capable of calls, messages, search, and location services using AI/ML integration.',
      image:
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Kotlin', 'Android', 'AI/ML'],
      demoLink: '#',
      githubLink: '#',
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, // ✅ fixed
    },
  };

  return (
    <section id="projects" className="py-20 bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my academic and personal projects in AI, ML, and full-stack development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`bg-dark-200 rounded-2xl overflow-hidden border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.demoLink}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors duration-300"
                  >
                    <Play size={16} />
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                  >
                    <Github size={16} />
                  </motion.a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.demoLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 text-sm font-medium"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    <Github size={14} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
