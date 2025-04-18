import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  Bot,
  FileText,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { href: "/about", icon: <User className="h-5 w-5" />, label: "About" },
  { href: "/projects", icon: <Code2 className="h-5 w-5" />, label: "Projects" },
  { href: "/ai-with-ai", icon: <Bot className="h-5 w-5" />, label: "AI with AI" },
  { href: "/notes", icon: <FileText className="h-5 w-5" />, label: "Notes" },
  { href: "/contact", icon: <Mail className="h-5 w-5" />, label: "Contact" }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <motion.aside
        initial={isMobile ? { x: -300 } : false}
        animate={isOpen ? { x: 0 } : isMobile ? { x: -300 } : false}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-sidebar text-sidebar-foreground fixed h-full w-64 flex flex-col z-40",
          !isOpen && !isMobile && "hidden",
          className
        )}
      >
        <div className="p-4">
          <h1 className="text-xl font-mono text-sidebar-foreground">% su dm</h1>
        </div>

        <nav className="mt-6 flex-grow">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors cursor-pointer",
                      location === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span className="w-6">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-sidebar-border">
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
