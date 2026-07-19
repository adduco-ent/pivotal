import LegalLayout from './LegalLayout'

const UPDATED = 'July 15, 2026'
const EMAIL = 'hello@pivotaltimes.io'

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated={UPDATED}>
      <p className="lead">
        These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the
        website located at this domain and any related content, tools, or communications
        (collectively, the &ldquo;Site&rdquo;), operated by Pivotal Times LLC, doing business as
        &ldquo;PivotalX&rdquo; (&ldquo;PivotalX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;). By accessing or using the Site, you agree to be bound by these Terms.
        If you do not agree, do not use the Site.
      </p>

      <h2>1. Acceptance of these Terms</h2>
      <p>
        By accessing, browsing, or otherwise using the Site, you acknowledge that you have read,
        understood, and agree to be bound by these Terms and by our{' '}
        <a href="/privacy">Privacy Policy</a>, which is incorporated by reference. You represent
        that you are at least 18 years old and have the legal capacity to enter into these Terms.
      </p>

      <h2>2. Informational Purpose Only; No Professional Advice</h2>
      <p>
        The Site and all content on it are provided for general informational and marketing
        purposes only. Nothing on the Site constitutes, and should not be relied upon as,
        professional, business, financial, legal, tax, investment, or other advice. You are solely
        responsible for evaluating the accuracy, completeness, and usefulness of any information
        on the Site and for any decisions or actions you take based on it.
      </p>

      <h2>3. No Guarantee of Results</h2>
      <p>
        PivotalX provides marketing, funnel, and conversion-related services. Any references on
        the Site to outcomes, performance, conversions, revenue, margins, growth, statistics, or
        results&mdash;whether expressed as figures, ranges, examples, case studies, or
        otherwise&mdash;are illustrative and are <strong>not</strong> a promise, guarantee, or
        prediction of the results you or any other party will achieve. Marketing outcomes depend on
        many factors outside our control, including your product, market, pricing, operations, and
        execution. Individual results vary, and past performance is not indicative of future
        results.
      </p>

      <h2>4. Testimonials, Examples, and Illustrative Content</h2>
      <p>
        Any testimonials, quotes, client names, logos, metrics, or examples shown on the Site are
        provided for illustrative purposes and may not reflect the typical experience of any
        particular client. Testimonials are not a guarantee that you will achieve similar results.
      </p>

      <h2>5. Services Are Governed by a Separate Agreement</h2>
      <p>
        The Site itself does not create any engagement, retainer, or client relationship. Booking
        or requesting a call, submitting an inquiry, or otherwise contacting us through the Site
        does not form a contract for services. Any services provided by PivotalX will be governed
        exclusively by a separate written agreement executed between you and PivotalX. In the event
        of a conflict between these Terms and such an agreement, the separate agreement controls
        with respect to the services.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The Site and its contents&mdash;including text, graphics, logos, designs, videos,
        animations, layouts, and the &ldquo;PivotalX&rdquo; and &ldquo;Pivotal Times&rdquo;
        names and marks&mdash;are owned by or licensed to Pivotal Times LLC and are protected by
        intellectual property laws. We grant you a limited, revocable, non-exclusive,
        non-transferable license to access and view the Site for your personal, non-commercial
        use. You may not copy, reproduce, republish, distribute, modify, create derivative works
        from, scrape, or exploit any part of the Site without our prior written consent.
      </p>

      <h2>7. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Site in violation of any applicable law or regulation;</li>
        <li>
          attempt to gain unauthorized access to, interfere with, or disrupt the Site or its
          underlying systems;
        </li>
        <li>
          introduce any malware, or use bots, scrapers, or automated means to access or collect
          data from the Site;
        </li>
        <li>
          use the Site to infringe the rights of others or to transmit unlawful, harmful, or
          misleading content; or
        </li>
        <li>use the Site in any way that could damage, disable, or impair it.</li>
      </ul>

      <h2>8. Third-Party Links and Services</h2>
      <p>
        The Site may link to or integrate third-party websites, tools, or services (such as
        scheduling or analytics providers). We do not control and are not responsible for the
        content, policies, or practices of any third party. Accessing third-party services is at
        your own risk and subject to their terms.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo;
        WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE MAXIMUM
        EXTENT PERMITTED BY LAW, PIVOTALX DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ANY
        WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE
        SITE WILL BE UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT ANY
        INFORMATION IS ACCURATE, COMPLETE, OR CURRENT.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL PIVOTAL TIMES LLC, ITS MEMBERS,
        OFFICERS, EMPLOYEES, CONTRACTORS, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS,
        REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATING TO YOUR USE
        OF (OR INABILITY TO USE) THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO
        THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR
        RELATING TO THE SITE OR THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
        SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS, SO SOME OF THE ABOVE MAY NOT APPLY TO
        YOU.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Pivotal Times LLC and its members,
        officers, employees, contractors, and agents from and against any claims, liabilities,
        damages, losses, and expenses (including reasonable attorneys&rsquo; fees) arising out of
        or related to your use of the Site, your violation of these Terms, or your violation of any
        law or the rights of any third party.
      </p>

      <h2>12. Governing Law and Disputes</h2>
      <p>
        These Terms are governed by the laws of the State in which Pivotal Times LLC is organized,
        without regard to its conflict-of-laws rules. You agree to first attempt to resolve any
        dispute informally by contacting us at{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Any dispute that cannot be resolved informally
        will be subject to the exclusive jurisdiction of the state and federal courts located in
        that state, and you consent to personal jurisdiction and venue there.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will revise the &ldquo;Last
        updated&rdquo; date above. Your continued use of the Site after changes become effective
        constitutes your acceptance of the revised Terms.
      </p>

      <h2>14. Miscellaneous</h2>
      <p>
        If any provision of these Terms is found unenforceable, the remaining provisions will
        remain in full effect. Our failure to enforce any provision is not a waiver of it. These
        Terms, together with our Privacy Policy and any separate services agreement, constitute the
        entire agreement between you and PivotalX regarding the Site.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these Terms may be sent to{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}
