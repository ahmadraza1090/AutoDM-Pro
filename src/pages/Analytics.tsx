import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { name: '01 Apr', conversion: 10, clicks: 400 },
  { name: '03 Apr', conversion: 11, clicks: 420 },
  { name: '05 Apr', conversion: 12, clicks: 500 },
  { name: '07 Apr', conversion: 10, clicks: 480 },
  { name: '10 Apr', conversion: 14, clicks: 600 },
  { name: '12 Apr', conversion: 15, clicks: 750 },
  { name: '15 Apr', conversion: 11, clicks: 800 },
  { name: '17 Apr', conversion: 13, clicks: 950 },
  { name: '20 Apr', conversion: 16, clicks: 1200 },
  { name: '22 Apr', conversion: 18, clicks: 1400 },
  { name: '25 Apr', conversion: 15, clicks: 1300 },
  { name: '27 Apr', conversion: 17, clicks: 1500 },
  { name: '30 Apr', conversion: 18, clicks: 1600 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Deep dive into your funnel performance and conversion rates.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">Export CSV</Button>
          <Button className="flex-1 sm:flex-none">Last 30 Days</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Link Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">24,502</div>
            <p className="text-xs text-green-600 font-medium mt-1">+12.5% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Click-Through Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">42.8%</div>
            <p className="text-xs text-green-600 font-medium mt-1">+4.1% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Emails Captured (Leads)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3,140</div>
            <p className="text-xs text-gray-500 font-medium mt-1">via Typeform Integration</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel Trends</CardTitle>
          <CardDescription>Metrics tracked across all active automations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full focus:outline-none focus-visible:outline-none">
            <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
              <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Link Clicks" />
                <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Conversion %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Performing Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { word: 'Link', count: 18450, rate: '45%' },
                { word: 'Masterclass', count: 12200, rate: '52%' },
                { word: 'Guide', count: 8900, rate: '41%' },
                { word: 'Tools', count: 4500, rate: '38%' },
                { word: 'Webinar', count: 3200, rate: '49%' },
                { word: 'Freebie', count: 2100, rate: '43%' },
                { word: 'Scale', count: 1800, rate: '35%' },
              ].map((kw, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 font-mono text-sm">0{i+1}</div>
                    <div className="font-medium text-gray-900 border border-gray-200 px-2 py-0.5 rounded bg-gray-50 text-sm">"{kw.word}"</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-gray-500">{kw.count.toLocaleString()} triggers</div>
                    <div className="font-semibold text-green-600">{kw.rate} CTR</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: 'Instagram Reels', val: 56, color: 'bg-indigo-500' },
                { source: 'Instagram Stories', val: 28, color: 'bg-pink-500' },
                { source: 'Feed Posts', val: 12, color: 'bg-purple-500' },
                { source: 'IG Live', val: 4, color: 'bg-orange-500' },
              ].map((src, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{src.source}</span>
                    <span className="font-semibold">{src.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${src.color}`} style={{ width: `${src.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
