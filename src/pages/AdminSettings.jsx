import React, { useState, useEffect } from 'react';
import {
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';

import { useAuth } from '../Context/AuthContext';

const AdminSettings = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    currentEmail: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        currentEmail: currentUser.email
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (formData.newEmail && formData.newEmail !== currentUser.email) {
        await updateEmail(currentUser, formData.newEmail);
        setSuccess('Email updated successfully!');
      }

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }

        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formData.currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, formData.newPassword);
        setSuccess(prev => prev ? `${prev} Password updated!` : 'Password updated successfully!');
      }

      setFormData({
        currentEmail: currentUser.email,
        newEmail: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Settings</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Email</label>
            <input
              type="email"
              name="currentEmail"
              value={formData.currentEmail}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Email</label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              placeholder="Enter new email (optional)"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Required for any changes"
              required={formData.newEmail || formData.newPassword}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {formData.newPassword && (
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            {loading ? 'Updating...' : 'Update Settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
