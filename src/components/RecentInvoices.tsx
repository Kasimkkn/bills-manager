import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Download } from "lucide-react"

interface Invoice {
    id: string
    client: string
    amount: number
    date: string
    status: string
}

interface RecentInvoicesProps {
    recentInvoices: Invoice[]
    getStatusColor: (status: string) => string
}

const RecentInvoices = ({ recentInvoices, getStatusColor }: RecentInvoicesProps) => {
    return (
        <Card className="border border-border/50 bg-background/40 backdrop-blur-md">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="p-0 divide-y divide-border">
                {recentInvoices.length > 0 ? (
                    recentInvoices.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-muted/30 transition-colors"
                        >
                            {/* Left Section */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-foreground" />
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <div className="min-w-0">
                                        <p className="font-medium text-foreground truncate">{invoice.id}</p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {invoice.client}
                                        </p>
                                    </div>
                                    <div className="md:hidden">
                                        <p className="font-medium text-foreground">
                                            ${invoice.amount.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                                <div className="text-right min-w-[90px] max-md:hidden">
                                    <p className="font-medium text-foreground">
                                        ${invoice.amount.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                </div>

                                <Badge className={`${getStatusColor(invoice.status)} whitespace-nowrap`}>
                                    {invoice.status}
                                </Badge>

                                <div className="flex gap-1 sm:gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        No recent invoices found.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default RecentInvoices
