import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { copy, Language } from '../i18n';

interface FAQSectionProps {
  language: Language;
  onOpenContact: () => void;
  onSelectDivision: (id: string) => void;
  onRouteNavigate: (path: string) => void;
}

type FAQItem = {
  question: string;
  answer: string[];
};

const FAQS: Record<Language, FAQItem[]> = {
  en: [
    {
      question: 'What is NEXSUS?',
      answer: [
        'NEXSUS PROJECT SARL is a Moroccan operating company structured around four complementary divisions: PROJECTS, TECHNOLOGY & SOLUTIONS, AMARIS and VENTURES.',
      ],
    },
    {
      question: 'What services does NEXSUS provide?',
      answer: [
        'PROJECTS covers construction, renovation, interior architecture and fit-out. TECHNOLOGY & SOLUTIONS develops enterprise software, digital platforms, automation and integrations. AMARIS focuses on brand strategy, identity, creative direction and production. VENTURES assesses opportunities and develops new businesses, proprietary brands and selected strategic initiatives.',
      ],
    },
    {
      question: 'Where does NEXSUS operate?',
      answer: [
        'NEXSUS is based in Temara, Morocco. The delivery location and operating model for each engagement are confirmed according to its scope, requirements and the people or partners needed.',
      ],
    },
    {
      question: 'Can NEXSUS manage projects across more than one division?',
      answer: [
        'Yes, when a project genuinely requires complementary disciplines. A physical space may also require technology; a new venture may need AMARIS brand work; and a brand launch may require a digital platform. The participating divisions and responsibilities are defined around the actual scope rather than applied to every engagement.',
      ],
    },
    {
      question: 'Does NEXSUS work with businesses and institutions?',
      answer: [
        'Yes. NEXSUS works with businesses, institutions, commercial operators, public-sector projects and private project owners where the brief aligns with the capabilities of one or more divisions.',
      ],
    },
    {
      question: 'How do I start a project with NEXSUS?',
      answer: [
        'Contact NEXSUS with a concise description of what you want to achieve, your preferred timing and any available brief, plans or requirements. We will arrange an initial discussion, clarify the scope and connect the enquiry with the appropriate division and next steps.',
      ],
    },
    {
      question: 'Does NEXSUS publish business and industry insights?',
      answer: [
        'Yes. NEXSUS Insights publishes practical perspectives across Projects, Technology, Brand & Creative and Ventures, with each article connected to its relevant division and topic cluster.',
      ],
    },
    {
      question: 'How does NEXSUS use AI?',
      answer: [
        'NEXSUS may use AI-assisted tools internally where they are appropriate, with human oversight and responsibility for final decisions and published work. The AI Transparency page explains the current website position and responsible-use principles.',
      ],
    },
  ],
  fr: [
    {
      question: 'Que fait NEXSUS ?',
      answer: [
        'NEXSUS est une entreprise pluridisciplinaire fondée en 2025 et basée à Témara, Maroc. Nous opérons à travers quatre divisions complémentaires : PROJECTS, TECHNOLOGY & SOLUTIONS, AMARIS et VENTURES. Ensemble, elles couvrent les projets de construction et d’intérieur, la technologie d’entreprise, les services créatifs et les initiatives business.',
      ],
    },
    {
      question: 'Quelle division correspond à mon projet ?',
      answer: [
        'PROJECTS couvre la construction, l’architecture intérieure, le fit-out et le design d’espace. TECHNOLOGY & SOLUTIONS se concentre sur les logiciels d’entreprise, les plateformes digitales et le conseil B2B. AMARIS réunit stratégie de marque, direction créative et production. VENTURES se concentre sur les activités consumer, les marques propriétaires et les investissements stratégiques.',
        'Si vous ne savez pas quelle division contacter, envoyez une demande générale en décrivant vos besoins.',
      ],
    },
    {
      question: 'Un projet peut-il impliquer plusieurs divisions NEXSUS ?',
      answer: [
        'Oui. Lorsqu’un projet demande des expertises complémentaires, nous réunissons les divisions concernées dans un périmètre coordonné. Par exemple, l’ouverture d’un espace commercial peut impliquer l’aménagement intérieur, l’identité de marque et les systèmes digitaux. Les responsabilités et livrables sont définis selon les besoins du projet.',
      ],
    },
    {
      question: 'Comment NEXSUS organise la livraison des projets ?',
      answer: [
        'Nous travaillons avec une équipe centrale soutenue par des collaborateurs spécialisés et des partenaires de livraison choisis selon la mission. Chaque projet est organisé autour de son périmètre, de ses exigences techniques, de son calendrier et de l’expertise requise.',
      ],
    },
    {
      question: 'Puis-je engager NEXSUS pour un service précis ?',
      answer: [
        'Oui. Vous pouvez engager une division pour un service défini ou discuter d’un projet plus large impliquant plusieurs expertises. La proposition précise les livrables, responsabilités et limites de l’intervention.',
      ],
    },
    {
      question: 'Comment les coûts et délais sont-ils déterminés ?',
      answer: [
        'Les coûts et délais dépendent du périmètre, de la complexité et des exigences de livraison. Après analyse de votre brief et clarification de vos priorités, nous préparons une proposition détaillant le périmètre, les honoraires, le calendrier estimatif et les hypothèses pertinentes.',
      ],
    },
    {
      question: 'Comment discuter une venture ou un partenariat ?',
      answer: [
        'Contactez VENTURES avec une présentation de l’opportunité, du besoin client auquel elle répond, de son stade actuel et du type de collaboration recherché. Ces éléments nous aident à évaluer son alignement avec le focus de la division.',
      ],
    },
    {
      question: 'Quelles informations fournir pour lancer un projet ?',
      answer: [
        'Indiquez ce que vous souhaitez réaliser, les services recherchés et votre calendrier préféré. Ajoutez tout brief, plan, référence ou exigence technique disponible. Pour les projets de construction et d’intérieur, précisez la localisation et la surface approximative. Un budget indicatif est utile s’il existe.',
      ],
    },
  ],
  ar: [
    {
      question: 'ماذا تفعل NEXSUS؟',
      answer: [
        'NEXSUS شركة متعددة التخصصات تأسست سنة 2025 ويقع مقرها في تمارة، المغرب. نعمل من خلال أربعة أقسام متكاملة: PROJECTS و TECHNOLOGY & SOLUTIONS و AMARIS و VENTURES. تغطي هذه الأقسام مشاريع البناء والتصميم الداخلي، وتقنيات المؤسسات، والخدمات الإبداعية، والمبادرات التجارية.',
      ],
    },
    {
      question: 'أي قسم يناسب مشروعي؟',
      answer: [
        'يغطي PROJECTS البناء والعمارة الداخلية والتجهيز وتصميم المساحات. يركز TECHNOLOGY & SOLUTIONS على برمجيات المؤسسات والمنصات الرقمية والاستشارة B2B. يجمع AMARIS بين استراتيجية العلامة والتوجيه الإبداعي والإنتاج. ويركز VENTURES على الأعمال الاستهلاكية والعلامات المملوكة والاستثمارات الاستراتيجية.',
        'إذا لم تكن متأكداً من القسم المناسب، أرسل استفساراً عاماً يشرح احتياجاتك.',
      ],
    },
    {
      question: 'هل يمكن أن يشمل مشروع واحد عدة أقسام من NEXSUS؟',
      answer: [
        'نعم. عندما يتطلب المشروع خبرات متكاملة، نجمع الأقسام المعنية ضمن نطاق منسق. على سبيل المثال، قد يتطلب افتتاح مساحة تجارية التجهيز الداخلي، وهوية العلامة، والأنظمة الرقمية. يتم تحديد المسؤوليات والمخرجات حسب احتياجات المشروع.',
      ],
    },
    {
      question: 'كيف تنظم NEXSUS تسليم المشاريع؟',
      answer: [
        'نعمل من خلال فريق أساسي مدعوم بمتعاونين متخصصين وشركاء تنفيذ يتم اختيارهم حسب المهمة. ينظم كل مشروع حول نطاقه ومتطلباته التقنية وجدوله الزمني والخبرة المطلوبة.',
      ],
    },
    {
      question: 'هل يمكنني التعامل مع NEXSUS لخدمة محددة؟',
      answer: [
        'نعم. يمكنك التعامل مع قسم معين لخدمة محددة أو مناقشة مشروع أوسع يشمل عدة مجالات خبرة. يوضح العرض المخرجات المتفق عليها والمسؤوليات وحدود التدخل.',
      ],
    },
    {
      question: 'كيف يتم تحديد التكلفة والمدة؟',
      answer: [
        'تعتمد التكلفة والمدة على نطاق المشروع وتعقيده ومتطلبات التسليم. بعد مراجعة brief وتوضيح الأولويات، نعد عرضاً يحدد النطاق والرسوم والجدول التقديري والافتراضات المناسبة.',
      ],
    },
    {
      question: 'كيف يمكنني مناقشة فرصة أو شراكة؟',
      answer: [
        'تواصل مع VENTURES مع ملخص للفرصة، وحاجة العميل التي تعالجها، ومرحلتها الحالية، ونوع التعاون المطلوب. تساعدنا هذه المعلومات على تقييم مدى توافق الفرصة مع تركيز القسم.',
      ],
    },
    {
      question: 'ما المعلومات التي أقدمها لبدء مشروع؟',
      answer: [
        'أخبرنا بما تريد تحقيقه، والخدمات التي تحتاجها، والجدول الزمني المفضل. أرفق أي brief أو مخططات أو مراجع أو متطلبات تقنية متاحة. بالنسبة لمشاريع البناء والتصميم الداخلي، حدد الموقع والمساحة التقريبية. وجود ميزانية تقديرية يساعد إن توفرت.',
      ],
    },
  ],
};

const divisionLinks = ['projects', 'technology', 'amaris', 'ventures'];

export const FAQSection: React.FC<FAQSectionProps> = ({ language, onOpenContact, onSelectDivision, onRouteNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = copy[language];

  const renderParagraph = (text: string) => {
    const destinations: Record<string, string> = {
      'TECHNOLOGY & SOLUTIONS': '/technology',
      'AI Transparency page': '/ai-transparency',
      'NEXSUS Insights': '/insights',
      'Contact NEXSUS': '/contact',
      PROJECTS: '/projects',
      AMARIS: '/amaris',
      VENTURES: '/ventures',
    };
    const labels = Object.keys(destinations).sort((a, b) => b.length - a.length);
    const escapedLabels = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const parts = text.split(new RegExp(`(${escapedLabels.join('|')})`, 'g'));

    return parts.map((part, index) => {
      const path = destinations[part];
      if (!path) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
      const localizedHref = language === 'en' || path.startsWith('/insights') || path === '/ai-transparency'
        ? path
        : `/${language}${path}`;

      return (
        <a
          key={part}
          href={localizedHref}
          onClick={(event) => {
            if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const divisionIndex = divisionLinks.indexOf(path.slice(1));
            if (divisionIndex !== -1) onSelectDivision(divisionLinks[divisionIndex]);
            else onRouteNavigate(path);
          }}
          className="font-medium text-black underline decoration-black/30 underline-offset-4 hover:decoration-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          {part}
        </a>
      );
    });
  };

  return (
    <section
      id="faq"
      className="cv-auto cv-faq w-full border-t border-black/10 bg-white px-4 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start"
        >
          <h2 className="text-2xl font-medium uppercase tracking-tight text-black sm:text-3xl">
            {t.faqTitle}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
            {t.faqIntro}
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          <div className="border-t border-black/10">
            {FAQS[language].map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={item.question} className="border-b border-black/10">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <span className="text-sm font-medium uppercase tracking-wide text-black sm:text-base">
                      {index + 1}. {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`${isOpen ? 'block' : 'hidden'} pb-6`}
                  >
                    <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-black/70">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{renderParagraph(paragraph)}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium uppercase tracking-wide text-black">
              {t.faqClosing}
            </p>
            <a
              href={`${language === 'en' ? '' : `/${language}`}/contact`}
              onClick={(event) => {
                if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                onOpenContact();
              }}
              className="border-b border-black pb-0.5 text-xs font-mono uppercase tracking-widest text-black transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {t.discussProject}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
