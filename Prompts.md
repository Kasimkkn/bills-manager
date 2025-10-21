# 📋 BillEase - Invoice Generator SaaS
## Complete Project Overview & Development Guidelines

---

## 🎯 Project Vision

**Product Name:** BillEase

**Tagline:** "Bill Banayein, Business Badhaayein"

**Mission:** Simplify invoice generation for Indian regional businesses with a fast, professional, and easy-to-use platform that works instantly without requiring signup, while offering powerful features for registered users.

**Target Users:** 
- Small shop owners (hardware, mobile, grocery)
- Service providers (electricians, plumbers, salons)
- Professionals (accountants, contractors, interior designers)
- Clinics, garages, tailors, and local businesses across India

**Core Problem Solved:** 
Most small businesses struggle with complex billing software. They just want to quickly generate GST-compliant invoices, print them, and share with customers - without dealing with complicated ERP systems or expensive software.

---

## 🎨 DESIGN SYSTEM (STRICT RULES)

### Color Palette
```
Primary Background: bg-white (#FFFFFF)
Primary Text: text-black (#000000)
Accents/Borders: bg-white/10, border-white/10 (10% opacity)
Hover States: bg-black/5 (5% black overlay)
Focus States: ring-0 ring-black/20
Disabled States: opacity-50
```

**❌


# Prompt 1: Project Setup & Landing Page

## Design System (STRICT)
- Background: `bg-white` only
- Text: `text-black` for all text
- Accents/borders: `bg-white/10` or `border-white/10`
- NO gradients, NO colors, NO creative elements
- Clean, professional, minimal design
- Good spacing between sections

## Landing Page Structure

### Header
- Logo text: "BillEase" (left)
- Navigation: Home, Features, Pricing (center)
- Buttons: "Login" and "Sign Up" (right)
- Sticky header with subtle border-bottom

### Hero Section
- Headline: "Bill Banayein, Business Badhaayein"
- Subheading: "Create professional GST invoices instantly - No signup required"
- Two CTA buttons:
  - Primary: "Create Invoice Now" (large, prominent)
  - Secondary: "Sign Up for Free" (outline style)
- Simple illustration or icon representing invoicing

### Features Section (3 columns)
1. **Quick & Easy**
   - Icon: Zap
   - Text: "Create invoices in under 60 seconds"

2. **No Login Required**
   - Icon: UserCheck
   - Text: "Start immediately or save data with an account"

3. **GST Compliant**
   - Icon: FileCheck
   - Text: "Automatic GST calculation and formatting"

### How It Works (2 paths side by side)

**Guest User Path:**
- Create invoice instantly
- Fill details manually
- Download & share PDF
- Optional: Sign up to save

**Registered User Path:**
- One-time business setup
- Saved customer database
- Product catalog
- Invoice history & analytics

### Footer
- Links: About, Privacy, Terms, Contact
- Copyright text
- Social media icons (optional)

## Key Requirements
- Mobile responsive
- Fast loading
- Clean typography (Inter or similar)
- Smooth transitions
- Accessible (proper ARIA labels)

"Create Invoice Now" button should navigate to `/invoice/new`
Login/Signup buttons should show modals (implement in next prompt)

# Prompt 2: Authentication System

Build a complete authentication system with the following features:

## Auth Provider Setup
- Email/Password authentication
- Google OAuth provider
- JWT session strategy
- Protected routes middleware

## Components Needed

### Login Modal
- Email and password fields
- "Remember me" checkbox
- "Forgot password?" link
- Google sign-in button
- Link to switch to signup
- Form validation with Zod
- Loading states
- Error messages display

### Signup Modal
- Full name field
- Email field
- Password field (with strength indicator)
- Confirm password field
- Mobile number (optional)
- Terms & conditions checkbox
- Google sign-in option
- Link to switch to login
- Form validation
- Success message

### Forgot Password Modal
- Email input
- Send reset link button
- Back to login link
- Success/error states

## Design Guidelines
- Modal overlay: `bg-black/50`
- Modal background: `bg-white`
- Borders: `border-white/10`
- Input fields: white background with subtle borders
- Buttons: black background, white text
- Focus states: subtle white/10 ring
- Close button (X) in top-right corner

## User LocalStorage Management

## Protected Routes (prepare structure)
- Middleware to check authentication
- Redirect to / or index.tsx page if not authenticated and if authenticated than user/dashboard page
- Allow `/invoice/new` for both guest and logged-in users

## Database Schema (for reference, use Prisma)
```export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // hashed, optional for display
    phone?: string;
    profilePicture?: string;
    emailVerified: boolean;
    emailNotifications: boolean;
    marketingEmails: boolean;
    createdAt: Date;
    updatedAt: Date;
}
```

## Validation Rules
- Email: valid format
- Password: min 8 chars, 1 uppercase, 1 number
- Name: min 2 chars
- Phone: 10 digits (Indian format)

## Post-Login Flow
- Close modal
- Show success toast
- If new user: redirect to `/onboarding/business-setup`
- If existing user: redirect to `/dashboard`

Use React Hook Form for all forms with Zod validation.

# Prompt 3: Business Profile Setup (Onboarding) after login

Create a one-time business profile setup flow for new registered users at `/onboarding/business-setup`.

## Page Structure

### Progress Indicator (top)
- 3 steps shown as: 1 → 2 → 3
- Current step highlighted
- Steps: Business Info → Business Details → Preferences

### Step 1: Business Information
**Fields:**
- Business name (required)
- Business type dropdown (required)
  - Options: Contractor, Hardware Shop, Electrician, Garage, Mobile Shop, Tailor, Clinic, Salon, Laundry, General Store, Other
- Owner name (pre-filled from user account)
- Contact number (required)
- Email (pre-filled, optional to change)

**Validation:**
- All required fields must be filled
- Phone: 10 digits
- Email: valid format

**Button:** "Next Step"

### Step 2: Business Details
**Fields:**
- Complete address (textarea, required)
- City (required)
- State dropdown (Indian states, required)
- PIN code (6 digits, required)
- GSTIN (optional, 15 chars, format validation)
- GST registered? (Yes/No toggle)
- Business logo upload (optional)
  - Accept: JPG, PNG
  - Max size: 2MB
  - Preview after upload
  - Crop/resize option

**Validation:**
- If GST registered = Yes, GSTIN is required
- GSTIN format: 22AAAAA0000A1Z5

**Buttons:** "Back" and "Next Step"

### Step 3: Preferences
**Fields:**
- Default currency: INR (₹) - fixed for now
- Invoice number prefix (e.g., "INV-", "BILL-")
- Starting invoice number (default: 1)
- Default tax rate dropdown
  - No Tax (0%)
  - GST 5%
  - GST 12%
  - GST 18%
  - GST 28%
- Date format dropdown
  - DD/MM/YYYY
  - MM/DD/YYYY
  - YYYY-MM-DD
- Language preference
  - English (default)
  - Hindi (future)

**Buttons:** "Back" and "Complete Setup"

## Design Requirements
- Center content, max width 600px
- Card-based layout with white background
- Subtle shadows for depth
- Form fields: full width, good spacing
- Labels: bold, above fields
- Helper text: small, below fields
- Error messages: red text, below field
- Step indicator: clean line with circles

## After Completion
- Save all data to database
- Show success message: "Setup complete! Ready to create invoices"
- Button: "Go to Dashboard"
- Auto-redirect to `/dashboard` after 2 seconds

## Database Schema Addition
```prisma
Business {
  id: string (uuid)
  userId: string (foreign key to User)
  name: string
  type: string
  ownerName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pinCode: string
  gstin: string (optional)
  isGstRegistered: boolean
  logoUrl: string (optional)
  invoicePrefix: string
  invoiceStartNumber: int
  defaultTaxRate: float
  dateFormat: string
  language: string
  createdAt: datetime
  updatedAt: datetime
}
```

Use React Hook Form with multi-step form pattern. Save to database on final submit only.

# Prompt 4: User Dashboard

Create the main dashboard at `/dashboard` for logged-in users.

## Layout Structure

### Sidebar (left, collapsible on mobile)
**Navigation Items:**
- Dashboard (Home icon) - active
- Create Invoice (Plus icon)
- Invoices (FileText icon)
- Customers (Users icon)
- Products (Package icon)
- Settings (Settings icon)

**Bottom:**
- User profile section (name, email, avatar)
- Logout button

### Main Content Area

### Top Bar
- Welcome message: "Welcome back, {User Name}"
- Date: "Today is {Current Date}"
- Button: "Create New Invoice" (prominent, top-right)

### Stats Cards (4 columns, responsive)
1. **Total Invoices**
   - Count number
   - Subtitle: "All time"
   - Icon: FileText

2. **Total Revenue**
   - Amount in ₹
   - Subtitle: "All time"
   - Icon: IndianRupee

3. **Total Customers**
   - Count number
   - Subtitle: "Active customers"
   - Icon: Users

4. **This Month**
   - Amount in ₹
   - Subtitle: "Current month sales"
   - Icon: TrendingUp

### Recent Invoices Section
- Title: "Recent Invoices"
- Link: "View All" (right side)

**Table Columns:**
- Invoice Number
- Customer Name
- Date
- Amount (₹)
- Status badge (Paid/Unpaid/Draft)
- Actions (View, Edit, Delete icons)

**Table Features:**
- Show latest 5 invoices
- Empty state if no invoices: "No invoices yet. Create your first invoice!"
- Mobile responsive (stack/scroll)

### Quick Actions Section
- Title: "Quick Actions"
- Card grid (2x2 or 4 columns)

1. **Add Customer**
   - Icon: UserPlus
   - Click opens customer modal

2. **Add Product**
   - Icon: PackagePlus
   - Click opens product modal

3. **View Reports**
   - Icon: BarChart
   - Coming soon badge

4. **Settings**
   - Icon: Settings
   - Navigate to settings page

## Design Requirements
- Sidebar: white background, subtle right border
- Main content: white background
- Stats cards: white with subtle shadows
- Table: alternating row backgrounds (very subtle)
- Hover effects on clickable items
- Icons from lucide-react
- Smooth transitions

## Data Requirements
- Fetch real data from database:
  - Total invoices count
  - Sum of all invoice amounts
  - Total customers count
  - Current month sales sum
  - Recent 5 invoices with details

## Empty States
If user has no data yet:
- Show "0" in stats
- Empty table with illustration
- Prominent "Create First Invoice" button
- Helpful text: "Get started by creating your first invoice"

## Mobile Responsive
- Sidebar collapses to hamburger menu
- Stats cards stack vertically
- Table scrolls horizontally
- Quick actions stack 2 columns

Protected route - redirect to login if not authenticated.

# Prompt 5: Customer Management

Create customer management features at `/customers` page and reusable modals.

## Customers Page Layout

### Header
- Title: "Customers"
- Search bar (search by name, phone, email)
- Button: "Add Customer" (opens modal)
- Stats: "Total: {count} customers"

### Customer Cards/Table View
**Display modes:** Toggle between Grid and List view

**Grid View (default):**
- Card for each customer
- Customer name (bold)
- Phone number
- Email (if available)
- Total invoices count
- Total business amount (₹)
- Actions: Edit, Delete icons

**List View (table):**
- Columns: Name, Phone, Email, Total Invoices, Total Amount, Actions
- Sortable columns
- 10 per page with pagination

### Empty State
- Illustration/icon
- Text: "No customers yet"
- Subtext: "Add your first customer to get started"
- Button: "Add First Customer"

## Add/Edit Customer Modal

### Form Fields
- Customer name (required)
- Phone number (required, 10 digits)
- Email (optional, valid format)
- GSTIN (optional, 15 chars)
- Address (textarea, optional)
- City (optional)
- State (dropdown, optional)
- PIN code (optional, 6 digits)
- Notes (textarea, optional)

### Features
- Title changes: "Add Customer" or "Edit Customer"
- Pre-filled data when editing
- Real-time validation
- Save button
- Cancel button
- Loading state while saving

### Validation
- Name: min 2 chars
- Phone: exactly 10 digits, Indian format
- Email: valid email format
- GSTIN: if provided, must be 15 chars
- PIN: if provided, must be 6 digits

## Delete Confirmation Modal
- Warning message: "Are you sure you want to delete {Customer Name}?"
- Subtext: "This action cannot be undone. All invoice history will remain."
- Two buttons: "Cancel" and "Delete" (red/danger style)

## Search Functionality
- Live search as user types
- Search in: name, phone, email
- Debounced search (300ms delay)
- Show "No results found" if no matches

## Features for Logged-in Users Only
- Quick add from invoice creation
- Auto-complete customer selection
- Click customer card to view full details
- Filter by recent customers

## Database Schema
```prisma
Customer {
  id: string (uuid)
  userId: string (foreign key to User)
  businessId: string (foreign key to Business)
  name: string
  phone: string
  email: string (optional)
  gstin: string (optional)
  address: string (optional)
  city: string (optional)
  state: string (optional)
  pinCode: string (optional)
  notes: string (optional)
  createdAt: datetime
  updatedAt: datetime
}
```

## API Endpoints Needed
- POST `/api/customers` - Create customer
- GET `/api/customers` - List all customers
- GET `/api/customers/[id]` - Get single customer
- PUT `/api/customers/[id]` - Update customer
- DELETE `/api/customers/[id]` - Delete customer
- GET `/api/customers/search?q={query}` - Search customers

## Design Requirements
- Consistent with dashboard design
- White cards with subtle shadows
- Clean spacing
- Mobile responsive grid (1 column on mobile, 2-3 on desktop)
- Smooth animations for modals
- Toast notifications for success/error

Protected route with user authentication check.


# Prompt 6: Product/Service Catalog

Create product and service management at `/products` page with full CRUD functionality.

## Products Page Layout

### Header Section
- Title: "Products & Services"
- Toggle: "Products" / "Services" tabs
- Search bar (search by name, HSN code)
- Button: "Add Product" or "Add Service"
- Stats: "Total: {count} items"

### Product/Service Cards
**Grid Layout (3 columns desktop, 1 mobile):**

Each card shows:
- Item name (bold)
- HSN/SAC code
- Unit (e.g., Pcs, Kg, Hour)
- Price: ₹{amount}
- Tax rate: {rate}%
- Description (truncated)
- Actions: Edit, Delete icons

### Empty State
- Icon: Package or Briefcase
- Text: "No products yet" or "No services yet"
- Subtext: "Add items to use in your invoices"
- Button: "Add First Product/Service"

## Add/Edit Product Modal

### Form Fields
- **Item name** (required, min 3 chars)
- **Type selector**: Product or Service (radio buttons)
- **HSN/SAC Code** (required, 4-8 digits)
  - Helper text: "Tax classification code"
- **Unit** (dropdown, required)
  - Products: Pcs, Box, Kg, Liter, Meter, Dozen, Set
  - Services: Hour, Day, Fixed, Visit
- **Price** (required, number, min 0)
- **Tax rate** (dropdown, required)
  - 0%, 5%, 12%, 18%, 28%
- **Description** (textarea, optional, max 200 chars)
- **Stock tracking** (toggle, products only)
  - If enabled: Current stock quantity field

### Features
- Dynamic title: "Add Product/Service" or "Edit Product/Service"
- Pre-fill data when editing
- Real-time price preview with tax
- Unit changes based on type selection
- Form validation with error messages
- Save and Cancel buttons

## Quick Add Feature
Small "+" button in invoice creation to add product/service on-the-fly without leaving page. Opens compact modal with essential fields only:
- Name
- Price
- Tax rate
- Auto-save and add to invoice

## Delete Confirmation
- Warning: "Delete {Item Name}?"
- Subtext: "Past invoices will not be affected"
- Buttons: Cancel, Delete

## Search & Filter
- Live search by name or HSN/SAC code
- Filter by:
  - Type (Product/Service)
  - Tax rate (all, 0%, 5%, 12%, 18%, 28%)
- Sort by:
  - Name (A-Z, Z-A)
  - Price (Low to High, High to Low)
  - Recently added

## Bulk Import (Optional for Phase 1)
- CSV upload option
- Template download link
- Required columns: name, type, hsn, unit, price, tax

## Database Schema
```prisma
Product {
  id: string (uuid)
  userId: string (foreign key)
  businessId: string (foreign key)
  name: string
  type: enum (PRODUCT, SERVICE)
  hsnSacCode: string
  unit: string
  price: decimal
  taxRate: decimal
  description: string (optional)
  trackStock: boolean (default false)
  currentStock: int (optional)
  createdAt: datetime
  updatedAt: datetime
}
```

## API Endpoints
- POST `/api/products` - Create
- GET `/api/products` - List all (with query params for filters)
- GET `/api/products/[id]` - Get single
- PUT `/api/products/[id]` - Update
- DELETE `/api/products/[id]` - Delete
- GET `/api/products/search?q={query}` - Search

## Design Requirements
- Clean card design with white background
- Price prominently displayed
- Tax badge subtle but visible
- Good spacing between cards
- Mobile responsive (single column on mobile)
- Smooth hover effects
- Toast notifications for actions

## Validation Rules
- Name: 3-100 characters
- HSN/SAC: 4-8 digits, numeric only
- Price: positive number, max 2 decimal places
- Tax rate: must be from dropdown options
- Stock quantity: positive integer if enabled

Protected route for logged-in users only.

# Prompt 7: Invoice Creation Form

Create the main invoice creation page at `/invoice/new` that works for both guest and logged-in users.

## Page Layout

### Top Section
- Page title: "Create New Invoice"
- Auth status indicator:
  - Guest: Badge "Creating as Guest" + "Login to save" link
  - Logged-in: Show business name badge
- Invoice number preview (auto-generated or manual)
- Invoice date picker (default: today)

## Form Structure (Two Columns on Desktop)

### Left Column: Invoice Details

**Business Details Section:**
- If logged-in: Auto-filled, view-only (edit button to modify)
- If guest: All fields required
  - Business name
  - Phone
  - Email
  - GSTIN (optional)
  - Address (textarea)

**Customer Details Section:**
- If logged-in: Searchable dropdown to select saved customer OR "Add new" button
- If guest: Manual entry fields
  - Customer name (required)
  - Phone (required)
  - Email (optional)
  - GSTIN (optional)
  - Billing address (textarea)

**Invoice Settings:**
- GST invoice toggle (Yes/No)
- Invoice date (date picker)
- Due date (date picker, optional)
- Reference/PO number (optional)
- Notes (textarea, optional)

### Right Column: Items Section

**Items Table:**
Headers: Item, HSN/SAC, Qty, Unit, Price, Tax%, Amount, Action

**Add Item Row:**
- If logged-in: Search dropdown from products + "Quick add +" button
- If guest: Manual entry fields
  - Item name
  - HSN/SAC code
  - Quantity (number)
  - Unit (dropdown)
  - Price per unit
  - Tax rate dropdown (0%, 5%, 12%, 18%, 28%)
- Auto-calculate amount (qty × price + tax)
- Delete icon for each row
- "Add Another Item" button below

**Calculation Summary Box:**
- Subtotal: ₹{amount}
- Discount: Input field (₹ or %) - optional
- If GST enabled:
  - CGST (9%): ₹{amount}
  - SGST (9%): ₹{amount}
  - OR IGST (18%): ₹{amount} (if interstate)
- Round off: ±₹{amount}
- **Total: ₹{amount}** (bold, large)

## Bottom Actions

### For Guest Users:
- "Preview Invoice" button (primary)
- "Save Draft" disabled with tooltip "Login to save"

### For Logged-in Users:
- "Save as Draft" button (secondary)
- "Preview & Generate" button (primary)
- "Save Template" option (save item combinations for quick reuse)

## Validation Rules
- At least 1 item required
- All item fields must be filled
- Quantity must be > 0
- Price must be > 0
- Customer name and phone required
- If GST invoice = Yes:
  - GSTIN required if customer is registered
  - HSN/SAC codes required for all items

## Auto-calculations
- Item amount = Qty × Price
- Tax amount = (Item amount × Tax%) / 100
- Line total = Item amount + Tax amount
- Subtotal = Sum of all item amounts
- Total tax = Sum of all tax amounts
- Grand total = Subtotal + Total tax - Discount + Round off

## State Management
- Store form data in React state
- For guests: Store in sessionStorage (temporary)
- For logged-in: Auto-save draft every 30 seconds
- Show "Saving..." indicator during auto-save

## Mobile Responsive
- Stack columns vertically
- Items table scrollable horizontally
- Collapsible sections
- Sticky "Create Invoice" button at bottom

## Database Schema
```prisma
Invoice {
  id: string (uuid)
  userId: string (nullable for guest)
  businessId: string (nullable)
  customerId: string (nullable)
  invoiceNumber: string (unique)
  invoiceDate: datetime
  dueDate: datetime (optional)
  isGst: boolean
  subtotal: decimal
  discount: decimal
  taxAmount: decimal
  roundOff: decimal
  total: decimal
  status: enum (DRAFT, GENERATED, PAID)
  notes: string (optional)
  referenceNumber: string (optional)
  items: InvoiceItem[]
  createdAt: datetime
  updatedAt: datetime
}

InvoiceItem {
  id: string (uuid)
  invoiceId: string (foreign key)
  itemName: string
  hsnSacCode: string
  quantity: decimal
  unit: string
  price: decimal
  taxRate: decimal
  amount: decimal
  taxAmount: decimal
  total: decimal
}
```

Clean, professional design with good spacing and clear labels.

# Prompt 8: Invoice Preview & PDF Generation

Create invoice preview modal and PDF generation at `/invoice/preview/[id]`.

## Preview Modal (Opens from Invoice Form)

### Modal Layout (Full screen on mobile, large modal on desktop)

**Header:**
- Title: "Invoice Preview"
- Close button (X)
- Action buttons:
  - Download PDF
  - Share (WhatsApp, Email)
  - Edit (goes back to form)
  - If logged-in: "Save & Mark as Generated"

### Invoice Template (Professional A4 Format)

**Header Section:**
- If logged-in: Business logo (left)
- Business name (large, bold)
- Complete business address
- Phone, Email, GSTIN
- Right side: 
  - "TAX INVOICE" or "INVOICE" heading
  - Invoice #: {number}
  - Date: {date}
  - Due Date: {date} (if applicable)

**Bill To Section:**
- Label: "Bill To:"
- Customer name (bold)
- Customer address
- Phone number
- GSTIN (if applicable)
- Email

**Items Table:**
Columns:
- Sr. No. (1, 2, 3...)
- Description / Item Name
- HSN/SAC
- Qty
- Unit
- Rate (₹)
- Tax %
- Amount (₹)

Table styling:
- Header row: subtle background
- Alternating row backgrounds (very subtle)
- Borders: thin, professional
- Right-aligned numbers
- Bold totals

**Calculation Section (Right-aligned):**
- Subtotal: ₹{amount}
- Discount (if any): -₹{amount}
- If GST invoice:
  - CGST @ 9%: ₹{amount}
  - SGST @ 9%: ₹{amount}
  - OR IGST @ 18%: ₹{amount}
- Round Off: ±₹{amount}
- **Total Amount: ₹{amount}** (bold, larger font)

**Amount in Words:**
"Rupees {amount in words} Only"

**Footer Section:**
- Notes (if any)
- Terms & Conditions (if set in business profile)
- Bank details (if set)
- Signature section:
  - "Authorized Signatory"
  - Empty line for signature
- Footer text: "This is computer generated invoice"

## PDF Generation

### Technology
- Use jsPDF or react-pdf library
- Generate print-friendly PDF
- Filename format: `Invoice_{number}_{date}.pdf`

### PDF Requirements
- A4 size (210mm × 297mm)
- Margins: 15mm all sides
- Font: Clean sans-serif
- Black and white only (no colors)
- High quality for printing
- Include business logo if available
- Proper page breaks if multiple items

## Share Features

### WhatsApp Share
- Generate PDF first
- Create shareable link
- Open WhatsApp with pre-filled message:
  - "Invoice {number} from {Business Name}"
  - "Amount: ₹{total}"
  - "View: {link}"
- Mobile: Open WhatsApp app directly
- Desktop: Show QR code + link

### Email Share
- Open email modal
- Pre-fill:
  - To: customer email (if available)
  - Subject: "Invoice {number} from {Business Name}"
  - Body: Professional message template
  - Attach PDF
- Send button (integrate with email service or mailto: link)

## Print Feature
- Use browser's print dialog
- Print-optimized CSS
- Remove buttons and modal chrome
- Clean A4 layout
- `@media print` styles

## For Logged-in Users

### Save Options
1. **Save as Draft:**
   - Status = DRAFT
   - Can edit later
   - Listed in drafts section

2. **Generate Invoice:**
   - Status = GENERATED
   - Increment invoice number
   - Add to invoice history
   - Cannot edit (can only void/cancel)

## For Guest Users
- Can only download PDF
- Show prompt: "Sign up to save and track invoices"
- PDF generated temporarily (not stored)
- Session-based access only

## Database Updates
After generating invoice:
- Save to database with status GENERATED
- Update customer's total invoices count
- Update business revenue stats
- Create PDF URL reference (if storing PDFs)

## Design Requirements
- Clean, professional invoice design
- Good contrast for printing
- Proper spacing and alignment
- Mobile-responsive preview
- Loading states during PDF generation
- Success toast after actions
- Error handling for failed operations

## Invoice Template Variations (Future)
Prepare structure for:
- Template 1: Standard (default)
- Template 2: Minimal
- Template 3: Detailed (with terms)
Store template preference in business profile

Preview should match final PDF exactly.

# Prompt 9: Invoice List & Management

Create invoice listing and management page at `/invoices` for logged-in users.

## Page Layout

### Header Section
- Title: "Invoices"
- Search bar (search by invoice number, customer name)
- Filters dropdown:
  - Status: All, Draft, Generated, Paid, Cancelled
  - Date range picker (From - To)
  - Amount range (Min - Max)
- Button: "Create New Invoice"
- Export button: Download as Excel/CSV

### Stats Bar
- Total Invoices: {count}
- Total Amount: ₹{sum}
- Paid: ₹{amount}
- Pending: ₹{amount}

## Invoice Table/List View

### Toggle View
- Table view (default)
- Card view (mobile-friendly)

### Table Columns:
1. **Invoice #** (clickable, opens preview)
2. **Date** (DD/MM/YYYY)
3. **Customer Name**
4. **Amount** (₹)
5. **Status** (badge with colors)
   - Draft: gray badge
   - Generated: blue badge
   - Paid: green badge
   - Cancelled: red badge
6. **Actions** (dropdown menu)

### Actions Dropdown Per Invoice:
- View/Preview (eye icon)
- Edit (edit icon) - only for drafts
- Download PDF
- Mark as Paid (only for generated)
- Duplicate (create copy)
- Cancel/Void
- Delete (only drafts)

### Card View (Mobile):
Each card shows:
- Invoice number (top-left)
- Status badge (top-right)
- Customer name (bold)
- Date
- Amount (large, ₹)
- Quick actions: View, Download, More

## Pagination
- Show 20 invoices per page
- Page numbers at bottom
- Previous/Next buttons
- Jump to page input
- Total count: "Showing 1-20 of 150"

## Empty State
- Icon: FileText
- Text: "No invoices found"
- Subtext: "Create your first invoice to get started"
- Button: "Create Invoice"

## Search & Filter Logic
- Search updates in real-time (debounced)
- Search in: invoice number, customer name
- Multiple filters can be combined
- "Clear Filters" button if any filter active
- Show active filter count badge

## Sort Options
- Invoice Date (Newest/Oldest)
- Amount (High to Low / Low to High)
- Customer Name (A-Z / Z-A)
- Status

## Bulk Actions (Select Multiple)
- Checkbox on each row
- "Select All" checkbox in header
- Selected count: "{count} selected"
- Bulk actions:
  - Download PDFs (zip file)
  - Mark as Paid
  - Export selected
  - Delete selected (confirmation required)

## Invoice Status Management

### Mark as Paid Modal:
- Payment date picker (default: today)
- Payment method dropdown:
  - Cash, UPI, Bank Transfer, Card, Cheque
- Payment reference number (optional)
- Notes (optional)
- Buttons: Cancel, Confirm Payment

### Cancel/Void Invoice Modal:
- Warning: "This will cancel the invoice"
- Reason dropdown:
  - Customer cancelled
  - Duplicate
  - Error in invoice
  - Other
- Notes field (required if "Other")
- Cannot undo warning
- Buttons: Back, Cancel Invoice

## Quick Stats Cards (Top)
Four cards showing:
1. This Month: ₹{amount}
2. Last Month: ₹{amount}
3. Outstanding: ₹{amount}
4. Overdue: ₹{amount} (due date passed)

## API Endpoints Needed
- GET `/api/invoices` - List with pagination & filters
- GET `/api/invoices/[id]` - Single invoice
- PUT `/api/invoices/[id]` - Update invoice
- DELETE `/api/invoices/[id]` - Delete draft
- POST `/api/invoices/[id]/mark-paid` - Mark paid
- POST `/api/invoices/[id]/cancel` - Cancel invoice
- POST `/api/invoices/[id]/duplicate` - Create copy
- GET `/api/invoices/export` - Export data

## Database Schema Addition
```prisma
Payment {
  id: string
  invoiceId: string (foreign key)
  amount: decimal
  paymentDate: datetime
  method: string
  referenceNumber: string (optional)
  notes: string (optional)
  createdAt: datetime
}
```

Update Invoice schema:
- Add: paidAmount decimal
- Add: paidDate datetime (optional)
- Add: paymentMethod string (optional)
- Add: cancelledAt datetime (optional)
- Add: cancelReason string (optional)

## Design Requirements
- Clean table with subtle borders
- Status badges with appropriate styling
- Hover effects on rows
- Loading skeleton while fetching
- Smooth transitions
- Mobile-responsive table (horizontal scroll)
- Toast notifications for all actions
- Confirmation modals for destructive actions

## Mobile Optimizations
- Stack filters vertically
- Card view by default
- Swipe actions on cards
- Sticky header with create button
- Bottom sheet for action menus

Protected route - logged-in users only.

# Prompt 10: Settings & Profile Management

Create comprehensive settings page at `/settings` with tabbed navigation.

## Settings Layout

### Sidebar Tabs (Left)
1. Business Profile
2. Invoice Settings
3. Account Settings
4. Preferences
5. Notifications (optional)

### Tab 1: Business Profile

**Editable Fields:**
- Business name
- Business type (dropdown)
- Owner name
- Contact phone
- Email
- Complete address (textarea)
- City, State, PIN code
- GSTIN (with validation)
- GST registered toggle
- Business logo (upload/change/remove)
  - Preview current logo
  - Max 2MB, JPG/PNG only

**Bank Details Section:**
- Bank name
- Account holder name
- Account number
- IFSC code
- Branch name
- Add to invoice footer toggle

**Terms & Conditions:**
- Textarea for default terms
- Add to invoice footer toggle
- Character count (max 500)

**Buttons:** Save Changes, Cancel

### Tab 2: Invoice Settings

**Invoice Numbering:**
- Prefix (e.g., "INV-", "BILL-")
- Next invoice number (read-only, auto-increments)
- Reset counter button (with confirmation)
- Number format preview

**Default Settings:**
- Default tax rate dropdown
- Default discount % (optional)
- Default payment terms dropdown:
  - Due on receipt
  - Net 15 days
  - Net 30 days
  - Net 45 days
  - Custom
- Default notes/footer text

**Invoice Templates:**
- Template selection:
  - Template 1: Standard (preview thumbnail)
  - Template 2: Minimal (coming soon)
  - Template 3: Detailed (coming soon)
- Show business logo on invoice toggle
- Show bank details toggle
- Show terms & conditions toggle

**Additional Fields:**
- Enable due date field
- Enable reference/PO number field
- Enable notes field
- Enable discount field

**Buttons:** Save Settings

### Tab 3: Account Settings

**Profile Information:**
- Full name (editable)
- Email (read-only, verified badge)
- Phone number (editable, verification required)
- Profile picture (upload/change)

**Change Password:**
- Current password
- New password
- Confirm new password
- Password strength indicator
- Save password button (separate)

**Email Notifications:**
- Marketing emails toggle
- Product updates toggle
- Invoice reminders toggle

**Danger Zone:**
- Export all data button
  - Downloads JSON/Excel with all invoices, customers, products
- Delete account button
  - Red button
  - Opens confirmation modal with password verification
  - Warning: "This action cannot be undone"

### Tab 4: Preferences

**Display Settings:**
- Language: English / Hindi (Hindi coming soon)
- Date format:
  - DD/MM/YYYY
  - MM/DD/YYYY
  - YYYY-MM-DD
- Time format: 12-hour / 24-hour
- Currency display: ₹1,234.56 / ₹1234.56

**Number Format:**
- Decimal places: 0, 2, 3
- Thousand separator: Comma / None

**Dashboard Preferences:**
- Default view: Cards / Table
- Items per page: 10, 20, 50, 100
- Show dashboard stats toggle
- Default date range: This month / Last 30 days / All time

**Auto-save:**
- Enable auto-save drafts toggle
- Auto-save interval: 30s / 1min / 2min

**Buttons:** Save Preferences

### Tab 5: Notifications (Optional)

**Email Notifications:**
- New invoice created
- Invoice payment received
- Customer added
- Weekly summary report

**Push Notifications:** (for future mobile app)
- Enable push notifications toggle

**Buttons:** Save Notification Settings

## Validation Rules
- Business name: required, 3-100 chars
- Phone: 10 digits
- Email: valid format
- GSTIN: 15 chars if provided
- PIN: 6 digits
- Bank account: numeric, 9-18 digits
- IFSC: 11 chars, alphanumeric
- Password: min 8 chars, 1 uppercase, 1 number

## Features
- Real-time form validation
- Unsaved changes warning (if navigate away)
- Success toast after saving
- Error messages for failed saves
- Loading states on save buttons
- Preview changes before saving (where applicable)

## Database Schema Updates
Add to Business model:
- bankName: string (optional)
- accountHolderName: string (optional)
- accountNumber: string (optional)
- ifscCode: string (optional)
- branchName: string (optional)
- showBankDetails: boolean
- termsConditions: string (optional)
- showTerms: boolean
- defaultTaxRate: decimal
- defaultDiscount: decimal (optional)
- defaultPaymentTerms: string
- invoiceTemplate: string
- showLogoOnInvoice: boolean

Add to User model:
- profilePicture: string (optional)
- emailNotifications: boolean
- marketingEmails: boolean

## API Endpoints
- GET `/api/settings/business` - Get business settings
- PUT `/api/settings/business` - Update business
- PUT `/api/settings/account` - Update account
- PUT `/api/settings/preferences` - Update preferences
- POST `/api/settings/change-password` - Change password
- POST `/api/settings/export-data` - Export all data
- DELETE `/api/settings/account` - Delete account

## Design Requirements
- Tabbed navigation with active indicator
- Form sections with clear headings
- Good spacing between sections
- Toggle switches for boolean settings
- Consistent button styling
- Mobile responsive (tabs become dropdown)
- Sticky save button on scroll
- Confirmation modals for destructive actions

Protected route with authentication check.

