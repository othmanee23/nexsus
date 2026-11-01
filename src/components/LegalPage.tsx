import React from 'react';
import {
  CONTACT_EMAIL,
  FORMATTED_PHONE,
  FORMATTED_SECONDARY_PHONE,
  LEGAL_NAME,
} from '../config';

export type LegalPageSlug = 'privacy' | 'terms' | 'ai-transparency';

type Subsection = {
  title: string;
  paragraphs?: React.ReactNode[];
  items?: React.ReactNode[];
  afterItems?: React.ReactNode[];
};

type Section = {
  title: string;
  paragraphs?: React.ReactNode[];
  items?: React.ReactNode[];
  afterItems?: React.ReactNode[];
  subsections?: Subsection[];
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  introduction: React.ReactNode[];
  sections: Section[];
};

const contactDetails = (
  <>
    <strong>{LEGAL_NAME}</strong><br />
    LOT ALWAHDA FATH AL KHIR N 60<br />
    Temara, Morocco<br /><br />
    Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br />
    Phone: <a href="tel:+212708019109">{FORMATTED_PHONE}</a> ·{' '}
    <a href="tel:+212627901859">{FORMATTED_SECONDARY_PHONE}</a>
  </>
);

const privacySections: Section[] = [
  {
    title: 'Who we are',
    paragraphs: [
      <>NEXSUS PROJECT SARL is a Moroccan company operating through complementary activities including Projects, Technology &amp; Solutions, AMARIS and Ventures.</>,
      <>Contact information:</>,
      contactDetails,
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [<>We collect personal information primarily when you choose to contact us.</>],
    subsections: [
      {
        title: 'Contact and enquiry information',
        paragraphs: [
          <>When you use a contact or project-enquiry form, we may collect:</>,
        ],
        items: [
          'your name',
          'your email address',
          'your organization, if provided',
          'your area of interest',
          'the content of your message',
        ],
      },
      {
        title: 'Technical and security information',
        paragraphs: [
          <>The website also uses technical anti-spam measures.</>,
          <>Our infrastructure provider may process technical information necessary to deliver and secure the website, including:</>,
        ],
        items: [
          'IP address',
          'browser and device information',
          'request information',
          'security signals',
          'performance and diagnostic information',
        ],
        afterItems: [<>Cloudflare Turnstile may process technical information, including an IP address and challenge token, when verifying that a form submission is legitimate.</>],
      },
      {
        title: 'Website analytics',
        paragraphs: [
          <>We use Cloudflare Web Analytics to understand aggregate website usage and performance. The current implementation is designed to operate without NEXSUS setting analytics cookies or using browser localStorage or sessionStorage for behavioral tracking.</>,
        ],
      },
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [<>We may use information collected through the website to:</>],
    items: [
      'respond to enquiries',
      'route enquiries to the relevant NEXSUS division',
      'communicate with prospective customers, partners and other visitors',
      'operate and secure the website',
      'prevent spam and abuse',
      'diagnose technical problems',
      'understand aggregate site usage and performance',
      'improve the website and our services',
      'comply with applicable legal obligations',
    ],
    subsections: [
      {
        title: 'Automated decisions',
        paragraphs: [<>We do not currently use website enquiry data for automated decision-making.</>],
      },
    ],
  },
  {
    title: 'Contact-form processing',
    paragraphs: [
      <>When you submit an enquiry, the website sends the information through our Cloudflare-hosted infrastructure and uses Resend to deliver the message to the NEXSUS business mailbox.</>,
      <>The current application does not store submitted contact-form data in an application database, Cloudflare KV, D1, R2 or another dedicated website datastore.</>,
      <>Messages may nevertheless be retained in our business email systems and by service providers for operational, security or delivery purposes. No precise mailbox or provider retention period is currently defined in the website code.</>,
    ],
  },
  {
    title: 'Legal context',
    paragraphs: [
      <>NEXSUS operates in Morocco.</>,
      <>The processing of personal data may be subject to applicable Moroccan data-protection requirements, including Law No. 09-08 relating to the protection of individuals with regard to the processing of personal data.</>,
      <>Where required, processing is carried out for legitimate and defined purposes such as responding to your enquiry, operating the website, maintaining security, taking steps requested by you before a possible business relationship, or complying with legal obligations.</>,
      <>This policy does not claim a CNDP declaration or authorization reference unless such a reference is separately confirmed and published by NEXSUS.</>,
    ],
  },
  {
    title: 'Service providers',
    paragraphs: [<>We use third-party service providers to operate the website.</>],
    subsections: [
      {
        title: 'Cloudflare',
        paragraphs: [<>Cloudflare provides website delivery, DNS/CDN services, security, Cloudflare Workers, Turnstile, Web Analytics and operational monitoring. Cloudflare may process technical data required to provide these services.</>],
      },
      {
        title: 'Resend',
        paragraphs: [<>Resend is used to deliver messages submitted through the website to the NEXSUS business mailbox. It receives the information required to transmit those enquiries.</>],
      },
      {
        title: 'External font providers',
        paragraphs: [<>The website may request font resources from providers including Google Fonts and rsms.me. Those providers may receive ordinary technical request information when a browser requests their resources.</>],
      },
    ],
  },
  {
    title: 'International processing',
    paragraphs: [
      <>Some service providers used to operate the website may process information using infrastructure located outside Morocco.</>,
      <>Where applicable, NEXSUS seeks to use reputable service providers and handle personal information in accordance with applicable requirements. The exact data-location and transfer arrangements of third-party providers are governed by their infrastructure and contractual terms.</>,
    ],
  },
  {
    title: 'Cookies and browser storage',
    paragraphs: [
      <>NEXSUS does not currently use optional advertising, remarketing or behavioral-tracking cookies on nexsus.ma.</>,
      <>The current application does not use application cookies, localStorage or sessionStorage for visitor tracking or preferences.</>,
      <>Cloudflare Web Analytics is currently implemented as cookieless aggregate analytics. Cloudflare Turnstile is used as a website security and abuse-prevention mechanism.</>,
      <>Because the current site does not use optional cookie-based advertising or tracking technologies, NEXSUS does not currently display a general cookie-consent banner.</>,
      <>If the website later introduces technologies such as advertising pixels, remarketing, personalization storage or other optional trackers, this policy and the consent mechanism will be reassessed.</>,
    ],
  },
  {
    title: 'How long we retain information',
    paragraphs: [
      <>We retain personal information only for as long as reasonably necessary for the purpose for which it was collected and for applicable operational or legal requirements.</>,
      <>The website itself does not maintain a dedicated database of contact enquiries. Information delivered to our business mailbox or processed by service providers may be retained in accordance with our operational needs and the relevant provider settings or terms.</>,
    ],
  },
  {
    title: 'Data security',
    paragraphs: [
      <>We use reasonable technical and organizational measures intended to protect the website and information processed through it.</>,
      <>These measures include secured HTTPS delivery, infrastructure security controls, form validation, anti-spam protections and access controls.</>,
      <>However, no internet transmission or information system can be guaranteed to be completely secure.</>,
    ],
  },
  {
    title: 'Your rights',
    paragraphs: [<>Depending on applicable law and the circumstances of the processing, you may have rights concerning your personal information, including rights to request:</>],
    items: [
      'access to personal information concerning you',
      'correction of inaccurate or incomplete information',
      'opposition to certain processing where legally applicable',
    ],
    subsections: [
      {
        title: 'Submitting a request',
        paragraphs: [
          <>To submit a privacy-related request, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may need to verify your identity before acting on a request.</>,
          <>Where applicable, individuals may also contact the Moroccan Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).</>,
        ],
      },
    ],
  },
  {
    title: 'External links',
    paragraphs: [
      <>The website may contain links to third-party websites, social networks or informational sources.</>,
      <>NEXSUS does not control those websites and is not responsible for their privacy practices. We recommend reviewing the privacy policies of third-party services you choose to visit.</>,
    ],
  },
  {
    title: 'Children',
    paragraphs: [
      <>The website is designed for general professional and business use and is not intentionally directed at children.</>,
      <>We do not knowingly use the website to solicit personal data from children.</>,
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      <>We may update this Privacy Policy as the website, our services, legal requirements or the technologies we use change.</>,
      <>The latest version will be published on this page with an updated revision date.</>,
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      <>Questions about this Privacy Policy or the handling of personal information can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
      contactDetails,
    ],
  },
];

const termsSections: Section[] = [
  {
    title: 'About the website',
    paragraphs: [<>The NEXSUS website provides information about:</>],
    items: [
      'NEXSUS PROJECT SARL',
      'NEXSUS Projects',
      'NEXSUS Technology & Solutions',
      'AMARIS',
      'NEXSUS Ventures',
      'selected projects and capabilities',
      'Insights and professional content',
      'ways to contact NEXSUS',
    ],
    subsections: [
      {
        title: 'Purpose',
        paragraphs: [<>The information is provided for general business and informational purposes.</>],
      },
    ],
  },
  {
    title: 'Permitted use',
    paragraphs: [<>You may access and use the website for lawful personal, professional and business purposes. Unless a specific restriction is clearly stated, you may:</>],
    items: [
      'browse public pages',
      'read and reference public Insights',
      'contact NEXSUS',
      'share links to public NEXSUS content',
    ],
  },
  {
    title: 'Prohibited use',
    paragraphs: [<>You may not use the website to:</>],
    items: [
      'engage in unlawful activity',
      'attempt unauthorized access to systems or accounts',
      'interfere with website availability or security',
      'introduce malicious code',
      'impersonate another person or organization',
      'submit fraudulent or deliberately misleading enquiries',
      'attempt to bypass security protections',
      'use automated systems in a way that materially disrupts website operation',
      'reproduce protected NEXSUS content commercially without authorization',
    ],
    subsections: [
      {
        title: 'Legitimate access',
        paragraphs: [<>Nothing in these terms is intended to prevent legitimate search-engine crawling, ordinary linking, security research carried out lawfully, or normal use of publicly available pages.</>],
      },
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      <>Unless otherwise indicated, original website materials created by or for NEXSUS—including text, design, branding elements, graphics, photographs, audiovisual materials and other original content—may be protected by applicable intellectual-property rights.</>,
      <>The names and branding associated with NEXSUS, NEXSUS Projects, NEXSUS Technology &amp; Solutions, AMARIS and NEXSUS Ventures may not be used in a way that falsely suggests endorsement, partnership or affiliation.</>,
      <>Third-party names, trademarks, images or materials remain the property of their respective owners.</>,
    ],
  },
  {
    title: 'Insights and informational content',
    paragraphs: [<>NEXSUS publishes Insights covering subjects such as:</>],
    items: [
      'branding and creative strategy',
      'construction and fit-out',
      'technology',
      'automation',
      'software',
      'business development',
      'venture building',
      'market entry',
    ],
    subsections: [
      {
        title: 'Professional context',
        paragraphs: [<>This content is intended to provide general professional information and perspectives. It should not automatically be treated as:</>],
        items: [
          'legal advice',
          'tax advice',
          'regulated financial advice',
          'investment advice',
          'engineering certification',
          'professional advice specific to your individual circumstances',
        ],
      },
      {
        title: 'Specialist advice',
        paragraphs: [<>Where a decision requires specialized professional advice, you should consult an appropriately qualified adviser.</>],
      },
    ],
  },
  {
    title: 'Accuracy and updates',
    paragraphs: [<>We aim to keep website information useful and accurate. However:</>],
    items: [
      'business conditions change',
      'prices and market conditions change',
      'laws and regulations evolve',
      'third-party information may change',
      'articles may become outdated over time',
    ],
    subsections: [
      {
        title: 'Content updates',
        paragraphs: [
          <>NEXSUS does not guarantee that every item of public website content will always remain complete, current or applicable to every situation.</>,
          <>We may update, correct or remove content when appropriate.</>,
        ],
      },
    ],
  },
  {
    title: 'Third-party links',
    paragraphs: [<>The website may link to:</>],
    items: [
      'public authorities',
      'research',
      'external publications',
      'partner or client websites',
      'social networks',
      'other third-party resources',
    ],
    subsections: [
      {
        title: 'External resources',
        paragraphs: [
          <>Links are provided for convenience or reference. A link does not automatically mean that NEXSUS endorses every statement, product or service available on the third-party site.</>,
          <>NEXSUS does not control external websites and is not responsible for their content, availability or practices.</>,
        ],
      },
    ],
  },
  {
    title: 'Website availability',
    paragraphs: [
      <>We aim to keep nexsus.ma available and functioning reliably. However, we do not guarantee uninterrupted or error-free access.</>,
      <>The site may temporarily become unavailable because of:</>,
    ],
    items: [
      'maintenance',
      'infrastructure changes',
      'security measures',
      'technical failures',
      'network or provider outages',
      'events beyond reasonable control',
    ],
  },
  {
    title: 'Enquiries and communications',
    paragraphs: [<>Submitting a website enquiry does not automatically create:</>],
    items: [
      'a client relationship',
      'a contractual relationship',
      'a partnership',
      'an investment commitment',
      'an obligation for NEXSUS to accept a project',
    ],
    subsections: [
      {
        title: 'Commercial engagement',
        paragraphs: [<>Any commercial engagement is subject to separate discussion and, where appropriate, written agreement.</>],
      },
    ],
  },
  {
    title: 'Limitation of responsibility',
    paragraphs: [
      <>To the extent permitted by applicable law, NEXSUS is not responsible for decisions made solely on the basis of general informational website content without appropriate consideration of the user&apos;s specific circumstances.</>,
      <>Nothing in these Terms of Use is intended to exclude responsibility that cannot lawfully be excluded.</>,
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      <>You must not attempt to compromise, probe or interfere with the website or its supporting infrastructure in an unauthorized or harmful manner.</>,
      <>Security issues may be reported through <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
    ],
  },
  {
    title: 'Privacy',
    paragraphs: [<>Use of personal information submitted through the website is described in the <a href="/privacy">NEXSUS Privacy Policy</a>.</>],
  },
  {
    title: 'Changes to these terms',
    paragraphs: [
      <>We may update these Terms of Use as the website, our services or applicable requirements change.</>,
      <>The latest version will be available on this page.</>,
    ],
  },
  {
    title: 'Applicable law',
    paragraphs: [
      <>Use of this website is subject to applicable law.</>,
      <>NEXSUS PROJECT SARL operates in Morocco. These website terms do not attempt to replace any more specific jurisdiction, governing-law or dispute-resolution clause that may exist in a separate commercial agreement.</>,
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      <>Questions about these Terms of Use may be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
      contactDetails,
    ],
  },
];

const aiSections: Section[] = [
  {
    title: 'Our approach to AI',
    paragraphs: [<>NEXSUS may use AI-enabled tools where they can improve:</>],
    items: ['research', 'ideation', 'drafting', 'analysis', 'technical work', 'creative exploration', 'operational efficiency'],
    subsections: [
      {
        title: 'Responsibility',
        paragraphs: [
          <>The presence of AI in a workflow does not mean that the final outcome is produced or approved automatically.</>,
          <>Responsibility for work delivered or published by NEXSUS remains with people.</>,
        ],
      },
    ],
  },
  {
    title: 'Human oversight',
    paragraphs: [<>AI-generated and AI-assisted outputs can contain:</>],
    items: ['factual errors', 'incomplete information', 'weak assumptions', 'misleading interpretations', 'inappropriate recommendations'],
    subsections: [
      {
        title: 'Professional review',
        paragraphs: [
          <>For this reason, AI assistance should be treated as input to professional work rather than unquestioned authority.</>,
          <>Where AI-assisted material is used in published or client-facing work, appropriate human review, editing or validation should be applied according to the nature and importance of the task.</>,
        ],
      },
    ],
  },
  {
    title: 'AI and NEXSUS Insights',
    paragraphs: [<>NEXSUS may use AI-assisted tools during parts of the editorial process for Insights, including:</>],
    items: ['research assistance', 'idea development', 'content structuring', 'drafting support', 'editing', 'summarization'],
    subsections: [
      {
        title: 'Editorial responsibility',
        paragraphs: [
          <>AI assistance does not remove editorial responsibility. NEXSUS remains responsible for the decision to publish content under its name.</>,
          <>Where an Insight contains important factual, legal, financial, technical or market claims, appropriate sources and professional judgment should be used.</>,
        ],
      },
    ],
  },
  {
    title: 'AI in creative work',
    paragraphs: [<>AI tools may be used selectively during creative exploration where appropriate. Examples may include:</>],
    items: ['concept development', 'visual exploration', 'ideation', 'moodboarding', 'draft generation', 'production assistance'],
    subsections: [
      {
        title: 'Creative direction',
        paragraphs: [
          <>AI-generated material should not be presented as third-party original work where doing so would be misleading.</>,
          <>Creative decisions and final deliverables remain subject to human direction and review.</>,
        ],
      },
    ],
  },
  {
    title: 'AI in technology solutions',
    paragraphs: [<>NEXSUS Technology &amp; Solutions may evaluate or implement AI capabilities when they are appropriate to a client&apos;s business problem. Potential applications can include:</>],
    items: ['automation', 'information retrieval', 'analysis', 'workflow assistance', 'decision support', 'generative interfaces'],
    subsections: [
      {
        title: 'Choosing the right approach',
        paragraphs: [
          <>AI is not automatically the correct solution to every technology problem.</>,
          <>Where a conventional workflow, deterministic system or standard software solution is more appropriate, it should remain an option.</>,
        ],
      },
    ],
  },
  {
    title: 'No user-facing AI on the current website',
    paragraphs: [<>The current public nexsus.ma website does not provide:</>],
    items: ['an AI chatbot', 'automated AI-generated customer responses', 'an AI recommendation engine', 'an AI decision-making system for visitors'],
    subsections: [
      {
        title: 'Current enquiry flow',
        paragraphs: [
          <>Contact enquiries are submitted through ordinary forms and routed to NEXSUS for human follow-up.</>,
          <>If user-facing AI features are introduced in the future, this page and the relevant privacy information should be updated.</>,
        ],
      },
    ],
  },
  {
    title: 'Privacy and confidential information',
    paragraphs: [<>AI-assisted workflows should be used with appropriate consideration for:</>],
    items: ['privacy', 'confidentiality', 'intellectual property', 'security', 'contractual obligations'],
    subsections: [
      {
        title: 'Sensitive information',
        paragraphs: [
          <>Sensitive or confidential client information should not be placed into external AI systems without an appropriate basis, authorization and understanding of the relevant provider&apos;s terms and data-handling practices.</>,
          <>NEXSUS intends to develop and refine its internal AI-use rules as tools and requirements evolve.</>,
        ],
      },
    ],
  },
  {
    title: 'Accuracy and validation',
    paragraphs: [
      <>AI can accelerate work, but speed does not guarantee accuracy.</>,
      <>Important outputs should be checked according to their context. The level of validation should increase when information may affect:</>,
    ],
    items: ['legal decisions', 'financial decisions', 'technical systems', 'safety', 'business strategy', 'customer-facing claims'],
    subsections: [
      { title: 'High-impact situations', paragraphs: [<>AI-generated content should not be relied upon blindly in high-impact situations.</>] },
    ],
  },
  {
    title: 'Responsible use principles',
    paragraphs: [<>Our approach is guided by practical principles:</>],
    subsections: [
      { title: 'Human accountability', paragraphs: [<>People remain responsible for work published or delivered under the NEXSUS name.</>] },
      { title: 'Purpose before technology', paragraphs: [<>AI should be used where it solves a real problem, not simply because AI is available.</>] },
      { title: 'Privacy awareness', paragraphs: [<>Personal, sensitive and confidential information deserves appropriate protection.</>] },
      { title: 'Accuracy', paragraphs: [<>Important claims and decisions should receive appropriate validation.</>] },
      { title: 'Transparency', paragraphs: [<>We aim to communicate honestly about material uses of AI where transparency is relevant to the user, client or context.</>] },
      { title: 'Security', paragraphs: [<>AI integrations should be evaluated as part of the broader security architecture of a solution.</>] },
      { title: 'Proportionality', paragraphs: [<>Automation should not be introduced where human judgment is more appropriate.</>] },
    ],
  },
  {
    title: 'AI will continue to evolve',
    paragraphs: [<>AI technology, regulation and industry practices are changing quickly. Our approach may evolve as:</>],
    items: ['tools change', 'customer expectations develop', 'new risks emerge', 'legal requirements change', 'industry standards mature'],
    subsections: [
      { title: 'Updates', paragraphs: [<>Material updates will be reflected on this page where appropriate.</>] },
    ],
  },
  {
    title: 'Questions',
    paragraphs: [<>Questions about NEXSUS&apos;s approach to AI may be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>],
  },
];

const pages: Record<LegalPageSlug, LegalPageContent> = {
  privacy: {
    eyebrow: 'Trust & privacy',
    title: 'Privacy Policy',
    introduction: [
      <>NEXSUS PROJECT SARL (&quot;NEXSUS&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) respects the privacy of visitors to nexsus.ma.</>,
      <>This Privacy Policy explains what information we collect through the website, why we use it, the service providers involved in operating the site, and how you can contact us regarding your personal information.</>,
      <>This policy applies to the public website available at <a href="https://nexsus.ma">https://nexsus.ma</a>.</>,
    ],
    sections: privacySections,
  },
  terms: {
    eyebrow: 'Website terms',
    title: 'Terms of Use',
    introduction: [
      <>These Terms of Use apply to the public website operated by NEXSUS PROJECT SARL at <a href="https://nexsus.ma">https://nexsus.ma</a>.</>,
      <>By accessing or using this website, you agree to use it lawfully and in accordance with these terms.</>,
      <>These Terms of Use govern the website only. They do not replace or modify any separate contract, proposal, statement of work or other agreement entered into between NEXSUS and a client, supplier, partner or other party.</>,
    ],
    sections: termsSections,
  },
  'ai-transparency': {
    eyebrow: 'Responsible technology',
    title: 'AI Transparency',
    introduction: [
      <>Artificial intelligence is becoming part of many creative, technical, analytical and operational workflows.</>,
      <>NEXSUS approaches AI as a tool that can support people—not as a replacement for professional judgment, accountability or validation.</>,
      <>This page explains how we currently think about AI-assisted work across NEXSUS.</>,
    ],
    sections: aiSections,
  },
};

const renderParagraphs = (paragraphs?: React.ReactNode[]) => paragraphs?.map((paragraph, index) => (
  <p key={index}>{paragraph}</p>
));

const renderItems = (items?: React.ReactNode[]) => items ? (
  <ul>
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
) : null;

export const LegalPage: React.FC<{ slug: LegalPageSlug }> = ({ slug }) => {
  const page = pages[slug];

  return (
    <main className="legal-page">
      <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li aria-current="page">{page.title}</li>
        </ol>
      </nav>

      <header className="legal-page-header">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <div className="legal-page-introduction">{renderParagraphs(page.introduction)}</div>
        <p>Last updated: November 2026</p>
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
              {renderParagraphs(section.paragraphs)}
              {renderItems(section.items)}
              {renderParagraphs(section.afterItems)}
              {section.subsections?.map((subsection) => (
                <div className="legal-subsection" key={subsection.title}>
                  <h3>{subsection.title}</h3>
                  {renderParagraphs(subsection.paragraphs)}
                  {renderItems(subsection.items)}
                  {renderParagraphs(subsection.afterItems)}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;
