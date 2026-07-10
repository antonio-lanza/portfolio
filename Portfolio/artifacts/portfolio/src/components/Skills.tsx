import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiMui,
  SiTailwindcss,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiSupabase,
  SiTypescript,
  SiPython,
  SiDocker,
  SiRedis,
} from 'react-icons/si';
import { SectionHeading } from './SectionHeading';
import { useI18n } from '@/i18n/i18n';

type SkillItem = {
  id: string;
  name: string;
  Icon: IconType;
  color: string;
  tint: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.045,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Skills() {
  const { t } = useI18n();

  const categories: { title: string; skills: SkillItem[] }[] = [
    {
      title: t('skills.categories.frontend') as string,
      skills: [
        { id: 'react', name: t('skills.frontend.react') as string, Icon: SiReact, color: '#22D3EE', tint: 'rgba(34, 211, 238, 0.14)' },
        { id: 'next', name: t('skills.frontend.next') as string, Icon: SiNextdotjs, color: '#E2E8F0', tint: 'rgba(226, 232, 240, 0.12)' },
        { id: 'mui', name: t('skills.frontend.mui') as string, Icon: SiMui, color: '#007FFF', tint: 'rgba(0, 127, 255, 0.14)' },
        { id: 'tailwind', name: t('skills.frontend.tailwind') as string, Icon: SiTailwindcss, color: '#38BDF8', tint: 'rgba(56, 189, 248, 0.14)' },
      ],
    },
    {
      title: t('skills.categories.backend') as string,
      skills: [
        { id: 'flask', name: t('skills.backend.flask') as string, Icon: SiFlask, color: '#F8FAFC', tint: 'rgba(248, 250, 252, 0.1)' },
        { id: 'fastapi', name: t('skills.backend.fastapi') as string, Icon: SiFastapi, color: '#009688', tint: 'rgba(0, 150, 136, 0.14)' },
        { id: 'postgres', name: t('skills.backend.postgres') as string, Icon: SiPostgresql, color: '#3B82F6', tint: 'rgba(59, 130, 246, 0.14)' },
        { id: 'supabase', name: t('skills.backend.supabase') as string, Icon: SiSupabase, color: '#3ECF8E', tint: 'rgba(62, 207, 142, 0.14)' },
      ],
    },
    {
      title: t('skills.categories.platform') as string,
      skills: [
        { id: 'typescript', name: t('skills.platform.typescript') as string, Icon: SiTypescript, color: '#3178C6', tint: 'rgba(49, 120, 198, 0.16)' },
        { id: 'python', name: t('skills.platform.python') as string, Icon: SiPython, color: '#FFD43B', tint: 'rgba(255, 212, 59, 0.12)' },
        { id: 'docker', name: t('skills.platform.docker') as string, Icon: SiDocker, color: '#2496ED', tint: 'rgba(36, 150, 237, 0.14)' },
        { id: 'redis', name: t('skills.platform.redis') as string, Icon: SiRedis, color: '#DC382D', tint: 'rgba(220, 56, 45, 0.14)' },
      ],
    },
  ];

  return (
    <section id="skills" className="relative border-y border-border/50 bg-secondary/20 py-16 backdrop-blur-[2px] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('skills.title') as string} subtitle={(t('skills.subtitle') as string) || undefined} />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: catIdx * 0.05 }}
              className={`glass-card flex h-full flex-col rounded-2xl p-5 sm:rounded-3xl sm:p-7 ${
                catIdx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <h3 className="mb-5 min-h-7 text-lg font-bold tracking-tight text-foreground sm:mb-6 sm:text-xl">
                {category.title}
              </h3>

              <ul className="flex flex-1 flex-col gap-2.5 sm:gap-3">
                {category.skills.map((skill) => (
                  <motion.li key={skill.id} variants={itemVariants}>
                    <span
                      className="flex w-full items-center gap-3 whitespace-nowrap rounded-xl border px-3.5 py-3 text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:px-4 sm:py-3.5 sm:text-[0.9375rem]"
                      style={{
                        borderColor: `${skill.color}44`,
                        backgroundColor: skill.tint,
                      }}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10"
                        style={{ backgroundColor: `${skill.color}22` }}
                      >
                        <skill.Icon
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          style={{ color: skill.color }}
                          aria-hidden
                        />
                      </span>
                      <span>{skill.name}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
