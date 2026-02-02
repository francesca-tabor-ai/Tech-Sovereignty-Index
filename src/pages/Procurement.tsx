import { useState, useMemo } from 'react'
import { vendorsData, checkVendorCompliance } from '../data/vendors'
import {
  Search, Filter, CheckCircle, XCircle, AlertTriangle,
  Building2, Shield, Database, Globe,
  ChevronDown, ChevronUp
} from 'lucide-react'

const categoryConfig: Record<string, { label: string; icon: any; color: string }> = {
  cloud: { label: 'Cloud', icon: Database, color: '#3B82F6' },
  security: { label: 'Security', icon: Shield, color: '#EF4444' },
  ai: { label: 'AI & ML', icon: Globe, color: '#8B5CF6' },
  infrastructure: { label: 'Infrastructure', icon: Building2, color: '#F59E0B' },
  data: { label: 'Data & Analytics', icon: Database, color: '#10B981' },
  identity: { label: 'Identity', icon: Shield, color: '#EC4899' }
}

function ComplianceIcon({ passed }: { passed: boolean }) {
  return passed
    ? <CheckCircle size={16} color="#10B981" />
    : <XCircle size={16} color="#EF4444" />
}

export default function Procurement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showOnlyCompliant, setShowOnlyCompliant] = useState(false)
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)

  const filteredVendors = useMemo(() => {
    return vendorsData.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory
      const matchesCompliance = !showOnlyCompliant || vendor.euStackCompliant

      return matchesSearch && matchesCategory && matchesCompliance
    })
  }, [searchQuery, selectedCategory, showOnlyCompliant])

  const compliantCount = useMemo(() =>
    vendorsData.filter(v => v.euStackCompliant).length,
    []
  )

  const toggleVendorExpand = (vendorId: string) => {
    setExpandedVendor(prev => prev === vendorId ? null : vendorId)
  }

  return (
    <div className="container">
      {/* Header */}
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>
          <span className="gradient-text">EuroStack Procurement Filter</span>
        </h1>
        <p style={{ fontSize: '1.125rem', maxWidth: '700px' }}>
          Evaluate vendors against Sovereign European Technology Provider criteria.
          Find alternatives that meet jurisdiction, control, and data residency requirements.
        </p>
      </header>

      {/* Criteria Explanation */}
      <div className="card card-lg" style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Sovereignty Criteria</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-4)'
        }}>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}>
              <Building2 size={18} color="#3B82F6" />
            </div>
            <h4 style={{ fontSize: '0.9375rem', marginBottom: 'var(--space-1)' }}>
              EU Jurisdiction
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              Headquarters located within EU member state territory
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}>
              <Shield size={18} color="#8B5CF6" />
            </div>
            <h4 style={{ fontSize: '0.9375rem', marginBottom: 'var(--space-1)' }}>
              Foreign Control Free
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              No decisive control by non-EU parent companies or shareholders
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}>
              <Database size={18} color="#10B981" />
            </div>
            <h4 style={{ fontSize: '0.9375rem', marginBottom: 'var(--space-1)' }}>
              Data Residency
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              All data processing and storage within EU borders
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(236, 72, 153, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}>
              <Globe size={18} color="#EC4899" />
            </div>
            <h4 style={{ fontSize: '0.9375rem', marginBottom: 'var(--space-1)' }}>
              Legal Immunization
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              Protected from extraterritorial laws like US CLOUD Act and FISA
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)'
      }}>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-1)'
          }}>
            Total Vendors
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            {vendorsData.length}
          </div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-1)'
          }}>
            EuroStack Compliant
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#10B981'
          }}>
            {compliantCount}
          </div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-gray-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-1)'
          }}>
            Compliance Rate
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#3B82F6'
          }}>
            {Math.round((compliantCount / vendorsData.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
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
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: '36px' }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input select"
          style={{ width: '180px' }}
        >
          <option value="all">All Categories</option>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-3) var(--space-4)',
          background: showOnlyCompliant ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-gray-100)',
          border: showOnlyCompliant ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--color-gray-200)',
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}>
          <input
            type="checkbox"
            checked={showOnlyCompliant}
            onChange={(e) => setShowOnlyCompliant(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: showOnlyCompliant ? '#10B981' : 'var(--color-gray-600)'
          }}>
            EuroStack Only
          </span>
        </label>
      </div>

      {/* Vendor List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredVendors.map(vendor => {
          const compliance = checkVendorCompliance(vendor)
          const config = categoryConfig[vendor.category]
          const isExpanded = expandedVendor === vendor.id

          return (
            <div key={vendor.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Main row */}
              <div
                onClick={() => toggleVendorExpand(vendor.id)}
                style={{
                  padding: 'var(--space-5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)'
                }}
              >
                {/* Category icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: `${config.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {config.icon && <config.icon size={22} color={config.color} />}
                </div>

                {/* Vendor info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    <h4 style={{ margin: 0 }}>{vendor.name}</h4>
                    {vendor.euStackCompliant && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.125rem 0.5rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        color: '#10B981',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em'
                      }}>
                        <CheckCircle size={10} />
                        EuroStack
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-gray-600)',
                    margin: 0
                  }}>
                    {vendor.headquarters}
                  </p>
                </div>

                {/* Compliance indicators */}
                <div style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <ComplianceIcon passed={vendor.isEUHQ} />
                    <div style={{
                      fontSize: '0.625rem',
                      color: 'var(--color-gray-500)',
                      marginTop: '0.25rem'
                    }}>
                      EU HQ
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ComplianceIcon passed={vendor.foreignControlFree} />
                    <div style={{
                      fontSize: '0.625rem',
                      color: 'var(--color-gray-500)',
                      marginTop: '0.25rem'
                    }}>
                      Control
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ComplianceIcon passed={vendor.dataResident} />
                    <div style={{
                      fontSize: '0.625rem',
                      color: 'var(--color-gray-500)',
                      marginTop: '0.25rem'
                    }}>
                      Data
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ComplianceIcon passed={vendor.legallyImmunized} />
                    <div style={{
                      fontSize: '0.625rem',
                      color: 'var(--color-gray-500)',
                      marginTop: '0.25rem'
                    }}>
                      Legal
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-lg)',
                  background: compliance.score === 100
                    ? 'rgba(16, 185, 129, 0.1)'
                    : compliance.score >= 75
                    ? 'rgba(59, 130, 246, 0.1)'
                    : compliance.score >= 50
                    ? 'rgba(245, 158, 11, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: compliance.score === 100
                    ? '#10B981'
                    : compliance.score >= 75
                    ? '#3B82F6'
                    : compliance.score >= 50
                    ? '#F59E0B'
                    : '#EF4444'
                }}>
                  {compliance.score}
                </div>

                {/* Expand icon */}
                <div style={{ color: 'var(--color-gray-400)' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{
                  padding: 'var(--space-5)',
                  borderTop: '1px solid var(--color-gray-200)',
                  background: 'var(--color-gray-50)'
                }}>
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-4)'
                  }}>
                    {vendor.description}
                  </p>

                  {/* Certifications */}
                  {vendor.certifications.length > 0 && (
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-gray-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 'var(--space-2)'
                      }}>
                        Certifications
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {vendor.certifications.map((cert, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '0.25rem 0.625rem',
                              background: 'var(--color-white)',
                              border: '1px solid var(--color-gray-200)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              color: 'var(--color-gray-700)'
                            }}
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Compliance Issues */}
                  {compliance.issues.length > 0 && (
                    <div style={{
                      padding: 'var(--space-3)',
                      background: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: 'var(--radius-lg)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-2)'
                      }}>
                        <AlertTriangle size={14} color="#EF4444" />
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#DC2626'
                        }}>
                          Compliance Issues
                        </span>
                      </div>
                      <ul style={{
                        margin: 0,
                        paddingLeft: 'var(--space-5)',
                        fontSize: '0.8125rem',
                        color: '#991B1B'
                      }}>
                        {compliance.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {filteredVendors.length === 0 && (
          <div className="card" style={{
            padding: 'var(--space-12)',
            textAlign: 'center',
            background: 'var(--color-gray-50)'
          }}>
            <Filter size={48} color="var(--color-gray-300)" style={{ marginBottom: 'var(--space-4)' }} />
            <h3 style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--space-2)' }}>
              No Vendors Found
            </h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
