import { useState } from "react";
import { Search, Plus, Grid, List, Edit, Trash2, Mail, Phone, Users as UsersIcon, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsiveModal from "@/components/ui/responsive-modal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomerInfo } from "@/types/invoice";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data
const mockCustomers: CustomerInfo[] = [
  {
    name: "John Doe",
    phone: "9876543210",
    email: "john@example.com",
    gstin: "22AAAAA0000A1Z5",
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001",
      street: "123 Main St"
    }
  },
  {
    name: "Jane Smith",
    phone: "8765432109",
    email: "jane@example.com",
    address: {
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110001"
    }
  }
];

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerInfo[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerInfo | null>(null);
  const [formData, setFormData] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    gstin: "",
    address: {
      city: "",
      state: "",
      country: "India",
      pincode: "",
      street: ""
    }
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<CustomerInfo | null>(null);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      gstin: "",
      address: {
        city: "",
        state: "",
        country: "India",
        pincode: "",
        street: ""
      }
    });
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: CustomerInfo) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.phone === editingCustomer.phone ? formData : c));
      toast({ title: "Customer updated successfully" });
    } else {
      setCustomers([...customers, formData]);
      toast({ title: "Customer added successfully" });
    }
    setIsModalOpen(false);
  };

  const handleDeleteCustomer = (customer: CustomerInfo) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      setCustomers(customers.filter(c => c.phone !== customerToDelete.phone));
      toast({ title: "Customer deleted successfully" });
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  return (
    <DashboardLayout
      title="Customers"
      action={
        <Button onClick={handleAddCustomer} className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Active customer base</p>
          </CardContent>
        </Card>

        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Across all customers</p>
          </CardContent>
        </Card>

        <Card className="surface border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Business</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            <p className="text-xs text-muted-foreground">Total revenue generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customers Display */}
      {filteredCustomers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold mb-2">No customers yet</p>
            <p className="text-muted-foreground mb-4">Add your first customer to get started</p>
            <Button onClick={handleAddCustomer}>Add First Customer</Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => (
            <Card key={index}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{customer.name}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCustomer(customer)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}
                  <p className="text-muted-foreground">
                    {customer.address?.city}, {customer.address?.state}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">City</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4">{customer.phone}</td>
                      <td className="p-4">{customer.email || "-"}</td>
                      <td className="p-4">{customer.address?.city || "-"}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCustomer(customer)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <ResponsiveModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Customer Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter customer name"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="10-digit phone number"
              maxLength={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="customer@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>GSTIN</Label>
            <Input
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              placeholder="15-character GSTIN"
              maxLength={15}
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={formData.address?.street}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, street: e.target.value }
              })}
              placeholder="Street address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={formData.address?.city}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address!, city: e.target.value }
                })}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input
                value={formData.address?.state}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address!, state: e.target.value }
                })}
                placeholder="State"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>PIN Code</Label>
            <Input
              value={formData.address?.pincode}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address!, pincode: e.target.value }
              })}
              placeholder="6-digit PIN"
              maxLength={6}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomer} disabled={!formData.name || !formData.phone}>
              Save Customer
            </Button>
          </div>
        </div>
      </ResponsiveModal>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={`Delete ${customerToDelete?.name}?`}
        description="This action cannot be undone. All invoice history will remain."
      />
    </DashboardLayout>
  );
}
