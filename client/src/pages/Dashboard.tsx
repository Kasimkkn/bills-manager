
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, FileText, Download, Edit, TrendingUp, Users, DollarSign } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TemplateGallery from '@/components/TemplateGallery';
import { useUsageTracking } from '@/hooks/useUsageTracking';

const Dashboard = () => {
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const navigate = useNavigate();
  const { remainingDownloads } = useUsageTracking();

  const handleBackHome = () => {
    navigate('/');
  };

  const handleCreateInvoice = () => {
    setShowTemplateGallery(true);
  };

  const handleTemplateSelected = () => {
    setShowTemplateGallery(false);
    navigate('/editor');
  };

  // Mock data for demo
  const stats = {
    totalInvoices: 12,
    totalAmount: 15420,
    paidInvoices: 8
  };

  const recentInvoices = [
    { id: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', date: '2024-01-15' },
    { id: 'INV-002', client: 'TechStart LLC', amount: 1800, status: 'pending', date: '2024-01-14' },
    { id: 'INV-003', client: 'Design Studio', amount: 3200, status: 'paid', date: '2024-01-12' },
    { id: 'INV-004', client: 'Marketing Plus', amount: 1500, status: 'overdue', date: '2024-01-10' },
    { id: 'INV-005', client: 'Local Business', amount: 950, status: 'paid', date: '2024-01-08' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBackHome}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {remainingDownloads > 0 && (
                <div className="text-sm text-muted-foreground">
                  {remainingDownloads} download{remainingDownloads !== 1 ? 's' : ''} remaining
                </div>
              )}

              <Button
                onClick={handleCreateInvoice}
                className="bg-black text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your invoices and track your business growth.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="surface border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvoices}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="surface border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="surface border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paidInvoices}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.paidInvoices / stats.totalInvoices) * 100)}% payment rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="surface border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Invoices</CardTitle>
              <Button
                onClick={handleCreateInvoice}
                size="sm"
                variant="outline"
                className="border-black/20 text-white hover:bg-black/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 glass rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-foreground">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>

                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onTemplateSelect={handleTemplateSelected}
      />
    </div>
  );
};

export default Dashboard;
