import { Code2, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/90 py-8 backdrop-blur-[2px] sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 md:flex-row md:gap-6 md:text-left lg:px-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">
              Antônio<span className="text-primary">.dev</span>
            </span>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>{t('footer.location') as string}</span>
          </p>
        </div>

        <p className="max-w-md text-sm text-muted-foreground">
          &copy; {currentYear} {t('footer.credit') as string}
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="transition-colors hover:text-primary">
            Top
          </a>
          <a
            href="https://github.com/AntonioLanzaDesenvolvedor"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
