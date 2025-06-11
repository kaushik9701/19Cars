import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CarsShowcase from '../Components/CarShowcase';
import { motion } from 'framer-motion';
import home from '../assets/home.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/footer';
const Home = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const carsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCars(carsList);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,180,255,0.1)_0%,rgba(0,0,0,0)_70%)] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 animate-move-shine"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <motion.div 
            className="text-center space-y-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center">
            <motion.img
              src={home}
              alt="home"
              className="h-24 md:h-52 rounded-3xl object-contain" // Increased from h-16/md:h-24 to h-24/md:h-40
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            </div>

            
            <motion.p 
              className="text-xl md:text-2xl font-light text-purple-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premium used cars delivered to your doorstep. 
              Enjoy personalized demos and test drives without dealership visits.
            </motion.p>
          </motion.div>

          {/* Cars Showcase */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CarsShowcase cars={cars} />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ready to Book Your Next Car?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 text-purple-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Experience seamless service from inspection to paperwork
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 15,
              delay: 0.7
            }}
          >
            <button  onClick={handleClick} className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 relative overflow-hidden">
              <span className="relative z-10">Start Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine"></span>
            </button>
          </motion.div>
        </div>
        <Footer/>
      </motion.div>
      
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes move-shine {
          0% { transform: translateX(-100%) rotate(-25deg); }
          100% { transform: translateX(100%) rotate(-25deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-move-shine {
          animation: move-shine 8s linear infinite;
        }
        .animate-shine {
          animation: shine 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;