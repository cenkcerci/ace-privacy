export const cookieTemplate = `
<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="background-color: #fef3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-bottom: 30px;">
    <strong>⚠️ Legal Disclaimer:</strong> This cookie policy template is provided for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney to ensure compliance with applicable laws and regulations in your jurisdiction.
  </div>

  <h1>Cookie Policy</h1>
  <p><strong>Effective Date:</strong> {{date}}</p>
  <p><strong>Last Updated:</strong> {{date}}</p>

  <h2>1. What Are Cookies</h2>
  <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>

  <h2>2. How We Use Cookies</h2>
  <p>{{businessName}} uses cookies on {{website}} for the following purposes:</p>
  <ul>
    <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly</li>
    <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website</li>
    <li><strong>Functionality Cookies:</strong> These cookies enable enhanced functionality and personalization</li>
    <li><strong>Marketing Cookies:</strong> These cookies are used to deliver relevant advertisements</li>
  </ul>

  <h2>3. Types of Cookies We Use</h2>
  
  <h3>3.1 Essential Cookies</h3>
  <p>These cookies are strictly necessary for the operation of our website. They enable core functionality such as security, network management, and accessibility.</p>
  
  <h3>3.2 Performance and Analytics Cookies</h3>
  <p>We use these cookies to collect information about how visitors use our website, such as which pages are visited most often. This data helps us optimize our website performance.</p>
  
  <h3>3.3 Functionality Cookies</h3>
  <p>These cookies allow our website to remember choices you make and provide enhanced, more personal features.</p>
  
  <h3>3.4 Marketing and Advertising Cookies</h3>
  <p>These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.</p>

  <h2>4. Third-Party Cookies</h2>
  <p>We may also use third-party cookies from trusted partners, including:</p>
  <ul>
    <li>Google Analytics for website analytics</li>
    <li>Social media platforms for social sharing features</li>
    <li>Advertising networks for targeted advertising</li>
  </ul>

  <h2>5. Cookie Duration</h2>
  <p>Cookies may be either:</p>
  <ul>
    <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser</li>
    <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them</li>
  </ul>

  <h2>6. Managing Your Cookie Preferences</h2>
  <p>You can control and manage cookies in various ways:</p>
  
  <h3>6.1 Browser Settings</h3>
  <p>Most web browsers allow you to control cookies through their settings preferences. You can set your browser to:</p>
  <ul>
    <li>Accept all cookies</li>
    <li>Reject all cookies</li>
    <li>Notify you when a cookie is set</li>
    <li>Delete cookies after you finish browsing</li>
  </ul>

  <h3>6.2 Opt-Out Links</h3>
  <p>For third-party cookies, you can opt out directly:</p>
  <ul>
    <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out</a></li>
    <li>Advertising cookies: <a href="http://www.aboutads.info/choices/">Digital Advertising Alliance</a></li>
  </ul>

  <h2>7. Impact of Disabling Cookies</h2>
  <p>Please note that disabling cookies may affect the functionality of our website. Some features may not work properly if cookies are disabled.</p>

  <h2>8. Jurisdiction-Specific Rights ({{jurisdiction}})</h2>
  <p>Depending on your location, you may have specific rights regarding cookies:</p>
  <ul>
    <li><strong>EU/EEA:</strong> Under GDPR, you have the right to consent to non-essential cookies</li>
    <li><strong>California:</strong> Under CCPA, you have the right to opt-out of the sale of personal information</li>
    <li><strong>Global:</strong> You always have the right to manage your cookie preferences</li>
  </ul>

  ${`{{#if_jurisdiction_EU}}
  <h3>8.1 GDPR Compliance (EU Residents)</h3>
  <p>In accordance with GDPR requirements:</p>
  <ul>
    <li>We obtain explicit consent before placing non-essential cookies</li>
    <li>You can withdraw consent at any time</li>
    <li>We provide clear information about each type of cookie we use</li>
    <li>We maintain records of your consent preferences</li>
  </ul>
  {{/if_jurisdiction_EU}}`}

  ${`{{#if_jurisdiction_US}}
  <h3>8.1 CCPA Compliance (California Residents)</h3>
  <p>Under the California Consumer Privacy Act:</p>
  <ul>
    <li>We disclose the categories of personal information collected through cookies</li>
    <li>You have the right to opt-out of the sale of personal information</li>
    <li>We do not discriminate against users who exercise their privacy rights</li>
  </ul>
  {{/if_jurisdiction_US}}`}

  <h2>9. Updates to This Cookie Policy</h2>
  <p>We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website.</p>

  <h2>10. Contact Us</h2>
  <p>If you have any questions about our use of cookies, please contact us at:</p>
  <p>{{businessName}}<br>
  Website: {{website}}</p>

  ${`{{#if_jurisdiction_EU}}
  <p><strong>Data Protection Officer:</strong> For cookie-related inquiries under GDPR, please contact our Data Protection Officer at the above address.</p>
  {{/if_jurisdiction_EU}}`}
</div>
`