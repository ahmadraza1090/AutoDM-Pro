import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Instagram, Send, Eye, MousePointerClick, Calendar, Plus, X, DollarSign, Clock, Pause, Play, Inbox, MessageCircle, Target, Sparkles, Smartphone, CalendarDays, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

export function Campaigns() {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Custom Calendar State
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');

  const [campaignData, setCampaignData] = useState({
    name: '',
    triggerType: 'post_comment',
    messageTemplate: '',
    targetPost: '',
    scheduleDate: '',
    budgetLimit: ''
  });

  // Calendar Methods
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));

  const daysInMonth = getDaysInMonth(currentMonthDate.getFullYear(), currentMonthDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonthDate.getFullYear(), currentMonthDate.getMonth());
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSchedule = scheduleType === 'now' 
      ? 'Just now' 
      : (selectedDate ? `${selectedDate.toLocaleDateString()} at ${selectedTime}` : 'Just now');

    const newPost = {
      id: posts.length + 1,
      image: 'https://picsum.photos/seed/new1/300/400',
      type: campaignData.triggerType === 'story_reply' || campaignData.triggerType === 'story_mention' ? 'Story' : 'Post',
      caption: campaignData.name || 'New monitored post...',
      date: finalSchedule,
      triggers: 0,
      dms: 0,
      clicks: 0,
      status: scheduleType === 'now' ? 'active' : 'scheduled'
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    
    // Reset state
    setScheduleType('now');
    setSelectedDate(null);
    setSelectedTime('12:00');
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
    
    setCampaignData({
      name: '',
      triggerType: 'post_comment',
      messageTemplate: '',
      targetPost: '',
      scheduleDate: '',
      budgetLimit: ''
    });
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'https://picsum.photos/seed/reel1/300/400',
      type: 'Reel',
      caption: 'Comment "AI" to get my free automation guide! 🚀',
      date: '2h ago',
      triggers: 1204,
      dms: 1204,
      clicks: 840,
      status: 'active'
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/carousel1/300/400',
      type: 'Carousel',
      caption: 'The secret to scaling your agency... Reply with "Scale" 📈',
      date: '1d ago',
      triggers: 850,
      dms: 845,
      clicks: 420,
      status: 'active'
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/story1/300/400',
      type: 'Story',
      caption: 'Want this template? Reply "Template" 👇',
      date: '2d ago',
      triggers: 3200,
      dms: 3192,
      clicks: 2100,
      status: 'paused'
    },
    {
      id: 4,
      image: 'https://picsum.photos/seed/live4/300/400',
      type: 'Live',
      caption: 'Weekly Q&A - Comment "Blueprint" for notes',
      date: '3d ago',
      triggers: 512,
      dms: 510,
      clicks: 340,
      status: 'active'
    },
    {
      id: 5,
      image: 'https://picsum.photos/seed/post5/300/400',
      type: 'Post',
      caption: '5 Tools I use daily. Comment "Tools" 🛠️',
      date: '5d ago',
      triggers: 1890,
      dms: 1850,
      clicks: 920,
      status: 'active'
    },
    {
      id: 6,
      image: 'https://picsum.photos/seed/reel6/300/400',
      type: 'Reel',
      caption: 'Stop doing this in 2026! Reply "Fix"',
      date: '1w ago',
      triggers: 4200,
      dms: 4100,
      clicks: 3005,
      status: 'paused'
    },
    {
      id: 7,
      image: 'https://picsum.photos/seed/carousel7/300/400',
      type: 'Carousel',
      caption: 'Client Case Study: $0 to $10k. 💰',
      date: '1w ago',
      triggers: 850,
      dms: 845,
      clicks: 650,
      status: 'active'
    }
  ]);

  const toggleCampaignStatus = (id: number) => {
    setPosts(current => current.map(post => {
      if (post.id === id) {
        return { ...post, status: post.status === 'active' ? 'paused' : 'active' };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Active Campaigns</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Posts and stories currently being monitored for triggers.</p>
        </div>
        <Button className="w-full sm:w-auto gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Campaign
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white rounded-xl border border-gray-200 border-dashed">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-indigo-100">
            <Inbox className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Campaigns</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">You don't have any campaigns running right now. Create your first campaign to start monitoring triggers and sending DMs.</p>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col group relative border-gray-200/60 bg-white/70 backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden bg-gray-100">
              <img src={post.image} alt={post.type} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${post.status === 'paused' ? 'grayscale opacity-70' : ''}`} referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-900 border border-black/5 shadow-sm">
                {post.type}
              </div>
              
              {post.status === 'active' ? (
                <div className="absolute top-3 right-3 bg-indigo-600/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-indigo-500/50 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse border border-green-200"></span> Active
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-gray-800/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-gray-700/50 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 border border-yellow-200"></span> Paused
                </div>
              )}
            </div>
            <CardHeader className="pb-2 flex-grow">
              <p className="text-sm text-gray-800 line-clamp-2">{post.caption}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Calendar className="w-3 h-3" /> Published {post.date}
              </div>
            </CardHeader>
            <CardContent className="bg-gray-50/50 border-t border-gray-100 pt-4 pb-4">
              <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-900">{post.triggers}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium flex items-center justify-center gap-1 mt-0.5 whitespace-nowrap"><Eye className="w-3 h-3 shrink-0 hidden sm:inline"/> Triggers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-indigo-600">{post.dms}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium flex items-center justify-center gap-1 mt-0.5 whitespace-nowrap"><Send className="w-3 h-3 shrink-0 hidden sm:inline"/> Sent</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-green-600">{post.clicks}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium flex items-center justify-center gap-1 mt-0.5 whitespace-nowrap"><MousePointerClick className="w-3 h-3 shrink-0 hidden sm:inline"/> Clicks</span>
                </div>
              </div>
            </CardContent>
            <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <Button variant="outline" className="flex-1 bg-white/60 text-gray-700 hover:text-gray-900 mt-2 text-xs h-9">View Details</Button>
              <Button 
                variant="outline" 
                onClick={() => toggleCampaignStatus(post.id)}
                className={`mt-2 flex-1 h-9 text-xs transition-colors ${
                  post.status === 'active' 
                    ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800' 
                    : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800'
                }`}
              >
                {post.status === 'active' ? (
                  <><Pause className="w-3.5 h-3.5 mr-1" /> Pause</>
                ) : (
                  <><Play className="w-3.5 h-3.5 mr-1" /> Resume</>
                )}
              </Button>
            </div>
          </Card>
        ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 border border-white/20">
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between bg-white relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Create Automation Campaign</h2>
                  <p className="text-[11px] sm:text-xs text-gray-500">Configure your trigger and response</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 overscroll-contain">
              <form id="campaign-form" onSubmit={handleCreateCampaign} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                
                {/* Section 1: Core Settings */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1 sm:mb-2 px-1">
                    <Target className="w-4 h-4 text-indigo-500" /> 1. Campaign Details
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/60 shadow-sm space-y-4 sm:space-y-5 flex-1">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-sm font-medium text-gray-700">Campaign Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g., Summer Sale 2026 Boost"
                        className="w-full px-3 sm:px-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-gray-900"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-sm font-medium text-gray-700">Trigger Type</label>
                        <select 
                          className="w-full px-3 sm:px-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none transition-all text-gray-900"
                          value={campaignData.triggerType}
                          onChange={(e) => setCampaignData({...campaignData, triggerType: e.target.value})}
                        >
                          <option value="post_comment">Post Specific Keyword</option>
                          <option value="story_reply">Story Reply exact match</option>
                          <option value="story_mention">Story Mention</option>
                          <option value="live_comment">Live Video Comment</option>
                          <option value="any_comment">Any Comment</option>
                        </select>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-sm font-medium text-gray-700">Target Post</label>
                        <select 
                          className="w-full px-3 sm:px-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none transition-all text-gray-900"
                          value={campaignData.targetPost}
                          onChange={(e) => setCampaignData({...campaignData, targetPost: e.target.value})}
                        >
                          <option value="">Select a recent post...</option>
                          <option value="post1">"Comment AI to get my free guide!"</option>
                          <option value="post2">"The secret to scaling your agency..."</option>
                          <option value="story1">Current active story: "Want this template?"</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Messaging */}
                <div className="space-y-3 sm:space-y-4">
                   <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1 sm:mb-2 px-1">
                    <MessageCircle className="w-4 h-4 text-purple-500" /> 2. The Message
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {/* Input */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col h-full">
                      <div className="space-y-1.5 sm:space-y-2 flex-grow flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Message Content</label>
                        <textarea 
                          required
                          placeholder="Hey @{{username}}! Thanks for commenting. Here is the link..."
                          className="w-full flex-grow min-h-[120px] sm:min-h-[140px] px-3 sm:px-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white resize-none transition-all text-gray-900"
                          value={campaignData.messageTemplate}
                          onChange={(e) => setCampaignData({...campaignData, messageTemplate: e.target.value})}
                        />
                      </div>
                      <div className="mt-3 sm:mt-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <p className="text-[11px] text-slate-500 font-medium">Available Variables:</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          <span className="text-purple-600 bg-purple-100/50 px-1.5 py-0.5 rounded border border-purple-200/50 text-xs font-mono cursor-pointer hover:bg-purple-100 transition-colors">@{'{'}{'{username}'}{'}'}</span>
                          <span className="text-purple-600 bg-purple-100/50 px-1.5 py-0.5 rounded border border-purple-200/50 text-xs font-mono cursor-pointer hover:bg-purple-100 transition-colors">{'{'}{'{first_name}'}{'}'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview Box */}
                    <div className="bg-slate-100/80 p-4 sm:p-5 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col min-h-[180px] sm:min-h-[220px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-50"></div>
                      <div className="relative z-10 flex items-center justify-between mb-4">
                        <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5" /> DM Preview
                        </span>
                        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                           <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex gap-2 sm:gap-3 mt-auto bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-100 w-full">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold shadow-sm ring-2 ring-white">
                          CH
                        </div>
                        <div className="bg-slate-100 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl rounded-tl-sm text-xs sm:text-[13px] text-gray-800 flex-1 max-w-[90%] leading-snug break-words">
                          {campaignData.messageTemplate ? (
                            campaignData.messageTemplate
                              .replace(/\{\{username\}\}/g, 'alex.smith')
                              .replace(/\{\{first_name\}\}/g, 'Alex')
                          ) : (
                            <span className="text-slate-400 italic font-medium">Your message will appear here...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Conditions */}
                <div className="space-y-3 sm:space-y-4">
                   <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1 sm:mb-2 px-1">
                    <Clock className="w-4 h-4 text-pink-500" /> 3. Schedule & Limits
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/60 shadow-sm flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">Launch Timing</label>
                        
                        {/* Segmented Control */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                          <button
                            type="button"
                            onClick={() => setScheduleType('now')}
                            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${scheduleType === 'now' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                          >
                            <Zap className="w-3.5 h-3.5" /> Launch Now
                          </button>
                          <button
                            type="button"
                            onClick={() => setScheduleType('later')}
                            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${scheduleType === 'later' ? 'bg-white text-pink-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                          >
                            <CalendarDays className="w-3.5 h-3.5" /> Schedule
                          </button>
                        </div>
                        
                        {/* Custom Calendar */}
                        {scheduleType === 'later' && (
                          <div className="mt-3 bg-white border border-slate-200 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-3">
                              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <span className="text-[13px] font-bold text-slate-700">
                                {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
                              </span>
                              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-md text-slate-500 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-y-1 text-center mt-2 mb-2">
                              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-[10px] font-semibold text-slate-400 mb-1">{day}</div>
                              ))}
                              {blanks.map(blank => (
                                <div key={`blank-${blank}`} className="aspect-square"></div>
                              ))}
                              {days.map(day => {
                                const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonthDate.getMonth() && selectedDate?.getFullYear() === currentMonthDate.getFullYear();
                                // Create isolated today instance so we don't mutate the render-scope 'today' var
                                const todayDateOnly = new Date();
                                todayDateOnly.setHours(0,0,0,0);
                                const isPast = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day) < todayDateOnly;
                                
                                return (
                                  <div key={day} className="flex justify-center items-center aspect-square">
                                    <button
                                      type="button"
                                      disabled={isPast}
                                      onClick={() => setSelectedDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day))}
                                      className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] transition-all ${
                                        isSelected
                                          ? 'bg-pink-500 text-white font-extrabold shadow-lg shadow-pink-500/40 ring-4 ring-pink-500/20 scale-110 z-10'
                                          : isPast
                                            ? 'text-slate-300 opacity-40 cursor-not-allowed bg-slate-50/50'
                                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold'
                                      }`}
                                    >
                                      {day}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Time Selector */}
                            <div className="bg-slate-50 border border-slate-200 mt-4 px-3 py-2.5 rounded-xl flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200/60 text-pink-500">
                                  <Clock className="w-4 h-4" />
                                </div>
                                <span className="text-[13px] font-bold text-slate-700">Start Time</span>
                              </div>
                              <input 
                                type="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all appearance-none cursor-pointer hover:border-slate-300 shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">Media Budget Limit</label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="number" 
                            placeholder="Optional amount"
                            min="0"
                            className="w-full pl-9 pr-3 sm:pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all text-gray-700"
                            value={campaignData.budgetLimit}
                            onChange={(e) => setCampaignData({...campaignData, budgetLimit: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 shrink-0 pb-6 sm:pb-5">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-gray-500 w-full sm:w-auto">Cancel</Button>
              <Button type="submit" form="campaign-form" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 px-6 rounded-xl relative overflow-hidden group w-full sm:w-auto">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> Launch Campaign
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
