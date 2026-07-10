import { ReactNode, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { useEntrance } from '@/hooks/use-entrance';

const ROLE_START_DELAY_MS = 400;
const ROLE_HOLD_MS = 1800;
const roleEase = [0.22, 1, 0.36, 1] as const;

const roleTextClass =
  'text-gradient inline-block text-center text-xl font-bold leading-tight text-balance will-change-transform sm:text-3xl sm:leading-[1.2] sm:whitespace-nowrap md:text-4xl lg:text-5xl xl:text-6xl';

const roleMotion = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: roleEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.01,
    transition: { duration: 0.2, ease: roleEase },
  },
};

export function Hero() {
  const { t, language } = useI18n();
  const ready = useEntrance();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = useMemo(() => {
    const rolesData = t('hero.roles');
    return (Array.isArray(rolesData) ? rolesData : ['Frontend Developer', 'UI Engineer', 'React Specialist', 'Creative Coder']) as string[];
  }, [language, t]);
  const longestRole = useMemo(
    () => roles.reduce((longest, current) => (current.length > longest.length ? current : longest), roles[0] ?? ''),
    [roles],
  );
  const name = t('hero.name') as string;

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 40]);

  useEffect(() => {
    setRoleIndex(0);
  }, [language]);

  useEffect(() => {
    if (!ready || reduceMotion || roles.length < 2) return;

    let cancelled = false;
    let timeoutId = 0;

    const tick = () => {
      if (cancelled) return;
      setRoleIndex((prev) => (prev + 1) % roles.length);
      timeoutId = window.setTimeout(tick, ROLE_HOLD_MS);
    };

    timeoutId = window.setTimeout(tick, ROLE_START_DELAY_MS + ROLE_HOLD_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [ready, reduceMotion, roles.length, language]);

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
      <motion.div className="absolute inset-0 z-0" style={{ y: reduceMotion ? 0 : bgY }}>
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract tech background"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background" />
      </motion.div>

      <div className="absolute -left-32 top-1/4 hidden h-72 w-72 rounded-full bg-primary/20 blur-[120px] mix-blend-screen blob-animation sm:block sm:h-96 sm:w-96" />
      <div className="absolute -right-32 bottom-1/4 hidden h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen blob-animation animation-delay-2000 sm:block sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center">
        <div className="entrance-hero flex w-full max-w-5xl flex-col items-center text-center">
          <div className="mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary shadow-lg shadow-primary/5 sm:mb-8 sm:px-4 sm:py-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium sm:text-sm">{t('hero.badge') as string}</span>
          </div>

          <div className="flex w-full max-w-full flex-col items-center justify-center">
            <h1 className="m-0 w-full text-center text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {name}
            </h1>

            <div className="mt-3 w-full max-w-full sm:mt-4">
              <div className="relative mx-auto flex w-full max-w-full flex-col items-center justify-center px-1 sm:px-0">
                <span className="pointer-events-none invisible absolute max-w-full text-center text-xl font-bold leading-tight opacity-0 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {longestRole}
                </span>
                <div className="relative flex min-h-[3.25rem] w-full max-w-full items-center justify-center overflow-hidden sm:min-h-[3.75rem] md:min-h-[4.5rem]">
                  {reduceMotion ? (
                    <span className={roleTextClass}>{roles[roleIndex]}</span>
                  ) : (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${language}-${roles[roleIndex]}`}
                        variants={roleMotion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={roleTextClass}
                      >
                        {roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl px-1 text-center text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
            {t('hero.description') as string}
          </p>

          {/* Mobile CTAs */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 lg:hidden">
            <a
              href="#projects"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
            >
              {t('hero.viewWork') as string}
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="grid w-full grid-cols-2 gap-3">
              <SocialLink
                href="https://github.com/AntonioLanzaDesenvolvedor"
                icon={<Github className="h-5 w-5" />}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-card/70 text-muted-foreground transition-colors hover:text-primary"
              />
              <SocialLink
                href="https://www.linkedin.com/in/antoniopernoncini/"
                icon={<Linkedin className="h-5 w-5" />}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-card/70 text-muted-foreground transition-colors hover:text-primary"
              />
            </div>
          </div>

          {/* Desktop CTAs (unchanged) */}
          <div className="mt-10 hidden w-full max-w-none flex-row flex-wrap items-center justify-center gap-4 lg:flex">
            <a
              href="#projects"
              className="group inline-flex w-auto items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
            >
              {t('hero.viewWork') as string}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="flex w-auto items-center justify-center gap-4 rounded-full border border-white/10 bg-card/70 px-6 py-4">
              <SocialLink href="https://github.com/AntonioLanzaDesenvolvedor" icon={<Github className="h-5 w-5" />} />
              <div className="h-6 w-px bg-border" />
              <SocialLink href="https://www.linkedin.com/in/antoniopernoncini/" icon={<Linkedin className="h-5 w-5" />} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, className }: { href: string; icon: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? 'flex items-center justify-center text-muted-foreground transition-colors hover:text-primary'}
    >
      {icon}
    </a>
  );
}
