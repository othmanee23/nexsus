import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { copy, Language } from '../i18n';

export interface DivisionItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  mission: string;
  bullets: string[];
  approach: string;
  vision: string;
  cta: string;
  image: string;
}

interface DivisionsGridProps {
  onSelectDivision: (id: string) => void;
  onOpenContact: (divisionId?: string) => void;
  language: Language;
}

const DIVISIONS_BY_LANGUAGE: Record<Language, DivisionItem[]> = {
  en: [
    {
      id: 'projects',
      code: '01',
      name: 'PROJECTS',
      subtitle: 'Construction, Interior Architecture & Fit-out',
      description: 'PROJECTS brings together construction, interior architecture, and fit-out for private projects and public contracts. We connect design with coordinated execution to create functional, well-considered spaces, guided by each project’s intended use, budget, and schedule.',
      mission: 'Deliver functional, well-designed spaces through coordinated execution.',
      bullets: ['Construction & renovation', 'Interior architecture & space design', 'Fit-out & finishes', 'Project coordination & delivery'],
      approach: 'Define the brief, coordinate design and delivery, and manage quality, budget, and schedule.',
      vision: 'Create lasting, adaptable spaces.',
      cta: 'Discuss your project',
      image: '/images/division-projects.jpg',
    },
    {
      id: 'technology',
      code: '02',
      name: 'TECHNOLOGY & SOLUTIONS',
      subtitle: 'Enterprise Software, Digital Platforms & B2B Consulting',
      description: 'TECHNOLOGY & SOLUTIONS develops digital solutions around how businesses work. Through consulting, enterprise software, and tailored platforms, we help organizations simplify operations, connect systems, and turn data into useful insights, from defining requirements to deployment and adoption.',
      mission: 'Turn operational needs into reliable digital solutions that simplify work and support better decisions.',
      bullets: ['Enterprise software & B2B consulting', 'Digital platforms & products', 'Data & business intelligence', 'Automation & system integration'],
      approach:
        'We first understand the business process, its users, and the existing systems. We define the requirements, select an appropriate solution, and build or integrate it around the operating context. Validation, deployment, and user adoption form part of the delivery process.',
      vision: 'Help organizations build digital foundations that remain useful as their operations and needs evolve.',
      cta: 'Discuss your technology needs',
      image: '/images/division-technology.jpg',
    },
    {
      id: 'amaris',
      code: '03',
      name: 'AMARIS',
      subtitle: 'Brand Strategy, Creative Direction & Production',
      description: 'AMARIS combines brand strategy, creative direction, and production to help organizations communicate with clarity and character. We translate business positioning into distinctive identities, campaigns, and content, maintaining a consistent creative direction across physical and digital channels.',
      mission: 'Give brands a clear and distinctive expression that supports their business objectives across every relevant point of contact.',
      bullets: ['Brand strategy & identity', 'Creative & art direction', 'Campaigns & branded content', 'Audiovisual production & creative support'],
      approach:
        'We begin with the organization’s objectives, audience, and positioning. This informs the creative direction and the identity, campaign, or content required. We carry that direction through design and production so the final outputs work together across channels.',
      vision: 'Build brands whose identity and communication remain recognizable, coherent, and relevant as they grow.',
      cta: 'Discuss your creative brief',
      image: '/images/division-amaris.jpg',
    },
    {
      id: 'ventures',
      code: '04',
      name: 'VENTURES',
      subtitle: 'Consumer Businesses, Proprietary Brands & Strategic Investments',
      description: 'VENTURES focuses on consumer businesses, proprietary brands, and selected strategic investments. We assess market opportunities, shape customer propositions, and develop practical operating models, drawing on NEXSUS’s complementary expertise to support new businesses from early concept through launch and growth.',
      mission: 'Develop business opportunities with a defined customer proposition and a practical path to operation and growth.',
      bullets: ['Consumer business development', 'Proprietary brands', 'Market & commercial strategy', 'Strategic partnerships & investments'],
      approach:
        'We assess the market need, define the proposition, and examine how the business will operate. Opportunities are developed progressively, using customer feedback and commercial milestones to guide further commitments.',
      vision: 'Build a portfolio of businesses and brands with distinct market positions and durable operating foundations.',
      cta: 'Discuss an opportunity',
      image: '/images/division-ventures.jpg',
    },
  ],
  fr: [
    {
      id: 'projects',
      code: '01',
      name: 'PROJECTS',
      subtitle: 'Construction, architecture intérieure & fit-out',
      description: 'PROJECTS réunit construction, architecture intérieure et fit-out pour les projets privés et les marchés publics. Nous relions la conception à une exécution coordonnée pour créer des espaces fonctionnels et réfléchis, guidés par l’usage prévu, le budget et le calendrier de chaque projet.',
      mission: 'Livrer des espaces fonctionnels et bien conçus grâce à une exécution coordonnée.',
      bullets: ['Construction et rénovation', 'Architecture intérieure et design d’espace', 'Fit-out et finitions', 'Coordination et livraison de projet'],
      approach: 'Définir le brief, coordonner la conception et la livraison, et gérer la qualité, le budget et le calendrier.',
      vision: 'Créer des espaces durables et adaptables.',
      cta: 'Discuter de votre projet',
      image: '/images/division-projects.jpg',
    },
    {
      id: 'technology',
      code: '02',
      name: 'TECHNOLOGY & SOLUTIONS',
      subtitle: 'Logiciels d’entreprise, plateformes digitales & conseil B2B',
      description: 'TECHNOLOGY & SOLUTIONS développe des solutions digitales adaptées au fonctionnement des entreprises. Grâce au conseil, aux logiciels d’entreprise et aux plateformes sur mesure, nous aidons les organisations à simplifier leurs opérations, connecter leurs systèmes et transformer leurs données en informations utiles, de la définition des besoins au déploiement et à l’adoption.',
      mission: 'Transformer les besoins opérationnels en solutions digitales fiables qui simplifient le travail et soutiennent de meilleures décisions.',
      bullets: ['Logiciels d’entreprise et conseil B2B', 'Plateformes et produits digitaux', 'Données et business intelligence', 'Automatisation et intégration de systèmes'],
      approach:
        'Nous comprenons d’abord le processus métier, ses utilisateurs et les systèmes existants. Nous définissons les besoins, choisissons une solution adaptée, puis la construisons ou l’intégrons au contexte opérationnel.',
      vision: 'Aider les organisations à construire des fondations digitales utiles à mesure que leurs besoins évoluent.',
      cta: 'Discuter de vos besoins technologiques',
      image: '/images/division-technology.jpg',
    },
    {
      id: 'amaris',
      code: '03',
      name: 'AMARIS',
      subtitle: 'Stratégie de marque, direction créative & production',
      description: 'AMARIS combine stratégie de marque, direction créative et production pour aider les organisations à communiquer avec clarté et caractère. Nous traduisons leur positionnement en identités distinctives, campagnes et contenus, avec une direction créative cohérente sur les canaux physiques et digitaux.',
      mission: 'Donner aux marques une expression claire et distinctive qui soutient leurs objectifs business sur chaque point de contact pertinent.',
      bullets: ['Stratégie et identité de marque', 'Direction créative et artistique', 'Campagnes et contenus de marque', 'Production audiovisuelle et support créatif'],
      approach:
        'Nous partons des objectifs, de l’audience et du positionnement. Cette base guide la direction créative, l’identité, la campagne ou le contenu, puis nous assurons la cohérence jusqu’à la production.',
      vision: 'Construire des marques reconnaissables, cohérentes et pertinentes dans leur évolution.',
      cta: 'Discuter de votre brief créatif',
      image: '/images/division-amaris.jpg',
    },
    {
      id: 'ventures',
      code: '04',
      name: 'VENTURES',
      subtitle: 'Activités consumer, marques propriétaires & investissements stratégiques',
      description: 'VENTURES se concentre sur les activités grand public, les marques propriétaires et certains investissements stratégiques. Nous évaluons les opportunités de marché, définissons les propositions clients et développons des modèles opérationnels pratiques, en mobilisant les expertises complémentaires de NEXSUS pour accompagner les nouvelles entreprises du concept au lancement et à la croissance.',
      mission: 'Développer des opportunités business avec une proposition client définie et une voie pratique vers l’opération et la croissance.',
      bullets: ['Développement d’activités grand public', 'Marques propriétaires', 'Stratégie de marché et commerciale', 'Partenariats et investissements stratégiques'],
      approach:
        'Nous évaluons le besoin de marché, définissons la proposition et examinons le modèle opérationnel. Les opportunités progressent avec les retours clients et les étapes commerciales.',
      vision: 'Construire un portefeuille d’activités et de marques avec des positions de marché distinctes et des bases opérationnelles durables.',
      cta: 'Discuter d’une opportunité',
      image: '/images/division-ventures.jpg',
    },
  ],
  ar: [
    {
      id: 'projects',
      code: '01',
      name: 'PROJECTS',
      subtitle: 'البناء، العمارة الداخلية والتجهيز',
      description: 'يجمع PROJECTS بين البناء والعمارة الداخلية والتجهيز للمشاريع الخاصة والصفقات العمومية. نربط التصميم بالتنفيذ المنسق لإنشاء مساحات عملية ومدروسة، وفق الاستخدام المقصود والميزانية والجدول الزمني لكل مشروع.',
      mission: 'تسليم مساحات عملية ومصممة بعناية من خلال تنفيذ منسق.',
      bullets: ['البناء والتجديد', 'العمارة الداخلية وتصميم المساحات', 'التجهيز والتشطيبات', 'تنسيق المشاريع وتسليمها'],
      approach: 'تحديد متطلبات المشروع، وتنسيق التصميم والتسليم، وإدارة الجودة والميزانية والجدول الزمني.',
      vision: 'إنشاء مساحات مستدامة وقابلة للتكيف.',
      cta: 'ناقش مشروعك',
      image: '/images/division-projects.jpg',
    },
    {
      id: 'technology',
      code: '02',
      name: 'TECHNOLOGY & SOLUTIONS',
      subtitle: 'برمجيات المؤسسات، المنصات الرقمية والاستشارة B2B',
      description: 'يطور TECHNOLOGY & SOLUTIONS حلولاً رقمية تتوافق مع طريقة عمل الشركات. من خلال الاستشارات وبرمجيات المؤسسات والمنصات المخصصة، نساعد المؤسسات على تبسيط العمليات وربط الأنظمة وتحويل البيانات إلى رؤى مفيدة، من تحديد المتطلبات إلى النشر والاعتماد.',
      mission: 'تحويل الاحتياجات التشغيلية إلى حلول رقمية موثوقة تسهل العمل وتدعم قرارات أفضل.',
      bullets: ['برمجيات المؤسسات واستشارات B2B', 'المنصات والمنتجات الرقمية', 'البيانات وذكاء الأعمال', 'الأتمتة وتكامل الأنظمة'],
      approach:
        'نفهم أولاً مسار العمل والمستخدمين والأنظمة القائمة. نحدد المتطلبات ونختار الحل المناسب، ثم نبنيه أو ندمجه حول السياق التشغيلي.',
      vision: 'مساعدة المؤسسات على بناء أسس رقمية تبقى مفيدة مع تطور العمليات والاحتياجات.',
      cta: 'ناقش احتياجاتك التقنية',
      image: '/images/division-technology.jpg',
    },
    {
      id: 'amaris',
      code: '03',
      name: 'AMARIS',
      subtitle: 'استراتيجية العلامة، التوجيه الإبداعي والإنتاج',
      description: 'يجمع AMARIS بين استراتيجية العلامة والتوجيه الإبداعي والإنتاج لمساعدة المؤسسات على التواصل بوضوح وشخصية مميزة. نحول تموضع الأعمال إلى هويات وحملات ومحتوى مميز، مع الحفاظ على توجه إبداعي متسق عبر القنوات المادية والرقمية.',
      mission: 'منح العلامات تعبيراً واضحاً ومميزاً يدعم أهدافها التجارية عبر نقاط التواصل المناسبة.',
      bullets: ['استراتيجية العلامة وهويتها', 'التوجيه الإبداعي والفني', 'الحملات والمحتوى المرتبط بالعلامة', 'الإنتاج السمعي البصري والدعم الإبداعي'],
      approach:
        'نبدأ من أهداف المؤسسة وجمهورها وتموضعها. توجه هذه المعطيات الاتجاه الإبداعي والهوية أو الحملة أو المحتوى، ثم نضمن الاتساق عبر التصميم والإنتاج.',
      vision: 'بناء علامات تبقى واضحة ومتسقة وملائمة أثناء نموها.',
      cta: 'ناقش موجزك الإبداعي',
      image: '/images/division-amaris.jpg',
    },
    {
      id: 'ventures',
      code: '04',
      name: 'VENTURES',
      subtitle: 'أعمال استهلاكية، علامات مملوكة واستثمارات استراتيجية',
      description: 'يركز VENTURES على الأعمال الاستهلاكية والعلامات المملوكة والاستثمارات الاستراتيجية المختارة. نقيم فرص السوق ونصوغ عروض العملاء ونطور نماذج تشغيل عملية، مستفيدين من خبرات NEXSUS المتكاملة لدعم الأعمال الجديدة من الفكرة الأولية إلى الإطلاق والنمو.',
      mission: 'تطوير فرص تجارية ذات عرض واضح للعميل ومسار عملي نحو التشغيل والنمو.',
      bullets: ['تطوير الأعمال الاستهلاكية', 'العلامات المملوكة', 'استراتيجية السوق والتجارة', 'الشراكات والاستثمارات الاستراتيجية'],
      approach:
        'نقيم حاجة السوق، ونحدد العرض، ونفحص طريقة تشغيل النشاط. تتطور الفرص تدريجياً بالاعتماد على ملاحظات العملاء والمحطات التجارية.',
      vision: 'بناء محفظة أعمال وعلامات ذات مواقع سوقية واضحة وأسس تشغيلية مستدامة.',
      cta: 'ناقش فرصة',
      image: '/images/division-ventures.jpg',
    },
  ],
};

const DivisionRow: React.FC<{
  division: DivisionItem;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onSelect: (id: string) => void;
  onOpenContact: (id: string) => void;
  viewLabel: string;
}> = ({ division, index, isActive, onHover, onSelect, onOpenContact, viewLabel }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse follower for the circular "VIEW ↗" button
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useSpring(rawX, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(rawY, { stiffness: 450, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(division.id)}
      onFocus={() => {
        onHover();
        onSelect(division.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(division.id);
        }
      }}
      id={`division-${division.id}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative scroll-mt-24 w-full border-b border-black/10 py-7 sm:py-9 lg:py-10 px-4 sm:px-8 lg:px-12 transition-colors duration-400 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset ${
        isActive ? 'bg-black/[0.012]' : 'hover:bg-black/[0.008]'
      }`}
    >
      {/* Desktop Floating "VIEW ↗" Cursor Follower */}
      {isHovered && (
        <motion.div
          style={{ left: cursorX, top: cursorY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex w-20 h-20 rounded-full bg-black text-white flex-col items-center justify-center gap-0.5 text-[11px] font-mono font-medium tracking-widest uppercase shadow-2xl"
        >
          <div className="flex items-center gap-1">
            <span>{viewLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      )}

      {/* Main 3-Column Grid Matching Reference Layout */}
      <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Column 1: Division Title (Medium Uppercase) */}
        <div className="lg:col-span-4 flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-black uppercase select-none transition-transform duration-300 group-hover:translate-x-1.5">
              {division.name}
            </h3>
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-black/50 uppercase mt-1">
              ({division.code}) {division.subtitle}
            </span>
          </div>
        </div>

        {/* Column 2: Middle Content - Shows 1-2 lines when collapsed, expands to full text + bullets when active */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <AnimatePresence mode="wait" initial={false}>
            {isActive ? (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed">{division.description}</p>

                {/* Structured capabilities */}
                <div className="mt-4 sm:mt-5 space-y-1.5">
                  {division.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-black/85 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContact(division.id);
                  }}
                  className="mt-5 inline-flex w-fit items-center gap-2 border-b border-black pb-0.5 text-[11px] font-mono uppercase tracking-widest text-black transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <span>{division.cta}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs sm:text-sm text-black/60 font-sans leading-relaxed line-clamp-2">
                  {division.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Column 3: Image Container - Thin Slice when Collapsed, Full Aspect when Active */}
        <div className="lg:col-span-4 flex justify-end">
          <div
            className={`w-full lg:w-[420px] bg-[#E8E8E5] overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1] relative ${
              isActive
                ? 'h-[220px] sm:h-[260px] lg:h-[280px]'
                : 'h-[52px] sm:h-[62px] lg:h-[68px] opacity-90'
            }`}
          >
            <img
              src={division.image}
              alt={division.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] ${
                isActive ? 'scale-100' : 'scale-105 hover:scale-110'
              }`}
            />

            {/* Subtle overlay indicator on collapsed strip */}
            {!isActive && (
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DivisionsGrid: React.FC<DivisionsGridProps> = ({
  onSelectDivision,
  onOpenContact,
  language,
}) => {
  // Default to first row active, changes on hover
  const divisions = DIVISIONS_BY_LANGUAGE[language];
  const [activeId, setActiveId] = useState<string>(divisions[0].id);
  const t = copy[language];
  const [mobileExpanded, setMobileExpanded] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setMobileExpanded(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section id="divisions-grid" className="w-full bg-white">
      {/* Section Header Matching Reference Layout */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12 border-b border-black/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-black uppercase leading-[1.08]">
              {t.disciplinesTitle}
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-mono tracking-wider uppercase text-black/50">
            {t.operatingModel}
          </div>
        </motion.div>
      </div>

      {/* Accordion List of Divisions */}
      <div className="w-full">
        {divisions.map((division, index) => (
          <DivisionRow
            key={division.id}
            index={index}
            division={division}
            isActive={mobileExpanded || activeId === division.id}
            onHover={() => setActiveId(division.id)}
            onSelect={onSelectDivision}
            onOpenContact={onOpenContact}
            viewLabel={t.view}
          />
        ))}
      </div>
    </section>
  );
};
