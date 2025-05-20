import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flame, Menu, X } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { cn } from "../lib/utils";
import { auth } from "./firebase/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border px-4">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5 cursor-pointer">
          <Flame fill="#ff9100" color="#ff9100" size={24} />
          <span className="font-semibold text-lg">React-Ignite</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              to={href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                location.pathname === href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/80"
              )}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Desktop profile or auth */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="focus:outline-none"
              >
                <img
                  src={user.photoURL || "/user.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-border cursor-pointer"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-border rounded-md shadow-lg z-50 animate-in fade-in-50 slide-in-from-top-2 p-2 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Button  
                    variant={"destructive"}
                    onClick={() => {
                      signOut(auth);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm cursor-pointer"
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden animate-in fade-in-50 slide-in-from-top-2"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === href
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/80"
                )}
              >
                {name}
              </Link>
            ))}

            <div className="pt-4 space-y-2 border-t border-border">
              {user ? (
                <div>
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <div className={cn(
                      "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground mb-2",
                      location.pathname === "/profile"
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80"
                    )}>
                      {user.displayName || "Profile"}
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      signOut(auth);
                      setMobileOpen(false);
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    size="sm"
                    className="w-full"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/signup">Get started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/login">Sign in</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
