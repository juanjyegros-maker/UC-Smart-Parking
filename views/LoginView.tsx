
import React from 'react';

interface Props {
  onLogin: () => void;
}

const LoginView: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="flex flex-col h-full px-8 pt-20">
      <div className="flex justify-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-surface-light flex items-center justify-center shadow-lg border border-white/10 group transition-transform hover:scale-105">
          <span className="material-icons-round text-primary text-5xl">local_parking</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Smart Campus Parking</h1>
      <p className="text-gray-400 text-center mb-12 text-sm">Sign in to manage your vehicle and IoT sensors</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 ml-1">University Email</label>
          <div className="relative group">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary">school</span>
            <input 
              type="email" 
              placeholder="student@university.edu"
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 ml-1">Password</label>
          <div className="relative group">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary">lock</span>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">visibility_off</span>
          </div>
          <div className="text-right">
            <button className="text-xs text-primary font-medium">Forgot Password?</button>
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Login
          <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>

      <div className="mt-auto pb-12 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account? <button className="text-primary font-bold">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
