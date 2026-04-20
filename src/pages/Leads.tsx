import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Search, Download, Filter, MoreHorizontal, MessageSquare, Instagram } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const initialLeads = [
  { id: 1, handle: '@alex_dev', name: 'Alex Smith', status: 'Converted', source: 'Reel Comment', date: '2 hours ago', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, handle: '@sarah.marketing', name: 'Sarah Jones', status: 'Responded', source: 'Story Reply', date: '5 hours ago', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, handle: '@mike_fitness', name: 'Mike Johnson', status: 'Messaged', source: 'Post Comment', date: '1 day ago', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: 4, handle: '@emily_creates', name: 'Emily Davis', status: 'Converted', source: 'Live Comment', date: '1 day ago', avatar: 'https://picsum.photos/seed/user4/100/100' },
  { id: 5, handle: '@tech_guru99', name: 'James Wilson', status: 'Messaged', source: 'Story Mention', date: '2 days ago', avatar: 'https://picsum.photos/seed/user5/100/100' },
  { id: 6, handle: '@design_by_anna', name: 'Anna Taylor', status: 'Responded', source: 'Reel Comment', date: '3 days ago', avatar: 'https://picsum.photos/seed/user6/100/100' },
  { id: 7, handle: '@foodie_adventures', name: 'Chris Brown', status: 'Messaged', source: 'Post Comment', date: '3 days ago', avatar: 'https://picsum.photos/seed/user7/100/100' },
  { id: 8, handle: '@startup_founder', name: 'Kevin Oh', status: 'Converted', source: 'Story Reply', date: '4 days ago', avatar: 'https://picsum.photos/seed/user8/100/100' },
  { id: 9, handle: '@yoga_with_amy', name: 'Amy Chen', status: 'Messaged', source: 'Live Comment', date: '4 days ago', avatar: 'https://picsum.photos/seed/user9/100/100' },
  { id: 10, handle: '@photo_graphy101', name: 'David Miller', status: 'Responded', source: 'Reel Comment', date: '5 days ago', avatar: 'https://picsum.photos/seed/user10/100/100' },
  { id: 11, handle: '@traveling_nomad', name: 'Chris Perry', status: 'Converted', source: 'Post Comment', date: '5 days ago', avatar: 'https://picsum.photos/seed/user11/100/100' },
  { id: 12, handle: '@baker_girl_98', name: 'Chloe Brown', status: 'Messaged', source: 'Story Reply', date: '6 days ago', avatar: 'https://picsum.photos/seed/user12/100/100' },
  { id: 13, handle: '@crypto_whale', name: 'Max Torres', status: 'Converted', source: 'Reel Comment', date: '6 days ago', avatar: 'https://picsum.photos/seed/user13/100/100' },
  { id: 14, handle: '@daily_motivation', name: 'Jane Doe', status: 'Responded', source: 'Story Mention', date: '1 week ago', avatar: 'https://picsum.photos/seed/user14/100/100' },
  { id: 15, handle: '@code.snippets', name: 'Dev Sharma', status: 'Messaged', source: 'Post Comment', date: '1 week ago', avatar: 'https://picsum.photos/seed/user15/100/100' },
];

export function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.handle.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Converted': return 'bg-green-100 text-green-700 border-green-200';
      case 'Responded': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Messaged': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads CRM</h1>
          <p className="text-sm text-gray-500 mt-1">Manage users who have interacted with your automations.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Button variant="outline" className="flex-1 md:flex-none gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 rounded-t-xl">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by handle or name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filter Status
          </Button>
        </div>
        
        <div className="md:hidden divide-y divide-gray-100 bg-white">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="p-4 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Instagram className="w-3 h-3" /> {lead.handle}
                    </div>
                  </div>
                </div>
                <span className={cn("px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-md border whitespace-nowrap", getStatusColor(lead.status))}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-end justify-between text-xs text-gray-500">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-gray-700">{lead.source}</span>
                  <span className="text-gray-400">{lead.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filteredLeads.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              No leads found matching "{searchTerm}"
            </div>
          )}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">User</th>
                <th className="px-6 py-4 font-medium tracking-wider">Lead Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Trigger Source</th>
                <th className="px-6 py-4 font-medium tracking-wider">Last Activity</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Instagram className="w-3 h-3" /> {lead.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-md border", getStatusColor(lead.status))}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                    {lead.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No leads found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-gray-500">
          <span className="text-center sm:text-left">Showing <span className="font-medium text-gray-900">{filteredLeads.length}</span> recorded leads</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" disabled className="h-8 flex-1 sm:flex-none">Previous</Button>
            <Button variant="outline" size="sm" className="h-8 flex-1 sm:flex-none">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
