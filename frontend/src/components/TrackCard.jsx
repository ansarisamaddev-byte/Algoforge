import { Link } from 'react-router-dom';
import { TRACK_ICONS } from './PixelIcons';

export default function TrackCard({ category, count }) {
  const Icon = TRACK_ICONS[category.icon];
  const meta = count == null ? 'EXPLORE' : `${count} ${count === 1 ? 'ARTICLE' : 'ARTICLES'}`;
  return (
    <Link
      to={category.path}
      className="group bg-card border border-line hover:border-forge p-6 flex flex-col justify-between transition-all hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs px-2 py-0.5 bg-panel text-forge border border-line">{category.track}</span>
          <div className="w-8 h-8 bg-panel border border-line group-hover:border-forge flex items-center justify-center text-fg-2 group-hover:text-forge transition-colors">
            {Icon && <Icon />}
          </div>
        </div>
        <h3 className="text-xl font-bold text-fg group-hover:text-forge transition-colors mb-2">{category.title}</h3>
        <p className="text-sm text-fg-2 leading-relaxed">{category.description}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-mono text-fg-3 group-hover:text-fg">
        <span>{meta}</span>
        <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
