import { siteConfig } from '../data/siteConfig';
import { getHealth } from '../lib/api';
import { useAsync } from '../lib/hooks';

export default function Footer() {
  const { data, error, loading } = useAsync(getHealth, []);
  const status = loading ? 'CHECKING' : error || data?.status !== 'ok' ? 'OFFLINE' : 'OPERATIONAL';
  const tone = status === 'OPERATIONAL' ? 'emerald' : status === 'OFFLINE' ? 'red' : 'zinc';
  const dot = { emerald: 'bg-emerald-500', red: 'bg-red-500', zinc: 'bg-zinc-500' }[tone];
  const text = { emerald: 'text-emerald-600 dark:text-emerald-400', red: 'text-red-500', zinc: 'text-fg-2' }[tone];

  return (
    <footer className="mt-auto bg-base border-t border-line py-10 px-4 lg:px-8 font-mono text-xs text-fg-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-fg font-bold">
            <img src={siteConfig.logo} alt="" width="20" height="20" className="h-5 w-auto" />
            <span>{siteConfig.name}</span>
          </div>
          <span className="hidden sm:inline text-line" aria-hidden="true">|</span>
          <span className="text-fg-2">{siteConfig.tagline}</span>
        </div>

        {/* <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-line" role="status">
          <span className={`w-2 h-2 rounded-full ${dot} ${status === 'OPERATIONAL' ? 'animate-pulse' : ''}`} />
          <span className="text-fg-2">SYS_STATUS:</span>
          <span className={`${text} font-bold`}>{status}</span>
        </div> */}

        <div className="flex flex-wrap justify-center items-center gap-4">
          {siteConfig.footerLinks.map((l) => (
            <a key={l.label} href={l.href || siteConfig[l.key]} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              {l.label}
            </a>
          ))}
          <span>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
