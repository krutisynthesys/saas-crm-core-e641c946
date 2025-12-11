import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Plus, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const pageTitle: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Lead Management',
  '/opportunities': 'Opportunities',
  '/tasks': 'Tasks & Activities',
  '/activities': 'Activity Log',
  '/email-templates': 'Email Templates',
  '/content-library': 'Content Library',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

const notifications = [
  { id: 1, title: 'New lead assigned', description: 'Sarah Johnson - TechCorp', time: '5 min ago', unread: true },
  { id: 2, title: 'Task due today', description: 'Follow-up call with Michael Chen', time: '1 hour ago', unread: true },
  { id: 3, title: 'Deal won!', description: 'RetailMax - $150,000', time: '2 hours ago', unread: false },
  { id: 4, title: 'Meeting reminder', description: 'HealthPlus team sync in 30 min', time: '3 hours ago', unread: false },
];

export function TopBar() {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  const currentTitle = pageTitle[location.pathname] || 'CRM Pro';
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{currentTitle}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div
          className={cn(
            'relative transition-all duration-200',
            searchFocused ? 'w-80' : 'w-64'
          )}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads, tasks..."
            className="pl-9 pr-12 h-9 bg-secondary/50 border-transparent focus:border-primary focus:bg-background"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        {/* Quick add */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="gradient" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover">
            <DropdownMenuItem className="cursor-pointer">
              New Lead
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              New Opportunity
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              New Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Log Activity
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Send Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center animate-pulse-subtle">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 cursor-pointer',
                    notification.unread && 'bg-primary/5'
                  )}
                >
                  <div className="flex items-start gap-2 w-full">
                    {notification.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{notification.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
