import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';
import { useI18n } from '@/i18n/i18n';
import { isProjectItem, type ProjectItem } from '@/data/projects';

export function Projects() {
  const { t } = useI18n();

  const raw = t('projects.items');
  const items = (Array.isArray(raw) ? raw : []).filter(isProjectItem) as ProjectItem[];

  return (
    <section id="projects" className="border-t border-border/50 bg-background/88 py-24 backdrop-blur-[2px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('projects.title') as string} subtitle={t('projects.subtitle') as string} />

        <div className="space-y-10">
          {items.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              eyebrow={project.eyebrow}
              period={project.period}
              description={project.description}
              highlights={project.highlights}
              tags={project.tags}
              privateRepoLabel={t('projects.privateRepo') as string}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
