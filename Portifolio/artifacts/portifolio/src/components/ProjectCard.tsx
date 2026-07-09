import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="group overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(59,130,246,0.08)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_40%)]" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <motion.div
            variants={staggerContainer(0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <motion.span variants={fadeUp} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </motion.span>
            {period ? (
              <motion.span variants={fadeUp} className="rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {period}
              </motion.span>
            ) : null}
            {tags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                className="rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div className="max-w-6xl">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-[2.2rem] font-bold tracking-tight text-foreground sm:text-[2.7rem] lg:text-[3.1rem]"
            >
              {title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 text-[1.06rem] leading-9 text-muted-foreground sm:text-[1.14rem] lg:text-[1.22rem] lg:leading-10"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer(0.05, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {highlights.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="rounded-2xl border border-border/60 bg-background/85 p-5 backdrop-blur-sm transition-colors duration-200 hover:border-primary/25 hover:bg-background"
              >
                <p className="text-[15px] font-semibold leading-7 text-foreground sm:text-[1rem] lg:text-[1.04rem]">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-9"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span>{privateRepoLabel}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
