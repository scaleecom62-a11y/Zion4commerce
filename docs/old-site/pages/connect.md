# Contact: `/connect`

Title: "Zion Commerce Agency Site Visual CMS" (bolt.new default. The page never sets its own title.)
Content source: hardcoded.
Screenshots: `../screenshots/connect.desktop.jpg`, `../screenshots/connect.mobile.jpg`

All "Get Started", "Get Free Audit", "Get Your Free Audit", "Book a Consultation", "Get in Touch" and "Contact" buttons lead here.

## Hero

- Pill: Get in Touch
- H1: Let's Grow Your Business **Together** (last word in blue gradient)
- Sub: Tell us about your business and how we can help you scale globally

## Form

| # | Label | Field ID | Type | Required | Placeholder / options |
|---|---|---|---|---|---|
| 1 | Company Name | company_name | text | No | Your Company |
| 2 | Contact Name | contact_name | text | **Yes** | John Doe |
| 3 | Email Address | email | email | **Yes** | john@example.com |
| 4 | Phone Number | phone | tel | No | +1 (555) 000-0000 |
| 5 | Website | website | url | No | https://yoursite.com |
| 6 | Country | country | text | No | United States |
| 7 | Estimated Monthly Ad Spend | monthly_ad_spend | select | No | Select a range · $0 - $5,000 · $5,000 - $15,000 · $15,000 - $50,000 · $50,000+ |
| 8 | Services You're Interested In | (checkbox group) | checkbox | No | Marketplace Expansion · Amazon Advertising (PPC) · Listing Optimization · Brand Store Design · Inventory Management · Multi-Channel Expansion · Analytics & Reporting · Account Management |
| 9 | Message | message | textarea | No | Tell us about your business and goals... |

Submit button: **Send Message** (paper plane icon)

## What happens on submit

- The browser inserts the form data as a row in the Supabase `leads` table. Nothing else.
- Success screen: "Thank You for Reaching Out!" · "We've received your message and will get back to you within 24 hours."
- Error message: "Failed to submit form. Please try again."
- No email notification is sent from the site code. A database trigger could still send one, but we can't see that from outside. **Confirm how the team learns about new leads today.**
- No spam protection (no CAPTCHA or honeypot), no analytics event, no CRM sync.

## Note on service lists

The form's 8 service checkboxes don't match the 4 services on the home page. For example, "Brand Store Design" and "Inventory Management" appear only on the form.
