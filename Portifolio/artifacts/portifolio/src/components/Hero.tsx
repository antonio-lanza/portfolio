import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { useEntrance } from '@/hooks/use-entrance';
import { easeOut, heroEntrance } from '@/lib/motion';

const ROLE_ENABLE_DELAY_MS = 400;
const FIRST_ROTATION_MS = 900;
const ROLE_CYCLE_MS = 2200;

const roleTextClass =
  'text-gradient text-center text-xl font-bold leading-tight text-balance sm:text-3xl sm:leading-[1.2] sm:whitespace-nowrap md:text-4xl lg:text-5xl xl:text-6xl';

export function Hero() {
  const { t } = useI18n();
  const ready = useEntrance();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [canRotateRoles, setCanRotateRoles] = useState(false);
  const isFirstRoleCycle = useRef(true);
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
    const timeout = window.setTimeout(() => setCanRotateRoles(true), ROLE_ENABLE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [ready, reduceMotion]);

  useEffect(() => {
    if (!canRotateRoles || reduceMotion) return;

    const rotate = () => setRoleIndex((prev) => (prev + 1) % roles.length);
    const firstTimeout = window.setTimeout(rotate, FIRST_ROTATION_MS);
    const interval = window.setInterval(rotate, ROLE_CYCLE_MS);

    return () => {
      window.clearTimeout(firstTimeout);
      window.clearInterval(interval);
    };
  }, [roles, canRotateRoles, reduceMotion]);

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
      <motion.div className="absolute inset-0 z-0" style={{ y: reduceMotion ? 0 : bgY }}>
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract tech background"
          className="h-full w-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background" />
      </motion.div>

      <div className="absolute -left-32 top-1/4 hidden h-72 w-72 rounded-full bg-primary/20 blur-[120px] mix-blend-screen blob-animation sm:block sm:h-96 sm:w-96" />
      <div className="absolute -right-32 bottom-1/4 hidden h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen blob-animation animation-delay-2000 sm:block sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center">
        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={reduceMotion ? { duration: 0 } : heroEntrance}
          className="flex w-full max-w-5xl flex-col items-center text-center"
        >
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
              <div className="relative mx-auto flex w-full max-w-full justify-center px-1 sm:px-0">
                <span className="pointer-events-none invisible absolute max-w-full text-center text-xl font-bold leading-tight opacity-0 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {longestRole}
                </span>
                <div className="flex min-h-[3.25rem] w-full max-w-full items-center justify-center sm:min-h-[3.75rem] md:min-h-[4.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={canRotateRoles && !reduceMotion ? roles[roleIndex] : 'hero-role-static'}
                      initial={canRotateRoles && !reduceMotion && !isFirstRoleCycle.current ? { opacity: 0, y: 6 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={canRotateRoles && !reduceMotion ? { opacity: 0, y: -6 } : undefined}
                      transition={{ duration: 0.32, ease: easeOut }}
                      onAnimationComplete={() => {
                        if (canRotateRoles && !reduceMotion) isFirstRoleCycle.current = false;
                      }}
                      className={roleTextClass}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl px-1 text-center text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
            {t('hero.description') as string}
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 sm:w-auto sm:px-7 sm:py-3.5"
            >
              {t('hero.viewWork') as string}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="glass-card flex w-full items-center justify-center gap-4 rounded-full px-5 py-3 sm:w-auto sm:px-6 sm:py-4">
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
