'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
const Container = () => {
  // 是否打开系统反馈
  const [feedback, setFeedback] = useState(false);
  const [notification, setNotification] = useState(false);
  const [language, setLanguage] = useState('en');

  return (
    <main className="mt-4 space-y-6 px-4">
      <Select value={language} onValueChange={(e) => setLanguage(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select language (English)" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">英语</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between">
        <Label htmlFor="feedback">Haptic Feedback</Label>
        <Switch
          id="feedback"
          checked={feedback}
          onCheckedChange={(e) => {
            setFeedback(e);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="feedback">Mute Notification</Label>
        <Switch
          id="feedback"
          checked={notification}
          onCheckedChange={(e) => {
            setNotification(e);
          }}
        />
      </div>
    </main>
  );
};

export default Container;
