import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { useI18n } from '@/i18n/i18n';
import { fadeUp, slideFromLeft, staggerContainer } from '@/lib/motion';

const CODE_LINES = [
  { indent: 0, parts: [{ t: 'const', c: 'text-violet-400' }, { t: ' Antonio', c: 'text-sky-300' }, { t: ' = {', c: 'text-foreground' }] },
  { indent: 1, parts: [{ t: 'role', c: 'text-cyan-300' }, { t: ': ', c: 'text-foreground' }, { t: '"Full Stack Developer"', c: 'text-emerald-400' }, { t: ',', c: 'text-foreground' }] },
  { indent: 1, parts: [{ t: 'stack', c: 'text-cyan-300' }, { t: ': [', c: 'text-foreground' }, { t: '"React"', c: 'text-emerald-400' }, { t: ', ', c: 'text-foreground' }, { t: '"Next.js"', c: 'text-emerald-400' }, { t: ', ', c: 'text-foreground' }, { t: '"Python"', c: 'text-emerald-400' }, { t: '],', c: 'text-foreground' }] },
  { indent: 1, parts: [{ t: 'focus', c: 'text-cyan-300' }, { t: ': ', c: 'text-foreground' }, { t: '"Building production-ready software"', c: 'text-emerald-400' }] },
  { indent: 0, parts: [{ t: '}', c: 'text-foreground' }] },
];

export function About() {
  const { t } = useI18n();
  const techTagsData = t('about.techTags');
  const floatingTech = Array.isArray(techTagsData) ? techTagsData : ['React', 'Next.js', 'Python', 'PostgreSQL'];

  return (
    <section id="about" className="relative overflow-hidden bg-background/88 py-16 backdrop-blur-[2px] sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-500/8 blur-3xl sm:h-[22rem] sm:w-[22rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('about.title') as string} subtitle={t('about.subtitle') as string} />

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative flex h-full items-stretch justify-center"
          >
            <div className="relative flex h-full w-full max-w-xl items-stretch justify-center">
              <div className="absolute inset-10 rounded-full bg-gradient-to-r from-primary/15 to-blue-500/15 blur-3xl" />

              <div className="relative flex h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[28px]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-background/40 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400/80 sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400/80 sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-400/80 sm:h-3 sm:w-3" />
                    <span className="ml-1 truncate font-mono text-xs text-muted-foreground sm:ml-3 sm:text-sm">{t('about.card.filename') as string}</span>
                  </div>
                  <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:flex">
                    {t('about.card.badge') as string}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('about.card.identity') as string}</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      {t('about.card.available') as string}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/30">
                    <div className="overflow-x-auto px-4 py-3 font-mono text-xs leading-6 sm:px-5 sm:py-4 sm:text-sm sm:leading-7">
                      {CODE_LINES.map((line, lineIdx) => (
                        <div key={lineIdx} style={{ paddingLeft: line.indent * 16 }}>
                          {line.parts.map((part, i) => (
                            <span key={i} className={part.c}>
                              {part.t}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {floatingTech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex h-full flex-col items-center justify-center gap-6 text-center sm:gap-8"
          >
            <motion.h3 variants={fadeUp} className="max-w-2xl text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {t('about.heading') as string}
            </motion.h3>

            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:space-y-6 sm:text-lg lg:text-xl">
              <motion.p variants={fadeUp}>{t('about.description1') as string}</motion.p>
              <motion.p variants={fadeUp}>{t('about.description2') as string}</motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
