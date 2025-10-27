import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  FileText,
  Users,
  Settings as SettingsIcon,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react"
import { ReactNode, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  action?: ReactNode
}

const DashboardLayout = ({ children, title, action }: DashboardLayoutProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleBackHome = () => navigate("/")

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/customers", label: "Customers", icon: Users },
    { path: "/my-invoices", label: "My Invoices", icon: FileText },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {menuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex flex-col h-full">
                    <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                      <h2 className="text-lg font-semibold">Menu</h2>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive(item.path)
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Back & Title */}
            <Button
              variant="link"
              onClick={handleBackHome}
              className="hidden sm:flex text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <Separator orientation="vertical" className="hidden sm:block h-6" />

            <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
          </div>

          {/* Action button (if any) */}
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block border-t border-border/40">
          <div className="container mx-auto px-4 lg:px-6 flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${isActive(item.path)
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 lg:px-6 py-6">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
