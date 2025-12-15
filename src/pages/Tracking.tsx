import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Battery, Clock, Navigation, Phone, Mail, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const salesReps = [
  { id: 'U001', name: 'John Smith', email: 'john.smith@company.com', phone: '+1 (555) 123-4567', avatar: 'JS', status: 'active', battery: 78, loginTime: '08:32 AM', logoutTime: null, currentLocation: 'Downtown Office District', lat: 40.7128, lng: -74.006, route: [{ lat: 40.7128, lng: -74.006 }, { lat: 40.7145, lng: -74.002 }, { lat: 40.7168, lng: -73.998 }, { lat: 40.7189, lng: -73.992 }], visits: 5 },
  { id: 'U002', name: 'Emily Davis', email: 'emily.davis@company.com', phone: '+1 (555) 234-5678', avatar: 'ED', status: 'active', battery: 45, loginTime: '09:15 AM', logoutTime: null, currentLocation: 'Tech Hub Plaza', lat: 40.7589, lng: -73.9851, route: [{ lat: 40.7589, lng: -73.9851 }, { lat: 40.7612, lng: -73.9823 }, { lat: 40.7634, lng: -73.9798 }], visits: 3 },
  { id: 'U003', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', phone: '+1 (555) 345-6789', avatar: 'SW', status: 'inactive', battery: 12, loginTime: '07:45 AM', logoutTime: '05:30 PM', currentLocation: 'Last seen: Financial District', lat: 40.7074, lng: -74.0113, route: [], visits: 8 },
  { id: 'U004', name: 'Michael Chen', email: 'michael.chen@company.com', phone: '+1 (555) 456-7890', avatar: 'MC', status: 'active', battery: 92, loginTime: '08:00 AM', logoutTime: null, currentLocation: 'Westside Business Park', lat: 40.7282, lng: -74.0776, route: [{ lat: 40.7282, lng: -74.0776 }, { lat: 40.7298, lng: -74.0745 }, { lat: 40.7315, lng: -74.0712 }, { lat: 40.7331, lng: -74.0683 }, { lat: 40.7348, lng: -74.0651 }], visits: 6 },
];

export default function Tracking() {
  const [selectedRep, setSelectedRep] = useState(salesReps[0]);
  const [dateFilter, setDateFilter] = useState('today');

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600 bg-green-100';
    if (level > 20) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Field Sales Tracking</h2>
            <p className="text-muted-foreground">Monitor your field team's locations and activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-1.5" /> Refresh</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Reps List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Field Representatives</h3>
            <div className="space-y-3">
              {salesReps.map((rep) => (
                <Card key={rep.id} className={cn('cursor-pointer transition-all hover:shadow-md', selectedRep.id === rep.id && 'ring-2 ring-primary')} onClick={() => setSelectedRep(rep)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{rep.avatar}</AvatarFallback></Avatar>
                        <span className={cn('absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card', rep.status === 'active' ? 'bg-green-500' : 'bg-slate-400')} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{rep.name}</p>
                          <Badge variant={rep.status === 'active' ? 'default' : 'secondary'} className="text-xs">{rep.status === 'active' ? 'Online' : 'Offline'}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground truncate">{rep.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className={cn('flex items-center gap-1 px-1.5 py-0.5 rounded text-xs', getBatteryColor(rep.battery))}>
                            <Battery className="h-3 w-3" />{rep.battery}%
                          </div>
                          <span className="text-xs text-muted-foreground">{rep.visits} visits</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Navigation className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Map View</p>
                    <p className="text-sm text-muted-foreground">Connect Mapbox to enable live tracking</p>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{selectedRep.name}:</span>
                      <span className="text-muted-foreground">{selectedRep.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Lat: {selectedRep.lat.toFixed(4)}</span>
                      <span>Lng: {selectedRep.lng.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Route visualization placeholder */}
              {selectedRep.route.length > 0 && (
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-1">Route Points: {selectedRep.route.length}</p>
                  <div className="flex items-center gap-1">
                    {selectedRep.route.map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-primary" />
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Selected Rep Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Representative Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Login Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{selectedRep.loginTime}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Logout Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{selectedRep.logoutTime || 'Still active'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Battery Level</p>
                    <div className={cn('flex items-center gap-2 px-2 py-1 rounded w-fit', getBatteryColor(selectedRep.battery))}>
                      <Battery className="h-4 w-4" />
                      <span className="font-medium">{selectedRep.battery}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Visits Today</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{selectedRep.visits} locations</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm"><Phone className="h-4 w-4 mr-1.5" /> Call</Button>
                  <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-1.5" /> Email</Button>
                  <Button variant="outline" size="sm"><Navigation className="h-4 w-4 mr-1.5" /> Get Directions</Button>
                </div>
              </CardContent>
            </Card>

            {/* Route History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-4">
                    {selectedRep.route.length > 0 ? selectedRep.route.map((point, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className={cn('h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10', i === 0 ? 'bg-green-100 text-green-600' : i === selectedRep.route.length - 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                          {i === selectedRep.route.length - 1 ? <MapPin className="h-4 w-4" /> : <span className="text-xs font-medium">{i + 1}</span>}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-medium">{i === 0 ? 'Start Location' : i === selectedRep.route.length - 1 ? 'Current Location' : `Stop ${i}`}</p>
                          <p className="text-xs text-muted-foreground">Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-muted-foreground py-4">No route data available</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
