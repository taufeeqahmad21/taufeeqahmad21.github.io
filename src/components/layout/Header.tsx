"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { duration, ease, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "./Logo";

const RESUME_PENDING = "Résumé not uploaded yet";

/** Tracks which section is in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// "technology" has no nav entry; observing it clears the highlight while it's on screen.
const sectionIds = [...navItems.map((item) => item.id), "technology"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: Escape closes, body scroll is locked, focus moves into the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && close(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="container-page">
        <nav
          aria-label="Primary"
          className={cn(
            "surface-glass relative z-10 flex h-14 items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-[box-shadow,background-color] duration-(--duration-slow) ease-(--ease-out-expo) sm:pl-5",
            scrolled || open ? "shadow-raised" : "shadow-none",
          )}
        >
          <Logo />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-surface-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)]"
                      transition={{ duration: duration.slow, ease: ease.outExpo }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2.5 text-sm leading-5 transition-colors duration-(--duration-base)",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={profile.resumeUrl}
              variant="secondary"
              size="sm"
              download
              icon={<Download className="size-4" aria-hidden="true" />}
              pendingLabel={RESUME_PENDING}
              className="hidden sm:inline-flex"
            >
              Resume
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface-2/80 text-fg transition-colors hover:bg-surface-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: duration.base, ease: ease.outExpo }}
                  className="inline-flex"
                >
                  {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.outExpo }}
            className="fixed inset-0 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgb(91_140_255/0.16),transparent_70%)]"
            />
            <div className="container-page relative flex min-h-full flex-col justify-between gap-12 pb-10 pt-28">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.slow, ease: ease.outExpo, delay: 0.05 + stagger.tight * i }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => close(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className="group flex items-baseline gap-4 border-b border-line py-4 text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-fg-muted transition-colors hover:text-fg aria-[current]:text-fg"
                    >
                      <span className="w-8 font-mono text-xs font-normal tracking-normal text-fg-subtle">
                        0{i + 1}
                      </span>
                      <span className="transition-transform duration-(--duration-base) ease-(--ease-out-expo) group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: duration.slow, ease: ease.outExpo, delay: 0.25 }}
                className="flex flex-col gap-6"
              >
                <p className="inline-flex items-center gap-2.5 text-sm text-fg-muted">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-success" />
                  {profile.availability.label}
                </p>
                <ButtonLink
                  href={profile.resumeUrl}
                  variant="secondary"
                  size="lg"
                  download
                  icon={<Download className="size-4" aria-hidden="true" />}
                  pendingLabel={RESUME_PENDING}
                  className="w-full"
                >
                  Download resume
                </ButtonLink>
                <SocialLinks className="-ml-2" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
