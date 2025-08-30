export const privacyTemplate = `
<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="background-color: #fef3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-bottom: 30px;">
    <strong>⚠️ Legal Disclaimer:</strong> This privacy policy template is provided for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws and regulations in your jurisdiction.
  </div>

  <h1>Privacy Policy</h1>
  <p><strong>Effective Date:</strong> {{date}}</p>
  <p><strong>Last Updated:</strong> {{date}}</p>

  <h2>1. Introduction</h2>
  <p>{{businessName}} ("we," "our," or "us") operates the website {{website}} (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

  <h2>2. Information We Collect</h2>
  <h3>2.1 Personal Information</h3>
  <p>We may collect personal information that you voluntarily provide to us when you:</p>
  <ul>
    <li>Register for an account</li>
    <li>Subscribe to our newsletter</li>
    <li>Contact us through our website</li>
    <li>Participate in surveys or promotions</li>
  </ul>

  <h3>2.2 Automatically Collected Information</h3>
  <p>We may automatically collect certain information about your device and usage of our Service, including:</p>
  <ul>
    <li>IP address and location data</li>
    <li>Browser type and version</li>
    <li>Operating system</li>
    <li>Pages visited and time spent on our website</li>
    <li>Referring website addresses</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <p>We use the information we collect for various purposes, including:</p>
  <ul>
    <li>Providing and maintaining our Service</li>
    <li>Improving our website and user experience</li>
    <li>Communicating with you about our services</li>
    <li>Sending promotional materials (with your consent)</li>
    <li>Complying with legal obligations</li>
  </ul>

  <h2>4. Cookies & Tracking</h2>
  <p>We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Please refer to our Cookie Policy for detailed information.</p>

  <h2>5. Data Retention</h2>
  <p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. We will retain and use your information to comply with our legal obligations, resolve disputes, and enforce our policies.</p>

  <h2>6. Your Rights</h2>
  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
  <ul>
    <li>The right to access your personal data</li>
    <li>The right to rectify inaccurate data</li>
    <li>The right to erase your personal data</li>
    <li>The right to restrict processing</li>
    <li>The right to data portability</li>
    <li>The right to object to processing</li>
  </ul>

  ${`{{#if_jurisdiction_EU}}
  <h3>6.1 GDPR Rights (EU Residents)</h3>
  <p>If you are a resident of the European Union, you have additional rights under the General Data Protection Regulation (GDPR), including:</p>
  <ul>
    <li>Right to withdraw consent at any time</li>
    <li>Right to lodge a complaint with a supervisory authority</li>
    <li>Right to be informed about data breaches</li>
  </ul>
  {{/if_jurisdiction_EU}}`}

  ${`{{#if_jurisdiction_US}}
  <h3>6.1 CCPA Rights (California Residents)</h3>
  <p>If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including:</p>
  <ul>
    <li>Right to know what personal information is collected</li>
    <li>Right to delete personal information</li>
    <li>Right to opt-out of the sale of personal information</li>
    <li>Right to non-discrimination for exercising your rights</li>
  </ul>
  {{/if_jurisdiction_US}}`}

  <h2>7. International Transfers</h2>
  <p>Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.</p>

  <h2>8. Data Security</h2>
  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

  <h2>9. Third-Party Links</h2>
  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>

  <h2>10. Children's Privacy</h2>
  <p>Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>

  <h2>11. Changes to This Privacy Policy</h2>
  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>

  <h2>12. Contact Information</h2>
  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
  <p>{{businessName}}<br>
  Website: {{website}}</p>

  ${`{{#if_jurisdiction_EU}}
  <p><strong>Data Protection Officer:</strong> For GDPR-related inquiries, please contact our Data Protection Officer at the above address.</p>
  {{/if_jurisdiction_EU}}`}
</div>
`