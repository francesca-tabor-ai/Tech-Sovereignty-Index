import { SovereigntyMetrics, LAYER_WEIGHTS } from '../types'
import {
  calculateMaterialFoundationScore,
  calculateComputeInfrastructureScore,
  calculateCognitiveLayerScore,
  calculateJurisdictionalShieldScore
} from '../utils/scoring'
import { Zap, Cpu, Brain, Shield } from 'lucide-react'

interface LayerBreakdownProps {
  metrics: SovereigntyMetrics
  compact?: boolean
}

const layerConfig = [
  {
    key: 'materialFoundation',
    label: 'Material Foundation',
    icon: Zap,
    weight: LAYER_WEIGHTS.materialFoundation,
    color: '#F59E0B',
    metrics: [
      { key: 'energySovereignty', label: 'Energy Sovereignty' },
      { key: 'criticalMineralsAccess', label: 'Critical Minerals' },
      { key: 'urbanMiningCapacity', label: 'Urban Mining' }
    ]
  },
  {
    key: 'computeInfrastructure',
    label: 'Compute & Infrastructure',
    icon: Cpu,
    weight: LAYER_WEIGHTS.computeInfrastructure,
    color: '#3B82F6',
    metrics: [
      { key: 'chipIndependence', label: 'Chip Independence' },
      { key: 'cloudAutonomy', label: 'Cloud Autonomy' },
      { key: 'connectivityControl', label: 'Connectivity Control' }
    ]
  },
  {
    key: 'cognitiveLayer',
    label: 'Cognitive Layer',
    icon: Brain,
    weight: LAYER_WEIGHTS.cognitiveLayer,
    color: '#8B5CF6',
    metrics: [
      { key: 'modelSovereignty', label: 'Model Sovereignty' },
      { key: 'workforceCapability', label: 'Workforce Capability' }
    ]
  },
  {
    key: 'jurisdictionalShield',
    label: 'Jurisdictional Shield',
    icon: Shield,
    weight: LAYER_WEIGHTS.jurisdictionalShield,
    color: '#10B981',
    metrics: [
      { key: 'legalImmunization', label: 'Legal Immunization' },
      { key: 'enforcementCapability', label: 'Enforcement Capability' }
    ]
  }
]

const calculateLayerScore = (key: string, metrics: SovereigntyMetrics): number => {
  switch (key) {
    case 'materialFoundation':
      return Math.round(calculateMaterialFoundationScore(metrics.materialFoundation))
    case 'computeInfrastructure':
      return Math.round(calculateComputeInfrastructureScore(metrics.computeInfrastructure))
    case 'cognitiveLayer':
      return Math.round(calculateCognitiveLayerScore(metrics.cognitiveLayer))
    case 'jurisdictionalShield':
      return Math.round(calculateJurisdictionalShieldScore(metrics.jurisdictionalShield))
    default:
      return 0
  }
}

export default function LayerBreakdown({ metrics, compact = false }: LayerBreakdownProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '0.75rem' : '1.5rem' }}>
      {layerConfig.map((layer) => {
        const Icon = layer.icon
        const score = calculateLayerScore(layer.key, metrics)
        const layerMetrics = metrics[layer.key as keyof SovereigntyMetrics] as unknown as Record<string, number>

        return (
          <div key={layer.key}>
            {/* Layer header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: compact ? '0.375rem' : '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: compact ? '24px' : '32px',
                  height: compact ? '24px' : '32px',
                  borderRadius: 'var(--radius-md)',
                  background: `${layer.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={compact ? 14 : 18} color={layer.color} />
                </div>
                <div>
                  <div style={{
                    fontSize: compact ? '0.8125rem' : '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--color-gray-900)'
                  }}>
                    {layer.label}
                  </div>
                  <div style={{
                    fontSize: '0.6875rem',
                    color: 'var(--color-gray-500)'
                  }}>
                    {Math.round(layer.weight * 100)}% weight
                  </div>
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? '1rem' : '1.25rem',
                fontWeight: 600,
                color: layer.color
              }}>
                {score}
              </div>
            </div>

            {/* Layer progress bar */}
            <div style={{
              height: compact ? '6px' : '8px',
              background: 'var(--color-gray-200)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              marginBottom: compact ? '0.5rem' : '0.75rem'
            }}>
              <div style={{
                height: '100%',
                width: `${score}%`,
                background: layer.color,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.5s ease'
              }} />
            </div>

            {/* Sub-metrics */}
            {!compact && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${layer.metrics.length}, 1fr)`,
                gap: '0.75rem'
              }}>
                {layer.metrics.map((metric) => (
                  <div
                    key={metric.key}
                    style={{
                      padding: '0.75rem',
                      background: 'var(--color-gray-50)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-gray-500)',
                      marginBottom: '0.25rem'
                    }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-gray-900)'
                    }}>
                      {layerMetrics[metric.key]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
