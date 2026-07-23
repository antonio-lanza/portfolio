import { useEffect } from 'react';
import { useI18n, type Language } from '@/i18n/i18n';

const SITE_URL = 'https://www.antoniolanza.com/';

const SEO_BY_LANG: Record<
  Language,
  {
    lang: string;
    locale: string;
    title: string;
    description: string;
    keywords: string;
  }
> = {
  pt: {
    lang: 'pt-BR',
    locale: 'pt_BR',
    title: 'Antônio Lanza | Programador Full Stack em Passo Fundo',
    description:
      'Antônio Lanza (Antonio Lanza / Lanza) — programador e desenvolvedor Full Stack em Passo Fundo, RS. React, Next.js, Python, Flask, FastAPI e PostgreSQL. Portfólio com projetos em produção.',
    keywords:
      'Antônio Lanza, Antonio Lanza, Lanza, programador Passo Fundo, desenvolvedor Passo Fundo, Full Stack Passo Fundo, programador RS',
  },
  en: {
    lang: 'en',
    locale: 'en_US',
    title: 'Antônio Lanza | Full Stack Developer in Passo Fundo',
    description:
      'Antônio Lanza (Antonio Lanza / Lanza) — Full Stack developer in Passo Fundo, Brazil. React, Next.js, Python, Flask, FastAPI, and PostgreSQL. Production portfolio.',
    keywords:
      'Antônio Lanza, Antonio Lanza, Lanza, developer Passo Fundo, Full Stack Passo Fundo, Brazil',
  },
  es: {
    lang: 'es',
    locale: 'es_ES',
    title: 'Antônio Lanza | Programador Full Stack en Passo Fundo',
    description:
      'Antônio Lanza (Antonio Lanza / Lanza) — programador Full Stack en Passo Fundo, Brasil. React, Next.js, Python, Flask, FastAPI y PostgreSQL. Portafolio en producción.',
    keywords:
      'Antônio Lanza, Antonio Lanza, Lanza, programador Passo Fundo, desarrollador Passo Fundo, Full Stack',
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

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Updates document head only — never renders visible UI. */
export function SeoHead() {
  const { language } = useI18n();
  const seo = SEO_BY_LANG[language] ?? SEO_BY_LANG.pt;

  useEffect(() => {
    document.documentElement.lang = seo.lang;
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'keywords', seo.keywords);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:locale', seo.locale);
    upsertMeta('property', 'og:url', SITE_URL);
    upsertMeta('property', 'og:type', 'profile');
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:url', SITE_URL);

    document.head
      .querySelectorAll('meta[property^="og:image"], meta[name="twitter:image"], meta[name="twitter:image:alt"]')
      .forEach((el) => el.remove());
    upsertLink('canonical', SITE_URL);
  }, [seo]);

  return null;
}
