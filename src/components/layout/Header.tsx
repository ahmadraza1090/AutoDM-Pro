import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, User, Settings as SettingsIcon, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-gray-200/60 bg-white/60 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3 w-full lg:w-96">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden shrink-0">
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-100/50 hover:bg-gray-100/80 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-gray-200 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 md:gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors focus:outline-none"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-sm font-medium text-gray-900 leading-tight">Creator Hub</span>
              <span className="text-xs text-gray-500">@creatorhub</span>
            </div>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold border border-indigo-200 text-sm md:text-base shrink-0">
              CH
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                <p className="text-sm font-medium text-gray-900">Creator Hub</p>
                <p className="text-xs text-gray-500">@creatorhub</p>
              </div>
              <button 
                onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
              >
                <SettingsIcon className="w-4 h-4" /> Settings
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
