"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";
import { duration, ease } from "@/lib/motion";
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

// "github" isn't in the nav, but observing it clears the highlight while it's on screen.
const sectionIds = [...navItems.map((item) => item.id), "github"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-(--duration-slow) ease-(--ease-out-expo)",
        scrolled || open
          ? "border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-[4.25rem] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface-1/60 p-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
                    transition={{ duration: duration.slow, ease: ease.outExpo }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-(--duration-base)",
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
            Résumé
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-control border border-line-strong bg-surface-2/80 text-fg transition-colors hover:bg-surface-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.25rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: duration.slow, ease: ease.outExpo }}
            className="overflow-y-auto border-t border-line bg-bg lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col justify-between gap-10 py-8">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.slow, ease: ease.outExpo, delay: 0.04 * i }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => close(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className="flex items-baseline justify-between border-b border-line py-4 text-2xl font-medium tracking-[-0.02em] text-fg-muted transition-colors hover:text-fg aria-[current]:text-fg"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-5">
                <ButtonLink
                  href={profile.resumeUrl}
                  variant="secondary"
                  size="lg"
                  download
                  icon={<Download className="size-4" aria-hidden="true" />}
                  pendingLabel={RESUME_PENDING}
                  className="w-full"
                >
                  Download résumé
                </ButtonLink>
                <SocialLinks className="-ml-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
