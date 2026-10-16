export function RelationTags({ layer, via }: { layer: 1 | 2 | 3; via?: string }) {
  const layerClass = [
    '',
    'bg-navy text-white',
    'bg-good/15 text-good',
    'bg-shuttle text-navy',
  ][layer]
  const layerLabel = ['', '直接球友', '球友的球友', '潜在合拍'][layer]

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${layerClass}`}>{layerLabel}</span>
      {layer >= 2 && via ? (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-app text-navy">{via}的球友</span>
      ) : null}
    </span>
  )
}
