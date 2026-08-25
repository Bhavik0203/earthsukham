"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerWebUser } from '../lib/webUser';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', number: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      const user = await registerWebUser(formData);
      localStorage.setItem('webUser', JSON.stringify(user));
      window.dispatchEvent(new Event('userStateChange'));
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FBF9F4] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-[#e6dcc6]">
        <h2 className="text-3xl font-serif text-gray-800 mb-2 tracking-wide uppercase text-center">Sign Up</h2>
        <p className="text-[13px] text-gray-500 mb-8 text-center">Create an account to continue.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 pr-10 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 pr-10 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8c6b23] hover:bg-[#73581c] text-white font-medium py-3.5 rounded-sm transition-colors text-[15px] shadow-sm disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#8c6b23] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
