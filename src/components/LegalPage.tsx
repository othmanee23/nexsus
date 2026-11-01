import React from 'react';
import { ADDRESS_TEXT, CONTACT_EMAIL, FORMATTED_PHONE, LEGAL_NAME } from '../config';

export type LegalPageSlug = 'privacy' | 'terms' | 'ai-transparency';

type Section = {
  title: string;
  paragraphs?: React.ReactNode[];
  items?: React.ReactNode[];
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: Section[];
};

const privacySections: Section[] = [
  {
    title: 'Who we are',
    paragraphs: [
      <><strong>{LEGAL_NAME}</strong> is a multidisciplinary company based at {ADDRESS_TEXT}. This policy explains how information is handled through <a href="https://nexsus.ma">nexsus.ma</a>.</>,
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [
      <>When you submit an enquiry, we collect the area of interest, your name, email address, message, and any organization name you choose to provide.</>,
      <>The site and its infrastructure may also process limited technical information needed to deliver and protect the service, such as request data, an IP address for spam verification, and aggregated page-performance measurements.</>,
    ],
  },
  {
    title: 'How we collect information',
    items: [
      'Directly from you when you submit a contact or project enquiry.',
      'Automatically through hosting, security, spam-prevention, and cookieless performance analytics systems.',
    ],
  },
  {
    title: 'Why we use information',
    items: [
      'To respond to enquiries and take requested pre-contractual steps.',
      'To provide information about NEXSUS and its divisions.',
      'To operate, secure, diagnose, and improve the website.',
      'To meet applicable operational or legal obligations.',
    ],
    paragraphs: [
      <>Depending on the context, processing may be based on your consent, steps requested before a possible engagement, legitimate operational interests that do not override your rights, or applicable legal obligations.</>,
    ],
  },
  {
    title: 'Service providers and sharing',
    paragraphs: [
      <>We use Cloudflare for hosting, content delivery, security, Turnstile spam protection, and cookieless web-performance analytics. We use Resend to deliver submitted enquiries to the NEXSUS business mailbox. These providers process relevant data on our behalf to provide their services.</>,
      <>The site also requests font resources from Google Fonts and rsms.me. Those services receive the standard technical request information needed to return the requested files.</>,
      <>We do not state that enquiry information is sold, and the current website does not include advertising pixels or a newsletter signup. Information may also be disclosed where required by law or necessary to establish, exercise, or defend legal rights.</>,
    ],
  },
  {
    title: 'International processing',
    paragraphs: [
      <>Some service providers operate infrastructure outside Morocco. As a result, technical data and enquiry information may be processed in other countries. Provider locations and safeguards can change, so this statement does not claim a particular transfer mechanism that has not been independently verified.</>,
    ],
  },
  {
    title: 'Retention',
    paragraphs: [
      <>The website does not store contact submissions in its own database. Enquiries are delivered by email and may remain in NEXSUS and service-provider systems only for as long as reasonably necessary to respond, manage the resulting business relationship, protect the service, and meet applicable obligations. Exact provider and mailbox retention periods are governed by the relevant account settings and operational practices.</>,
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      <>We use reasonable technical and organizational measures intended to protect the website and submitted information, including encrypted transport, access controls, security headers, input validation, and spam protection. No internet service can guarantee absolute security.</>,
    ],
  },
  {
    title: 'Your rights',
    paragraphs: [
      <>Subject to applicable Moroccan law and relevant exceptions, you may ask whether we process information about you and request access, correction, updating, deletion or blocking where appropriate. You may also object to certain processing on legitimate grounds.</>,
      <>To make a request, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may need to verify your identity before acting on a request.</>,
    ],
  },
  {
    title: 'Cookies and tracking',
    paragraphs: [
      <>The current website does not set application cookies or use localStorage or sessionStorage for analytics, preferences, or advertising. Cloudflare Web Analytics is used for aggregate performance and usage measurement without cookies. Cloudflare Turnstile processes technical signals when displayed to protect enquiry submission from abuse.</>,
      <>Because no optional cookie-based analytics or marketing trackers are currently present, the site does not display a consent banner. This assessment should be revisited before any optional analytics, advertising, personalization, or embedded tracking technology is added.</>,
    ],
  },
  {
    title: 'External links',
    paragraphs: [
      <>The site links to external websites and social profiles. Their operators control their own privacy practices, and this policy does not apply once you leave nexsus.ma.</>,
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      <>We may update this policy as the website, service providers, or applicable requirements change. The current version and its update date will remain available on this page.</>,
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      <><strong>{LEGAL_NAME}</strong><br />{ADDRESS_TEXT}<br /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br /><a href="tel:+212708019109">{FORMATTED_PHONE}</a></>,
    ],
  },
];

const termsSections: Section[] = [
  {
    title: 'Website purpose',
    paragraphs: [
      <>nexsus.ma provides information about NEXSUS, its operating divisions and services, published Insights, and ways to contact the company about projects or opportunities. It is a public information website and these terms are not a client services agreement.</>,
    ],
  },
  {
    title: 'Acceptance of these terms',
    paragraphs: [
      <>By accessing or using this website, you agree to use it in accordance with these Terms of Use and applicable law. If you do not agree, please stop using the site.</>,
    ],
  },
  {
    title: 'Permitted use',
    paragraphs: [
      <>You may browse, reference, and share links to publicly available pages for lawful informational and business purposes. Any reuse of protected site material must respect the intellectual-property section below.</>,
    ],
  },
  {
    title: 'Prohibited use',
    items: [
      'Attempting unauthorized access, security testing without permission, or disruption of the website or its infrastructure.',
      'Introducing malicious code, automated abuse, or excessive requests that impair the service.',
      'Using the site for unlawful activity, deception, impersonation, or infringement of another person’s rights.',
      'Scraping or reproducing content in a way that harms the service or violates applicable rights.',
    ],
    paragraphs: [
      <>These restrictions do not prohibit ordinary search-engine crawling or reasonable access by legitimate indexing services.</>,
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      <>Unless otherwise indicated, the NEXSUS and AMARIS names, original logos, website design, text, graphics, photography, Insights, and other original materials are owned by or licensed to NEXSUS. They may not be copied, republished, modified, or used commercially without permission, except where the law allows.</>,
      <>Third-party names, marks, images, and linked materials remain the property of their respective owners. Their appearance does not transfer ownership to NEXSUS.</>,
    ],
  },
  {
    title: 'Insights and informational content',
    paragraphs: [
      <>Insights are general professional information. They are not a substitute for advice tailored to your circumstances and should not automatically be treated as legal, tax, financial, or investment advice. Project decisions should be validated against current requirements and appropriate specialist advice.</>,
    ],
  },
  {
    title: 'Third-party links',
    paragraphs: [
      <>External links are provided for convenience, reference, or attribution. NEXSUS does not control third-party websites and is not responsible for their content, availability, security, or privacy practices.</>,
    ],
  },
  {
    title: 'Availability and accuracy',
    paragraphs: [
      <>We aim to keep the site useful and accurate, but content may become incomplete or outdated and availability may be interrupted. We may correct, update, suspend, or withdraw parts of the website without promising uninterrupted access.</>,
    ],
  },
  {
    title: 'Responsibility',
    paragraphs: [
      <>To the extent permitted by applicable law, NEXSUS is not responsible for loss arising solely from reliance on general website content, misuse of the site, or circumstances outside its reasonable control. Nothing in these terms excludes responsibility that cannot lawfully be excluded.</>,
    ],
  },
  {
    title: 'Changes',
    paragraphs: [
      <>We may update the website and these terms when services, content, or applicable requirements change. Continued use after an update is subject to the version then published.</>,
    ],
  },
  {
    title: 'Governing context',
    paragraphs: [
      <>{LEGAL_NAME} operates from Morocco. These terms should be understood in that context and alongside applicable Moroccan law. Any precise choice-of-law or jurisdiction clause should form part of a separately reviewed legal instrument where required.</>,
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      <>Questions about the website or these terms can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
    ],
  },
];

const aiSections: Section[] = [
  {
    title: 'Our approach',
    paragraphs: [
      <>NEXSUS may use AI-enabled tools to support selected research, creative, analytical, technical, or operational workflows where they are useful and appropriate. This does not mean that every NEXSUS service, project, or deliverable uses AI.</>,
    ],
  },
  {
    title: 'Human oversight',
    paragraphs: [
      <>NEXSUS remains responsible for its published and client-facing work. AI-assisted material intended for use is subject to human direction, review, editing, and validation appropriate to the context.</>,
    ],
  },
  {
    title: 'Insights and content',
    paragraphs: [
      <>AI tools may assist with tasks such as ideation, research organization, drafting support, editing, or quality checks. They do not replace editorial judgment. AI may assist the process; editorial responsibility remains with NEXSUS.</>,
    ],
  },
  {
    title: 'AI in technology solutions',
    paragraphs: [
      <>NEXSUS Technology may evaluate or implement AI capabilities when they fit a defined business problem, technical environment, risk profile, and expected benefit. AI is not assumed to be the right solution for every project.</>,
    ],
  },
  {
    title: 'Data and confidentiality',
    paragraphs: [
      <>The handling of confidential or personal information in AI-assisted workflows should be evaluated according to the project, provider, permissions, and applicable obligations. Users should not submit sensitive or confidential material through the public contact form unless it is necessary and appropriate.</>,
      <>This page does not claim that information is never processed by external AI systems. Specific client controls, provider terms, retention settings, and approved-tool rules should be agreed or documented where a project requires them.</>,
    ],
  },
  {
    title: 'Limitations',
    paragraphs: [
      <>AI-generated or AI-assisted outputs can be incomplete, inaccurate, biased, or unsuitable for a particular context. Important outputs require proportionate verification, subject-matter judgment, and human accountability.</>,
    ],
  },
  {
    title: 'Responsible use principles',
    items: [
      'Usefulness and a defined purpose.',
      'Human accountability and appropriate oversight.',
      'Privacy and confidentiality awareness.',
      'Security and proportionate access controls.',
      'Accuracy checks and clear communication of limitations.',
      'Avoiding unnecessary automation where a simpler approach is better.',
    ],
  },
  {
    title: 'Questions',
    paragraphs: [
      <>For questions about this approach, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
    ],
  },
];

const pages: Record<LegalPageSlug, LegalPageContent> = {
  privacy: {
    eyebrow: 'Trust & privacy',
    title: 'Privacy Policy',
    introduction: 'How NEXSUS handles information submitted through this website and the limited technical data used to operate it.',
    sections: privacySections,
  },
  terms: {
    eyebrow: 'Website terms',
    title: 'Terms of Use',
    introduction: 'The terms that govern access to and use of the public NEXSUS website and its content.',
    sections: termsSections,
  },
  'ai-transparency': {
    eyebrow: 'Responsible technology',
    title: 'AI Transparency',
    introduction: 'A clear overview of how NEXSUS may use AI-assisted tools and where human responsibility remains essential.',
    sections: aiSections,
  },
};

export const LegalPage: React.FC<{ slug: LegalPageSlug }> = ({ slug }) => {
  const page = pages[slug];

  return (
    <main className="legal-page">
      <header className="legal-page-header">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
        <p>Last updated: November 1, 2026</p>
      </header>

      <div className="legal-page-layout">
        <nav aria-label={`${page.title} sections`}>
          <p>On this page</p>
          <ol>
            {page.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-page-content">
          {page.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.title}>
              <p>{String(index + 1).padStart(2, '0')}</p>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;
