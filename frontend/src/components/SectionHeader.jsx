export default function SectionHeader({ kicker, title, as: Tag = 'h2', children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-line gap-4">
      <div>
        <div className="font-mono text-xs text-forge mb-1">{kicker}</div>
        <Tag className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">{title}</Tag>
      </div>
      {children}
    </div>
  );
}
