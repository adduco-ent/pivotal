import LegalLayout from './LegalLayout'

const UPDATED = 'July 15, 2026'
const EMAIL = 'hello@pivotaltimes.io'

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated={UPDATED}>
      <p className="lead">
        This Privacy Policy explains how Pivotal Times LLC, doing business as
        &ldquo;PivotalX&rdquo; (&ldquo;PivotalX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;), collects, uses, and shares information about you when you visit this
        website or contact us (the &ldquo;Site&rdquo;). By using the Site, you agree to the
        practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>Information you provide</h3>
      <p>
        When you contact us, request or book a call, or otherwise communicate with us, you may
        provide information such as your name, email address, company, role, and any details you
        choose to include in your message.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        When you visit the Site, we (and our service providers) may automatically collect certain
        technical information, such as your IP address, browser type, device information, pages
        viewed, referring pages, and general usage data, through cookies and similar technologies.
      </p>
      <h3>Information from third parties</h3>
      <p>
        If you book a call or interact with an embedded tool, we may receive information from the
        relevant scheduling, communication, or analytics provider in accordance with their
        policies.
      </p>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>to respond to your inquiries and communicate with you;</li>
        <li>to schedule, prepare for, and conduct calls or consultations you request;</li>
        <li>to operate, maintain, secure, and improve the Site;</li>
        <li>to understand how the Site is used and to measure our marketing;</li>
        <li>to comply with legal obligations and enforce our terms; and</li>
        <li>for any other purpose disclosed to you at the time of collection.</li>
      </ul>

      <h2>3. Legal Bases for Processing</h2>
      <p>
        Where required by law (for example, under the GDPR), we process personal data on the basis
        of your consent, our legitimate interests in operating and promoting our business,
        performance of steps taken at your request prior to any agreement, and compliance with
        legal obligations.
      </p>

      <h2>4. Cookies and Analytics</h2>
      <p>
        We may use cookies and similar technologies to operate the Site, remember preferences, and
        understand usage. We may use analytics services that set their own cookies and process
        usage data on our behalf. You can control cookies through your browser settings; disabling
        them may affect how the Site functions.
      </p>

      <h2>5. How We Share Information</h2>
      <p>We do not sell your personal information. We may share information:</p>
      <ul>
        <li>
          with service providers who perform functions on our behalf (such as hosting, scheduling,
          email, and analytics), bound to use it only for those purposes;
        </li>
        <li>
          if required by law, legal process, or governmental request, or to protect our rights,
          safety, or property;
        </li>
        <li>
          in connection with a merger, acquisition, financing, or sale of assets, in which case
          information may be transferred as a business asset; and
        </li>
        <li>with your consent or at your direction.</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to fulfill the purposes described
        in this Policy, to comply with our legal obligations, resolve disputes, and enforce our
        agreements, after which we delete or de-identify it.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational measures to protect
        information. However, no method of transmission or storage is completely secure, and we
        cannot guarantee absolute security. You provide information at your own risk.
      </p>

      <h2>8. Your Rights and Choices</h2>
      <p>
        Depending on your location, you may have rights regarding your personal information,
        including the right to access, correct, delete, or restrict its processing, to object to
        processing, to data portability, and to withdraw consent. If you are a California resident,
        you may have rights under the CCPA/CPRA, including the right to know, delete, and opt out
        of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information (we do not sell
        it). To exercise any right, contact us at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will respond as required by applicable law and
        will not discriminate against you for exercising your rights.
      </p>

      <h2>9. International Users</h2>
      <p>
        We operate from the United States. If you access the Site from outside the U.S., you
        understand that your information may be transferred to, stored, and processed in the U.S.,
        where data-protection laws may differ from those in your country.
      </p>

      <h2>10. Children&rsquo;s Privacy</h2>
      <p>
        The Site is not directed to children under 16, and we do not knowingly collect personal
        information from them. If you believe a child has provided us information, please contact
        us and we will delete it.
      </p>

      <h2>11. Third-Party Links</h2>
      <p>
        The Site may link to third-party websites and services that we do not control. This Policy
        does not apply to those third parties, and we encourage you to review their privacy
        policies.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Policy from time to time. When we do, we will revise the &ldquo;Last
        updated&rdquo; date above. Your continued use of the Site after changes become effective
        constitutes acceptance of the updated Policy.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions or requests regarding this Policy or your information may be sent to{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}
