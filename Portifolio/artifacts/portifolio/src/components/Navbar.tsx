import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Code2, Globe } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { useActiveSection } from '@/hooks/use-active-section';
import { useEntrance } from '@/hooks/use-entrance';
import { easeOut, navEntrance } from '@/lib/motion';

const NAV_LINKS = [
  { key: 'about', href: '#about', id: 'about' },
  { key: 'skills', href: '#skills', id: 'skills' },
  { key: 'projects', href: '#projects', id: 'projects' },
  { key: 'contact', href: '#contact', id: 'contact' },
] as const;

export function Navbar() {
  const ready = useEntrance();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'border-b border-border bg-background/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <motion.div
        initial={false}
        animate={ready ? { y: 0 } : { y: -12 }}
        transition={reduceMotion ? { duration: 0 } : navEntrance}
        className="gpu-layer mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8"
      >
        <a href="#" className="group flex min-w-0 items-center gap-2 text-foreground outline-none">
          <div className="shrink-0 rounded-xl bg-primary/10 p-1.5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:p-2">
            <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="truncate font-display text-base font-bold tracking-tight text-foreground sm:text-xl">
            Antônio<span className="text-primary">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            const label = t(`nav.${link.key}`) as string;
            return (
              <a key={link.id} href={link.href} className="group relative px-2 py-1 text-sm font-medium outline-none">
                <span className={`transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {label}
                </span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </a>
            );
          })}

          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {languageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 mt-2 min-w-[170px] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-lg"
                >
                  {['en', 'pt', 'es'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as 'en' | 'pt' | 'es');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {lang === 'en' && 'English'}
                      {lang === 'pt' && 'Português'}
                      {lang === 'es' && 'Español'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 outline-none transition-shadow hover:shadow-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('nav.hireMe') as string}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {languageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="absolute left-1/2 top-full z-50 mt-2 min-w-[170px] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-lg"
                >
                  {['en', 'pt', 'es'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as 'en' | 'pt' | 'es');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors ${
                        language === lang ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {lang === 'en' && 'English'}
                      {lang === 'pt' && 'Português'}
                      {lang === 'es' && 'Español'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex max-h-[calc(100dvh-3.5rem)] flex-col gap-1 overflow-y-auto px-4 py-5 sm:max-h-[calc(100dvh-4rem)]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border-b border-border/50 py-3 text-base font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground sm:text-lg"
                >
                  {t(`nav.${link.key}`) as string}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                {t('nav.hireMe') as string}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
