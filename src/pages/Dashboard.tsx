import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { countriesData, getSovereignPrisons, getTopCountries } from '../data/countries'
import { CountryData, getScoreCategory, getScoreCategoryColor } from '../types'
import WorldMap from '../components/WorldMap'
import CountryCard from '../components/CountryCard'
import ScoreGauge from '../components/ScoreGauge'
import LayerBreakdown from '../components/LayerBreakdown'
import {
  AlertTriangle, TrendingUp, TrendingDown, Search,
  Globe, Shield, ChevronRight
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null)
  const [showSovereignPrisons, setShowSovereignPrisons] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const sovereignPrisons = useMemo(() => getSovereignPrisons(), [])
  const topCountries = useMemo(() => getTopCountries(5), [])
  const bottomCountries = useMemo(() =>
    [...countriesData].sort((a, b) => a.overallScore - b.overallScore).slice(0, 5),
    []
  )

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countriesData.map(c => c.region))]
    return ['all', ...uniqueRegions.sort()]
  }, [])

  const filteredCountries = useMemo(() => {
    return countriesData.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRegion = selectedRegion === 'all' || c.region === selectedRegion
      return matchesSearch && matchesRegion
    }).sort((a, b) => b.overallScore - a.overallScore)
  }, [searchQuery, selectedRegion])

  const handleCountryClick = (country: CountryData) => {
    navigate(`/country/${country.id}`)
  }

  return (
    <div className="container">
      {/* Hero section */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>
            <span className="gradient-text">Tech Sovereignty Index</span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'var(--color-gray-600)',
            marginBottom: 'var(--space-6)'
          }}>
            Evaluating nations' ability to control their technological value chain—from atoms to algorithms.
            A comprehensive assessment of Full-Stack Control across energy, compute, cognition, and jurisdiction.
          </p>

          {/* Quick stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-4)'
          }}>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Globe size={16} color="var(--color-blue-500)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Countries
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600 }}>
                {countriesData.length}
              </div>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <TrendingUp size={16} color="var(--color-sovereign)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Avg Score
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600 }}>
                {Math.round(countriesData.reduce((sum, c) => sum + c.overallScore, 0) / countriesData.length)}
              </div>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Shield size={16} color="var(--color-purple-500)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Sovereign
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600 }}>
                {countriesData.filter(c => c.overallScore >= 80).length}
              </div>
            </div>
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <AlertTriangle size={16} color="var(--color-critical)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  At Risk
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600 }}>
                {sovereignPrisons.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Map section */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div className="card card-lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)'
          }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-1)' }}>Global Sovereignty Heatmap</h2>
              <p style={{ fontSize: '0.9375rem' }}>
                Click any country to view detailed analysis
              </p>
            </div>
            <button
              onClick={() => setShowSovereignPrisons(!showSovereignPrisons)}
              className={`btn ${showSovereignPrisons ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <AlertTriangle size={16} />
              {showSovereignPrisons ? 'Showing Sovereign Prisons' : 'Highlight Sovereign Prisons'}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <WorldMap
              countries={countriesData}
              onCountryClick={handleCountryClick}
              onCountryHover={setHoveredCountry}
              highlightSovereignPrisons={showSovereignPrisons}
            />

            {/* Legend */}
            <div style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              left: 'var(--space-4)',
              display: 'flex',
              gap: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)'
            }}>
              {[
                { label: 'Sovereign', score: 85 },
                { label: 'Resilient', score: 65 },
                { label: 'Vulnerable', score: 45 },
                { label: 'Dependent', score: 25 },
                { label: 'Critical', score: 10 }
              ].map(({ label, score }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    background: getScoreCategoryColor(getScoreCategory(score))
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Hover tooltip */}
            {hoveredCountry && (
              <div style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                width: '280px',
                padding: 'var(--space-4)',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-3)'
                }}>
                  <div>
                    <h4 style={{ marginBottom: 'var(--space-1)' }}>{hoveredCountry.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                      {hoveredCountry.region}
                    </span>
                  </div>
                  <ScoreGauge score={hoveredCountry.overallScore} size="sm" showLabel={false} />
                </div>
                <LayerBreakdown metrics={hoveredCountry.metrics} compact />
                {hoveredCountry.isSovereignPrison && (
                  <div style={{
                    marginTop: 'var(--space-3)',
                    padding: 'var(--space-2) var(--space-3)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-2)'
                  }}>
                    <AlertTriangle size={14} color="#EF4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', color: '#DC2626', lineHeight: 1.4 }}>
                      {hoveredCountry.sovereignPrisonReason}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sovereign Prisons Alert */}
      {sovereignPrisons.length > 0 && (
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <div style={{
            padding: 'var(--space-6)',
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle size={20} color="#EF4444" />
              </div>
              <div>
                <h3 style={{ color: '#DC2626' }}>Sovereign Prison Alert</h3>
                <p style={{ fontSize: '0.875rem', color: '#991B1B' }}>
                  {sovereignPrisons.length} nations have data legally stored locally but processed by foreign-owned technology
                </p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-3)'
            }}>
              {sovereignPrisons.map(country => (
                <CountryCard key={country.id} country={country} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rankings */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-6)'
        }}>
          {/* Most Sovereign */}
          <div className="card card-lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)'
            }}>
              <TrendingUp size={20} color="var(--color-sovereign)" />
              <h3>Most Sovereign</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {topCountries.map((country, index) => (
                <div
                  key={country.id}
                  onClick={() => navigate(`/country/${country.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    background: index === 0 ? 'rgba(16, 185, 129, 0.05)' : 'var(--color-gray-50)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-md)',
                    background: index === 0 ? 'var(--color-sovereign)' : 'var(--color-gray-200)',
                    color: index === 0 ? 'white' : 'var(--color-gray-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: 'var(--color-gray-900)' }}>
                      {country.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                      {country.diagnosis}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: getScoreCategoryColor(getScoreCategory(country.overallScore))
                  }}>
                    {country.overallScore}
                  </div>
                  <ChevronRight size={16} color="var(--color-gray-400)" />
                </div>
              ))}
            </div>
          </div>

          {/* Most Vulnerable */}
          <div className="card card-lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)'
            }}>
              <TrendingDown size={20} color="var(--color-critical)" />
              <h3>Most Vulnerable</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {bottomCountries.map((country, index) => (
                <div
                  key={country.id}
                  onClick={() => navigate(`/country/${country.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    background: index === 0 ? 'rgba(239, 68, 68, 0.05)' : 'var(--color-gray-50)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-md)',
                    background: index === 0 ? 'var(--color-critical)' : 'var(--color-gray-200)',
                    color: index === 0 ? 'white' : 'var(--color-gray-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, color: 'var(--color-gray-900)' }}>
                      {country.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                      {country.diagnosis}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: getScoreCategoryColor(getScoreCategory(country.overallScore))
                  }}>
                    {country.overallScore}
                  </div>
                  <ChevronRight size={16} color="var(--color-gray-400)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Country List */}
      <section>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-6)'
        }}>
          <h2>All Countries</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-gray-400)'
                }}
              />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ paddingLeft: '36px', width: '220px' }}
              />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input select"
              style={{ width: '180px' }}
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-4)'
        }}>
          {filteredCountries.map(country => (
            <CountryCard
              key={country.id}
              country={country}
              showRecommendations
            />
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div style={{
            padding: 'var(--space-12)',
            textAlign: 'center',
            color: 'var(--color-gray-500)'
          }}>
            No countries match your search criteria
          </div>
        )}
      </section>
    </div>
  )
}
