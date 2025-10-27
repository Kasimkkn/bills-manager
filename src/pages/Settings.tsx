import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Settings() {
  const { toast } = useToast();

  const [businessProfile, setBusinessProfile] = useState({
    name: "My Business",
    type: "Retailer",
    owner: "John Doe",
    phone: "9876543210",
    email: "business@example.com",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    gstin: "22AAAAA0000A1Z5",
    gstRegistered: true,
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: "HDFC Bank",
    accountHolder: "My Business",
    accountNumber: "123456789012",
    ifsc: "HDFC0001234",
    branch: "Mumbai Main",
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV-",
    nextNumber: "1001",
    defaultTax: "18",
    paymentTerms: "Net 30 days",
    showLogo: true,
    showBank: true,
  });

  const handleSave = (section: string) => {
    toast({ title: `${section} saved successfully` });
  };

  return (
    <DashboardLayout title="Settings">
      <Tabs defaultValue="business" className="space-y-6">
        {/* Responsive, Scrollable Tabs */}
        <div className="overflow-x-auto">
          <TabsList
            className="
              flex min-w-max md:min-w-0 md:w-full
              gap-1
              border border-border/50
              rounded-lg
              bg-muted/50
              p-1
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
            "
          >
            <TabsTrigger value="business" className="flex-1 whitespace-nowrap">
              Business Profile
            </TabsTrigger>
            <TabsTrigger value="invoice" className="flex-1 whitespace-nowrap">
              Invoice Settings
            </TabsTrigger>
            <TabsTrigger value="account" className="flex-1 whitespace-nowrap">
              Account
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex-1 whitespace-nowrap"
            >
              Preferences
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Business Profile Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={businessProfile.name}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select
                    value={businessProfile.type}
                    onValueChange={(v) =>
                      setBusinessProfile({ ...businessProfile, type: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retailer">Retailer</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                      <SelectItem value="Service Provider">
                        Service Provider
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input
                    value={businessProfile.owner}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        owner: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input
                    value={businessProfile.phone}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2 col-span-full">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={businessProfile.email}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2 col-span-full">
                  <Label>Address</Label>
                  <Textarea
                    value={businessProfile.address}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={businessProfile.city}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        city: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <Input
                    value={businessProfile.state}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        state: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>PIN Code</Label>
                  <Input
                    value={businessProfile.pincode}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        pincode: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>GSTIN</Label>
                  <Input
                    value={businessProfile.gstin}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        gstin: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={businessProfile.gstRegistered}
                  onCheckedChange={(checked) =>
                    setBusinessProfile({
                      ...businessProfile,
                      gstRegistered: checked,
                    })
                  }
                />
                <Label>GST Registered</Label>
              </div>

              <Button onClick={() => handleSave("Business Profile")}>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input
                    value={bankDetails.bankName}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        bankName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Holder Name</Label>
                  <Input
                    value={bankDetails.accountHolder}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        accountHolder: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>IFSC Code</Label>
                  <Input
                    value={bankDetails.ifsc}
                    onChange={(e) =>
                      setBankDetails({
                        ...bankDetails,
                        ifsc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Bank Details")}>
                Save Bank Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoice" className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Invoice Numbering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">

                <div className="space-y-2">

                  <Label>Invoice Prefix</Label>
                  <Input
                    value={invoiceSettings.prefix}
                    onChange={(e) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        prefix: e.target.value,
                      })
                    }
                    placeholder="INV-"
                  />
                </div>
                <div className="space-y-2">

                  <Label>Next Invoice Number</Label>
                  <Input
                    value={invoiceSettings.nextNumber}
                    onChange={(e) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        nextNumber: e.target.value,
                      })
                    }
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>

            <CardHeader>

              <CardTitle>Default Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label>Default Tax Rate</Label>
                <Select
                  value={invoiceSettings.defaultTax}
                  onValueChange={(v) =>
                    setInvoiceSettings({ ...invoiceSettings, defaultTax: v })
                  }
                >

                  <SelectTrigger>

                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="0">No Tax (0%)</SelectItem>
                    <SelectItem value="5">GST 5%</SelectItem>
                    <SelectItem value="12">GST 12%</SelectItem>
                    <SelectItem value="18">GST 18%</SelectItem>
                    <SelectItem value="28">GST 28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">

                <Label>Payment Terms</Label>
                <Select
                  value={invoiceSettings.paymentTerms}
                  onValueChange={(v) =>
                    setInvoiceSettings({ ...invoiceSettings, paymentTerms: v })
                  }
                >

                  <SelectTrigger>

                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="Due on receipt">
                      Due on receipt
                    </SelectItem>
                    <SelectItem value="Net 15 days">Net 15 days</SelectItem>
                    <SelectItem value="Net 30 days">Net 30 days</SelectItem>
                    <SelectItem value="Net 45 days">Net 45 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <Label>Show business logo on invoice</Label>
                  <Switch
                    checked={invoiceSettings.showLogo}
                    onCheckedChange={(checked) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        showLogo: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">

                  <Label>Show bank details</Label>
                  <Switch
                    checked={invoiceSettings.showBank}
                    onCheckedChange={(checked) =>
                      setInvoiceSettings({
                        ...invoiceSettings,
                        showBank: checked,
                      })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Invoice Settings")}>
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">

          <Card>

            <CardHeader>

              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label>Full Name</Label> <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-2">

                <Label>Email</Label>
                <Input type="email" defaultValue="john@example.com" disabled />
              </div>
              <div className="space-y-2">

                <Label>
                  Phone Number
                </Label> <Input defaultValue="9876543210" />
              </div>
              <Button onClick={() => handleSave("Profile")}>
                Save Profile
              </Button>
            </CardContent>
          </Card>
          <Card>

            <CardHeader>

              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label>Current Password</Label> <Input type="password" />
              </div>
              <div className="space-y-2">

                <Label>New Password</Label> <Input type="password" />
              </div>
              <div className="space-y-2">

                <Label>
                  Confirm New Password
                </Label> <Input type="password" />
              </div>
              <Button onClick={() => handleSave("Password")}>
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">

          <Card>

            <CardHeader>

              <CardTitle>Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label>Date Format</Label>
                <Select defaultValue="DD/MM/YYYY">

                  <SelectTrigger>

                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">

                <Label>Currency Display</Label>
                <Select defaultValue="INR">

                  <SelectTrigger>

                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="INR">₹ INR</SelectItem>
                    <SelectItem value="USD">$ USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleSave("Preferences")}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
