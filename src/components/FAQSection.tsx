import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { copy, Language } from '../i18n';

interface FAQSectionProps {
  language: Language;
  onOpenContact: () => void;
  onSelectDivision: (id: string) => void;
}

type FAQItem = {
  question: string;
  answer: string[];
};

const FAQS: Record<Language, FAQItem[]> = {
  en: [
    {
      question: 'What does NEXSUS do?',
      answer: [
        'NEXSUS is a multidisciplinary company founded in 2025 and based in Temara, Morocco. We operate through four complementary divisions: PROJECTS, TECHNOLOGY & SOLUTIONS, AMARIS, and VENTURES. Together, they cover construction and interior projects, enterprise technology, creative services, and business ventures.',
      ],
    },
    {
      question: 'Which division is right for my project?',
      answer: [
        'PROJECTS covers construction, interior architecture, fit-out, and space design. TECHNOLOGY & SOLUTIONS focuses on enterprise software, digital platforms, and B2B consulting. AMARIS brings together brand strategy, creative direction, and production. VENTURES focuses on consumer businesses, proprietary brands, and strategic investments.',
        'If you are unsure which division to contact, send us a general enquiry describing your needs.',
      ],
    },
    {
      question: 'Can one project involve several NEXSUS divisions?',
      answer: [
        'Yes. When a project requires complementary expertise, we bring together the relevant divisions within a coordinated scope. For example, opening a commercial space may involve interior fit-out, brand identity, and digital systems. Responsibilities and deliverables are defined around the needs of the project.',
      ],
    },
    {
      question: 'How does NEXSUS organize project delivery?',
      answer: [
        'We work through a core team supported by specialist collaborators and delivery partners selected according to the assignment. Each project is organized around its scope, technical requirements, schedule, and required expertise.',
      ],
    },
    {
      question: 'Can I engage NEXSUS for a specific service?',
      answer: [
        'Yes. You can engage a division for a defined service or discuss a broader project involving several areas of expertise. The proposal sets out the agreed deliverables, responsibilities, and boundaries of the engagement.',
      ],
    },
    {
      question: 'How are costs and timelines determined?',
      answer: [
        'Costs and timelines depend on the project’s scope, complexity, and delivery requirements. After reviewing your brief and clarifying your priorities, we prepare a proposal detailing the scope, fees, estimated schedule, and relevant assumptions.',
      ],
    },
    {
      question: 'How can I discuss a venture or partnership?',
      answer: [
        'Contact VENTURES with an overview of the opportunity, the customer need it addresses, its current stage, and the type of collaboration you are seeking. This information helps us assess how the opportunity aligns with the division’s focus.',
      ],
    },
    {
      question: 'What information should I provide to start a project?',
      answer: [
        'Tell us what you want to achieve, the services you need, and your preferred timeline. Include any available brief, plans, references, or technical requirements. For construction and interior projects, specify the location and approximate area. An indicative budget is helpful if available.',
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

export const FAQSection: React.FC<FAQSectionProps> = ({ language, onOpenContact, onSelectDivision }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = copy[language];

  const renderParagraph = (text: string, faqIndex: number, paragraphIndex: number) => {
    if (faqIndex !== 1 || paragraphIndex !== 0) return text;

    const labels = ['PROJECTS', 'TECHNOLOGY & SOLUTIONS', 'AMARIS', 'VENTURES'];
    const parts = text.split(new RegExp(`(${labels.map((label) => label.replace('&', '\\&')).join('|')})`, 'g'));

    return parts.map((part, index) => {
      const divisionIndex = labels.indexOf(part);
      if (divisionIndex === -1) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;

      return (
        <button
          key={part}
          type="button"
          onClick={() => onSelectDivision(divisionLinks[divisionIndex])}
          className="font-medium text-black underline decoration-black/30 underline-offset-4 hover:decoration-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          {part}
        </button>
      );
    });
  };

  return (
    <section
      id="faq"
      className="w-full border-t border-black/10 bg-white px-4 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4"
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
                      {item.answer.map((paragraph, paragraphIndex) => (
                        <p key={paragraph}>{renderParagraph(paragraph, index, paragraphIndex)}</p>
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
            <button
              type="button"
              onClick={onOpenContact}
              className="border-b border-black pb-0.5 text-xs font-mono uppercase tracking-widest text-black transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {t.discussProject}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
