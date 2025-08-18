## Critical Issues That Must Be Fixed:

### Issue 1: Template-Specific Form Data Not Showing in Invoice Preview (CRITICAL)
Problem: Form fields adapt correctly, but the values don't appear in the invoice preview or PDF.

Example: Service Provider template has "Service Category" and "Service Warranty" fields, but these values don't show anywhere in the invoice preview.

Required Fix:
1. Map template-specific fields to invoice preview:
   - Service Category → Should appear in invoice as a field
   - Service Warranty → Should appear in payment terms or additional info section
   - Project fields (freelancer) → Should show in invoice description area
   - Hotel fields (room numbers, dates) → Should appear in line items or special section

2. Update invoice preview template to display ALL form fields
  
### Issue 2: PDF Shows Wrong Template Design (CRITICAL)
Problem: User selects different template (like freelancer with colorful design), but PDF generates with default template styling.

Required Fix:
1. Pass selected template to PDF generation function
2. Apply template-specific styling in PDF:
   - Freelancer template → Colorful purple/blue design in PDF
   - Service template → Different color scheme in PDF  
   - Hotel template → Elegant styling in PDF
3. Ensure PDF matches the preview exactly

### Issue 3: Template Selection Modal Not Mobile Responsive (HIGH PRIORITY)
Problem: Modal doesn't adapt to mobile (bottom drawer style missing).

Required Fix:
1. Desktop: Center modal with overlay
2. Mobile: Bottom sheet that slides up from bottom
3. Responsive breakpoint: Automatically switch at mobile screen sizes
4. Touch gestures: Swipe down to close on mobile

Focus on these 3 issues only. Don't add new features until these work perfectly.