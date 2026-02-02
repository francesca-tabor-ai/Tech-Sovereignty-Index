import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { countriesData, decouplingScenarios } from '../data/countries'
import { SimulationResult, getScoreCategory, getScoreCategoryColor } from '../types'
import { calculateDecouplingImpact } from '../utils/scoring'
import {
  Zap, AlertTriangle, TrendingDown, Globe, Cpu, Database,
  Wifi, Brain, Battery, ChevronRight, Play, RotateCcw
} from 'lucide-react'

const sectorIcons: Record<string, any> = {
  chips: Cpu,
  cloud: Database,
  minerals: Battery,
  energy: Zap,
  cables: Wifi,
  ai: Brain
}

export default function Simulator() {
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [results, setResults] = useState<SimulationResult[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const scenario = useMemo(() => {
    return decouplingScenarios.find(s => s.id === selectedScenario)
  }, [selectedScenario])

  const runSimulation = () => {
    if (!scenario) return

    setIsSimulating(true)

    // Simulate a brief delay for effect
    setTimeout(() => {
      const countriesToSimulate = selectedCountries.length > 0
        ? countriesData.filter(c => selectedCountries.includes(c.id))
        : countriesData

      const simulationResults: SimulationResult[] = countriesToSimulate.map(country => {
        const impact = calculateDecouplingImpact(
          country,
          scenario.affectedSectors,
          scenario.impactMultiplier
        )

        // Find critical vulnerabilities
        const criticalVulnerabilities: string[] = []
        country.dependencies.forEach(dep => {
          if (scenario.affectedSectors.includes(dep.sector) && dep.dependencyLevel > 70) {
            criticalVulnerabilities.push(`${dep.sector}: ${dep.dependencyLevel}% dependency on ${dep.country}`)
          }
        })

        return {
          countryId: country.id,
          countryName: country.name,
          originalScore: country.overallScore,
          impactedScore: Math.max(0, country.overallScore - impact.scoreImpact),
          gdpImpact: impact.gdpImpact,
          digitalUptimeImpact: impact.uptimeImpact,
          criticalVulnerabilities
        }
      })

      // Sort by impact severity
      simulationResults.sort((a, b) =>
        (b.originalScore - b.impactedScore) - (a.originalScore - a.impactedScore)
      )

      setResults(simulationResults)
      setIsSimulating(false)
    }, 800)
  }

  const resetSimulation = () => {
    setResults([])
    setSelectedCountries([])
  }

  const toggleCountrySelection = (countryId: string) => {
    setSelectedCountries(prev =>
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    )
  }

  return (
    <div className="container">
      {/* Header */}
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>
          <span className="gradient-text">Decoupling Simulator</span>
        </h1>
        <p style={{ fontSize: '1.125rem', maxWidth: '700px' }}>
          Model the impact of geopolitical shocks on national tech sovereignty.
          Select a scenario to calculate immediate effects on GDP and digital infrastructure.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: 'var(--space-6)'
      }}>
        {/* Scenario Selection */}
        <div>
          <div className="card card-lg" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Select Scenario</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {decouplingScenarios.map(s => {
                const isSelected = selectedScenario === s.id
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedScenario(s.id)
                      setResults([])
                    }}
                    style={{
                      padding: 'var(--space-4)',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))'
                        : 'var(--color-gray-50)',
                      border: isSelected
                        ? '2px solid var(--color-purple-500)'
                        : '2px solid transparent',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-2)'
                    }}>
                      <h4 style={{
                        fontSize: '0.9375rem',
                        color: isSelected ? 'var(--color-purple-600)' : 'var(--color-gray-900)'
                      }}>
                        {s.name}
                      </h4>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: s.impactMultiplier >= 1.3
                          ? 'rgba(239, 68, 68, 0.1)'
                          : s.impactMultiplier >= 1.1
                          ? 'rgba(249, 115, 22, 0.1)'
                          : 'rgba(245, 158, 11, 0.1)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: s.impactMultiplier >= 1.3
                          ? '#EF4444'
                          : s.impactMultiplier >= 1.1
                          ? '#F97316'
                          : '#F59E0B'
                      }}>
                        {s.impactMultiplier >= 1.3 ? 'Severe' : s.impactMultiplier >= 1.1 ? 'High' : 'Moderate'}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-gray-600)',
                      lineHeight: 1.5,
                      marginBottom: 'var(--space-3)'
                    }}>
                      {s.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {s.affectedSectors.map(sector => {
                        const Icon = sectorIcons[sector] || Globe
                        return (
                          <span
                            key={sector}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.25rem 0.5rem',
                              background: 'var(--color-white)',
                              border: '1px solid var(--color-gray-200)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.6875rem',
                              color: 'var(--color-gray-600)',
                              textTransform: 'capitalize'
                            }}
                          >
                            <Icon size={10} />
                            {sector}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Country Filter */}
          <div className="card card-lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)'
            }}>
              <h3>Filter Countries</h3>
              {selectedCountries.length > 0 && (
                <button
                  onClick={() => setSelectedCountries([])}
                  className="btn btn-ghost"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  Clear All
                </button>
              )}
            </div>
            <p style={{ fontSize: '0.8125rem', marginBottom: 'var(--space-4)' }}>
              {selectedCountries.length === 0
                ? 'All countries will be simulated'
                : `${selectedCountries.length} countries selected`}
            </p>
            <div style={{
              maxHeight: '300px',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem'
            }}>
              {countriesData.map(c => (
                <label
                  key={c.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedCountries.includes(c.id)
                      ? 'var(--color-gray-100)'
                      : 'transparent',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(c.id)}
                    onChange={() => toggleCountrySelection(c.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ flex: 1, fontSize: '0.875rem' }}>{c.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: getScoreCategoryColor(getScoreCategory(c.overallScore))
                  }}>
                    {c.overallScore}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {/* Run Button */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)'
          }}>
            <button
              onClick={runSimulation}
              disabled={!selectedScenario || isSimulating}
              className="btn btn-primary"
              style={{
                padding: 'var(--space-4) var(--space-8)',
                fontSize: '1rem',
                opacity: !selectedScenario ? 0.5 : 1
              }}
            >
              <Play size={18} />
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
            {results.length > 0 && (
              <button
                onClick={resetSimulation}
                className="btn btn-secondary"
                style={{ padding: 'var(--space-4)' }}
              >
                <RotateCcw size={18} />
                Reset
              </button>
            )}
          </div>

          {/* Scenario Info */}
          {scenario && results.length === 0 && !isSimulating && (
            <div className="card card-lg">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, var(--color-purple-500), var(--color-blue-500))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={24} color="white" />
                </div>
                <div>
                  <h2>{scenario.name}</h2>
                  <p style={{ fontSize: '0.875rem' }}>
                    Source: {scenario.sourceCountry}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                {scenario.description}
              </p>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 'var(--space-2)'
                }}>
                  Affected Sectors
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {scenario.affectedSectors.map(sector => {
                    const Icon = sectorIcons[sector] || Globe
                    return (
                      <div
                        key={sector}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          padding: 'var(--space-2) var(--space-3)',
                          background: 'var(--color-white)',
                          border: '1px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-lg)'
                        }}
                      >
                        <Icon size={16} color="var(--color-gray-600)" />
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          textTransform: 'capitalize'
                        }}>
                          {sector}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSimulating && (
            <div className="card card-lg" style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-6)',
                borderRadius: 'var(--radius-full)',
                border: '4px solid var(--color-gray-200)',
                borderTopColor: 'var(--color-purple-500)',
                animation: 'spin 1s linear infinite'
              }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Running Simulation</h3>
              <p>Calculating impact across {selectedCountries.length || countriesData.length} countries...</p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              {/* Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}>
                <div className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Countries Affected
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--color-gray-900)'
                  }}>
                    {results.filter(r => r.originalScore !== r.impactedScore).length}
                  </div>
                </div>
                <div className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Avg TSI Impact
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                  }}>
                    <TrendingDown size={24} />
                    -{Math.round(results.reduce((sum, r) => sum + (r.originalScore - r.impactedScore), 0) / results.length)}
                  </div>
                </div>
                <div className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Critical Vulnerabilities
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#F97316'
                  }}>
                    {results.reduce((sum, r) => sum + r.criticalVulnerabilities.length, 0)}
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="card card-lg">
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Impact Analysis</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th style={{ textAlign: 'center' }}>Original TSI</th>
                        <th style={{ textAlign: 'center' }}>Impacted TSI</th>
                        <th style={{ textAlign: 'center' }}>Change</th>
                        <th style={{ textAlign: 'center' }}>GDP Impact</th>
                        <th style={{ textAlign: 'center' }}>Uptime Impact</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.slice(0, 20).map(result => {
                        const change = result.originalScore - result.impactedScore
                        return (
                          <tr key={result.countryId}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                {result.criticalVulnerabilities.length > 0 && (
                                  <AlertTriangle size={14} color="#EF4444" />
                                )}
                                <span style={{ fontWeight: 500 }}>{result.countryName}</span>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 500,
                                color: getScoreCategoryColor(getScoreCategory(result.originalScore))
                              }}>
                                {result.originalScore}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 500,
                                color: getScoreCategoryColor(getScoreCategory(result.impactedScore))
                              }}>
                                {result.impactedScore}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 600,
                                color: change > 0 ? '#EF4444' : 'var(--color-gray-400)'
                              }}>
                                {change > 0 ? `-${change}` : '0'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 500,
                                color: result.gdpImpact > 5 ? '#EF4444' : result.gdpImpact > 2 ? '#F97316' : 'var(--color-gray-600)'
                              }}>
                                -{result.gdpImpact.toFixed(1)}%
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 500,
                                color: result.digitalUptimeImpact > 20 ? '#EF4444' : result.digitalUptimeImpact > 10 ? '#F97316' : 'var(--color-gray-600)'
                              }}>
                                -{result.digitalUptimeImpact.toFixed(1)}%
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => navigate(`/country/${result.countryId}`)}
                                className="btn btn-ghost"
                                style={{ padding: '0.375rem' }}
                              >
                                <ChevronRight size={16} />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Empty State */}
          {!selectedScenario && !isSimulating && results.length === 0 && (
            <div className="card card-lg" style={{
              textAlign: 'center',
              padding: 'var(--space-16)',
              background: 'var(--color-gray-50)'
            }}>
              <Zap size={48} color="var(--color-gray-300)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-500)' }}>
                Select a Scenario
              </h3>
              <p style={{ maxWidth: '400px', margin: '0 auto' }}>
                Choose a geopolitical shock scenario from the left panel to simulate its impact on global tech sovereignty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
