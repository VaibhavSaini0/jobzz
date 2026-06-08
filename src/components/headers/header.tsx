"use client";

import { Menu, X, Home, Briefcase, Building2, User, Moon, Sun, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchInput from "../search-input";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import AddCompanyModal from "../modals/AddCompanyModal";
import UserServices from "../modals/UserServices";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { HeaderContext } from "./headerWrapper";
import { ThemeModeContext } from "@/context/context/ThemeContext";
import { isEmployer } from "@/lib/roles";

export default function Header() {
  const { user, company, isuserLoading } = useContext(UserContext);
  const headerCtx = useContext(HeaderContext);
  const { theme, toggleTheme } = useContext(ThemeModeContext);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!headerCtx) return null;
  const { open, setOpen, signUpOpen, setSignUpOpen } = headerCtx;

  // Generate dynamic links based on logged-in user role
  const getNavLinks = () => {
    if (!user) {
      return [
        { label: "Home", href: "/", icon: <Home size={15} /> },
        { label: "Browse Jobs", href: "/jobs", icon: <Briefcase size={15} /> },
      ];
    }

    if (isEmployer(user.role)) {
      return [
        { label: "Recruiter Portal", href: "/profile", icon: <User size={15} /> },
        { label: "Company Profile", href: "/company/profile", icon: <Building2 size={15} /> },
        { label: "Applications", href: "/company/applications", icon: <Briefcase size={15} /> },
        { label: "Add Job", href: "/add-job", icon: <Plus size={15} /> },
      ];
    }

    // Candidate links
    return [
      { label: "Home", href: "/", icon: <Home size={15} /> },
      { label: "Browse Jobs", href: "/jobs", icon: <Briefcase size={15} /> },
      { label: "Applied Jobs", href: "/applied-jobs", icon: <Briefcase size={15} /> },
      { label: "My Profile", href: "/profile", icon: <User size={15} /> },
    ];
  };

  const navLinks = getNavLinks();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-header-bg/85 border-b border-card-border backdrop-blur-lg w-full transition-all duration-300">
      <div className="p-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center w-full flex-wrap gap-2 md:gap-6">
          {/* Logo & Role Badge */}
          <div className="flex items-center gap-2 justify-between w-full md:w-auto shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition font-black">
                Jobzz
              </span>
              {user && (
                <span
                  className={`inline-flex items-center rounded-full select-none ml-1.5 shrink-0 transition pulse-effect font-bold px-2.5 py-0.5 text-[10px] ${isEmployer(user.role)
                      ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                      : "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                    }`}
                >
                  {isEmployer(user.role) ? "Recruiter" : "Job Seeker"}
                </span>
              )}
            </Link>

            {/* Mobile menu triggers */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-card-border/40 text-text-muted hover:text-indigo-600 transition"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-card-border/40 text-foreground transition"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="w-full mt-2 md:mt-0 md:w-auto md:flex-1 flex justify-center items-center gap-2">
            <div className="w-full max-w-sm">
              <SearchInput />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2.5 ml-auto">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer font-semibold text-xs lg:text-sm ${isActive(link.href)
                        ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400"
                        : "text-text-muted hover:text-indigo-500 hover:bg-card-border/30"
                      }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </span>
                </Link>
              ))}

              {/* Company Check for Employer */}
              {isEmployer(user?.role) && !company && (
                <AddCompanyModal />
              )}

              {/* Login / Sign Up Actions */}
              {!user && (
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer px-4 py-2 text-xs lg:text-sm font-semibold text-text-muted hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-card-border/30 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setSignUpOpen(true)}
                    className="cursor-pointer px-4 py-2 text-xs lg:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
                  >
                    Sign up
                  </button>
                  <LoginModal
                    open={open}
                    setOpen={setOpen}
                    setSignUpOpen={setSignUpOpen}
                  />
                  <SignupModal
                    signUpOpen={signUpOpen}
                    setSignUpOpen={setSignUpOpen}
                    setOpen={setOpen}
                  />
                </div>
              )}
            </div>

            {/* Desktop utilities */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-indigo-soft/10 text-text-muted hover:text-indigo-600 cursor-pointer flex items-center justify-center transition"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {user && <UserServices />}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden w-full flex flex-col items-stretch mt-4 py-3 border-t border-card-border space-y-3.5 animate-fadeIn">
            <div className="space-y-1.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                  <div
                    className={`flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer font-semibold ${isActive(link.href)
                        ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400"
                        : "text-text-muted hover:text-indigo-500 hover:bg-card-border/30"
                      }`}
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile CTA and user accounts */}
            <div className="px-2 pt-2 border-t border-card-border/60 space-y-3">
              {isEmployer(user?.role) && !company && (
                <AddCompanyModal />
              )}

              {!user && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpen(true);
                    }}
                    className="cursor-pointer w-full py-2.5 px-4 text-center text-sm font-semibold text-text-muted hover:text-indigo-600 dark:hover:text-indigo-400 border border-card-border/60 hover:bg-card-border/30 rounded-xl transition active:scale-98"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setSignUpOpen(true);
                    }}
                    className="cursor-pointer w-full py-2.5 px-4 text-center text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition active:scale-98"
                  >
                    Sign up
                  </button>
                  <LoginModal
                    open={open}
                    setOpen={setOpen}
                    setSignUpOpen={setSignUpOpen}
                  />
                  <SignupModal
                    signUpOpen={signUpOpen}
                    setSignUpOpen={setSignUpOpen}
                    setOpen={setOpen}
                  />
                </div>
              )}

              {user && (
                <div className="flex items-center justify-between bg-card-bg/60 border border-card-border p-3.5 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-foreground">
                      Logged in as: {user.name}
                    </span>
                  </div>
                  <UserServices />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
