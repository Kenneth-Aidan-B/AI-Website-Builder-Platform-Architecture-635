import React from 'react';
import { motion } from 'framer-motion';
import { useDemo } from '../contexts/DemoContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiToggleLeft, FiToggleRight, FiInfo } = FiIcons;

const DemoToggle = () => {
  const { demoMode, setDemoMode } = useDemo();

  const handleToggle = () => {
    setDemoMode(!demoMode);
    // Force a page reload to ensure clean state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiInfo} className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            {demoMode ? 'Demo Mode' : 'Live Mode'}
          </span>
          <button
            onClick={handleToggle}
            className="flex items-center"
          >
            <SafeIcon 
              icon={demoMode ? FiToggleRight : FiToggleLeft} 
              className={`h-6 w-6 transition-colors duration-200 ${
                demoMode ? 'text-green-600' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {demoMode ? (
            <div>
              <p>✅ No Firebase required</p>
              <p>📊 Full demo data loaded</p>
            </div>
          ) : (
            <div>
              <p>🔥 Firebase required</p>
              <p>📡 Live data connection</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DemoToggle;