import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { useEntrance } from '@/hooks/use-entrance';
import { easeOut, heroEntrance } from '@/lib/motion';

const ROLE_ROTATION_DELAY_MS = 1800;

export function Hero() {
  const { t } = useI18n();
  const ready = useEntrance();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [canRotateRoles, setCanRotateRoles] = useState(false);
  const rolesData = t('hero.roles');
  const roles = Array.isArray(rolesData) ? rolesData : ['Frontend Developer', 'UI Engineer', 'React Specialist', 'Creative Coder'];
  const longestRole = roles.reduce(
    (longest: string, current: string) => (typeof current === 'string' && current.length > longest.length ? current : longest),
    'Frontend Developer',
  );
  const name = t('hero.name') as string;

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 40]);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const timeout = window.setTimeout(() => setCanRotateRoles(true), ROLE_ROTATION_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [ready, reduceMotion]);

  useEffect(() => {
    if (!canRotateRoles || reduceMotion) return;
    const interval = window.setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2400);
    return () => window.clearInterval(interval);
  }, [roles, canRotateRoles, reduceMotion]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-20">
      <motion.div className="absolute inset-0 z-0" style={{ y: reduceMotion ? 0 : bgY }}>
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract tech background"
          className="h-full w-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background" />
      </motion.div>

      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] mix-blend-screen blob-animation" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen blob-animation animation-delay-2000" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 14, filter: 'blur(6px)' }}
          transition={reduceMotion ? { duration: 0 } : heroEntrance}
          className="gpu-layer flex w-full max-w-5xl flex-col items-center text-center"
        >
          <div className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary shadow-lg shadow-primary/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium">{t('hero.badge') as string}</span>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="m-0 text-center font-bold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {name}
            </h1>

            <div className="mt-4 flex justify-center">
              <div className="relative grid place-items-center">
                <span className="invisible whitespace-nowrap py-[0.1em] text-center text-3xl font-bold leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
                  {longestRole}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  {canRotateRoles && !reduceMotion ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roles[roleIndex]}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                        className="text-gradient whitespace-nowrap py-[0.1em] text-center text-3xl font-bold leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl"
                      >
                        {roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <span className="text-gradient whitespace-nowrap py-[0.1em] text-center text-3xl font-bold leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
                      {roles[roleIndex]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t('hero.description') as string}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
            >
              {t('hero.viewWork') as string}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="glass-card flex items-center justify-center gap-4 rounded-full px-6 py-4">
              <SocialLink href="https://github.com/AntonioLanzaDesenvolvedor" icon={<Github className="h-5 w-5" />} />
              <div className="h-6 w-px bg-border" />
              <SocialLink href="https://www.linkedin.com/in/antoniopernoncini/" icon={<Linkedin className="h-5 w-5" />} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center text-muted-foreground transition-colors hover:text-primary"
    >
      {icon}
    </a>
  );
}
