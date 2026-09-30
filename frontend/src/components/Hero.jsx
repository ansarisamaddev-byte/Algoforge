import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import Terminal from './Terminal';

export default function Hero({ metrics = [] }) {
  return (
    <section className="relative bg-grid border-b border-line py-16 lg:py-24 px-4 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base/50 to-base pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-panel border border-line font-mono text-xs text-fg-2">
            <span className="w-1.5 h-1.5 bg-forge" />
            <span>{siteConfig.heroTag}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight leading-[1.1]">
            Forge Your <br />
            <span className="text-forge font-mono">&lt;Engineering&gt;</span> Skills
          </h1>

          <p className="text-lg text-fg-2 max-w-xl leading-relaxed">{siteConfig.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              to="/#explore"
              className="px-6 py-3 bg-forge hover:bg-forge-hover text-on-forge font-mono font-bold text-sm tracking-wide transition-all border border-forge flex items-center gap-2 shadow-[2px_2px_0_0_rgb(var(--c-line))]"
            >
              <span>Start Learning</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rendering-pixelated" aria-hidden="true">
                <path d="M6 3L11 8L6 13V3Z" fill="currentColor" />
              </svg>
            </Link>

            <a
              href={siteConfig.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-card hover:bg-panel text-fg font-mono text-sm tracking-wide transition-all border border-line hover:border-forge flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-forge" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" stroke="currentColor" fill="none" />
                <polygon points="6,5 12,8 6,11" fill="currentColor" />
              </svg>
              <span>Watch on YouTube</span>
            </a>
          </div>

          {metrics.length > 0 && (
            <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-line w-full max-w-lg font-mono text-xs text-fg-2">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dd className="text-fg font-bold text-base order-first">{m.value}</dd>
                  <dt>{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="lg:col-span-5">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
