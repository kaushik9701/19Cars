import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Auto-dismiss success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundPosition: '100% 0',
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4 py-12 flex flex-col w-full mx-auto relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-900/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-900/20 rounded-full filter blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl animate-pulse-slowest"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-white/[0.03]"></div>
      
      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-float-1"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-float-2"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float-3"></div>
      <div className="absolute bottom-1/4 right-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-4"></div>

      <div className="max-w-4xl mx-auto w-full">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            className="text-xl text-indigo-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Reach out to us directly and we'll get back to you promptly
          </motion.p>
        </motion.div>

        {/* Admin Info */}
        <motion.div 
          className="mb-12 p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-5 pb-2 border-b border-gray-700 text-indigo-200">Admin Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Name</p>
                    <p className="text-lg">Koushik Govula</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Phone</p>
                    <p className="text-lg">+1 (314) 537-7376</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Email</p>
                    <p className="text-lg">admin@19Cars.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center">
              <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <p className="text-lg text-indigo-100 italic mb-4">
                  "We come to you — just fill out the form and we'll bring the cars to your doorstep for a personalized experience."
                </p>
                <div className="flex items-center mt-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-full mr-3">
                    <div className="bg-gray-800 rounded-full p-1">
                      <div className="bg-gray-200 border-2 border-white w-12 h-12 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">Koushik</p>
                    <p className="text-sm text-gray-400">Sales Director/CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {submitted && (
          <motion.div 
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-700/80 to-emerald-800/80 backdrop-blur-sm shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg font-medium">Thank you for your inquiry! We'll get back to you soon.</p>
              </div>
              <button 
                className="ml-4 text-green-300 hover:text-white transition-colors"
                onClick={() => setSubmitted(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Inquiry Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block mb-2 font-medium text-indigo-200">Name</label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                className={`w-full rounded-xl bg-gray-800/50 border ${activeField === 'name' ? 'border-indigo-500' : 'border-gray-700'} px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                placeholder="Your full name"
              />
              {activeField === 'name' && (
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block mb-2 font-medium text-indigo-200">Email</label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className={`w-full rounded-xl bg-gray-800/50 border ${activeField === 'email' ? 'border-indigo-500' : 'border-gray-700'} px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                placeholder="you@example.com"
              />
              {activeField === 'email' && (
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="block mb-2 font-medium text-indigo-200">Phone Number</label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setActiveField('phone')}
                onBlur={() => setActiveField(null)}
                className={`w-full rounded-xl bg-gray-800/50 border ${activeField === 'phone' ? 'border-indigo-500' : 'border-gray-700'} px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                placeholder="+1 555 123 4567"
              />
              {activeField === 'phone' && (
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block mb-2 font-medium text-indigo-200">Message</label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                className={`w-full rounded-xl bg-gray-800/50 border ${activeField === 'message' ? 'border-indigo-500' : 'border-gray-700'} px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                placeholder="Your message or inquiry"
              />
              {activeField === 'message' && (
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="pt-4"
          >
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-[length:200%] bg-left shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Submit Inquiry</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.03); }
        }
        
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.02); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
        
        .animate-pulse-slowest {
          animation: pulse-slowest 12s ease-in-out infinite;
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(-30px) translateX(-10px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(15px) translateX(-15px); }
          50% { transform: translateY(25px) translateX(10px); }
          75% { transform: translateY(10px) translateX(20px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(-5px); }
          50% { transform: translateY(-25px) translateX(15px); }
          75% { transform: translateY(-10px) translateX(-15px); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(10px) translateX(20px); }
          50% { transform: translateY(20px) translateX(-10px); }
          75% { transform: translateY(5px) translateX(-20px); }
        }
        
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-3 {
          animation: float-3 12s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .bg-grid-white\/\[0\.03\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
};

export default Contact;