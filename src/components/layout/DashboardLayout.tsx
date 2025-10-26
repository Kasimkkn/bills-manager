import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, Settings as SettingsIcon, LayoutDashboard } from "lucide-react";
import { ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

const DashboardLayout = ({ children, title, action }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackHome = () => {
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/my-invoices', label: 'My Invoices', icon: FileText },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

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
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>

            {action && (
              <div className="flex items-center space-x-4">
                {action}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex space-x-1 border-b border-border/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
                    border-b-2 -mb-px
                    ${isActive(item.path)
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
