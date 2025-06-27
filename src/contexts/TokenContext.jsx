import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
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
    if (!currentUser) {
      setTokens({ builderTokens: 0, claudeTokens: 0, gptTokens: 0 });
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTokens({
            builderTokens: data.builderTokens || 0,
            claudeTokens: data.claudeTokens || 0,
            gptTokens: data.gptTokens || 0
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching tokens:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const deductTokens = async (model, tokensUsed) => {
    if (!currentUser) return false;

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    let newBuilderTokens = userData.builderTokens || 0;
    let newClaudeTokens = userData.claudeTokens || 0;
    let newGptTokens = userData.gptTokens || 0;

    // Determine token deduction logic
    if (model === 'gpt-4o') {
      if (newGptTokens >= tokensUsed) {
        // Use GPT tokens directly (1:1)
        newGptTokens -= tokensUsed;
      } else {
        // Use Builder Tokens with multiplier
        const requiredBT = tokensUsed * MODEL_MULTIPLIERS['gpt-4o'];
        if (newBuilderTokens >= requiredBT) {
          newBuilderTokens -= requiredBT;
        } else {
          toast.error('Insufficient tokens! Please upgrade your plan.');
          return false;
        }
      }
    } else if (model.startsWith('claude')) {
      if (newClaudeTokens >= tokensUsed) {
        // Use Claude tokens directly (1:1)
        newClaudeTokens -= tokensUsed;
      } else {
        // Use Builder Tokens with multiplier
        const requiredBT = tokensUsed * MODEL_MULTIPLIERS[model];
        if (newBuilderTokens >= requiredBT) {
          newBuilderTokens -= requiredBT;
        } else {
          toast.error('Insufficient tokens! Please upgrade your plan.');
          return false;
        }
      }
    }

    // Update tokens in Firestore
    try {
      await updateDoc(userRef, {
        builderTokens: newBuilderTokens,
        claudeTokens: newClaudeTokens,
        gptTokens: newGptTokens,
        totalUsage: (userData.totalUsage || 0) + tokensUsed,
        lastUsed: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error deducting tokens:', error);
      toast.error('Failed to deduct tokens');
      return false;
    }
  };

  const addTokens = async (type, amount) => {
    if (!currentUser) return false;

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    const updates = {};

    switch (type) {
      case 'builder':
        updates.builderTokens = (userData.builderTokens || 0) + amount;
        break;
      case 'claude':
        updates.claudeTokens = (userData.claudeTokens || 0) + amount;
        break;
      case 'gpt':
        updates.gptTokens = (userData.gptTokens || 0) + amount;
        break;
      default:
        return false;
    }

    try {
      await updateDoc(userRef, updates);
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
    MODEL_MULTIPLIERS
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};