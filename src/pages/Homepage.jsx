import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiCode, FiLayers, FiTrendingUp, FiShield, FiCpu } = FiIcons;

const Homepage = () => {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Generate full-stack websites in minutes with our advanced AI models'
    },
    {
      icon: FiCode,
      title: 'Multiple AI Models',
      description: 'Choose from GPT-4o, Claude Sonnet 4, and Claude Opus 4'
    },
    {
      icon: FiLayers,
      title: 'Full-Stack Generation',
      description: 'Create complete websites with frontend, backend, and database'
    },
    {
      icon: FiTrendingUp,
      title: 'Unified Token System',
      description: 'One token system that works across all AI models'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Secure, managed API access without exposing your keys'
    },
    {
      icon: FiCpu,
      title: 'Smart Token Usage',
      description: 'Intelligent token optimization with model-specific multipliers'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build Websites with
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}AI Power
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Create production-ready, full-stack websites using GPT-4o and Claude AI models. 
              No coding required, just describe your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Start Building Free
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-blue-200 mt-4">
              Get 2 Million Builder Tokens free on signup!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BuilderForge AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most advanced AI website builder with unified token system and enterprise-grade security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300"
              >
                <SafeIcon 
                  icon={feature.icon} 
                  className="h-12 w-12 text-blue-600 mb-4" 
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Build Your Next Website?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and businesses using BuilderForge AI 
              to create stunning websites with the power of AI.
            </p>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;