type IconProps = {
  size?: number
  strokeWidth?: number
  className?: string
}

function svgProps({ size = 24, strokeWidth = 2, className }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  }
}

export function ShuttleIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <ellipse cx="18.2" cy="12" rx="2.7" ry="2.5" />
      <path d="M15.6 12H4.8" />
      <path d="M15.2 12C12.2 7.2 8.2 5.8 5 7.6" />
      <path d="M15.2 12C12.2 16.8 8.2 18.2 5 16.4" />
      <path d="M13.4 9.2 7.2 6.2" />
      <path d="M13.4 14.8 7.2 17.8" />
    </svg>
  )
}

export function RacketIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <ellipse cx="13.2" cy="8.4" rx="5.1" ry="6.6" transform="rotate(-16 13.2 8.4)" />
      <path d="M10.6 6.2h5.2" />
      <path d="M10.4 9h5.6" />
      <path d="M11 11.6h4.4" />
      <path d="M11.4 14.8 8.6 21" />
      <path d="M7.4 19.4h3.2" />
    </svg>
  )
}

export function CourtIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="1.2" />
      <path d="M11.2 5.2v13.6" />
      <path d="M12.8 5.2v13.6" />
      <path d="M10.2 5.2h3.6" />
      <path d="M10.2 18.8h3.6" />
    </svg>
  )
}
