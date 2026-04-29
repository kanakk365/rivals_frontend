"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Features", link: "#features" },
  { name: "How it works", link: "#how-it-works" },
  { name: "Testimonials", link: "#testimonials" },
];

export default function LandingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <NavbarButton variant="secondary" as="a" href="/login">
            Sign in
          </NavbarButton>
          <NavbarButton variant="primary" as="a" href="/signup">
            Get started free
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex w-full flex-col gap-1">
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex w-full flex-col gap-3 pt-3 border-t border-white/5">
            <NavbarButton
              as="a"
              href="/login"
              variant="dark"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </NavbarButton>
            <NavbarButton
              as="a"
              href="/signup"
              variant="primary"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get started free
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
