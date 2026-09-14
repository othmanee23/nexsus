import React, { useState } from 'react';
import { motion } from 'motion/react';
import { copy, Language } from '../i18n';

interface ClientsSectionProps {
  language: Language;
}

const CLIENTS = [
  {
    name: 'Fondation Mohammedia des Oeuvres Sociales des Magistrats et Fonctionnaires de la Justice',
    logo: '/images/clients/fondation-mohammedia.jpeg',
  },
  { name: 'Le Chamonix Hotel Restaurant Cafe', logo: '/images/clients/le-chamonix.jpeg' },
  { name: 'ENRM Solutions & Services', logo: '/images/clients/enrm.jpeg' },
  { name: 'Olea Paysage', logo: '/images/clients/olea-paysage.jpeg' },
  { name: 'Fota', logo: '/images/clients/fota.jpeg' },
  { name: 'Obliq Architecture', logo: '/images/clients/obliq-architecture.jpeg' },
  {
    name: 'Association des Oeuvres Sociales des Agents de l’Entraide Nationale',
    logo: '/images/clients/aosan.jpeg',
  },
  { name: 'MPORTE Societe d’importation', logo: '/images/clients/mporte.jpeg' },
];

export const ClientsSection: React.FC<ClientsSectionProps> = ({ language }) => {
  const [paused, setPaused] = useState(false);
  const t = copy[language];
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section
      id="clients"
      className="w-full overflow-hidden border-t border-black/10 bg-white px-4 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4"
        >
          <h2 className="text-2xl font-medium uppercase tracking-tight text-black sm:text-3xl">
            {t.clientsTitle}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
            {t.clientsDescription}
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          <div
            className="clients-marquee border-y border-black/10 py-7"
            data-paused={paused}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="clients-marquee-track" aria-label={t.clientsTitle}>
              {track.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="client-logo-frame"
                  aria-hidden={index >= CLIENTS.length}
                >
                  <img
                    src={client.logo}
                    alt={index < CLIENTS.length ? client.name : ''}
                    loading="lazy"
                    width="180"
                    height="60"
                    className="max-h-9 w-auto max-w-[180px] object-contain sm:max-h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
