import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle><CardDescription>Update your personal details</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20"><AvatarFallback className="text-xl bg-primary/10 text-primary">{user?.avatar}</AvatarFallback></Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
                  <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} /></div>
                  <div className="space-y-2"><Label>Role</Label><Input defaultValue={user?.role} disabled /></div>
                  <div className="space-y-2"><Label>Department</Label><Input defaultValue={user?.department} /></div>
                </div>
                <Button onClick={() => toast.success('Profile updated!')}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {['Email notifications', 'Push notifications', 'Task reminders', 'Lead assignments'].map((item) => (
                  <div key={item} className="flex items-center justify-between py-2">
                    <span>{item}</span><Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
                <Button onClick={() => toast.success('Password updated!')}>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
