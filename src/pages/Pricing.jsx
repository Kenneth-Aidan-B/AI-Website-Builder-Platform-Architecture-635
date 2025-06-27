import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiZap, FiTrendingUp, FiCrown } = FiIcons;

const Pricing = () => {
  const { currentUser } = useAuth();

  const plans = [
    {
      name: 'Starter',
      tokens: '8M',
      price: 8,
      description: 'Perfect for small projects and experimentation',
      features: [
        '8 Million Builder Tokens',
        'Access to all AI models',
        'Full-stack website generation',
        'Email support',
        'Token usage analytics'
      ],
      icon: FiZap,
      popular: false
    },
    {
      name: 'Pro',
      tokens: '16M',
      price: 16,
      description: 'Ideal for professional developers and agencies',
      features: [
        '16 Million Builder Tokens',
        'Priority AI model access',
        'Advanced website templates',
        'Priority support',
        'Token usage analytics',
        'API access (coming soon)'
      ],
      icon: FiTrendingUp,
      popular: true
    },
    {
      name: 'Premium',
      tokens: '30M',
      price: 24,
      description: 'For teams and high-volume usage',
      features: [
        '30 Million Builder Tokens',
        'Dedicated AI model instances',
        'Custom website templates',
        'Premium support',
        'Advanced analytics',
        'API access (coming soon)',
        'Team collaboration tools'
      ],
      icon: FiCrown,
      popular: false
    }
  ];

  const modelInfo = [
    {
      name: 'GPT-4o',
      multiplier: '15×',
      description: 'OpenAI\'s most advanced model for creative and complex tasks'
    },
    {
      name: 'Claude Sonnet 4',
      multiplier: '12×',
      description: 'Anthropic\'s balanced model for general-purpose development'
    },
    {
      name: 'Claude Opus 4',
      multiplier: '25×',
      description: 'Anthropic\'s most powerful model for complex reasoning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One unified token system that works across all AI models. 
            Pay only for what you use with our Builder Token system.
          </p>
        </motion.div>

        {/* Token System Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            How Builder Tokens Work
          </h2>
          <p className="text-blue-800 mb-6">
            Builder Tokens (BT) are our universal currency that works across all AI models. 
            Each model has a different multiplier based on its capabilities and cost:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelInfo.map((model, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900">{model.name}</h3>
                <p className="text-2xl font-bold text-blue-600">{model.multiplier}</p>
                <p className="text-sm text-gray-600">{model.description}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-800 mt-4 text-sm">
            Example: If GPT-4o uses 1,000 tokens, you'll be charged 15,000 Builder Tokens (1,000 × 15)
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <SafeIcon 
                  icon={plan.icon} 
                  className="h-12 w-12 text-blue-600 mx-auto mb-4" 
                />
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-blue-600 font-semibold mt-2">{plan.tokens} Builder Tokens</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <SafeIcon 
                      icon={FiCheck} 
                      className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" 
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={currentUser ? "/dashboard" : "/signup"}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition duration-300 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {currentUser ? 'Upgrade Now' : 'Get Started'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need More Tokens?</h2>
          <p className="text-xl text-purple-100 mb-6">
            Get custom token packages at $2 per million Builder Tokens
          </p>
          <Link
            to={currentUser ? "/dashboard" : "/signup"}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Contact Sales
          </Link>
        </motion.div>

        {/* Free Tier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Free Tier Available!
            </h3>
            <p className="text-green-800">
              Get 2 Million Builder Tokens free every month. Perfect for trying out the platform!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;