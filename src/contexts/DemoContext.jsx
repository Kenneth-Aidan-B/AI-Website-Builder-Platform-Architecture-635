import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoContext = createContext();

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export const DemoProvider = ({ children }) => {
  const [demoAnalytics, setDemoAnalytics] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializeDemoData();
    setInitialized(true);
  }, []);

  const initializeDemoData = () => {
    // Generate mock analytics for admin dashboard
    const mockAnalytics = {
      overview: {
        totalUsers: 1247,
        activeUsers: 892,
        totalTokensIssued: 45000000,
        totalTokensUsed: 12500000,
        revenue: 1250,
        growthRate: 23.5
      },
      userActivity: [
        { date: '2024-01-01', users: 120, newUsers: 15 },
        { date: '2024-01-02', users: 135, newUsers: 18 },
        { date: '2024-01-03', users: 142, newUsers: 12 },
        { date: '2024-01-04', users: 158, newUsers: 22 },
        { date: '2024-01-05', users: 167, newUsers: 9 },
        { date: '2024-01-06', users: 174, newUsers: 16 },
        { date: '2024-01-07', users: 185, newUsers: 20 }
      ],
      tokenUsage: [
        { model: 'GPT-4o', usage: 45, percentage: 45 },
        { model: 'Claude Sonnet 4', usage: 35, percentage: 35 },
        { model: 'Claude Opus 4', usage: 20, percentage: 20 }
      ],
      revenueData: [
        { month: 'Nov', revenue: 850 },
        { month: 'Dec', revenue: 1100 },
        { month: 'Jan', revenue: 1250 }
      ],
      topUsers: [
        {
          id: '1',
          email: 'kennethaidan1404@gmail.com',
          role: 'admin',
          totalUsage: 250000,
          status: 'active'
        },
        {
          id: '2',
          email: 'john.doe@example.com',
          role: 'user',
          totalUsage: 150000,
          status: 'active'
        },
        {
          id: '3',
          email: 'sarah.smith@example.com',
          role: 'user',
          totalUsage: 125000,
          status: 'active'
        }
      ]
    };

    setDemoAnalytics(mockAnalytics);
  };

  const value = {
    demoAnalytics,
    initialized
  };

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};