import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Image, Video, File, FolderOpen } from 'lucide-react';

const assets = [
  { id: 1, name: 'Product Brochure.pdf', type: 'document', size: '2.4 MB' },
  { id: 2, name: 'Case Study - TechCorp.pdf', type: 'document', size: '1.8 MB' },
  { id: 3, name: 'Company Logo.png', type: 'image', size: '245 KB' },
  { id: 4, name: 'Product Demo.mp4', type: 'video', size: '45 MB' },
  { id: 5, name: 'Pricing Sheet.xlsx', type: 'document', size: '156 KB' },
];

const typeIcons = { document: FileText, image: Image, video: Video };
const typeColors = { document: 'bg-blue-100 text-blue-600', image: 'bg-green-100 text-green-600', video: 'bg-purple-100 text-purple-600' };

export default function ContentLibrary() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Content Library</h2>
            <p className="text-muted-foreground">Manage marketing materials and assets</p>
          </div>
          <Button variant="gradient"><Plus className="h-4 w-4 mr-1.5" /> Upload Asset</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {assets.map((asset) => {
                const Icon = typeIcons[asset.type as keyof typeof typeIcons] || File;
                const color = typeColors[asset.type as keyof typeof typeColors] || 'bg-slate-100 text-slate-600';
                return (
                  <Card key={asset.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="font-medium text-foreground mt-3 truncate">{asset.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{asset.size}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
