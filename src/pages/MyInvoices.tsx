import { useState } from "react";
import { Search, Plus, Download, Eye, Edit, Copy, FileX, Trash2, Filter, FileText, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Invoice {
  invoiceNumber: string;
  date: string;
  customerName: string;
  amount: number;
  status: "Draft" | "Generated" | "Paid" | "Cancelled";
}

// Mock data
const mockInvoices: Invoice[] = [
  {
    invoiceNumber: "INV-001",
    date: "2025-10-20",
    customerName: "John Doe",
    amount: 15000,
    status: "Paid"
  },
  {
    invoiceNumber: "INV-002",
    date: "2025-10-21",
    customerName: "Jane Smith",
    amount: 25000,
    status: "Generated"
  },
  {
    invoiceNumber: "INV-003",
    date: "2025-10-22",
    customerName: "Bob Johnson",
    amount: 8500,
    status: "Draft"
  }
];

export default function MyInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(i => i.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(i => i.status === "Generated").reduce((sum, inv) => sum + inv.amount, 0),
  };

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Draft": return "bg-muted text-muted-foreground";
      case "Generated": return "bg-blue-100 text-blue-700";
      case "Paid": return "bg-green-100 text-green-700";
      case "Cancelled": return "bg-red-100 text-red-700";
    }
  };

  const handleMarkAsPaid = (invoiceNumber: string) => {
    setInvoices(invoices.map(inv =>
      inv.invoiceNumber === invoiceNumber ? { ...inv, status: "Paid" as const } : inv
    ));
    toast({ title: "Invoice marked as paid" });
  };

  const handleCancelInvoice = (invoiceNumber: string) => {
    setInvoices(invoices.map(inv =>
      inv.invoiceNumber === invoiceNumber ? { ...inv, status: "Cancelled" as const } : inv
    ));
    toast({ title: "Invoice cancelled" });
  };

  const handleDeleteInvoice = (invoiceNumber: string) => {
    setInvoices(invoices.filter(inv => inv.invoiceNumber !== invoiceNumber));
    toast({ title: "Invoice deleted" });
  };

  return (
    <DashboardLayout
      title="My Invoices"
      action={
        <div className="flex gap-2">
          <Button onClick={() => navigate("/create")} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>

        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{stats.paid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Received payments</p>
          </CardContent>
        </Card>

        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{stats.pending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 my-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice number or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", "Draft", "Generated", "Paid", "Cancelled"].map(status => (
              <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Invoices Table */}
      {filteredInvoices.length === 0 ? (
        <Card className="surface border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold mb-2">No invoices found</p>
            <p className="text-muted-foreground mb-4">Create your first invoice to get started</p>
            <Button onClick={() => navigate("/create")}>Create Invoice</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="surface border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Invoice #</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Customer</th>
                    <th className="text-right p-4 font-semibold">Amount</th>
                    <th className="text-center p-4 font-semibold">Status</th>
                    <th className="text-right p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.invoiceNumber} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">{invoice.invoiceNumber}</td>
                      <td className="p-4">{new Date(invoice.date).toLocaleDateString()}</td>
                      <td className="p-4">{invoice.customerName}</td>
                      <td className="p-4 text-right font-semibold">₹{invoice.amount.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            {invoice.status === "Draft" && (
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            {invoice.status === "Generated" && (
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.invoiceNumber)}>
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleCancelInvoice(invoice.invoiceNumber)}
                              className="text-orange-600"
                            >
                              <FileX className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                            {invoice.status === "Draft" && (
                              <DropdownMenuItem
                                onClick={() => handleDeleteInvoice(invoice.invoiceNumber)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
