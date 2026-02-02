import { useParams, Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { countriesData } from '../data/countries'
import { getScoreCategory, getScoreCategoryColor, ScoreCategory } from '../types'
import ScoreGauge from '../components/ScoreGauge'
import LayerBreakdown from '../components/LayerBreakdown'
import {
  ArrowLeft, AlertTriangle, TrendingUp,
  Lightbulb, Target, Globe
} from 'lucide-react'

const categoryLabels: Record<ScoreCategory, string> = {
  sovereign: 'Sovereign',
  resilient: 'Resilient',
  vulnerable: 'Vulnerable',
  dependent: 'Dependent',
  critical: 'Critical'
}

const priorityConfig = {
  critical: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Critical' },
  high: { color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)', label: 'High' },
  medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Medium' },
  low: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Low' }
}

export default function CountryDetail() {
  const { countryId } = useParams<{ countryId: string }>()
  const navigate = useNavigate()

  const country = useMemo(() => {
    return countriesData.find(c => c.id === countryId)
  }, [countryId])

  if (!country) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Country Not Found</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            The country you're looking for doesn't exist in our database.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const category = getScoreCategory(country.overallScore)

  return (
    <div className="container">
      {/* Back navigation */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          color: 'var(--color-gray-500)',
          fontSize: '0.875rem',
          marginBottom: 'var(--space-6)',
          textDecoration: 'none'
        }}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--space-8)'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-2)'
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {country.region}
            </span>
            <span style={{ color: 'var(--color-gray-300)' }}>|</span>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-gray-500)'
            }}>
              {country.code}
            </span>
          </div>
          <h1 style={{ marginBottom: 'var(--space-3)' }}>{country.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className={`badge badge-${category}`}>
              {categoryLabels[category]}
            </span>
            {country.isSovereignPrison && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.75rem',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#EF4444'
              }}>
                <AlertTriangle size={12} />
                Sovereign Prison
              </span>
            )}
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-gray-400)'
            }}>
              Last updated: {country.lastUpdated}
            </span>
          </div>
        </div>
        <ScoreGauge score={country.overallScore} size="lg" label="TSI Score" />
      </header>

      {/* Sovereign Prison Warning */}
      {country.isSovereignPrison && country.sovereignPrisonReason && (
        <div style={{
          padding: 'var(--space-5)',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--space-4)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertTriangle size={20} color="#EF4444" />
          </div>
          <div>
            <h4 style={{ color: '#DC2626', marginBottom: 'var(--space-2)' }}>
              Sovereign Prison Status
            </h4>
            <p style={{ color: '#991B1B', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {country.sovereignPrisonReason}
            </p>
          </div>
        </div>
      )}

      {/* Diagnosis */}
      <div className="card card-lg" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-2)'
        }}>
          <Target size={20} color="var(--color-purple-500)" />
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Strategic Diagnosis
          </span>
        </div>
        <h2 style={{ color: 'var(--color-purple-600)' }}>{country.diagnosis}</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
      }}>
        {/* Layer Breakdown */}
        <div className="card card-lg">
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Sovereignty Layers</h3>
          <LayerBreakdown metrics={country.metrics} />
        </div>

        {/* Dependencies */}
        <div className="card card-lg">
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Critical Dependencies</h3>
          {country.dependencies.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {country.dependencies.map((dep, index) => (
                <div
                  key={index}
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--color-gray-50)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}>
                        <Globe size={14} color="var(--color-gray-400)" />
                        <span style={{
                          fontWeight: 600,
                          color: 'var(--color-gray-900)'
                        }}>
                          {dep.country}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-gray-500)',
                        textTransform: 'capitalize'
                      }}>
                        {dep.sector}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: dep.dependencyLevel > 80 ? '#EF4444' :
                             dep.dependencyLevel > 60 ? '#F97316' :
                             dep.dependencyLevel > 40 ? '#F59E0B' : 'var(--color-gray-600)'
                    }}>
                      {dep.dependencyLevel}%
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-gray-600)',
                    lineHeight: 1.5
                  }}>
                    {dep.description}
                  </p>
                  {/* Dependency bar */}
                  <div style={{
                    marginTop: 'var(--space-3)',
                    height: '6px',
                    background: 'var(--color-gray-200)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${dep.dependencyLevel}%`,
                      background: dep.dependencyLevel > 80 ? '#EF4444' :
                                  dep.dependencyLevel > 60 ? '#F97316' :
                                  dep.dependencyLevel > 40 ? '#F59E0B' : '#10B981',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: 'var(--space-8)',
              textAlign: 'center',
              color: 'var(--color-gray-400)'
            }}>
              No significant dependencies identified
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <section>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--color-purple-500), var(--color-blue-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lightbulb size={20} color="white" />
          </div>
          <div>
            <h2>Strategic Recommendations</h2>
            <p style={{ fontSize: '0.875rem' }}>
              Actions to improve tech sovereignty score
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {country.recommendations.map((rec, index) => {
            const config = priorityConfig[rec.priority]
            return (
              <div
                key={index}
                className="card"
                style={{ padding: 'var(--space-5)' }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-3)'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      <span style={{
                        padding: '0.25rem 0.625rem',
                        background: config.bg,
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: config.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em'
                      }}>
                        {config.label} Priority
                      </span>
                      <span style={{
                        padding: '0.25rem 0.625rem',
                        background: 'var(--color-gray-100)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        color: 'var(--color-gray-600)',
                        textTransform: 'capitalize'
                      }}>
                        {rec.category}
                      </span>
                    </div>
                    <h4 style={{ marginBottom: 'var(--space-2)' }}>{rec.title}</h4>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-gray-600)',
                      lineHeight: 1.6
                    }}>
                      {rec.description}
                    </p>
                  </div>
                  <div style={{
                    textAlign: 'right',
                    marginLeft: 'var(--space-6)'
                  }}>
                    <div style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-gray-500)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 'var(--space-1)'
                    }}>
                      Impact
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)'
                    }}>
                      <TrendingUp size={16} color="var(--color-sovereign)" />
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--color-sovereign)'
                      }}>
                        +{rec.estimatedImpact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Related Countries */}
      <section style={{ marginTop: 'var(--space-12)' }}>
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Compare With Similar Countries</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-3)'
        }}>
          {countriesData
            .filter(c => c.id !== country.id && c.region === country.region)
            .slice(0, 4)
            .map(c => (
              <div
                key={c.id}
                onClick={() => navigate(`/country/${c.id}`)}
                className="card transition"
                style={{
                  padding: 'var(--space-4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                    {c.diagnosis.split(',')[0]}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: getScoreCategoryColor(getScoreCategory(c.overallScore))
                }}>
                  {c.overallScore}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
