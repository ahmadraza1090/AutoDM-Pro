import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Instagram, Settings2, Key, Database, Globe, Loader2 } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('integrations');
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check initial status from our backend
    fetch('/api/auth/instagram/status')
      .then(res => res.json())
      .then(data => {
        // We mock this initially, let's keep it disconnected by default for demo
        // setInstagramConnected(data.connected);
      })
      .catch(console.error);

    // Listen for the postMessage from the OAuth callback popup
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setInstagramConnected(true);
        setIsConnecting(false);
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setIsConnecting(false);
        alert('Authentication failed: ' + event.data.error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectInstagram = async () => {
    setIsConnecting(true);
    try {
      // 1. Fetch the OAuth URL from server
      const response = await fetch('/api/auth/instagram/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();

      // 2. Open popup with Instagram's authorization URL directly
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        setIsConnecting(false);
        alert('Please allow popups for this site to connect your account.');
      }
    } catch (error) {
      setIsConnecting(false);
      console.error('OAuth error:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto md:mx-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Platform Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure your integrations and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex overflow-x-auto lg:flex-col gap-2 lg:gap-1 pb-2 lg:pb-0 hide-scrollbar lg:col-span-1 border-b lg:border-b-0 border-gray-200">
          <nav className="flex lg:flex-col gap-1 w-full shrink-0">
            <button 
              onClick={() => setActiveTab('integrations')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md shrink-0 transition-colors ${activeTab === 'integrations' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              Integrations
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md shrink-0 transition-colors ${activeTab === 'account' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              Account
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md shrink-0 transition-colors ${activeTab === 'billing' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              Billing
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`text-left px-3 py-2 text-sm font-medium rounded-md shrink-0 transition-colors ${activeTab === 'team' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              Team
            </button>
          </nav>
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-semibold">
                    <Instagram className="w-5 h-5 text-pink-600" /> Instagram Account
                  </CardTitle>
                  <CardDescription>Connect your professional Instagram account to enable automations.</CardDescription>
                </CardHeader>
                <CardContent>
                  {instagramConnected ? (
                    <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-green-200">
                          <img src="https://picsum.photos/seed/avatar5/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">@creatorhub</h4>
                          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Connected & Active
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-white" onClick={() => setInstagramConnected(false)}>
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-6 border border-gray-200 bg-gray-50 rounded-lg text-center flex-col gap-4">
                      <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                        <Instagram className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">No Account Connected</h4>
                        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">You need to authenticate via Instagram OAuth to allow AutoDM Pro to send messages on your behalf.</p>
                      </div>
                      <Button 
                        onClick={handleConnectInstagram} 
                        disabled={isConnecting}
                        className="bg-indigo-600 hover:bg-indigo-700 min-w-[200px]"
                      >
                        {isConnecting ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...</>
                        ) : (
                          'Connect Instagram'
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-semibold">
                    <Database className="w-5 h-5 text-teal-600" /> Supabase Configuration
                  </CardTitle>
                  <CardDescription>Your external PostgreSQL database connection for storing leads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Supabase URL</label>
                    <input 
                      type="text" 
                      value="https://abcdefghijklmonp.supabase.co" 
                      disabled
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project API Key</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="password" 
                        value="...................................." 
                        disabled
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500 w-full"
                      />
                      <Button variant="outline" className="w-full sm:w-auto shrink-0">Update Key</Button>
                    </div>
                  </div>
                  <div className="p-3 bg-teal-50 border border-teal-100 rounded-md text-sm text-teal-800 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                    Database connection is active and healthy.
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-semibold">
                    <Globe className="w-5 h-5 text-gray-600" /> Deployment Context
                  </CardTitle>
                  <CardDescription>Your frontend is configured for deployment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Vercel Integration</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Auto-deploy configured for main branch</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="font-semibold">Profile Information</CardTitle>
                  <CardDescription>Update your personal details and email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Creator Admin" 
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="admin@creatorhub.com" 
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="font-semibold">Current Plan</CardTitle>
                  <CardDescription>You are currently on the Pro plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-indigo-900">Pro Tier</h4>
                      <p className="text-sm text-indigo-700">16,500 / 25,000 DMs this month</p>
                    </div>
                    <div className="text-2xl font-black text-indigo-900">$49<span className="text-sm text-indigo-700 font-medium">/mo</span></div>
                  </div>
                  <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">Manage Subscription</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card>
                <CardHeader>
                  <CardTitle className="font-semibold">Team Members</CardTitle>
                  <CardDescription>Manage who has access to this workspace.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-gray-100">
                    <div className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">CA</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Creator Admin (You)</p>
                          <p className="text-xs text-gray-500">admin@creatorhub.com</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Owner</span>
                    </div>
                    <div className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-600">SM</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Social Manager</p>
                          <p className="text-xs text-gray-500">team@creatorhub.com</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Editor</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white">Invite Member</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
