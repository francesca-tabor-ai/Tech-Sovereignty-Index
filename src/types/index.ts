// Core sovereignty metrics types

export interface MaterialFoundationMetrics {
  energySovereignty: number; // 0-100: Clean energy capacity for data centers
  criticalMineralsAccess: number; // 0-100: Control over lithium, cobalt, rare earths
  urbanMiningCapacity: number; // 0-100: E-waste recovery capability
}

export interface ComputeInfrastructureMetrics {
  chipIndependence: number; // 0-100: Domestic fab vs design ratio
  cloudAutonomy: number; // 0-100: % workloads on domestic clouds
  connectivityControl: number; // 0-100: Subsea cable & 5G ownership
}

export interface CognitiveLayerMetrics {
  modelSovereignty: number; // 0-100: Indigenous foundation models
  workforceCapability: number; // 0-100: Elite STEM talent availability
}

export interface JurisdictionalShieldMetrics {
  legalImmunization: number; // 0-100: Protection from extraterritorial laws
  enforcementCapability: number; // 0-100: Ability to regulate foreign tech
}

export interface SovereigntyMetrics {
  materialFoundation: MaterialFoundationMetrics;
  computeInfrastructure: ComputeInfrastructureMetrics;
  cognitiveLayer: CognitiveLayerMetrics;
  jurisdictionalShield: JurisdictionalShieldMetrics;
}

export interface CountryDependency {
  country: string;
  countryCode: string;
  sector: 'chips' | 'cloud' | 'minerals' | 'energy' | 'cables' | 'ai';
  dependencyLevel: number; // 0-100
  description: string;
}

export interface CountryData {
  id: string;
  name: string;
  code: string; // ISO 3166-1 alpha-3
  region: string;
  metrics: SovereigntyMetrics;
  overallScore: number; // 0-100 TSI score
  isSovereignPrison: boolean;
  sovereignPrisonReason?: string;
  dependencies: CountryDependency[];
  diagnosis: string;
  recommendations: Recommendation[];
  lastUpdated: string;
}

export interface Recommendation {
  category: 'procurement' | 'techStack' | 'capital' | 'reshoring' | 'resources' | 'workforce' | 'leverage' | 'dpi' | 'data';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: number; // Expected TSI improvement
}

export interface DecouplingScenario {
  id: string;
  name: string;
  description: string;
  affectedSectors: ('chips' | 'cloud' | 'minerals' | 'energy' | 'cables' | 'ai')[];
  sourceCountry: string;
  impactMultiplier: number;
}

export interface SimulationResult {
  countryId: string;
  countryName: string;
  originalScore: number;
  impactedScore: number;
  gdpImpact: number; // Percentage
  digitalUptimeImpact: number; // Percentage
  criticalVulnerabilities: string[];
}

export interface Vendor {
  id: string;
  name: string;
  headquarters: string;
  countryCode: string;
  category: 'cloud' | 'security' | 'ai' | 'infrastructure' | 'data' | 'identity';
  isEUHQ: boolean;
  foreignControlFree: boolean;
  dataResident: boolean;
  legallyImmunized: boolean;
  euStackCompliant: boolean;
  description: string;
  certifications: string[];
}

export type LayerWeight = {
  materialFoundation: number;
  computeInfrastructure: number;
  cognitiveLayer: number;
  jurisdictionalShield: number;
};

export const LAYER_WEIGHTS: LayerWeight = {
  materialFoundation: 0.30,
  computeInfrastructure: 0.30,
  cognitiveLayer: 0.20,
  jurisdictionalShield: 0.20,
};

export type ScoreCategory = 'sovereign' | 'resilient' | 'vulnerable' | 'dependent' | 'critical';

export function getScoreCategory(score: number): ScoreCategory {
  if (score >= 80) return 'sovereign';
  if (score >= 60) return 'resilient';
  if (score >= 40) return 'vulnerable';
  if (score >= 20) return 'dependent';
  return 'critical';
}

export function getScoreCategoryColor(category: ScoreCategory): string {
  switch (category) {
    case 'sovereign': return '#10B981';
    case 'resilient': return '#3B82F6';
    case 'vulnerable': return '#F59E0B';
    case 'dependent': return '#F97316';
    case 'critical': return '#EF4444';
  }
}
