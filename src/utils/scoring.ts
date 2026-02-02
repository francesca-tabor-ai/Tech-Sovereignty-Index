import {
  SovereigntyMetrics,
  CountryData,
  LAYER_WEIGHTS,
  Recommendation,
  MaterialFoundationMetrics,
  ComputeInfrastructureMetrics,
  CognitiveLayerMetrics,
  JurisdictionalShieldMetrics
} from '../types';

// Calculate layer scores
export function calculateMaterialFoundationScore(metrics: MaterialFoundationMetrics): number {
  return (
    metrics.energySovereignty * 0.4 +
    metrics.criticalMineralsAccess * 0.35 +
    metrics.urbanMiningCapacity * 0.25
  );
}

export function calculateComputeInfrastructureScore(metrics: ComputeInfrastructureMetrics): number {
  return (
    metrics.chipIndependence * 0.45 +
    metrics.cloudAutonomy * 0.35 +
    metrics.connectivityControl * 0.20
  );
}

export function calculateCognitiveLayerScore(metrics: CognitiveLayerMetrics): number {
  return (
    metrics.modelSovereignty * 0.55 +
    metrics.workforceCapability * 0.45
  );
}

export function calculateJurisdictionalShieldScore(metrics: JurisdictionalShieldMetrics): number {
  return (
    metrics.legalImmunization * 0.50 +
    metrics.enforcementCapability * 0.50
  );
}

// Calculate overall Tech Sovereignty Index
export function calculateTSI(metrics: SovereigntyMetrics): number {
  const materialScore = calculateMaterialFoundationScore(metrics.materialFoundation);
  const computeScore = calculateComputeInfrastructureScore(metrics.computeInfrastructure);
  const cognitiveScore = calculateCognitiveLayerScore(metrics.cognitiveLayer);
  const jurisdictionalScore = calculateJurisdictionalShieldScore(metrics.jurisdictionalShield);

  return Math.round(
    materialScore * LAYER_WEIGHTS.materialFoundation +
    computeScore * LAYER_WEIGHTS.computeInfrastructure +
    cognitiveScore * LAYER_WEIGHTS.cognitiveLayer +
    jurisdictionalScore * LAYER_WEIGHTS.jurisdictionalShield
  );
}

// Determine if country is a "Sovereign Prison"
export function checkSovereignPrison(metrics: SovereigntyMetrics): { is: boolean; reason?: string } {
  const jurisdictionalScore = calculateJurisdictionalShieldScore(metrics.jurisdictionalShield);
  const computeScore = calculateComputeInfrastructureScore(metrics.computeInfrastructure);
  const cognitiveScore = calculateCognitiveLayerScore(metrics.cognitiveLayer);

  // High data residency laws but dependent on foreign tech
  if (jurisdictionalScore > 60 && computeScore < 40) {
    return {
      is: true,
      reason: 'Data legally stored locally but processed by foreign-owned closed-source technology. Vulnerable to kill switches and sanctions.'
    };
  }

  // High legal protection but no indigenous AI
  if (jurisdictionalScore > 60 && cognitiveScore < 30) {
    return {
      is: true,
      reason: 'Strong data protection laws but reliant on foreign AI models. Cognitive sovereignty gap creates dependency despite legal frameworks.'
    };
  }

  return { is: false };
}

// Generate diagnosis based on scores
export function generateDiagnosis(metrics: SovereigntyMetrics): string {
  const jurisdictionalScore = calculateJurisdictionalShieldScore(metrics.jurisdictionalShield);
  const computeScore = calculateComputeInfrastructureScore(metrics.computeInfrastructure);
  const materialScore = calculateMaterialFoundationScore(metrics.materialFoundation);
  const cognitiveScore = calculateCognitiveLayerScore(metrics.cognitiveLayer);

  // EU-style: High regulation, low infrastructure
  if (jurisdictionalScore > 65 && computeScore < 45) {
    return 'Regulatory Superpower, Technological Vassal';
  }

  // USA-style: High innovation, supply chain risk
  if (computeScore > 60 && materialScore < 50) {
    return 'Innovation Leader, Manufacturing Fragility';
  }

  // China-style: High self-sufficiency drive
  if (computeScore > 55 && jurisdictionalScore > 70 && materialScore > 60) {
    return 'Sovereign Fortress, Global Isolation Risk';
  }

  // India-style: Rising capability, strategic positioning
  if (cognitiveScore > 45 && computeScore > 35 && computeScore < 60) {
    return 'Rising Capability, Strategic Non-Alignment';
  }

  // Taiwan/Korea: Manufacturing hub, geopolitical risk
  if (computeScore > 75 && jurisdictionalScore < 50) {
    return 'Manufacturing Powerhouse, Geopolitical Exposure';
  }

  // General emerging
  if (calculateTSI(metrics) < 35) {
    return 'Emerging Digital Economy, Infrastructure Development Phase';
  }

  return 'Balanced Development, Optimization Opportunities';
}

// Generate recommendations based on metrics
export function generateRecommendations(metrics: SovereigntyMetrics): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const jurisdictionalScore = calculateJurisdictionalShieldScore(metrics.jurisdictionalShield);
  const computeScore = calculateComputeInfrastructureScore(metrics.computeInfrastructure);
  const materialScore = calculateMaterialFoundationScore(metrics.materialFoundation);
  const cognitiveScore = calculateCognitiveLayerScore(metrics.cognitiveLayer);

  // Scenario A: High Jurisdictional / Low Infrastructure (EU-style)
  if (jurisdictionalScore > 60 && computeScore < 50) {
    recommendations.push({
      category: 'procurement',
      title: 'Implement Sovereign Procurement Mandate',
      description: 'Require public sector digital procurement to prioritize domestic vendors, redirecting capital to local technology providers.',
      priority: 'critical',
      estimatedImpact: 8
    });
    recommendations.push({
      category: 'techStack',
      title: 'Adopt Federated Cloud Architecture',
      description: 'Shift from proprietary hyperscalers to open-source, federated cloud architectures to prevent vendor lock-in.',
      priority: 'high',
      estimatedImpact: 6
    });
    recommendations.push({
      category: 'capital',
      title: 'Redirect Sovereign Tech Investment',
      description: 'Direct funding toward native cloud providers rather than subsidizing foreign R&D through contracts.',
      priority: 'high',
      estimatedImpact: 5
    });
  }

  // Scenario B: High Infrastructure / High Supply Chain Risk (USA-style)
  if (computeScore > 55 && materialScore < 55) {
    recommendations.push({
      category: 'reshoring',
      title: 'Accelerate Semiconductor Reshoring',
      description: 'Use tariffs and subsidies to force repatriation of semiconductor manufacturing capacity.',
      priority: 'critical',
      estimatedImpact: 10
    });
    recommendations.push({
      category: 'resources',
      title: 'Secure Critical Mineral Agreements',
      description: 'Establish bilateral minerals deals to guarantee lithium and rare earth supplies.',
      priority: 'high',
      estimatedImpact: 7
    });
    recommendations.push({
      category: 'workforce',
      title: 'Reform STEM Talent Retention',
      description: 'Adjust immigration policies to retain global STEM talent and prevent brain drain.',
      priority: 'medium',
      estimatedImpact: 4
    });
  }

  // Scenario C: Emerging Digital Power (India-style)
  if (cognitiveScore > 40 && computeScore > 30 && computeScore < 60) {
    recommendations.push({
      category: 'leverage',
      title: 'Exploit Geopolitical Arbitrage',
      description: 'Leverage trade tensions to attract displaced manufacturing and supply chains.',
      priority: 'high',
      estimatedImpact: 8
    });
    recommendations.push({
      category: 'dpi',
      title: 'Expand Digital Public Infrastructure',
      description: 'Scale national digital infrastructure stack to reduce reliance on foreign payment and identity platforms.',
      priority: 'critical',
      estimatedImpact: 9
    });
    recommendations.push({
      category: 'data',
      title: 'Enforce Data Localization',
      description: 'Implement data localization requirements to train indigenous AI models on local language and cultural data.',
      priority: 'high',
      estimatedImpact: 6
    });
  }

  // Low cognitive layer
  if (cognitiveScore < 40) {
    recommendations.push({
      category: 'workforce',
      title: 'Invest in AI Research Capacity',
      description: 'Fund national AI research labs and university programs to build indigenous foundation model capability.',
      priority: 'high',
      estimatedImpact: 7
    });
  }

  // Low material foundation
  if (materialScore < 40) {
    recommendations.push({
      category: 'resources',
      title: 'Diversify Critical Mineral Sources',
      description: 'Establish multiple supplier relationships for lithium, cobalt, and rare earths to reduce single-source dependency.',
      priority: 'high',
      estimatedImpact: 6
    });
  }

  // Low cloud autonomy specifically
  if (metrics.computeInfrastructure.cloudAutonomy < 30) {
    recommendations.push({
      category: 'techStack',
      title: 'Develop Sovereign Cloud Capacity',
      description: 'Invest in domestic hyperscaler infrastructure to reduce reliance on foreign cloud providers.',
      priority: 'critical',
      estimatedImpact: 8
    });
  }

  // Sort by priority and impact
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return recommendations
    .sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.estimatedImpact - a.estimatedImpact;
    })
    .slice(0, 5); // Return top 5 recommendations
}

// Calculate decoupling impact
export function calculateDecouplingImpact(
  country: CountryData,
  affectedSectors: string[],
  impactMultiplier: number
): { scoreImpact: number; gdpImpact: number; uptimeImpact: number } {
  let vulnerabilitySum = 0;

  affectedSectors.forEach(sector => {
    const relevantDeps = country.dependencies.filter(d => d.sector === sector);
    const avgDependency = relevantDeps.length > 0
      ? relevantDeps.reduce((sum, d) => sum + d.dependencyLevel, 0) / relevantDeps.length
      : 0;
    vulnerabilitySum += avgDependency;
  });

  const avgVulnerability = vulnerabilitySum / affectedSectors.length;
  const scoreImpact = Math.round(avgVulnerability * impactMultiplier * 0.3);
  const gdpImpact = avgVulnerability * impactMultiplier * 0.05;
  const uptimeImpact = avgVulnerability * impactMultiplier * 0.15;

  return {
    scoreImpact: Math.min(scoreImpact, 40), // Cap at 40 point drop
    gdpImpact: Math.min(gdpImpact, 15), // Cap at 15% GDP impact
    uptimeImpact: Math.min(uptimeImpact, 50) // Cap at 50% uptime impact
  };
}
