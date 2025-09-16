// EmailJS Configuration
// To complete setup, you need to:
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Replace the placeholders below with your actual IDs

const EMAIL_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

// Template should be set up to send to: caelebwoodrow@gmail.com
// Template variables:
// - {{from_name}}: Sender's name
// - {{from_email}}: Sender's email
// - {{message}}: Message content
// - {{to_email}}: caelebwoodrow@gmail.com (hardcoded in template)

export default EMAIL_CONFIG;