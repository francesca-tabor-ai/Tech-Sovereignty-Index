import { Link } from 'react-router-dom'
import { CountryData, getScoreCategory, getScoreCategoryColor, ScoreCategory } from '../types'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import ScoreGauge from './ScoreGauge'

interface CountryCardProps {
  country: CountryData
  variant?: 'default' | 'compact' | 'featured'
  showRecommendations?: boolean
}

const categoryLabels: Record<ScoreCategory, string> = {
  sovereign: 'Sovereign',
  resilient: 'Resilient',
  vulnerable: 'Vulnerable',
  dependent: 'Dependent',
  critical: 'Critical'
}

export default function CountryCard({
  country,
  variant = 'default',
  showRecommendations = false
}: CountryCardProps) {
  const category = getScoreCategory(country.overallScore)
  const categoryColor = getScoreCategoryColor(category)

  if (variant === 'compact') {
    return (
      <Link
        to={`/country/${country.id}`}
        className="card transition"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4)',
          textDecoration: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: `${categoryColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: categoryColor
          }}>
            {country.overallScore}
          </div>
          <div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-gray-900)'
            }}>
              {country.name}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-gray-500)'
            }}>
              {country.region}
            </div>
          </div>
        </div>
        {country.isSovereignPrison && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.625rem',
              fontWeight: 500,
              color: '#EF4444',
              textTransform: 'uppercase',
              letterSpacing: '0.03em'
            }}
          >
            <AlertTriangle size={10} />
            Prison
          </div>
        )}
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        to={`/country/${country.id}`}
        className="card transition"
        style={{
          padding: 'var(--space-6)',
          textDecoration: 'none',
          display: 'block'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--space-4)'
        }}>
          <div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--color-gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-1)'
            }}>
              {country.region}
            </div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>{country.name}</h3>
            {country.isSovereignPrison && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.375rem 0.75rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#EF4444'
                }}
              >
                <AlertTriangle size={12} />
                Sovereign Prison
              </div>
            )}
          </div>
          <ScoreGauge score={country.overallScore} size="md" />
        </div>

        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-gray-50)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-4)'
        }}>
          <div style={{
            fontSize: '0.6875rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-2)'
          }}>
            Diagnosis
          </div>
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--color-gray-900)'
          }}>
            {country.diagnosis}
          </div>
        </div>

        {/* Top dependencies */}
        {country.dependencies.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--color-gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-2)'
            }}>
              Critical Dependencies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {country.dependencies.slice(0, 3).map((dep, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.625rem',
                    background: 'var(--color-white)',
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem'
                  }}
                >
                  <span style={{ color: 'var(--color-gray-600)' }}>{dep.country}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    color: dep.dependencyLevel > 70 ? '#EF4444' : 'var(--color-gray-900)'
                  }}>
                    {dep.dependencyLevel}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          color: 'var(--color-blue-600)',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          View Details
          <ArrowRight size={16} />
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      to={`/country/${country.id}`}
      className="card transition"
      style={{
        padding: 'var(--space-5)',
        textDecoration: 'none',
        display: 'block'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.6875rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {country.region}
          </div>
          <h4 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
            {country.name}
          </h4>
          <span
            className={`badge badge-${category}`}
            style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}
          >
            {categoryLabels[category]}
          </span>
          {country.isSovereignPrison && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.75rem',
                color: '#EF4444',
                marginTop: 'var(--space-2)'
              }}
            >
              <AlertTriangle size={12} />
              Sovereign Prison
            </div>
          )}
        </div>
        <ScoreGauge score={country.overallScore} size="sm" showLabel={false} />
      </div>

      {showRecommendations && country.recommendations.length > 0 && (
        <div style={{
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-gray-200)'
        }}>
          <div style={{
            fontSize: '0.6875rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-2)'
          }}>
            Top Recommendation
          </div>
          <div style={{
            fontSize: '0.8125rem',
            color: 'var(--color-gray-700)',
            lineHeight: 1.5
          }}>
            {country.recommendations[0].title}
          </div>
        </div>
      )}
    </Link>
  )
}
