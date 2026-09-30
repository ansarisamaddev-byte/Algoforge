import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useTheme } from '../lib/hooks';

const navClass = ({ isActive }) =>
  `px-3 py-1.5 border border-transparent transition-colors hover:bg-panel hover:border-line hover:text-fg ${
    isActive ? 'text-fg' : 'text-fg-2'
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const openSearch = () => navigate('/blog', { state: { focus: Date.now() } });

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('/blog', { state: { focus: Date.now() } });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <header className="sticky top-0 z-50 bg-base/95 backdrop-blur-sm border-b border-line px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label={`${siteConfig.name} home`}>
          <img src={siteConfig.logo} alt="" width="28" height="28" className="h-7 w-7 object-contain" />
          <span className="font-sans font-bold tracking-tight text-x text-fg group-hover:text-forge transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 font-mono text-xs">
          {siteConfig.navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to.startsWith('/#')} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="p-2 bg-card border border-line hover:border-line-strong text-fg-2 hover:text-fg text-xs font-mono flex items-center gap-2"
          >
            <span className={`w-2 h-2 ${isDark ? 'bg-forge' : 'bg-amber-500'}`} />
            <span className="hidden sm:inline">{isDark ? 'DARK_MODE' : 'LIGHT_MODE'}</span>
          </button>

          <button
            type="button"
            onClick={openSearch}
            aria-label="Search articles (Ctrl+K)"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-card border border-line hover:border-line-strong text-fg-3 text-xs font-mono"
          >
            <span>Ctrl</span><span>K</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 bg-card border border-line text-fg-2 hover:text-fg"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden max-w-7xl mx-auto mt-3 pt-3 border-t border-line flex flex-col font-mono text-sm">
          {siteConfig.navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to.startsWith('/#')} className={navClass} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
