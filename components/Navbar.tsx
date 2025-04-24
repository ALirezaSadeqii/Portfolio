'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Projects', href: '/' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">Alireza Sadeghi</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`relative py-2 group ${
                pathname === link.href ? 'text-accent' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.title}
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-bottom scale-x-0 transition-transform duration-300 ${
                  pathname === link.href ? 'bg-accent scale-x-100' : 'bg-white group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <button className="text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar; 