import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquareShare, Zap, BarChart3, Settings, Instagram, X, Users, Inbox } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  // Close mobile sidebar when navigating
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const routes = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inbox', path: '/inbox', icon: Inbox },
    { name: 'Campaigns', path: '/campaigns', icon: MessageSquareShare },
    { name: 'Automations', path: '/automations', icon: Zap },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile & Tablet Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={cn(
          "bg-white/80 backdrop-blur-xl border-r border-gray-200/60 flex flex-col h-full fixed lg:relative z-50 w-64 transition-transform duration-300 ease-in-out shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-1.5 rounded-lg shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 truncate">AutoDM Pro</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden shrink-0">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 my-0.5",
                    isActive 
                      ? "bg-white text-indigo-700 shadow-sm shadow-indigo-100/50 ring-1 ring-gray-200/50" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {route.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-xl border border-gray-200 bg-gray-50 shrink-0">
          <h4 className="text-sm font-semibold text-gray-900">Pro Plan Active</h4>
          <p className="text-xs text-gray-500 mt-1 mb-3">12,500 / 25,000 DMs used this month</p>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-1/2 rounded-full"></div>
          </div>
        </div>
      </aside>
    </>
  );
}
