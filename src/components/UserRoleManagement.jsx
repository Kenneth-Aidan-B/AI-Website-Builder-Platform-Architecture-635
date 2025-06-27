import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiUsers, FiShield } = FiIcons;

const UserRoleManagement = () => {
  const { isSuperAdmin, hasPermission } = useAuth();

  // Mock users for demo (in production, this would come from Xano API)
  const [users] = useState([
    {
      id: '1',
      email: 'kennethaidan1404@gmail.com',
      isAdmin: true,
      token_balance: 5000000,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      last_used: new Date(),
      status: 'active'
    },
    {
      id: '2',
      email: 'john.doe@example.com',
      isAdmin: false,
      token_balance: 2000000,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      last_used: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      email: 'user@example.com',
      isAdmin: false,
      token_balance: 1500000,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      last_used: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'active'
    }
  ]);

  if (!hasPermission('user_management') && !isSuperAdmin) {
    return (
      <div className="text-center py-8">
        <SafeIcon icon={FiShield} className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access user management.</p>
      </div>
    );
  }

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`);
    // In production, make API call to Xano to update user status
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Token Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.isAdmin 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.token_balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.last_used).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {(isSuperAdmin || hasPermission('user_management')) && (
                      <button
                        onClick={() => handleStatusToggle(user.id, user.status)}
                        className={`${
                          user.status === 'active' 
                            ? 'text-red-600 hover:text-red-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {user.status === 'active' ? '🚫' : '✅'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4">User Management</h3>
        <div className="text-sm text-blue-800">
          <p className="mb-2">• Admin users have full access to all platform features</p>
          <p className="mb-2">• Regular users can create and manage their own projects</p>
          <p>• Suspended users cannot access the platform until reactivated</p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRoleManagement;