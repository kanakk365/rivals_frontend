"use client";

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Calendar,
  CheckSquare,
  Newspaper,
  Briefcase,
  Building,
  FileText,
  Mail,
} from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

function NavItem({
  href,
  icon: Icon,
  children,
  pathname,
  onNavigate,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  pathname: string;
  onNavigate: () => void;
}) {
  // Check if current pathname matches the href
  // For exact matches or when pathname starts with href + "/" (for sub-routes)
  // Special case: /dashboard should only match exactly /dashboard
  const isActive =
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors relative ${
        isActive
          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      <Icon
        className={`h-4 w-4 mr-3 flex-shrink-0 ${
          isActive ? "text-primary" : ""
        }`}
      />
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-background transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-border
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-border"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold hover:cursor-pointer text-foreground">
                Destination KP
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home} pathname={pathname} onNavigate={handleNavigation}>
                    Dashboard
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Content
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/events" icon={Calendar} pathname={pathname} onNavigate={handleNavigation}>
                    Events
                  </NavItem>
                  <NavItem href="/dashboard/about" icon={FileText} pathname={pathname} onNavigate={handleNavigation}>
                    About
                  </NavItem>
                  <div className="space-y-1">
                    <NavItem href="/dashboard/todo" icon={CheckSquare} pathname={pathname} onNavigate={handleNavigation}>
                      To do
                    </NavItem>
                  </div>
                  <NavItem
                    href="/dashboard/contact-requests"
                    icon={MessagesSquare}
                    pathname={pathname}
                    onNavigate={handleNavigation}
                  >
                    Contact Requests
                  </NavItem>
                  <NavItem href="/dashboard/newsletter-subscribers" icon={Mail} pathname={pathname} onNavigate={handleNavigation}>
                    Newsletter Subscribers
                  </NavItem>
                  <NavItem href="/dashboard/press" icon={Newspaper} pathname={pathname} onNavigate={handleNavigation}>
                    Press
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Business
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/jobs" icon={Briefcase} pathname={pathname} onNavigate={handleNavigation}>
                    Jobs
                  </NavItem>
                  <NavItem href="/dashboard/facilities" icon={Building} pathname={pathname} onNavigate={handleNavigation}>
                    Facilities
                  </NavItem>
                </div>
              </div>

              {/* Team section intentionally removed (members, chat, meetings) */}
            </div>
          </div>

          <div className="px-4 py-4 border-t border-border">
            <div className="space-y-1">
              <NavItem href="/dashboard/settings" icon={Settings} pathname={pathname} onNavigate={handleNavigation}>
                Settings
              </NavItem>
              <NavItem href="/help" icon={HelpCircle} pathname={pathname} onNavigate={handleNavigation}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
