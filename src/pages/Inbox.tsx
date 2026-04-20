import React, { useState } from 'react';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Search, Send, MoreVertical, CheckCircle2, AlertCircle, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockThreads = [
  { id: 1, handle: '@alex_dev', name: 'Alex Smith', lastMessage: 'Thanks for the guide!', time: '10m', unread: true, status: 'manual' },
  { id: 2, handle: '@emily_creates', name: 'Emily Davis', lastMessage: 'Auto-reply: Here is the link to the blueprint...', time: '1h', unread: false, status: 'auto' },
  { id: 3, handle: '@mike_fitness', name: 'Mike Johnson', lastMessage: 'Is this available internationally? I am based in the UK.', time: '3h', unread: true, status: 'manual' },
  { id: 4, handle: '@sarah.marketing', name: 'Sarah Jones', lastMessage: 'Auto-reply: Got your comment! Check your mailbox.', time: '5h', unread: false, status: 'auto' },
  { id: 5, handle: '@tech_guru99', name: 'James Wilson', lastMessage: 'Awesome', time: '1d', unread: false, status: 'auto' },
  { id: 6, handle: '@coffee.and.code', name: 'Laura Martinez', lastMessage: 'The link seems to be broken?', time: '1d', unread: true, status: 'manual' },
  { id: 7, handle: '@design_by_j', name: 'Jason Lee', lastMessage: 'Auto-reply: Welcome to our 5-day challenge!', time: '2d', unread: false, status: 'auto' },
  { id: 8, handle: '@startup_founder', name: 'Kevin O.', lastMessage: 'How do I upgrade my license to commercial?', time: '2d', unread: true, status: 'manual' },
  { id: 9, handle: '@yoga_with_amy', name: 'Amy Chen', lastMessage: 'Auto-reply: Free meditation audio sent!', time: '3d', unread: false, status: 'auto' },
  { id: 10, handle: '@traveling_nomad', name: 'Chris P.', lastMessage: 'Send me the details please!', time: '4d', unread: false, status: 'manual' },
  { id: 11, handle: '@baker_girl_98', name: 'Chloe Brown', lastMessage: 'I loved this recipe!', time: '5d', unread: false, status: 'manual' },
  { id: 12, handle: '@crypto_whale', name: 'Max T.', lastMessage: 'Auto-reply: Your webinar seat is secured.', time: '1w', unread: false, status: 'auto' },
];

export function Inbox() {
  const [activeThread, setActiveThread] = useState(mockThreads[0]);
  const [replyText, setReplyText] = useState('');
  const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);

  return (
    <div className="h-[calc(100dvh-7rem)] md:h-[calc(100dvh-8rem)] flex flex-col">
      <div className={cn("mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2", isChatOpenOnMobile ? "hidden md:flex" : "flex")}>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Inbox & Logs</h1>
          <p className="text-sm text-gray-500">Review automated messages and take over conversations.</p>
        </div>
      </div>

      <Card className="flex-1 flex overflow-hidden border-gray-200 shadow-sm relative">
        {/* Sidebar / Thread List */}
        <div className={cn(
          "w-full md:w-80 border-r border-gray-200 bg-white flex flex-col shrink-0 transition-transform",
          isChatOpenOnMobile ? "hidden md:flex" : "flex"
        )}>
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {mockThreads.map(thread => (
              <button 
                key={thread.id}
                onClick={() => {
                  setActiveThread(thread);
                  setIsChatOpenOnMobile(true);
                }}
                className={cn(
                  "w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 relative",
                  activeThread.id === thread.id && "bg-indigo-50/50 border-l-4 border-indigo-500 p-4 pl-3"
                )}
              >
                <div className="relative shrink-0">
                  <img src={`https://picsum.photos/seed/${thread.id}/100/100`} alt="" className="w-10 h-10 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  {thread.unread && <div className="absolute top-0 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm text-gray-900 truncate">{thread.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{thread.time}</span>
                  </div>
                  <p className={cn("text-xs truncate", thread.unread ? "text-gray-900 font-medium" : "text-gray-500")}>
                    {thread.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-gray-50/30 min-w-0",
          isChatOpenOnMobile ? "flex" : "hidden md:flex"
        )}>
          <div className="h-16 px-4 md:px-6 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsChatOpenOnMobile(false)}
                className="md:hidden -ml-2 text-gray-500 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={`https://picsum.photos/seed/${activeThread.id}/100/100`} className="w-9 h-9 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{activeThread.name}</h3>
                <p className="text-xs text-gray-500 hidden sm:block">{activeThread.handle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-1.5 py-1 sm:px-2 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> <span className="hidden sm:inline">Auto-DM Sent</span>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 sm:-mr-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="text-center text-xs text-gray-400 font-medium my-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span>Today</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Simulated Bot Message */}
            <div className="flex items-end gap-2 justify-end">
              <div className="flex flex-col items-end">
                <div className="text-[10px] text-gray-400 font-medium mb-1 mr-1 flex items-center gap-1"><Clock className="w-3 h-3"/> 10:45 AM (Automated)</div>
                <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-sm text-sm shadow-sm leading-relaxed whitespace-pre-wrap">
                  Hey {activeThread.name.split(' ')[0]}! Thanks for commenting on my post. Here is the link to the guide as promised: https://link.com/guide
                </div>
              </div>
            </div>

            {/* Simulated User Message */}
            {activeThread.unread || activeThread.id === 1 || activeThread.id === 3 ? (
              <div className="flex items-end gap-2">
                <img src={`https://picsum.photos/seed/${activeThread.id}/100/100`} className="w-6 h-6 rounded-full mb-1 shrink-0 hidden sm:block" referrerPolicy="no-referrer" />
                <div className="flex flex-col items-start">
                  <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-sm text-sm text-gray-800 shadow-sm leading-relaxed whitespace-pre-wrap">
                    {activeThread.lastMessage}
                  </div>
                </div>
              </div>
            ) : null}

            {activeThread.id === 3 && (
              <div className="flex justify-center my-4">
                <div className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm text-center">
                  <AlertCircle className="w-4 h-4 shrink-0" /> User requires manual response
                </div>
              </div>
            )}
          </div>

          <div className="p-3 md:p-4 bg-white border-t border-gray-200">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Type a manual reply to take over..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && replyText) {
                    setReplyText('');
                    // In a real app we'd dispatch a message 
                  }
                }}
                className="w-full pl-4 pr-12 py-3 md:py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
              />
              <Button 
                onClick={() => setReplyText('')}
                disabled={!replyText}
                size="icon" 
                className="absolute right-1.5 h-[calc(100%-12px)] aspect-square rounded-full bg-indigo-600 hover:bg-indigo-700 transform transition-transform"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-[10px] text-gray-500 text-center mt-2 font-medium px-2">
              Replying manually will pause active automations for this user for 24 hours.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
