import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '../contexts/TokenContext';
import { useAuth } from '../contexts/AuthContext';
import TokenWallet from '../components/TokenWallet';
import AIModelSelector from '../components/AIModelSelector';
import WebsiteBuilder from '../components/WebsiteBuilder';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCode, FiCpu, FiZap } = FiIcons;

const Dashboard = () => {
  const { tokens, loading } = useTokens();
  const { currentUser } = useAuth();
  const [selectedModel, setSelectedModel] = useState('gpt-4o');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.email}
          </h1>
          <p className="text-gray-600">
            Start building your next website with AI-powered tools
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <SafeIcon icon={FiZap} className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Builder Tokens</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tokens.builderTokens.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <SafeIcon icon={FiCpu} className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Claude Tokens</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tokens.claudeTokens.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <SafeIcon icon={FiCode} className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">GPT Tokens</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tokens.gptTokens.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <TokenWallet />
            <AIModelSelector 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <WebsiteBuilder selectedModel={selectedModel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;