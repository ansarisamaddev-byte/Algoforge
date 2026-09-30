import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/hooks';

export default function NotFound({ message = 'The page you are looking for does not exist.' }) {
  usePageTitle('404 — AlgoForge');
  return (
    <div className="py-24 px-4 lg:px-8 max-w-3xl mx-auto w-full font-mono">
      <div className="text-forge text-xs mb-2">{'// ERROR_404'}</div>
      <h1 className="text-4xl font-bold text-fg mb-4">Not found</h1>
      <p className="text-sm text-fg-2 mb-8">{message}</p>
      <Link to="/" className="inline-block px-6 py-3 bg-forge hover:bg-forge-hover text-on-forge font-bold text-sm border border-forge">
        cd ~/home
      </Link>
    </div>
  );
}
