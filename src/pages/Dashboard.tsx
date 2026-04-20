import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { MessageSquareShare, Users, TrendingUp, Zap, ArrowRight, Instagram } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const mockData = [
  { name: 'Mon', sent: 1200 },
  { name: 'Tue', sent: 1900 },
  { name: 'Wed', sent: 1500 },
  { name: 'Thu', sent: 2100 },
  { name: 'Fri', sent: 2800 },
  { name: 'Sat', sent: 3200 },
  { name: 'Sun', sent: 3800 },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Here's what's happening with your Instagram automations today.</p>
        </div>
        <Button className="w-full sm:w-auto gap-2" onClick={() => navigate('/automations')}>
          <Zap className="w-4 h-4" />
          New Automation
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total DMs Sent</CardTitle>
            <MessageSquareShare className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16,500</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +14.5% this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Automations</CardTitle>
            <Zap className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">Across 12 posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lead Conversion</CardTitle>
            <Users className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-none shadow-md shadow-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Instagram className="w-16 h-16" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-indigo-100">Profile Visits</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white">45,201</div>
            <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              Driven by automations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full focus:outline-none focus-visible:outline-none">
              <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
                <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: '#9CA3AF', fontWeight: 500 }} 
                    dy={12} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: '#9CA3AF', fontWeight: 500 }} 
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC', opacity: 0.5 }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)',
                      padding: '12px 16px',
                      color: '#1E293B',
                      fontWeight: 600
                    }}
                    itemStyle={{
                      color: '#6366F1',
                      fontWeight: 700
                    }}
                  />
                  <Bar 
                    dataKey="sent" 
                    fill="url(#colorSent)" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={48}
                    activeBar={{ stroke: 'none', fill: '#4F46E5' }}
                    style={{ outline: 'none' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { time: '2m ago', text: 'Sent DM to @alex_dev for commenting "Guide"', icon: MessageSquareShare, color: 'text-blue-500', bg: 'bg-blue-50' },
                { time: '10m ago', text: 'Sent DM to @johndoe for commenting "Link"', icon: MessageSquareShare, color: 'text-blue-500', bg: 'bg-blue-50' },
                { time: '45m ago', text: 'Lead @emily_creates converted via Masterclass link', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
                { time: '1h ago', text: 'Automation "Summer Sale" reached 1,000 DMs', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                { time: '2h ago', text: 'Sent DM to @mike_fitness (Story Reply)', icon: MessageSquareShare, color: 'text-blue-500', bg: 'bg-blue-50' },
                { time: '3h ago', text: 'New lead captured from Story Reply', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                { time: '5h ago', text: 'Sent DM to @sarahsmith for commenting "Link"', icon: MessageSquareShare, color: 'text-blue-500', bg: 'bg-blue-50' },
                { time: '8h ago', text: 'Manual intervention required in Inbox for @tech_guru', icon: Users, color: 'text-red-500', bg: 'bg-red-50' },
                { time: '1d ago', text: 'Campaign "New Course" activated', icon: Zap, color: 'text-green-500', bg: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-md ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">{item.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-indigo-600 hover:text-indigo-700">
              View all activity <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
