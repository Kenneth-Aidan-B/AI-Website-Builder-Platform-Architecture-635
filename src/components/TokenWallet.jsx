import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '../contexts/TokenContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiPlus, FiInfo } = FiIcons;

const TokenWallet = () => {
  const { tokens, addTokens } = useTokens();
  const [showAddTokens, setShowAddTokens] = useState(false);
  const [tokenType, setTokenType] = useState('builder');
  const [amount, setAmount] = useState('');

  const handleAddTokens = async (e) => {
    e.preventDefault();
    const tokenAmount = parseInt(amount);
    if (tokenAmount > 0) {
      await addTokens(tokenType, tokenAmount);
      setAmount('');
      setShowAddTokens(false);
    }
  };

  const tokenTypes = [
    {
      key: 'builder',
      name: 'Builder Tokens',
      balance: tokens.builderTokens,
      color: 'blue',
      description: 'Universal tokens with model multipliers'
    },
    {
      key: 'claude',
      name: 'Claude Tokens',
      balance: tokens.claudeTokens,
      color: 'purple',
      description: 'Direct 1:1 usage with Claude models'
    },
    {
      key: 'gpt',
      name: 'GPT Tokens',
      balance: tokens.gptTokens,
      color: 'green',
      description: 'Direct 1:1 usage with GPT-4o'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiCreditCard} className="h-5 w-5 mr-2" />
          Token Wallet
        </h2>
        <button
          onClick={() => setShowAddTokens(!showAddTokens)}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4 mr-1" />
          Add Tokens
        </button>
      </div>

      <div className="space-y-4">
        {tokenTypes.map((token) => (
          <div key={token.key} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{token.name}</h3>
              <span className={`text-2xl font-bold text-${token.color}-600`}>
                {token.balance.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{token.description}</p>
          </div>
        ))}
      </div>

      {showAddTokens && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-medium text-gray-900 mb-4">Add Tokens</h3>
          <form onSubmit={handleAddTokens} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token Type
              </label>
              <select
                value={tokenType}
                onChange={(e) => setTokenType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="builder">Builder Tokens</option>
                <option value="claude">Claude Tokens</option>
                <option value="gpt">GPT Tokens</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter token amount"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
              >
                Add Tokens
              </button>
              <button
                type="button"
                onClick={() => setShowAddTokens(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start">
              <SafeIcon icon={FiInfo} className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                This is a demo feature. In production, this would integrate with Stripe for actual payments.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TokenWallet;