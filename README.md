
# 🧾 Modern Invoice Generator

A professional, responsive invoice generator built with React, TypeScript, and Tailwind CSS. Create beautiful invoices with multiple templates, export to PDF, and manage your billing needs efficiently.

## ✨ Features

- **Multiple Templates**: Choose from 5 professionally designed invoice templates
  - Modern Template - Clean and minimalist design
  - Freelancer Template - Creative design for freelancers and creatives
  - Retail Template - Perfect for retail businesses with product sales
  - Service Template - Designed for service-based businesses
  - Hospitality Template - Elegant design for hotels and restaurants

- **Template-Specific Features**:
  - **Freelancer**: Project details, hourly/project billing, creative styling
  - **Retail**: Store information, product categories, return policies
  - **Service**: Service categories, warranty information, labor tracking
  - **Hospitality**: Room details, check-in/out dates, guest information

- **Professional PDF Export**: Generate PDFs that match your preview exactly
- **Multi-Currency Support**: Support for 20+ global currencies
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Logo Upload**: Add your business logo to invoices
- **Real-time Preview**: See changes instantly as you type
- **Professional Templates**: Industry-specific designs with proper branding

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd invoice-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

## 🎯 How to Use

### Creating Your First Invoice

1. **Select Template**: Choose from 5 professional templates on the homepage
2. **Fill Details**: Complete your business and client information
3. **Add Line Items**: Include products/services with quantities and rates
4. **Customize**: Add notes, terms, and upload your logo
5. **Preview**: Review your invoice in real-time
6. **Export**: Download as PDF with perfect formatting

### Template Selection

Each template offers unique features:

- **Modern**: Best for general business use
- **Freelancer**: Includes project details and creative design
- **Retail**: Features product categories and return policies  
- **Service**: Service types, warranties, and labor tracking
- **Hospitality**: Room numbers, dates, and guest information

## 📱 Mobile Optimization

- **Responsive Templates**: All templates adapt to mobile screens
- **Touch-Friendly**: Large buttons and easy navigation
- **Mobile PDF Generation**: Consistent PDF output regardless of device
- **Optimized Performance**: Fast loading on all devices

## 🎨 Design System

Built with a comprehensive design system featuring:

- **Dark Theme**: Professional dark interface with amber accents
- **Glass Morphism**: Modern glass effects and surfaces
- **Typography**: Inter font family with proper weight hierarchy
- **Color Palette**: Carefully chosen colors for accessibility
- **Component Library**: Consistent UI components throughout

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **PDF Generation**: jsPDF + html2canvas for perfect PDF rendering
- **State Management**: React Context API
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite for fast development and building

## 📋 Supported Features

### Business Information
- Company name and logo
- Complete address details
- Phone and email contact
- Professional branding

### Client Information  
- Client name and contact details
- Billing address
- Communication preferences

### Invoice Details
- Auto-generated invoice numbers
- Customizable dates (issue and due)
- Multiple currency support
- Tax calculations

### Line Items
- Unlimited products/services
- Quantity and rate tracking
- Automatic total calculations
- Description fields

### Additional Features
- Custom notes and terms
- Logo upload and display
- Real-time calculations
- Professional PDF export

## 🎯 Template-Specific Fields

### Freelancer Template
- Project name and description
- Billing type (hourly/project)
- Creative color scheme

### Retail Template
- Store location
- Product categories
- Return policy information

### Service Template
- Service categories
- Warranty information
- Labor and materials tracking

### Hospitality Template
- Room numbers
- Check-in/check-out dates
- Guest information

## 📱 Responsive Design

The application is fully responsive with:
- **Desktop**: Full-featured interface with side-by-side preview
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Streamlined interface with bottom sheets and touch optimization

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── templates/      # Invoice templates
│   └── ui/            # Base UI components
├── contexts/           # React context providers
├── pages/             # Route-based page components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

### Key Files
- `src/utils/pdfGenerator.ts` - PDF generation logic
- `src/contexts/InvoiceContext.tsx` - Invoice data management
- `src/contexts/TemplateContext.tsx` - Template selection and data
- `src/components/templates/` - Individual template components

## 🚀 Deployment

The project is optimized for deployment on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

Build for production:
```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live Demo](your-demo-url)
- [Documentation](your-docs-url)
- [Issues](your-issues-url)

---

**Made with ❤️ for businesses worldwide**
