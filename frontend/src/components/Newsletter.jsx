import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

export default function Newsletter() {
  const [message, setMessage] = useState('');
  const url = siteConfig.newsletterUrl;

  // With a configured URL the browser submits the form natively (opens the provider's confirmation page).
  const onSubmit = (e) => {
    if (!url) {
      e.preventDefault();
      setMessage('Newsletter is not connected yet — set newsletterUrl in siteConfig.js.');
    }
  };

  return (
    <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-card border border-line p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-forge mb-2">{'// JOIN_THE_FORGE'}</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-fg mb-3">Ready to sharpen your technical edge?</h3>
          <p className="text-sm text-fg-2 leading-relaxed">
            Get new technical guides, system design breakdowns, and DSA walkthroughs delivered to your inbox.
          </p>
        </div>

        <form action={url || undefined} method="post" target="_blank" onSubmit={onSubmit} className="w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="dev@domain.com"
              className="bg-base border border-line px-4 py-3 text-xs font-mono text-fg placeholder-fg-3 focus:outline-none focus:border-forge w-full sm:w-64"
            />
            <button type="submit" className="bg-forge hover:bg-forge-hover text-on-forge font-mono font-bold text-xs px-6 py-3 transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
          {message && <p role="status" className="mt-3 font-mono text-xs text-fg-2 max-w-xs sm:max-w-sm">{message}</p>}
        </form>
      </div>
    </section>
  );
}
