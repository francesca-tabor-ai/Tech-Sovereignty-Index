import { LAYER_WEIGHTS } from '../types'
import {
  Zap, Cpu, Brain, Shield, BookOpen, Calculator,
  Database, FileText, Github
} from 'lucide-react'

const layers = [
  {
    name: 'Material Foundation',
    weight: LAYER_WEIGHTS.materialFoundation,
    icon: Zap,
    color: '#F59E0B',
    description: 'The physical substrate of digital sovereignty—energy and raw materials.',
    metrics: [
      {
        name: 'Energy Sovereignty',
        weight: 0.4,
        description: 'Measures access to cheap, non-intermittent power (nuclear/renewables) dedicated to AI data centers. Higher scores for nations with energy independence and clean energy capacity.',
        sources: ['IEA Energy Statistics', 'National Energy Reports', 'Data Center Industry Analysis']
      },
      {
        name: 'Critical Minerals Access',
        weight: 0.35,
        description: 'Control over mining and refining of lithium, cobalt, and rare earths required for hardware manufacturing.',
        sources: ['USGS Mineral Commodity Summaries', 'EU Critical Raw Materials Report', 'Mining Industry Data']
      },
      {
        name: 'Urban Mining Capacity',
        weight: 0.25,
        description: 'Capacity to recover critical metals (gold, cobalt, copper) from e-waste to mitigate supply shocks.',
        sources: ['UN E-Waste Monitor', 'National Recycling Statistics', 'Circular Economy Reports']
      }
    ]
  },
  {
    name: 'Compute & Infrastructure',
    weight: LAYER_WEIGHTS.computeInfrastructure,
    icon: Cpu,
    color: '#3B82F6',
    description: 'The hardware and networks that process and transmit digital information.',
    metrics: [
      {
        name: 'Chip Independence',
        weight: 0.45,
        description: 'Ratio of domestic fabrication versus design capability. Distinguishes between designing chips and manufacturing them domestically.',
        sources: ['SIA Semiconductor Industry Data', 'SEMI Market Reports', 'National Industrial Statistics']
      },
      {
        name: 'Cloud Autonomy',
        weight: 0.35,
        description: 'Percentage of critical government and enterprise workloads running on domestic hyperscalers versus foreign providers.',
        sources: ['Synergy Research Group', 'IDC Cloud Market Reports', 'Government IT Spending Data']
      },
      {
        name: 'Connectivity Control',
        weight: 0.20,
        description: 'Ownership of subsea cables and 5G networks versus leasing foreign capacity.',
        sources: ['TeleGeography Submarine Cable Map', 'ITU Statistics', 'National Telecom Regulators']
      }
    ]
  },
  {
    name: 'Cognitive Layer',
    weight: LAYER_WEIGHTS.cognitiveLayer,
    icon: Brain,
    color: '#8B5CF6',
    description: 'Indigenous AI capability and the talent to develop and maintain it.',
    metrics: [
      {
        name: 'Model Sovereignty',
        weight: 0.55,
        description: 'Existence of indigenous Foundation Models (LLMs) trained on local linguistic and cultural data.',
        sources: ['AI Index Report (Stanford HAI)', 'National AI Strategy Documents', 'Research Publication Analysis']
      },
      {
        name: 'Workforce Capability',
        weight: 0.45,
        description: 'Availability of elite STEM talent to maintain systems without foreign assistance.',
        sources: ['OECD Education Statistics', 'QS World University Rankings', 'National STEM Workforce Data']
      }
    ]
  },
  {
    name: 'Jurisdictional Shield',
    weight: LAYER_WEIGHTS.jurisdictionalShield,
    icon: Shield,
    color: '#10B981',
    description: 'Legal frameworks that protect against external interference.',
    metrics: [
      {
        name: 'Legal Immunization',
        weight: 0.50,
        description: 'Protection against extraterritorial laws (e.g., US FISA/CLOUD Act) that allow foreign governments to access domestic data.',
        sources: ['National Data Protection Laws', 'International Trade Agreements', 'Legal Scholar Analysis']
      },
      {
        name: 'Enforcement Capability',
        weight: 0.50,
        description: 'Ability to effectively ban or regulate foreign apps and hardware when necessary.',
        sources: ['Regulatory Actions Database', 'Trade Restriction Analysis', 'Government Enforcement Records']
      }
    ]
  }
]

export default function Methodology() {
  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <header style={{ marginBottom: 'var(--space-12)' }}>
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
            <BookOpen size={24} color="white" />
          </div>
          <h1>Methodology</h1>
        </div>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
          The Tech Sovereignty Index (TSI) evaluates a nation's ability to control its entire
          technological value chain—from atoms to algorithms. This document explains our
          "Full-Stack Control" framework and scoring methodology.
        </p>
      </header>

      {/* Principles */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Core Principles</h2>
        <div className="card card-lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Beyond Data Residency</h4>
              <p style={{ lineHeight: 1.7 }}>
                Traditional metrics focus narrowly on where data is stored. The TSI recognizes that true
                sovereignty requires control over the entire technology stack—from the minerals mined to
                build hardware, to the AI models that process information, to the legal frameworks that
                protect against external interference.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Full-Stack Control</h4>
              <p style={{ lineHeight: 1.7 }}>
                We assess sovereignty across four interdependent layers: material foundation,
                compute infrastructure, cognitive capability, and jurisdictional protection.
                Weakness in any layer creates vulnerabilities that can be exploited through
                supply chain disruption, technological dependence, or legal coercion.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Sovereign Prison Detection</h4>
              <p style={{ lineHeight: 1.7 }}>
                A nation can have strong data protection laws yet remain vulnerable if its data
                is processed by foreign-owned, closed-source technology. We identify these
                "Sovereign Prisons"—nations that appear sovereign but remain susceptible to
                kill switches, sanctions, and extraterritorial legal demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Layers */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>Scoring Layers</h2>

        {layers.map((layer) => (
          <div
            key={layer.name}
            className="card card-lg"
            style={{ marginBottom: 'var(--space-4)' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                background: `${layer.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <layer.icon size={24} color={layer.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <h3 style={{ margin: 0 }}>{layer.name}</h3>
                  <span style={{
                    padding: '0.25rem 0.625rem',
                    background: `${layer.color}15`,
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: layer.color
                  }}>
                    {Math.round(layer.weight * 100)}% Weight
                  </span>
                </div>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{layer.description}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {layer.metrics.map((metric) => (
                <div
                  key={metric.name}
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--color-gray-50)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <h4 style={{ fontSize: '0.9375rem', margin: 0 }}>{metric.name}</h4>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-gray-500)'
                    }}>
                      {Math.round(metric.weight * 100)}% of layer
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-3)'
                  }}>
                    {metric.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.375rem'
                  }}>
                    {metric.sources.map((source, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: 'var(--color-white)',
                          border: '1px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.6875rem',
                          color: 'var(--color-gray-600)'
                        }}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Calculation */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Score Calculation</h2>
        <div className="card card-lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)'
          }}>
            <Calculator size={20} color="var(--color-blue-500)" />
            <h3 style={{ margin: 0 }}>Formula</h3>
          </div>

          <div style={{
            padding: 'var(--space-5)',
            background: 'var(--color-gray-900)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-6)'
          }}>
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-gray-100)',
              lineHeight: 1.8
            }}>
              <span style={{ color: '#8B5CF6' }}>TSI</span> = (<span style={{ color: '#F59E0B' }}>Material</span> × 0.30) + (<span style={{ color: '#3B82F6' }}>Compute</span> × 0.30) + (<span style={{ color: '#8B5CF6' }}>Cognitive</span> × 0.20) + (<span style={{ color: '#10B981' }}>Jurisdictional</span> × 0.20)
            </code>
          </div>

          <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            Each layer score (0-100) is calculated as the weighted average of its component metrics.
            The final TSI is the weighted sum of all layer scores, producing a value between 0 and 100.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'var(--space-3)'
          }}>
            {[
              { label: 'Sovereign', range: '80-100', color: '#10B981' },
              { label: 'Resilient', range: '60-79', color: '#3B82F6' },
              { label: 'Vulnerable', range: '40-59', color: '#F59E0B' },
              { label: 'Dependent', range: '20-39', color: '#F97316' },
              { label: 'Critical', range: '0-19', color: '#EF4444' }
            ].map(cat => (
              <div
                key={cat.label}
                style={{
                  padding: 'var(--space-3)',
                  background: `${cat.color}10`,
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontWeight: 600,
                  color: cat.color,
                  marginBottom: 'var(--space-1)'
                }}>
                  {cat.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-600)'
                }}>
                  {cat.range}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Data Sources & Updates</h2>
        <div className="card card-lg">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-6)'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <Database size={18} color="var(--color-blue-500)" />
                <h4 style={{ margin: 0 }}>Primary Sources</h4>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: 'var(--space-5)',
                lineHeight: 2
              }}>
                <li>International Energy Agency (IEA)</li>
                <li>US Geological Survey (USGS)</li>
                <li>Semiconductor Industry Association (SIA)</li>
                <li>Stanford HAI AI Index</li>
                <li>OECD Digital Economy Reports</li>
                <li>ITU ICT Development Index</li>
                <li>National Statistical Offices</li>
              </ul>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <FileText size={18} color="var(--color-purple-500)" />
                <h4 style={{ margin: 0 }}>Update Schedule</h4>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: 'var(--space-5)',
                lineHeight: 2
              }}>
                <li>Full index refresh: Quarterly</li>
                <li>Major policy changes: Within 30 days</li>
                <li>Scenario models: Continuously updated</li>
                <li>Vendor database: Monthly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Open Source & Transparency</h2>
        <div className="card card-lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)'
          }}>
            <Github size={20} color="var(--color-gray-700)" />
            <h4 style={{ margin: 0 }}>Algorithm Transparency</h4>
          </div>
          <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
            The Tech Sovereignty Index scoring algorithm is open source to ensure transparency
            and allow external verification. We welcome contributions, critiques, and suggestions
            for improving our methodology.
          </p>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>
              <strong>Principles:</strong> We believe that any index purporting to measure
              sovereignty must itself be transparent and resistant to manipulation. Our open-source
              approach embodies the sovereignty principles we evaluate.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
