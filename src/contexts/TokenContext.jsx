import React, { createContext, useContext, useState, useEffect } from 'react';
import { xanoClient } from '../config/xano';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TokenContext = createContext();

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};

export const TokenProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tokens, setTokens] = useState({
    builderTokens: 0,
    claudeTokens: 0,
    gptTokens: 0
  });
  const [loading, setLoading] = useState(true);

  // Model multipliers
  const MODEL_MULTIPLIERS = {
    'gpt-4o': 15,
    'claude-sonnet-4': 12,
    'claude-opus-4': 25
  };

  useEffect(() => {
    if (currentUser) {
      fetchTokenBalance();
    } else {
      setTokens({
        builderTokens: 0,
        claudeTokens: 0,
        gptTokens: 0
      });
      setLoading(false);
    }
  }, [currentUser]);

  const fetchTokenBalance = async () => {
    try {
      const balanceData = await xanoClient.getBalance();
      setTokens({
        builderTokens: balanceData.token_balance || 0,
        claudeTokens: balanceData.claude_tokens || 0,
        gptTokens: balanceData.gpt_tokens || 0
      });
    } catch (error) {
      console.error('Error fetching token balance:', error);
      toast.error('Failed to fetch token balance');
    } finally {
      setLoading(false);
    }
  };

  const deductTokens = async (model, tokensUsed) => {
    if (!currentUser) {
      toast.error('Please login to use tokens');
      return false;
    }

    try {
      const result = await xanoClient.deductTokens(model, tokensUsed);
      
      if (result.success) {
        // Update local token balance
        setTokens(prev => ({
          ...prev,
          builderTokens: result.new_balance || prev.builderTokens
        }));
        return true;
      } else {
        toast.error(result.message || 'Insufficient tokens! Please upgrade your plan.');
        return false;
      }
    } catch (error) {
      console.error('Error deducting tokens:', error);
      toast.error(error.message || 'Failed to deduct tokens');
      return false;
    }
  };

  const addTokens = async (type, amount) => {
    // This would typically be handled by a payment system
    // For demo purposes, we'll simulate it
    try {
      setTokens(prev => ({
        ...prev,
        [type === 'builder' ? 'builderTokens' : type === 'claude' ? 'claudeTokens' : 'gptTokens']: 
          prev[type === 'builder' ? 'builderTokens' : type === 'claude' ? 'claudeTokens' : 'gptTokens'] + amount
      }));
      toast.success(`Added ${amount.toLocaleString()} ${type} tokens!`);
      return true;
    } catch (error) {
      console.error('Error adding tokens:', error);
      toast.error('Failed to add tokens');
      return false;
    }
  };

  const value = {
    tokens,
    loading,
    deductTokens,
    addTokens,
    refreshBalance: fetchTokenBalance,
    MODEL_MULTIPLIERS
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};