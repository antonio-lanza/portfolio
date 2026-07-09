import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { useI18n } from '@/i18n/i18n';

export function Skills() {
  const { t } = useI18n();

  const SKILL_CATEGORIES = [
    {
      title: t('skills.categories.frontend') as string,
      skills: [
        { name: t('skills.frontend.react') as string, level: 92 },
        { name: t('skills.frontend.next') as string, level: 86 },
        { name: t('skills.frontend.mui') as string, level: 90 },
        { name: t('skills.frontend.tailwind') as string, level: 84 },
      ],
    },
    {
      title: t('skills.categories.backend') as string,
      skills: [
        { name: t('skills.backend.flask') as string, level: 88 },
        { name: t('skills.backend.fastapi') as string, level: 85 },
        { name: t('skills.backend.postgres') as string, level: 87 },
        { name: t('skills.backend.supabase') as string, level: 82 },
      ],
    },
    {
      title: t('skills.categories.platform') as string,
      skills: [
        { name: t('skills.platform.typescript') as string, level: 88 },
        { name: t('skills.platform.python') as string, level: 87 },
        { name: t('skills.platform.docker') as string, level: 80 },
        { name: t('skills.platform.redis') as string, level: 78 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative border-y border-border/50 bg-secondary/20 py-16 backdrop-blur-[2px] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('skills.title') as string} subtitle={(t('skills.subtitle') as string) || undefined} />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: catIdx * 0.08 }}
              className="glass-card rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(59,130,246,0.08)] sm:rounded-3xl sm:p-8"
            >
              <h3 className="mb-6 border-b border-border/50 pb-3 text-lg font-bold text-foreground sm:mb-8 sm:pb-4 sm:text-xl">{category.title}</h3>

              <div className="space-y-5 sm:space-y-6">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="group">
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-muted-foreground transition-colors group-hover:text-primary">{skill.name}</span>
                      <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-background/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 + skillIdx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
