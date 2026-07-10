import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Globe } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';
import { useActiveSection } from '@/hooks/use-active-section';
import { easeOut } from '@/lib/motion';

const NAV_LINKS = [
  { key: 'about', href: '#about', id: 'about' },
  { key: 'skills', href: '#skills', id: 'skills' },
  { key: 'projects', href: '#projects', id: 'projects' },
  { key: 'contact', href: '#contact', id: 'contact' },
] as const;

function LanguageMenu({
  open,
  onToggle,
  onSelect,
  language,
  align = 'center',
}: {
  open: boolean;
  onToggle: () => void;
  onSelect: (lang: 'en' | 'pt' | 'es') => void;
  language: string;
  align?: 'center' | 'right';
}) {
  return (
    <div data-lang-dropdown className="relative z-[60] flex items-center justify-center">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full text-foreground outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary md:h-10 md:w-10 md:text-muted-foreground md:hover:text-foreground"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-5 w-5 md:h-4 md:w-4" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-full z-[70] mt-2 min-w-[170px] overflow-hidden rounded-xl border border-border bg-background shadow-lg ${
              align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
            }`}
          >
            {(['en', 'pt', 'es'] as const).map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(lang);
                }}
                className={`flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors ${
                  language === lang
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {lang === 'en' && 'English'}
                {lang === 'pt' && 'Português'}
                {lang === 'es' && 'Español'}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const activeSection = useActiveSection();
  const ignoreOutsideClick = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hard-lock all page scrolling while the mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const { body } = document;

    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overscrollBehavior = 'none';

    const blockTouchScroll = (event: TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-lang-dropdown], a, button')) return;
      event.preventDefault();
    };

    const blockWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    document.addEventListener('touchmove', blockTouchScroll, { passive: false });
    document.addEventListener('wheel', blockWheel, { passive: false });

    return () => {
      document.removeEventListener('touchmove', blockTouchScroll);
      document.removeEventListener('wheel', blockWheel);
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      window.scrollTo(0, scrollY);
    };
  }, [mobileMenuOpen]);

  // Close language menu on outside tap (delayed so the opening tap doesn't close it)
  useEffect(() => {
    if (!languageDropdownOpen) return;

    ignoreOutsideClick.current = true;
    const arm = window.setTimeout(() => {
      ignoreOutsideClick.current = false;
    }, 50);

    const onPointerDown = (event: PointerEvent) => {
      if (ignoreOutsideClick.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-lang-dropdown]')) return;
      setLanguageDropdownOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.clearTimeout(arm);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [languageDropdownOpen]);

  const selectLanguage = (lang: 'en' | 'pt' | 'es') => {
    setLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const toggleLanguage = () => {
    setLanguageDropdownOpen((open) => !open);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'border-b border-border bg-background/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
      } ${mobileMenuOpen ? 'max-md:border-b max-md:border-border max-md:bg-background' : ''}`}
    >
      <div className="entrance-nav mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
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

          <LanguageMenu
            open={languageDropdownOpen}
            onToggle={toggleLanguage}
            onSelect={selectLanguage}
            language={language}
            align="center"
          />

          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 outline-none transition-shadow hover:shadow-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('nav.hireMe') as string}
          </a>
        </nav>

        <div className="relative z-[60] flex items-center gap-3 md:hidden">
          <LanguageMenu
            open={languageDropdownOpen}
            onToggle={toggleLanguage}
            onSelect={selectLanguage}
            language={language}
            align="right"
          />

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => {
              setLanguageDropdownOpen(false);
              setMobileMenuOpen((open) => !open);
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-hidden overscroll-none bg-background touch-none md:hidden sm:top-16"
          >
            <nav className="flex h-full w-full flex-col overflow-hidden">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLanguageDropdownOpen(false);
                  }}
                  className="flex min-h-14 w-full shrink-0 items-center border-b border-border/50 px-4 text-base font-medium text-muted-foreground active:bg-muted/40 active:text-foreground sm:px-6 sm:text-lg"
                >
                  {t(`nav.${link.key}`) as string}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
