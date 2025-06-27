import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '../contexts/TokenContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCpu, FiZap, FiStar } = FiIcons;

const AIModelSelector = ({ selectedModel, onModelChange }) => {
  const { MODEL_MULTIPLIERS } = useTokens();

  const models = [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      multiplier: MODEL_MULTIPLIERS['gpt-4o'],
      description: 'Most advanced OpenAI model for creative and complex tasks',
      icon: FiZap,
      color: 'green'
    },
    {
      id: 'claude-sonnet-4',
      name: 'Claude Sonnet 4',
      provider: 'Anthropic',
      multiplier: MODEL_MULTIPLIERS['claude-sonnet-4'],
      description: 'Balanced model for general-purpose development',
      icon: FiCpu,
      color: 'purple'
    },
    {
      id: 'claude-opus-4',
      name: 'Claude Opus 4',
      provider: 'Anthropic',
      multiplier: MODEL_MULTIPLIERS['claude-opus-4'],
      description: 'Most powerful model for complex reasoning',
      icon: FiStar,
      color: 'orange'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Select AI Model
      </h2>

      <div className="space-y-3">
        {models.map((model) => (
          <motion.div
            key={model.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModelChange(model.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
              selectedModel === model.id
                ? `border-${model.color}-500 bg-${model.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <SafeIcon 
                  icon={model.icon} 
                  className={`h-5 w-5 mr-3 ${
                    selectedModel === model.id 
                      ? `text-${model.color}-600` 
                      : 'text-gray-500'
                  }`} 
                />
                <div>
                  <h3 className="font-medium text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500">{model.provider}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${
                selectedModel === model.id 
                  ? `text-${model.color}-600` 
                  : 'text-gray-500'
              }`}>
                {model.multiplier}× BT
              </span>
            </div>
            <p className="text-sm text-gray-600">{model.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Token Usage</h4>
        <p className="text-sm text-yellow-700">
          Model-specific tokens (Claude/GPT) are used 1:1 when available. 
          Otherwise, Builder Tokens are used with the multiplier shown above.
        </p>
      </div>
    </motion.div>
  );
};

export default AIModelSelector;