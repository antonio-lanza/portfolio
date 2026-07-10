import { useEffect } from 'react';
import { useI18n, type Language } from '@/i18n/i18n';

const SITE_URL = 'https://www.antoniolanza.com/';
const OG_IMAGE = 'https://www.antoniolanza.com/opengraph.jpg';

const SEO_BY_LANG: Record<
  Language,
  {
    lang: string;
    locale: string;
    title: string;
    description: string;
  }
> = {
  pt: {
    lang: 'pt-BR',
    locale: 'pt_BR',
    title: 'Antônio Lanza | Programador Full Stack em Passo Fundo',
    description:
      'Antônio Lanza — programador Full Stack em Passo Fundo (RS). Desenvolvimento web com React, Next.js, Python, Flask e PostgreSQL. Portfólio de projetos em produção.',
  },
  en: {
    lang: 'en',
    locale: 'en_US',
    title: 'Antônio Lanza | Full Stack Developer in Passo Fundo',
    description:
      'Antônio Lanza — Full Stack developer in Passo Fundo, Brazil. Building web apps with React, Next.js, Python, Flask, and PostgreSQL. Live production portfolio.',
  },
  es: {
    lang: 'es',
    locale: 'es_ES',
    title: 'Antônio Lanza | Programador Full Stack en Passo Fundo',
    description:
      'Antônio Lanza — programador Full Stack en Passo Fundo (Brasil). Desarrollo web con React, Next.js, Python, Flask y PostgreSQL. Portafolio de proyectos en producción.',
  },
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead() {
  const { language } = useI18n();
  const seo = SEO_BY_LANG[language] ?? SEO_BY_LANG.pt;

  useEffect(() => {
    document.documentElement.lang = seo.lang;
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:locale', seo.locale);
    upsertMeta('property', 'og:url', SITE_URL);
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
  }, [seo]);

  return null;
}
