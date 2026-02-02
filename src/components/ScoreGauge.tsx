import { getScoreCategory, getScoreCategoryColor, ScoreCategory } from '../types'

interface ScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
}

const sizeConfig = {
  sm: { width: 80, height: 80, strokeWidth: 6, fontSize: '1.25rem', labelSize: '0.625rem' },
  md: { width: 120, height: 120, strokeWidth: 8, fontSize: '1.75rem', labelSize: '0.75rem' },
  lg: { width: 160, height: 160, strokeWidth: 10, fontSize: '2.25rem', labelSize: '0.875rem' }
}

const categoryLabels: Record<ScoreCategory, string> = {
  sovereign: 'Sovereign',
  resilient: 'Resilient',
  vulnerable: 'Vulnerable',
  dependent: 'Dependent',
  critical: 'Critical'
}

export default function ScoreGauge({
  score,
  size = 'md',
  showLabel = true,
  label
}: ScoreGaugeProps) {
  const config = sizeConfig[size]
  const category = getScoreCategory(score)
  const color = getScoreCategoryColor(category)

  const radius = (config.width - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ position: 'relative', width: config.width, height: config.height }}>
        <svg width={config.width} height={config.height} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={radius}
            fill="none"
            stroke="var(--color-gray-200)"
            strokeWidth={config.strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        {/* Score text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: config.fontSize,
              fontWeight: 600,
              color: 'var(--color-gray-900)',
              lineHeight: 1
            }}
          >
            {score}
          </span>
          {showLabel && (
            <span
              style={{
                fontSize: config.labelSize,
                fontWeight: 500,
                color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginTop: '0.25rem'
              }}
            >
              {categoryLabels[category]}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--color-gray-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
