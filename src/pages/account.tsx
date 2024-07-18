import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Account() {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '+1234567890',
    dob: '1990-01-01',
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account</h1>
        <nav className="text-sm font-medium" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center">
            <span className="text-gray-900">Account</span>
            </li>
        </ol>
        </nav>
    </div>

    <Tabs defaultValue="profile">
        <TabsList className="mb-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
        <Card>
            <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Picture</Button>
            </div>
            <div className="space-y-4">
                <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
                </div>
                <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
                </div>
                <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                </div>
                <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} />
                </div>
                <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={user.dob} onChange={(e) => setUser({...user, dob: e.target.value})} />
                </div>
                <Button>Save Changes</Button>
            </div>
            </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="security">
        <Card>
            <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
                </div>
                <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
                </div>
                <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
                </div>
                <Button>Change Password</Button>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center space-x-2 mt-2">
                <Switch id="2fa" />
                <Label htmlFor="2fa">Enable 2FA</Label>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-medium">Login Activity</h3>
            </div>
            </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="preferences">
        <Card>
            <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div>
                <Label htmlFor="language">Language</Label>
                <Select>
                    <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Select>
                    <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div>
                <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Switch id="sms-notifications" />
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Switch id="push-notifications" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    </div>
                </div>
                </div>
                <Button>Save Preferences</Button>
            </div>
            </CardContent>
        </Card>
        </TabsContent>
    </Tabs>
    </div>
  );
}