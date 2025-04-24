'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-white/80">
          Name
        </label>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg glass-bg bg-black/50 border border-white/10 focus:border-accent outline-none transition-all duration-300 placeholder-white/30"
            placeholder="Your name"
          />
        </motion.div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-white/80">
          Email
        </label>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg glass-bg bg-black/50 border border-white/10 focus:border-accent outline-none transition-all duration-300 placeholder-white/30"
            placeholder="your.email@example.com"
          />
        </motion.div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-white/80">
          Message
        </label>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg glass-bg bg-black/50 border border-white/10 focus:border-accent outline-none transition-all duration-300 placeholder-white/30"
            placeholder="Write your message here..."
          ></textarea>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full button-glow py-3 rounded-lg bg-black border border-accent/50 text-white relative overflow-hidden group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 font-medium">
            {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-accent-tertiary via-accent to-accent-secondary opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
        </motion.button>
      </motion.div>
      
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-accent/10 border border-accent/30 text-accent text-center"
        >
          Thanks for your message! I'll get back to you soon.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-center"
        >
          Sorry, there was an error sending your message. Please try again.
        </motion.div>
      )}
    </form>
  );
} 