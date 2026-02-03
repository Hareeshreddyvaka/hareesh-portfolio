import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, PhoneCall, MapPin } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { socialLinks } from '../data/socials';

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service is not configured. Please try again later.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      toast.success('Message sent! I will get back within 24 hours.');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_60%)]" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop stopColor="rgba(14,165,233,0.45)" offset="0%" />
              <stop stopColor="rgba(99,102,241,0.45)" offset="100%" />
            </linearGradient>
          </defs>
          <pattern id="pattern-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#grid)" strokeWidth="1" opacity="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-grid)" />
        </svg>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <SectionHeading
          eyebrow="Contact"
          title="Let us build something intelligent"
          description="Reach out for collaborations, internships, research ideas, or full-time opportunities. Based in Chennai, working globally."
        />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/80 p-8 shadow-xl shadow-primary-500/20 backdrop-blur dark:bg-slate-900/70"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Name</span>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your name"
                  required
                  className="rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:bg-slate-800/80 dark:text-slate-100"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Email</span>
                <input
                  type="email"
                  name="user_email"
                  placeholder="your@email.com"
                  required
                  className="rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:bg-slate-800/80 dark:text-slate-100"
                />
              </label>
            </div>
            <label className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="Let us collaborate on..."
                className="rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:bg-slate-800/80 dark:text-slate-100"
              />
            </label>
            <label className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-200">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me more about your idea, challenge, or opportunity."
                required
                className="rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:bg-slate-800/80 dark:text-slate-100"
              />
            </label>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-300">
                I typically respond within one business day. Your details stay private.
              </p>
              <motion.button
                type="submit"
                className="interactive flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:shadow-primary-500/60 disabled:cursor-not-allowed disabled:opacity-60"
                whileTap={{ scale: 0.96 }}
                disabled={isSubmitting}
              >
                <Send size={16} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </div>
          </motion.form>
          <motion.div
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-cyan-400/10 p-8 shadow-xl shadow-primary-500/20 backdrop-blur dark:bg-slate-900/60"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Let us connect</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Available for full-time roles, research collaborations, consulting, and speaking engagements.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/60 p-4 dark:bg-slate-900/70">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <MapPin size={18} className="text-primary-500" />
                Chennai, Tamil Nadu, India
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <PhoneCall size={18} className="text-primary-500" />
                +91-83096-28645
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name === 'Email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="interactive flex items-center justify-between rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 dark:bg-slate-900/80 dark:text-slate-100"
                >
                  <span>{social.name}</span>
                  <span className="text-xs font-medium text-primary-500 dark:text-primary-300">{social.handle}</span>
                </a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

