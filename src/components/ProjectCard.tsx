import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface ProjectCardProps {
  title: string;
  eyebrow?: string;
  period?: string;
  description: string;
  highlights: string[];
  tags?: string[];
  privateRepoLabel: string;
}

export function ProjectCard({
  title,
  eyebrow = 'Projeto em destaque',
  period,
  description,
  highlights,
  tags = [],
  privateRepoLabel,
}: ProjectCardProps) {
  const { language } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(59,130,246,0.08)] sm:rounded-[28px]"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_40%)]" />

        <div className="relative p-4 sm:p-6 lg:p-10">
          <motion.div
            key={`meta-${language}`}
            variants={staggerContainer(0.04)}
            initial="hidden"
            animate="visible"
            className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5"
          >
            <motion.span variants={fadeUp} className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary lg:rounded-full lg:px-3 lg:text-[11px] lg:tracking-[0.18em]">
              {eyebrow}
            </motion.span>
            {period ? (
              <motion.span variants={fadeUp} className="rounded-md border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground lg:rounded-full">
                {period}
              </motion.span>
            ) : null}
            {tags.map((tag, index) => (
              <motion.span
                key={`${language}-tag-${index}`}
                variants={fadeUp}
                className="rounded-md border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground lg:rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div className="max-w-6xl">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-[2.2rem] lg:text-[3.1rem]">
              {title}
            </h3>

            <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-[1.06rem] sm:leading-8 lg:text-[1.22rem] lg:leading-10">
              {description}
            </p>
          </div>

          <motion.div
            key={`highlights-${language}`}
            variants={staggerContainer(0.05, 0.1)}
            initial="hidden"
            animate="visible"
            className="mt-6 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={`${language}-highlight-${index}`}
                variants={fadeUp}
                className="rounded-xl border border-border/60 bg-background/85 p-4 backdrop-blur-sm transition-colors duration-200 hover:border-primary/25 hover:bg-background sm:rounded-2xl sm:p-5"
              >
                <p className="text-sm font-semibold leading-6 text-foreground sm:text-[15px] sm:leading-7 lg:text-[1.04rem]">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-9">
            <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm lg:rounded-full">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span>{privateRepoLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
