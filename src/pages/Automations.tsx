import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Plus, ToggleLeft, ToggleRight, MoreHorizontal, MessageCircle, Video, Image as ImageIcon, Zap, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Automations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ruleData, setRuleData] = useState({
    name: '',
    trigger: 'Comment on Post',
    keyword: ''
  });

  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Summer Sale Masterclass',
      trigger: 'Comment on Reel',
      keyword: '"Send Link"',
      status: 'active',
      dmsSent: 1240,
      icon: Video,
      color: 'text-pink-500',
      bg: 'bg-pink-100'
    },
    {
      id: 2,
      name: 'E-book PDF Delivery',
      trigger: 'Story Reply',
      keyword: '"Ebook"',
      status: 'active',
      dmsSent: 4321,
      icon: MessageCircle,
      color: 'text-purple-500',
      bg: 'bg-purple-100'
    },
    {
      id: 3,
      name: 'Live QA Zoom Link',
      trigger: 'Comment on Live',
      keyword: 'Any comment',
      status: 'paused',
      dmsSent: 850,
      icon: Video,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100'
    },
    {
      id: 4,
      name: 'Giveaway Entry',
      trigger: 'Comment on Post',
      keyword: '"Win"',
      status: 'draft',
      dmsSent: 0,
      icon: ImageIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-100'
    },
    {
      id: 5,
      name: 'Weekly Newsletter Opt-in',
      trigger: 'Story Mention',
      keyword: '"Subscribe"',
      status: 'active',
      dmsSent: 512,
      icon: MessageCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-100'
    },
    {
      id: 6,
      name: 'Discount Code Bot',
      trigger: 'Direct Message',
      keyword: '"Discount"',
      status: 'active',
      dmsSent: 3400,
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100'
    },
    {
      id: 7,
      name: 'Podcast Link Delivery',
      trigger: 'Comment on Reel',
      keyword: '"Podcast"',
      status: 'paused',
      dmsSent: 1205,
      icon: Video,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100'
    },
    {
      id: 8,
      name: 'Consultation Booking',
      trigger: 'Comment on Post',
      keyword: '"Consult"',
      status: 'active',
      dmsSent: 90,
      icon: ImageIcon,
      color: 'text-slate-500',
      bg: 'bg-slate-100'
    }
  ]);

  const toggleStatus = (id: number) => {
    setAutomations(current => 
      current.map(rule => {
        if (rule.id === id) {
          // If draft, maybe toggle to active? Or usually toggle between active/paused
          const nextStatus = rule.status === 'active' ? 'paused' : 'active';
          return { ...rule, status: nextStatus };
        }
        return rule;
      })
    );
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule = {
      id: automations.length + 1,
      name: ruleData.name || 'New Rule',
      trigger: ruleData.trigger,
      keyword: `"${ruleData.keyword}"` || 'Any comment',
      status: 'active',
      dmsSent: 0,
      icon: MessageCircle,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100'
    };
    setAutomations([newRule, ...automations]);
    setIsModalOpen(false);
    setRuleData({ name: '', trigger: 'Comment on Post', keyword: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Automations</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your triggers and direct message responses.</p>
        </div>
        <Button className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Rule
        </Button>
      </div>

      <Card>
        {automations.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-indigo-100">
              <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Automations Yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">Set up rules to automatically reply to comments and send direct messages when users engage with your content.</p>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20">
              <Plus className="w-4 h-4" />
              Create Rule
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-200 text-gray-500 font-medium text-sm rounded-t-xl items-center">
              <div className="col-span-4">Automation Name</div>
              <div className="col-span-3">Trigger & Keyword</div>
              <div className="col-span-2">Performance</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y divide-gray-100 p-2">
              {automations.map((rule) => (
            <div key={rule.id} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 md:gap-x-4 lg:gap-4 p-4 md:p-5 lg:px-6 lg:py-4 hover:bg-gray-50/80 hover:shadow-sm rounded-xl transition-all duration-200 group relative lg:items-center">
              
              <div className="col-span-1 md:col-span-3 lg:col-span-4 flex items-center justify-between lg:justify-start gap-4 mb-3 md:mb-4 lg:mb-0">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg shrink-0", rule.bg, rule.color)}>
                    <rule.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-900">{rule.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-gray-900 -mr-2">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="col-span-1 md:col-span-1 lg:col-span-3 flex justify-between md:flex-col md:justify-start lg:justify-center mb-3 md:mb-0">
                <span className="text-xs text-gray-500 font-semibold uppercase lg:hidden flex items-center md:mb-1.5 tracking-wider">Trigger</span>
                <div className="text-right md:text-left">
                  <span className="font-medium text-gray-900 block text-sm">{rule.trigger}</span>
                  <span className="text-gray-500 text-xs md:mt-0.5 block">Keyword: {rule.keyword}</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 lg:col-span-2 flex justify-between md:flex-col md:justify-start lg:justify-center mb-3 md:mb-0">
                <span className="text-xs text-gray-500 font-semibold uppercase lg:hidden flex items-center md:mb-1.5 tracking-wider">Performance</span>
                <div className="text-right md:text-left">
                  <span className="font-medium text-gray-900 block text-sm">{rule.dmsSent.toLocaleString()} DMs</span>
                  <span className="text-green-600 text-xs md:mt-0.5 block font-medium">High Conv.</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 lg:col-span-2 flex justify-between md:flex-col md:justify-start lg:justify-center md:items-start lg:items-center">
                <span className="text-xs text-gray-500 font-semibold uppercase lg:hidden flex items-center md:mb-2 tracking-wider">Status</span>
                <button 
                  onClick={() => toggleStatus(rule.id)}
                  className="flex items-center hover:opacity-80 transition-opacity focus:outline-none rounded -mr-1 md:mr-0 lg:ml-0"
                >
                  {rule.status === 'active' ? (
                    <div className="flex items-center gap-2 text-indigo-600">
                      <ToggleRight className="w-5 h-5" />
                      <span className="font-medium text-xs uppercase tracking-wider">Active</span>
                    </div>
                  ) : rule.status === 'paused' ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <ToggleLeft className="w-5 h-5" />
                      <span className="font-medium text-xs uppercase tracking-wider">Paused</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                      </div>
                      <span className="font-medium text-xs uppercase tracking-wider">Draft</span>
                    </div>
                  )}
                </button>
              </div>

              <div className="hidden lg:flex col-span-1 justify-end">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          </div>
        </>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50 shadow-none flex flex-col items-center justify-center p-12 text-center">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Story Mention Rule</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-xs">Send a DM whenever someone tags you in their Instagram Story.</p>
          <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">Create Setup</Button>
        </Card>
        
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50 shadow-none flex flex-col items-center justify-center p-12 text-center">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Comment Rule</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-xs">Send resources to users who comment a specific word during your IG Live.</p>
          <Button variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">Create Setup</Button>
        </Card>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">Create New Rule</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 hover:bg-gray-200/50">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="rule-form" onSubmit={handleCreateRule} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Rule Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Summer Sale Masterclass"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
                    value={ruleData.name}
                    onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Trigger Type</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white transition-shadow"
                    value={ruleData.trigger}
                    onChange={(e) => setRuleData({ ...ruleData, trigger: e.target.value })}
                  >
                    <option value="Comment on Post">Comment on Post</option>
                    <option value="Comment on Reel">Comment on Reel</option>
                    <option value="Story Reply">Story Reply</option>
                    <option value="Story Mention">Story Mention</option>
                    <option value="Comment on Live">Comment on Live</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Target Keyword</label>
                  <input 
                    type="text" 
                    required 
                    placeholder='e.g., "Link" or "Guide"'
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
                    value={ruleData.keyword}
                    onChange={(e) => setRuleData({ ...ruleData, keyword: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">The exact word you want users to comment.</p>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-xl">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="bg-white border-gray-200">Cancel</Button>
              <Button type="submit" form="rule-form" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20">Save Rule</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
