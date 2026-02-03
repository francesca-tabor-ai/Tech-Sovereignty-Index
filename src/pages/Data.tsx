import { useState } from 'react'
import {
  Database, Globe, Cpu, Shield, FileText, ExternalLink,
  ChevronDown, ChevronUp, Mail, Send, BookOpen, Clock, Users, GitBranch
} from 'lucide-react'

// Data source categories with their sources
const dataSourceCategories = [
  {
    id: 'infrastructure',
    name: 'Infrastructure & Connectivity',
    icon: Globe,
    color: '#3B82F6',
    sources: [
      {
        name: 'ITU ICT Development Index',
        description: 'Global connectivity and telecommunications infrastructure metrics',
        publisher: 'International Telecommunication Union (ITU)',
        url: 'https://www.itu.int/en/ITU-D/Statistics/Pages/IDI/default.aspx',
        lastUpdated: '2024'
      },
      {
        name: 'Submarine Cable Map',
        description: 'Global submarine cable infrastructure data',
        publisher: 'TeleGeography',
        url: 'https://www.submarinecablemap.com/',
        lastUpdated: '2025'
      },
      {
        name: 'World Bank Digital Development Indicators',
        description: 'Internet penetration, mobile subscriptions, and digital infrastructure',
        publisher: 'World Bank',
        url: 'https://data.worldbank.org/topic/infrastructure',
        lastUpdated: '2024'
      }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Compute',
    icon: Database,
    color: '#8B5CF6',
    sources: [
      {
        name: 'Synergy Research Group Cloud Market Data',
        description: 'Cloud infrastructure market share and data center locations',
        publisher: 'Synergy Research Group',
        url: 'https://www.srgresearch.com/',
        lastUpdated: '2024'
      },
      {
        name: 'Data Center Map',
        description: 'Global data center locations and colocation facilities',
        publisher: 'Data Center Map',
        url: 'https://www.datacentermap.com/',
        lastUpdated: '2025'
      },
      {
        name: 'Cloudscene Data Center Index',
        description: 'Data center density and cloud connectivity by country',
        publisher: 'Cloudscene',
        url: 'https://cloudscene.com/',
        lastUpdated: '2024'
      }
    ]
  },
  {
    id: 'semiconductors',
    name: 'Semiconductors & Hardware',
    icon: Cpu,
    color: '#F59E0B',
    sources: [
      {
        name: 'Semiconductor Industry Association Reports',
        description: 'Global semiconductor production, trade flows, and market share',
        publisher: 'Semiconductor Industry Association (SIA)',
        url: 'https://www.semiconductors.org/resources/',
        lastUpdated: '2024'
      },
      {
        name: 'WSTS Semiconductor Market Data',
        description: 'Worldwide semiconductor trade statistics',
        publisher: 'World Semiconductor Trade Statistics',
        url: 'https://www.wsts.org/',
        lastUpdated: '2024'
      },
      {
        name: 'IC Insights Fab Data',
        description: 'Semiconductor fabrication capacity by country and node',
        publisher: 'IC Insights',
        url: 'https://www.icinsights.com/',
        lastUpdated: '2024'
      }
    ]
  },
  {
    id: 'governance',
    name: 'Data Governance & Regulation',
    icon: Shield,
    color: '#10B981',
    sources: [
      {
        name: 'DLA Piper Data Protection Laws of the World',
        description: 'Comprehensive mapping of data protection legislation globally',
        publisher: 'DLA Piper',
        url: 'https://www.dlapiperdataprotection.com/',
        lastUpdated: '2024'
      },
      {
        name: 'Freedom House Freedom on the Net',
        description: 'Internet freedom and digital rights assessments',
        publisher: 'Freedom House',
        url: 'https://freedomhouse.org/report/freedom-net',
        lastUpdated: '2024'
      },
      {
        name: 'UNCTAD Data Protection Legislation Tracker',
        description: 'Global status of data protection and privacy legislation',
        publisher: 'United Nations Conference on Trade and Development',
        url: 'https://unctad.org/page/data-protection-and-privacy-legislation-worldwide',
        lastUpdated: '2024'
      }
    ]
  },
  {
    id: 'trade',
    name: 'Digital Trade & Dependencies',
    icon: FileText,
    color: '#EF4444',
    sources: [
      {
        name: 'UN Comtrade Database',
        description: 'International trade statistics for technology goods',
        publisher: 'United Nations',
        url: 'https://comtradeplus.un.org/',
        lastUpdated: '2024'
      },
      {
        name: 'OECD Digital Trade Indicators',
        description: 'Cross-border data flows and digital services trade',
        publisher: 'Organisation for Economic Co-operation and Development',
        url: 'https://www.oecd.org/digital/ieconomy/measuring-digital-trade.htm',
        lastUpdated: '2024'
      },
      {
        name: 'USGS Mineral Commodity Summaries',
        description: 'Critical minerals production and trade data',
        publisher: 'U.S. Geological Survey',
        url: 'https://www.usgs.gov/centers/national-minerals-information-center/mineral-commodity-summaries',
        lastUpdated: '2024'
      }
    ]
  },
  {
    id: 'energy',
    name: 'Energy & Critical Minerals',
    icon: Globe,
    color: '#6366F1',
    sources: [
      {
        name: 'IEA World Energy Outlook',
        description: 'Energy production, consumption, and sovereignty data',
        publisher: 'International Energy Agency',
        url: 'https://www.iea.org/reports/world-energy-outlook-2024',
        lastUpdated: '2024'
      },
      {
        name: 'Critical Raw Materials Alliance Data',
        description: 'Critical minerals supply chain and dependency analysis',
        publisher: 'Critical Raw Materials Alliance',
        url: 'https://www.crmalliance.eu/',
        lastUpdated: '2024'
      },
      {
        name: 'European Commission Critical Raw Materials Assessment',
        description: 'EU critical raw materials supply risk assessments',
        publisher: 'European Commission',
        url: 'https://single-market-economy.ec.europa.eu/sectors/raw-materials/areas-specific-interest/critical-raw-materials_en',
        lastUpdated: '2024'
      }
    ]
  }
]

// Contribution types for the form
const contributionTypes = [
  { value: 'correction', label: 'Data correction' },
  { value: 'new-source', label: 'New data source' },
  { value: 'methodology', label: 'Methodology feedback' },
  { value: 'other', label: 'Other' }
]

// Changelog entries
const changelog = [
  {
    date: '2025-01-15',
    version: '1.0',
    changes: [
      'Initial release of Tech Sovereignty Index',
      'Coverage of 25 major economies',
      'Four-layer scoring methodology implemented'
    ]
  },
  {
    date: '2025-02-01',
    version: '1.1',
    changes: [
      'Added individual EU member state profiles',
      'Expanded to 60+ countries including Latin America and Africa',
      'Added Greenland and New Zealand'
    ]
  }
]

// Contributors (acknowledged)
const contributors = [
  { name: 'Francesca Tabor', role: 'Lead Researcher & Maintainer' }
]

export default function Data() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['infrastructure'])
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    contributionType: 'correction',
    countryRegion: '',
    description: '',
    sourceLinks: '',
    additionalNotes: ''
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateMailtoLink = () => {
    const subject = encodeURIComponent('Tech Sovereignty Index – Data Contribution')
    const body = encodeURIComponent(`Name: ${formData.name || 'Not provided'}
Organization: ${formData.organization || 'Not provided'}
Email: ${formData.email || 'Not provided'}

Type of Contribution: ${contributionTypes.find(t => t.value === formData.contributionType)?.label || formData.contributionType}
Country / Region: ${formData.countryRegion || 'Not specified'}

Description of Contribution:
${formData.description || 'Not provided'}

Source Link(s):
${formData.sourceLinks || 'Not provided'}

Additional Notes:
${formData.additionalNotes || 'None'}`)

    return `mailto:francesca.tabor.politics@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = generateMailtoLink()
  }

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--color-blue-500), var(--color-purple-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Database size={24} color="white" />
          </div>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>Data Sources & Contributions</h1>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              Transparency, methodology, and how to contribute
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="card card-lg" style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem' }}>About Our Data</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--color-gray-700)' }}>
          The Tech Sovereignty Index is built on publicly available, verifiable data from a range of
          international and national sources. We aggregate indicators across infrastructure, compute,
          semiconductors, governance, and trade to create a comprehensive view of each nation's
          technological independence.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--color-gray-700)', marginTop: 'var(--space-4)' }}>
          This page documents those sources and explains how to contribute corrections or additional data.
          The index is updated quarterly, with data sources reviewed and refreshed to reflect the
          latest available information.
        </p>
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--color-blue-50)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--color-blue-500)'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-blue-800)', margin: 0 }}>
            <strong>Transparency commitment:</strong> All data sources are publicly accessible.
            We welcome scrutiny, corrections, and suggestions for improvement.
          </p>
        </div>
      </section>

      {/* Data Sources Section */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>Data Sources</h2>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Click on each category to view the specific data sources used.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {dataSourceCategories.map((category) => {
            const Icon = category.icon
            const isExpanded = expandedCategories.includes(category.id)

            return (
              <div
                key={category.id}
                className="card"
                style={{ overflow: 'hidden' }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: `${category.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={18} color={category.color} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-gray-900)' }}>
                        {category.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                        {category.sources.length} sources
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={20} color="var(--color-gray-400)" />
                  ) : (
                    <ChevronDown size={20} color="var(--color-gray-400)" />
                  )}
                </button>

                {isExpanded && (
                  <div style={{
                    borderTop: '1px solid var(--color-gray-200)',
                    padding: 'var(--space-4)'
                  }}>
                    {category.sources.map((source, index) => (
                      <div
                        key={source.name}
                        style={{
                          padding: 'var(--space-4)',
                          background: index % 2 === 0 ? 'var(--color-gray-50)' : 'transparent',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: index < category.sources.length - 1 ? 'var(--space-2)' : 0
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontWeight: 600,
                              color: 'var(--color-gray-900)',
                              marginBottom: 'var(--space-1)'
                            }}>
                              {source.name}
                            </div>
                            <div style={{
                              fontSize: '0.875rem',
                              color: 'var(--color-gray-600)',
                              marginBottom: 'var(--space-2)'
                            }}>
                              {source.description}
                            </div>
                            <div className="flex items-center gap-4" style={{ fontSize: '0.75rem' }}>
                              <span style={{ color: 'var(--color-gray-500)' }}>
                                {source.publisher}
                              </span>
                              <span style={{ color: 'var(--color-gray-400)' }}>•</span>
                              <span style={{ color: 'var(--color-gray-500)' }}>
                                Updated {source.lastUpdated}
                              </span>
                            </div>
                          </div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.75rem',
                              color: 'var(--color-blue-600)',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            View source
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Methodology Reference */}
      <section className="card card-lg" style={{ marginBottom: 'var(--space-10)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <BookOpen size={20} color="var(--color-purple-600)" />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Methodology Reference</h2>
        </div>
        <p style={{ lineHeight: 1.7, color: 'var(--color-gray-700)', marginBottom: 'var(--space-4)' }}>
          The Tech Sovereignty Index uses a four-layer scoring methodology:
        </p>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)'
        }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F59E0B'
            }} />
            <span><strong>Material Foundation (30%)</strong> — Energy, minerals, urban mining</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#3B82F6'
            }} />
            <span><strong>Compute & Infrastructure (30%)</strong> — Chips, cloud, connectivity</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#8B5CF6'
            }} />
            <span><strong>Cognitive Layer (20%)</strong> — AI models, workforce capability</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981'
            }} />
            <span><strong>Jurisdictional Shield (20%)</strong> — Legal immunity, enforcement</span>
          </li>
        </ul>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <a
            href="/methodology"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--color-purple-600)',
              fontWeight: 500,
              textDecoration: 'none'
            }}
          >
            View full methodology
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Changelog Section */}
      <section className="card card-lg" style={{ marginBottom: 'var(--space-10)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <Clock size={20} color="var(--color-blue-600)" />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Data Changelog</h2>
        </div>
        <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
          Track updates and changes to the index data.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {changelog.map((entry) => (
            <div
              key={entry.version}
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--color-blue-500)'
              }}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-blue-600)',
                  background: 'var(--color-blue-100)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  v{entry.version}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: 'var(--space-5)',
                color: 'var(--color-gray-700)',
                fontSize: '0.875rem'
              }}>
                {entry.changes.map((change, i) => (
                  <li key={i} style={{ marginBottom: 'var(--space-1)' }}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contributors Section */}
      <section className="card card-lg" style={{ marginBottom: 'var(--space-10)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <Users size={20} color="var(--color-green-600)" />
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Contributors</h2>
        </div>
        <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
          Thank you to everyone who has contributed to improving the index.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          {contributors.map((contributor) => (
            <div
              key={contributor.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: 'var(--color-gray-100)',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-green-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {contributor.name.charAt(0)}
              </div>
              <div>
                <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{contributor.name}</span>
                <span style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', marginLeft: 'var(--space-2)' }}>
                  {contributor.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future: GitHub Contributions */}
      <section className="card" style={{
        marginBottom: 'var(--space-10)',
        background: 'var(--color-gray-50)',
        border: '1px dashed var(--color-gray-300)'
      }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-2)' }}>
          <GitBranch size={18} color="var(--color-gray-500)" />
          <span style={{ fontWeight: 500, color: 'var(--color-gray-700)' }}>
            Coming Soon: GitHub Contributions
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', margin: 0 }}>
          We're working on enabling GitHub-based contributions for more technical users.
          This will allow direct pull requests for data corrections and additions.
        </p>
      </section>

      {/* Data Contributions Section */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Contribute Data</h2>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          We welcome contributions to improve the accuracy and coverage of the index.
          You can submit data corrections, suggest new sources, or provide methodology feedback.
        </p>

        <div className="card card-lg">
          <div style={{
            marginBottom: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'var(--color-amber-50)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '4px solid var(--color-amber-500)'
          }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-amber-800)', margin: 0 }}>
              <strong>Note:</strong> All submissions are reviewed by our research team.
              Inclusion is not guaranteed, and we may contact you for clarification.
              Contributors who provide accepted data will be acknowledged on this page.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-gray-700)'
                }}>
                  Name <span style={{ color: 'var(--color-gray-400)' }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-gray-700)'
                }}>
                  Organization <span style={{ color: 'var(--color-gray-400)' }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Your organization"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-gray-700)'
                }}>
                  Email <span style={{ color: 'var(--color-gray-400)' }}>(recommended)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-gray-700)'
                }}>
                  Type of Contribution
                </label>
                <select
                  name="contributionType"
                  value={formData.contributionType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--color-gray-300)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    background: 'white'
                  }}
                >
                  {contributionTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: 'var(--space-2)',
                color: 'var(--color-gray-700)'
              }}>
                Country / Region <span style={{ color: 'var(--color-gray-400)' }}>(optional)</span>
              </label>
              <input
                type="text"
                name="countryRegion"
                value={formData.countryRegion}
                onChange={handleInputChange}
                placeholder="e.g., Germany, Sub-Saharan Africa, Global"
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: 'var(--space-2)',
                color: 'var(--color-gray-700)'
              }}>
                Description of Contribution <span style={{ color: 'var(--color-red-500)' }}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your contribution, correction, or suggestion..."
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: 'var(--space-2)',
                color: 'var(--color-gray-700)'
              }}>
                Source Link(s) <span style={{ color: 'var(--color-gray-400)' }}>(required for data submissions)</span>
              </label>
              <textarea
                name="sourceLinks"
                value={formData.sourceLinks}
                onChange={handleInputChange}
                placeholder="https://example.com/data-source&#10;https://another-source.org/report"
                rows={2}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: 'var(--space-2)',
                color: 'var(--color-gray-700)'
              }}>
                Additional Notes <span style={{ color: 'var(--color-gray-400)' }}>(optional)</span>
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any additional context or information..."
                rows={2}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)'
            }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--color-gray-500)',
                margin: 0,
                maxWidth: '400px'
              }}>
                <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Submitted information will only be used to evaluate data contributions.
              </p>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-blue-600)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
                Submit via Email
              </button>
            </div>
          </form>

          <div style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', margin: 0 }}>
              Your email client should open with a pre-filled message. If it does not, please email us directly at{' '}
              <a
                href="mailto:francesca.tabor.politics@gmail.com"
                style={{ color: 'var(--color-blue-600)' }}
              >
                francesca.tabor.politics@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
