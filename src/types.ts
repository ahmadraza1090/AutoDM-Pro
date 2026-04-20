export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  triggerType: 'story_reply' | 'post_comment' | 'live_comment';
  targetPost?: string;
  messageTemplate: string;
  sentCount: number;
  conversionRate: number;
  createdAt: string;
}

export interface ActivityMetric {
  date: string;
  messagesSent: number;
  replies: number;
}
