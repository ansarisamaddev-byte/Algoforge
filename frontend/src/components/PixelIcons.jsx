const svgProps = { width: 18, height: 18, viewBox: '0 0 16 16', fill: 'none', className: 'rendering-pixelated', 'aria-hidden': true };

export const TRACK_ICONS = {
  tree: () => (
    <svg {...svgProps}>
      <g fill="currentColor">
        <rect x="7" y="1" width="2" height="2" /><rect x="3" y="7" width="2" height="2" /><rect x="11" y="7" width="2" height="2" />
        <rect x="1" y="13" width="2" height="2" /><rect x="5" y="13" width="2" height="2" />
        <rect x="7" y="3" width="2" height="4" /><rect x="4" y="5" width="8" height="2" />
      </g>
    </svg>
  ),
  nodes: () => (
    <svg {...svgProps}>
      <g fill="currentColor">
        <rect x="2" y="2" width="4" height="4" /><rect x="10" y="2" width="4" height="4" /><rect x="6" y="10" width="4" height="4" />
        <rect x="4" y="6" width="8" height="2" /><rect x="7" y="8" width="2" height="2" />
      </g>
    </svg>
  ),
  chip: () => (
    <svg {...svgProps}>
      <rect x="4" y="4" width="8" height="8" fill="currentColor" />
      <rect x="6" y="6" width="4" height="4" className="fill-panel" />
      <g fill="currentColor">
        <rect x="7" y="1" width="2" height="2" /><rect x="7" y="13" width="2" height="2" />
        <rect x="1" y="7" width="2" height="2" /><rect x="13" y="7" width="2" height="2" />
      </g>
    </svg>
  ),
  terminal: () => (
    <svg {...svgProps}>
      <rect x="2" y="3" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <g fill="currentColor">
        <rect x="5" y="6" width="2" height="2" /><rect x="7" y="8" width="2" height="2" /><rect x="9" y="10" width="3" height="2" />
      </g>
    </svg>
  ),
};
