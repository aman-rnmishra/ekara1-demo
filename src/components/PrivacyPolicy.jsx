import { ScaleReveal } from './Reveal'

const SECTIONS = [
  {
    title: '1. Introduction',
    paragraphs: [
      'Ekara Financial Services Pvt Ltd ("we", "us", "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services. By accessing or using our website and services, you agree to the collection and use of your data in accordance with this policy.',
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: [
      'We collect personal information when you use our services, interact with our website, or provide your data voluntarily. This may include:',
    ],
    list: [
      'Personal Identification Information: Name, email address, phone number, and other contact details.',
      'Financial Information: Information related to your financial status, transactions, investment preferences, and other services availed from us.',
      'Usage Data: Information about how you interact with our website, services, and any associated platforms, including cookies, IP addresses, and device data.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    paragraphs: ['We use the information we collect in the following ways:'],
    list: [
      'To provide, maintain, and improve our financial services.',
      'To communicate with you about your account, services, updates, and relevant offers.',
      'To personalize your experience and recommend tailored financial products or services.',
      'To comply with legal obligations and resolve disputes.',
      'To prevent fraud and unauthorized access.',
    ],
  },
  {
    title: '4. Data Sharing and Disclosure',
    paragraphs: [
      'We do not sell, trade, or otherwise transfer your personal information to third parties except in the following situations:',
    ],
    list: [
      'With Service Providers: We may share your information with trusted third parties who assist in providing services on our behalf, such as payment processing, data hosting, and analytics.',
      'Legal Requirements: We may disclose your information if required to do so by law or if we believe such action is necessary to comply with legal obligations, protect our rights, investigate fraud, or ensure safety.',
      'Business Transfers: In the event of a merger, acquisition, or asset sale, your information may be transferred as part of the transaction.',
    ],
  },
  {
    title: '5. Data Security',
    paragraphs: [
      'We employ a variety of security measures to protect your personal information, including encryption, secure servers, and strict access controls. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.',
    ],
  },
  {
    title: '6. Data Retention',
    paragraphs: [
      'We will retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by applicable law.',
    ],
  },
  {
    title: '7. Your Rights and Choices',
    paragraphs: ['You have the following rights regarding your personal information:'],
    list: [
      'Access: You have the right to request access to the personal information we hold about you.',
      'Correction: You may request to correct or update your personal information.',
      'Deletion: You have the right to request the deletion of your personal data under certain conditions.',
      'Opt-Out: You may opt out of receiving marketing communications from us at any time by following the unsubscribe instructions in emails or by contacting us directly.',
    ],
    paragraphsAfter: [
      'To exercise any of these rights, please contact us using the details provided below.',
    ],
  },
  {
    title: '8. Cookies and Tracking Technologies',
    paragraphs: [
      'We use cookies and similar tracking technologies to enhance your experience on our website, analyze traffic, and personalize content. You can control the use of cookies through your browser settings. However, disabling cookies may affect your experience on our website.',
    ],
  },
  {
    title: '9. Third-Party Websites',
    paragraphs: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external websites. We encourage you to read their privacy policies before providing any personal information.',
    ],
  },
  {
    title: '10. Changes to This Privacy Policy',
    paragraphs: [
      'Ekara Financial Services Pvt Ltd reserves the right to update this Privacy Policy at any time. We will notify you of any material changes by posting the new policy on our website, and the effective date will be updated accordingly.',
    ],
  },
  {
    title: '11. Contact Us',
    paragraphs: [
      'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:',
    ],
    contact: true,
  },
]

export default function PrivacyPolicy() {
  return (
    <section className="section legal-page" id="privacy">
      <div className="container">
        <ScaleReveal className="section__header legal-page__header">
          <span className="section__label">Legal</span>
          <h2 className="section__title">Privacy Policy</h2>
          <p className="section__desc">
            How Ekara Financial Services Pvt Ltd collects, uses, and protects your information.
          </p>
        </ScaleReveal>

        <div className="legal-page__content">
          {SECTIONS.map(({ title, paragraphs, list, paragraphsAfter, contact }) => (
            <article key={title} className="legal-page__block">
              <h3>{title}</h3>
              {paragraphs?.map((text) => (
                <p key={text.slice(0, 48)}>{text}</p>
              ))}
              {list && (
                <ul>
                  {list.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              )}
              {paragraphsAfter?.map((text) => (
                <p key={text.slice(0, 48)}>{text}</p>
              ))}
              {contact && (
                <address className="legal-page__contact">
                  <strong>Ekara Financial Services Pvt Ltd</strong>
                  <p>
                    Email: <a href="mailto:team@ekara.co.in">team@ekara.co.in</a>
                  </p>
                  <p>
                    Phone: <a href="tel:+919431348343">9431348343</a>
                  </p>
                </address>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}