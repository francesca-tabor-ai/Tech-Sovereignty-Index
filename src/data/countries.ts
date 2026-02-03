import { CountryData, DecouplingScenario, SovereigntyMetrics } from '../types';
import {
  calculateTSI,
  checkSovereignPrison,
  generateDiagnosis,
  generateRecommendations
} from '../utils/scoring';

// Helper to create full country data
function createCountryData(
  id: string,
  name: string,
  code: string,
  region: string,
  metrics: SovereigntyMetrics,
  dependencies: CountryData['dependencies']
): CountryData {
  const overallScore = calculateTSI(metrics);
  const sovereignPrisonCheck = checkSovereignPrison(metrics);

  return {
    id,
    name,
    code,
    region,
    metrics,
    overallScore,
    isSovereignPrison: sovereignPrisonCheck.is,
    sovereignPrisonReason: sovereignPrisonCheck.reason,
    dependencies,
    diagnosis: generateDiagnosis(metrics),
    recommendations: generateRecommendations(metrics),
    lastUpdated: '2025-01-15'
  };
}

export const countriesData: CountryData[] = [
  // United States
  createCountryData('usa', 'United States', 'USA', 'North America', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 45
    },
    computeInfrastructure: {
      chipIndependence: 25,
      cloudAutonomy: 95,
      connectivityControl: 85
    },
    cognitiveLayer: {
      modelSovereignty: 95,
      workforceCapability: 88
    },
    jurisdictionalShield: {
      legalImmunization: 40,
      enforcementCapability: 90
    }
  }, [
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Advanced semiconductor manufacturing (< 7nm)' },
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 80, description: 'Rare earth processing and refining' },
    { country: 'South Korea', countryCode: 'KOR', sector: 'chips', dependencyLevel: 45, description: 'Memory chip production' },
    { country: 'Japan', countryCode: 'JPN', sector: 'chips', dependencyLevel: 35, description: 'Semiconductor equipment and materials' }
  ]),

  // China
  createCountryData('chn', 'China', 'CHN', 'Asia', {
    materialFoundation: {
      energySovereignty: 68,
      criticalMineralsAccess: 90,
      urbanMiningCapacity: 65
    },
    computeInfrastructure: {
      chipIndependence: 45,
      cloudAutonomy: 92,
      connectivityControl: 78
    },
    cognitiveLayer: {
      modelSovereignty: 75,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 95,
      enforcementCapability: 95
    }
  }, [
    { country: 'Netherlands', countryCode: 'NLD', sector: 'chips', dependencyLevel: 85, description: 'EUV lithography equipment (ASML)' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 60, description: 'Advanced chip manufacturing' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 40, description: 'AI chip designs and architectures' }
  ]),

  // European Union (represented as entity)
  createCountryData('eu', 'European Union', 'EU', 'Europe', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 20,
      urbanMiningCapacity: 60
    },
    computeInfrastructure: {
      chipIndependence: 12,
      cloudAutonomy: 18,
      connectivityControl: 65
    },
    cognitiveLayer: {
      modelSovereignty: 35,
      workforceCapability: 75
    },
    jurisdictionalShield: {
      legalImmunization: 85,
      enforcementCapability: 75
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'AWS, Azure, Google Cloud dominance' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 88, description: 'OpenAI, Google, Meta foundation models' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'Advanced semiconductor manufacturing' },
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 78, description: 'Rare earth elements and processing' }
  ]),

  // Germany
  createCountryData('deu', 'Germany', 'DEU', 'Europe', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 22,
      urbanMiningCapacity: 68
    },
    computeInfrastructure: {
      chipIndependence: 15,
      cloudAutonomy: 20,
      connectivityControl: 70
    },
    cognitiveLayer: {
      modelSovereignty: 38,
      workforceCapability: 78
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 70
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Hyperscaler cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Automotive and industrial chips' },
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 72, description: 'Battery materials and rare earths' }
  ]),

  // France
  createCountryData('fra', 'France', 'FRA', 'Europe', {
    materialFoundation: {
      energySovereignty: 78,
      criticalMineralsAccess: 25,
      urbanMiningCapacity: 55
    },
    computeInfrastructure: {
      chipIndependence: 18,
      cloudAutonomy: 25,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 45,
      workforceCapability: 76
    },
    jurisdictionalShield: {
      legalImmunization: 80,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 82, description: 'Cloud services dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // United Kingdom
  createCountryData('gbr', 'United Kingdom', 'GBR', 'Europe', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 28,
      urbanMiningCapacity: 52
    },
    computeInfrastructure: {
      chipIndependence: 22,
      cloudAutonomy: 22,
      connectivityControl: 75
    },
    cognitiveLayer: {
      modelSovereignty: 55,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 45,
      enforcementCapability: 68
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud and AI services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Chip manufacturing' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 70, description: 'AI model dependency' }
  ]),

  // Japan
  createCountryData('jpn', 'Japan', 'JPN', 'Asia', {
    materialFoundation: {
      energySovereignty: 42,
      criticalMineralsAccess: 30,
      urbanMiningCapacity: 75
    },
    computeInfrastructure: {
      chipIndependence: 55,
      cloudAutonomy: 45,
      connectivityControl: 80
    },
    cognitiveLayer: {
      modelSovereignty: 48,
      workforceCapability: 80
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 65
    }
  }, [
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 65, description: 'Advanced logic chips' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 55, description: 'Cloud infrastructure' },
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 60, description: 'Rare earth imports' },
    { country: 'Middle East', countryCode: 'MEA', sector: 'energy', dependencyLevel: 88, description: 'Oil and gas imports' }
  ]),

  // South Korea
  createCountryData('kor', 'South Korea', 'KOR', 'Asia', {
    materialFoundation: {
      energySovereignty: 38,
      criticalMineralsAccess: 25,
      urbanMiningCapacity: 70
    },
    computeInfrastructure: {
      chipIndependence: 78,
      cloudAutonomy: 55,
      connectivityControl: 85
    },
    cognitiveLayer: {
      modelSovereignty: 52,
      workforceCapability: 85
    },
    jurisdictionalShield: {
      legalImmunization: 50,
      enforcementCapability: 62
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 68, description: 'Rare earth and battery materials' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 55, description: 'AI models and cloud' },
    { country: 'Middle East', countryCode: 'MEA', sector: 'energy', dependencyLevel: 85, description: 'Energy imports' }
  ]),

  // Taiwan
  createCountryData('twn', 'Taiwan', 'TWN', 'Asia', {
    materialFoundation: {
      energySovereignty: 32,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 55
    },
    computeInfrastructure: {
      chipIndependence: 95,
      cloudAutonomy: 48,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 42,
      workforceCapability: 88
    },
    jurisdictionalShield: {
      legalImmunization: 35,
      enforcementCapability: 45
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 55, description: 'Raw materials' },
    { country: 'Middle East', countryCode: 'MEA', sector: 'energy', dependencyLevel: 92, description: 'Energy imports' },
    { country: 'Netherlands', countryCode: 'NLD', sector: 'chips', dependencyLevel: 75, description: 'EUV lithography equipment' }
  ]),

  // India
  createCountryData('ind', 'India', 'IND', 'Asia', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 38,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 28,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 45,
      workforceCapability: 75
    },
    jurisdictionalShield: {
      legalImmunization: 68,
      enforcementCapability: 72
    }
  }, [
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Electronics components' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 72, description: 'Cloud infrastructure' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 68, description: 'AI model dependency' }
  ]),

  // Brazil
  createCountryData('bra', 'Brazil', 'BRA', 'South America', {
    materialFoundation: {
      energySovereignty: 75,
      criticalMineralsAccess: 55,
      urbanMiningCapacity: 28
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 18,
      connectivityControl: 45
    },
    cognitiveLayer: {
      modelSovereignty: 25,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud dominance' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All semiconductor imports' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 80, description: 'Electronics manufacturing' }
  ]),

  // Australia
  createCountryData('aus', 'Australia', 'AUS', 'Oceania', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 82,
      urbanMiningCapacity: 42
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 15,
      connectivityControl: 68
    },
    cognitiveLayer: {
      modelSovereignty: 28,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 42,
      enforcementCapability: 65
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Near-total cloud dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'Semiconductor imports' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 85, description: 'AI services' }
  ]),

  // Canada
  createCountryData('can', 'Canada', 'CAN', 'North America', {
    materialFoundation: {
      energySovereignty: 85,
      criticalMineralsAccess: 68,
      urbanMiningCapacity: 48
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 15,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 42,
      workforceCapability: 78
    },
    jurisdictionalShield: {
      legalImmunization: 38,
      enforcementCapability: 55
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Overwhelming US cloud dominance' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 78, description: 'AI ecosystem integration' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Chip imports' }
  ]),

  // Russia
  createCountryData('rus', 'Russia', 'RUS', 'Europe/Asia', {
    materialFoundation: {
      energySovereignty: 92,
      criticalMineralsAccess: 75,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 12,
      cloudAutonomy: 65,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 48,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 88,
      enforcementCapability: 85
    }
  }, [
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 75, description: 'Advanced semiconductors (sanctions-constrained)' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 65, description: 'Alternative chip supply' }
  ]),

  // Israel
  createCountryData('isr', 'Israel', 'ISR', 'Middle East', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 45
    },
    computeInfrastructure: {
      chipIndependence: 65,
      cloudAutonomy: 35,
      connectivityControl: 68
    },
    cognitiveLayer: {
      modelSovereignty: 62,
      workforceCapability: 92
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 70, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 60, description: 'Chip manufacturing' }
  ]),

  // Singapore
  createCountryData('sgp', 'Singapore', 'SGP', 'Asia', {
    materialFoundation: {
      energySovereignty: 25,
      criticalMineralsAccess: 12,
      urbanMiningCapacity: 58
    },
    computeInfrastructure: {
      chipIndependence: 35,
      cloudAutonomy: 28,
      connectivityControl: 88
    },
    cognitiveLayer: {
      modelSovereignty: 35,
      workforceCapability: 85
    },
    jurisdictionalShield: {
      legalImmunization: 62,
      enforcementCapability: 75
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud services' },
    { country: 'Malaysia', countryCode: 'MYS', sector: 'energy', dependencyLevel: 85, description: 'Energy imports' },
    { country: 'Global', countryCode: 'GLB', sector: 'minerals', dependencyLevel: 95, description: 'All mineral imports' }
  ]),

  // Saudi Arabia
  createCountryData('sau', 'Saudi Arabia', 'SAU', 'Middle East', {
    materialFoundation: {
      energySovereignty: 95,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 22,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 42
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 78
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 88, description: 'AI technology' }
  ]),

  // United Arab Emirates
  createCountryData('are', 'UAE', 'ARE', 'Middle East', {
    materialFoundation: {
      energySovereignty: 88,
      criticalMineralsAccess: 25,
      urbanMiningCapacity: 22
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 32,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 38,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 68,
      enforcementCapability: 75
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 78, description: 'Cloud services' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 72, description: 'AI technology' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Indonesia
  createCountryData('idn', 'Indonesia', 'IDN', 'Asia', {
    materialFoundation: {
      energySovereignty: 62,
      criticalMineralsAccess: 72,
      urbanMiningCapacity: 25
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 15,
      connectivityControl: 48
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 55
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud dominance' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Chip imports' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics' }
  ]),

  // Mexico
  createCountryData('mex', 'Mexico', 'MEX', 'North America', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 45,
      urbanMiningCapacity: 22
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 12,
      connectivityControl: 52
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 42,
      enforcementCapability: 45
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 95, description: 'Near-total cloud dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Chip imports' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 92, description: 'AI services' }
  ]),

  // South Africa
  createCountryData('zaf', 'South Africa', 'ZAF', 'Africa', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 78,
      urbanMiningCapacity: 32
    },
    computeInfrastructure: {
      chipIndependence: 3,
      cloudAutonomy: 12,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 48
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 45
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics' }
  ]),

  // Netherlands
  createCountryData('nld', 'Netherlands', 'NLD', 'Europe', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 62
    },
    computeInfrastructure: {
      chipIndependence: 72,
      cloudAutonomy: 22,
      connectivityControl: 82
    },
    cognitiveLayer: {
      modelSovereignty: 35,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 68
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 82, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 55, description: 'Chip manufacturing (ASML supplies them)' }
  ]),

  // Switzerland
  createCountryData('che', 'Switzerland', 'CHE', 'Europe', {
    materialFoundation: {
      energySovereignty: 68,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 58
    },
    computeInfrastructure: {
      chipIndependence: 12,
      cloudAutonomy: 35,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 42,
      workforceCapability: 88
    },
    jurisdictionalShield: {
      legalImmunization: 85,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 72, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Chip imports' }
  ]),

  // Vietnam
  createCountryData('vnm', 'Vietnam', 'VNM', 'Asia', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 45,
      urbanMiningCapacity: 22
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 18,
      connectivityControl: 48
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 58
    },
    jurisdictionalShield: {
      legalImmunization: 62,
      enforcementCapability: 65
    }
  }, [
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Semiconductor imports' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 70, description: 'Electronics components' }
  ]),

  // Poland
  createCountryData('pol', 'Poland', 'POL', 'Europe', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 22,
      urbanMiningCapacity: 45
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 18,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 25,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 75,
      enforcementCapability: 62
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'All chip imports' }
  ]),

  // Italy
  createCountryData('ita', 'Italy', 'ITA', 'Europe', {
    materialFoundation: {
      energySovereignty: 42,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 52
    },
    computeInfrastructure: {
      chipIndependence: 12,
      cloudAutonomy: 15,
      connectivityControl: 68
    },
    cognitiveLayer: {
      modelSovereignty: 28,
      workforceCapability: 70
    },
    jurisdictionalShield: {
      legalImmunization: 80,
      enforcementCapability: 65
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud infrastructure dominance' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' },
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 70, description: 'Rare earth dependency' }
  ]),

  // Spain
  createCountryData('esp', 'Spain', 'ESP', 'Europe', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 25,
      urbanMiningCapacity: 48
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 15,
      connectivityControl: 65
    },
    cognitiveLayer: {
      modelSovereignty: 22,
      workforceCapability: 68
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 62
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Hyperscaler dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 94, description: 'All chip imports' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 85, description: 'AI model dependency' }
  ]),

  // Sweden
  createCountryData('swe', 'Sweden', 'SWE', 'Europe', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 65
    },
    computeInfrastructure: {
      chipIndependence: 15,
      cloudAutonomy: 22,
      connectivityControl: 78
    },
    cognitiveLayer: {
      modelSovereignty: 32,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 70
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 82, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Belgium
  createCountryData('bel', 'Belgium', 'BEL', 'Europe', {
    materialFoundation: {
      energySovereignty: 45,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 58
    },
    computeInfrastructure: {
      chipIndependence: 25,
      cloudAutonomy: 18,
      connectivityControl: 75
    },
    cognitiveLayer: {
      modelSovereignty: 28,
      workforceCapability: 78
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 68
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Chip imports (IMEC research hub)' }
  ]),

  // Austria
  createCountryData('aut', 'Austria', 'AUT', 'Europe', {
    materialFoundation: {
      energySovereignty: 68,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 55
    },
    computeInfrastructure: {
      chipIndependence: 12,
      cloudAutonomy: 20,
      connectivityControl: 70
    },
    cognitiveLayer: {
      modelSovereignty: 25,
      workforceCapability: 76
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 68
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Denmark
  createCountryData('dnk', 'Denmark', 'DNK', 'Europe', {
    materialFoundation: {
      energySovereignty: 75,
      criticalMineralsAccess: 12,
      urbanMiningCapacity: 60
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 18,
      connectivityControl: 78
    },
    cognitiveLayer: {
      modelSovereignty: 28,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'All chip imports' }
  ]),

  // Finland
  createCountryData('fin', 'Finland', 'FIN', 'Europe', {
    materialFoundation: {
      energySovereignty: 70,
      criticalMineralsAccess: 28,
      urbanMiningCapacity: 58
    },
    computeInfrastructure: {
      chipIndependence: 15,
      cloudAutonomy: 22,
      connectivityControl: 82
    },
    cognitiveLayer: {
      modelSovereignty: 35,
      workforceCapability: 85
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 80, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Semiconductor imports' }
  ]),

  // Ireland
  createCountryData('irl', 'Ireland', 'IRL', 'Europe', {
    materialFoundation: {
      energySovereignty: 42,
      criticalMineralsAccess: 10,
      urbanMiningCapacity: 45
    },
    computeInfrastructure: {
      chipIndependence: 45,
      cloudAutonomy: 12,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 25,
      workforceCapability: 80
    },
    jurisdictionalShield: {
      legalImmunization: 75,
      enforcementCapability: 58
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 95, description: 'US tech company HQ concentration' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 75, description: 'Chip imports (Intel fab presence)' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 90, description: 'AI services via US tech' }
  ]),

  // Portugal
  createCountryData('prt', 'Portugal', 'PRT', 'Europe', {
    materialFoundation: {
      energySovereignty: 62,
      criticalMineralsAccess: 22,
      urbanMiningCapacity: 42
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 12,
      connectivityControl: 65
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 70
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 60
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Cloud dominance' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' }
  ]),

  // Greece
  createCountryData('grc', 'Greece', 'GRC', 'Europe', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 3,
      cloudAutonomy: 10,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 68
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 55
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 96, description: 'All chip imports' }
  ]),

  // Czech Republic
  createCountryData('cze', 'Czech Republic', 'CZE', 'Europe', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 48
    },
    computeInfrastructure: {
      chipIndependence: 10,
      cloudAutonomy: 15,
      connectivityControl: 62
    },
    cognitiveLayer: {
      modelSovereignty: 22,
      workforceCapability: 75
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 62
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud dependency' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Romania
  createCountryData('rou', 'Romania', 'ROU', 'Europe', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 20,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 12,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 75,
      enforcementCapability: 58
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Cloud dominance' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 94, description: 'All chip imports' }
  ]),

  // Hungary
  createCountryData('hun', 'Hungary', 'HUN', 'Europe', {
    materialFoundation: {
      energySovereignty: 45,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 40
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 12,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 65
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud infrastructure' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 45, description: 'Battery manufacturing investment' }
  ]),

  // Estonia
  createCountryData('est', 'Estonia', 'EST', 'Europe', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 12,
      urbanMiningCapacity: 45
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 25,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 28,
      workforceCapability: 82
    },
    jurisdictionalShield: {
      legalImmunization: 82,
      enforcementCapability: 75
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 78, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' }
  ]),

  // Luxembourg
  createCountryData('lux', 'Luxembourg', 'LUX', 'Europe', {
    materialFoundation: {
      energySovereignty: 25,
      criticalMineralsAccess: 8,
      urbanMiningCapacity: 52
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 35,
      connectivityControl: 78
    },
    cognitiveLayer: {
      modelSovereignty: 22,
      workforceCapability: 80
    },
    jurisdictionalShield: {
      legalImmunization: 85,
      enforcementCapability: 72
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud infrastructure (data center hub)' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' }
  ]),

  // Norway
  createCountryData('nor', 'Norway', 'NOR', 'Europe', {
    materialFoundation: {
      energySovereignty: 92,
      criticalMineralsAccess: 45,
      urbanMiningCapacity: 62
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 28,
      connectivityControl: 82
    },
    cognitiveLayer: {
      modelSovereignty: 35,
      workforceCapability: 85
    },
    jurisdictionalShield: {
      legalImmunization: 78,
      enforcementCapability: 75
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // New Zealand
  createCountryData('nzl', 'New Zealand', 'NZL', 'Oceania', {
    materialFoundation: {
      energySovereignty: 82,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 48
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 15,
      connectivityControl: 68
    },
    cognitiveLayer: {
      modelSovereignty: 22,
      workforceCapability: 78
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 68
    }
  }, [
    { country: 'Australia', countryCode: 'AUS', sector: 'cloud', dependencyLevel: 45, description: 'Regional cloud infrastructure' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 70, description: 'US hyperscaler services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'All chip imports' },
    { country: 'United States', countryCode: 'USA', sector: 'ai', dependencyLevel: 85, description: 'AI model dependency' }
  ]),

  // Nigeria
  createCountryData('nga', 'Nigeria', 'NGA', 'Africa', {
    materialFoundation: {
      energySovereignty: 45,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 8,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 12,
      workforceCapability: 45
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 42
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Cloud dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 85, description: 'Electronics imports' },
    { country: 'Global', countryCode: 'GLB', sector: 'cables', dependencyLevel: 78, description: 'Submarine cable access' }
  ]),

  // ==================== LATIN AMERICA ====================

  // Argentina
  createCountryData('arg', 'Argentina', 'ARG', 'South America', {
    materialFoundation: {
      energySovereignty: 65,
      criticalMineralsAccess: 55,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 3,
      cloudAutonomy: 12,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud infrastructure' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Chile
  createCountryData('chl', 'Chile', 'CHL', 'South America', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 85,
      urbanMiningCapacity: 42
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 15,
      connectivityControl: 62
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 70
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 55
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 70, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Colombia
  createCountryData('col', 'Colombia', 'COL', 'South America', {
    materialFoundation: {
      energySovereignty: 62,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 28
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 10,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 12,
      workforceCapability: 65
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 45
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Cloud dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Peru
  createCountryData('per', 'Peru', 'PER', 'South America', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 72,
      urbanMiningCapacity: 25
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 48
    },
    cognitiveLayer: {
      modelSovereignty: 10,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 42
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Cloud infrastructure' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 94, description: 'All chip imports' }
  ]),

  // Venezuela
  createCountryData('ven', 'Venezuela', 'VEN', 'South America', {
    materialFoundation: {
      energySovereignty: 75,
      criticalMineralsAccess: 45,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 42
    },
    jurisdictionalShield: {
      legalImmunization: 65,
      enforcementCapability: 55
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Electronics and technology imports' },
    { country: 'Russia', countryCode: 'RUS', sector: 'cloud', dependencyLevel: 35, description: 'Alternative tech partnerships' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Semiconductor imports' }
  ]),

  // Ecuador
  createCountryData('ecu', 'Ecuador', 'ECU', 'South America', {
    materialFoundation: {
      energySovereignty: 68,
      criticalMineralsAccess: 32,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 6,
      connectivityControl: 45
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 40
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'All chip imports' }
  ]),

  // Uruguay
  createCountryData('ury', 'Uruguay', 'URY', 'South America', {
    materialFoundation: {
      energySovereignty: 78,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 35
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 12,
      connectivityControl: 68
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 62,
      enforcementCapability: 58
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud infrastructure' },
    { country: 'Brazil', countryCode: 'BRA', sector: 'cloud', dependencyLevel: 25, description: 'Regional data centers' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Paraguay
  createCountryData('pry', 'Paraguay', 'PRY', 'South America', {
    materialFoundation: {
      energySovereignty: 88,
      criticalMineralsAccess: 12,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 45
    },
    jurisdictionalShield: {
      legalImmunization: 45,
      enforcementCapability: 38
    }
  }, [
    { country: 'Brazil', countryCode: 'BRA', sector: 'cloud', dependencyLevel: 45, description: 'Regional connectivity' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 78, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Electronics imports' }
  ]),

  // Bolivia
  createCountryData('bol', 'Bolivia', 'BOL', 'South America', {
    materialFoundation: {
      energySovereignty: 62,
      criticalMineralsAccess: 78,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 38
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 42
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 42
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Electronics and mining equipment' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Cuba
  createCountryData('cub', 'Cuba', 'CUB', 'Caribbean', {
    materialFoundation: {
      energySovereignty: 35,
      criticalMineralsAccess: 28,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 25
    },
    cognitiveLayer: {
      modelSovereignty: 12,
      workforceCapability: 65
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 68
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 85, description: 'Technology imports' },
    { country: 'Russia', countryCode: 'RUS', sector: 'cloud', dependencyLevel: 45, description: 'Alternative infrastructure' },
    { country: 'Venezuela', countryCode: 'VEN', sector: 'energy', dependencyLevel: 55, description: 'Energy cooperation' }
  ]),

  // Panama
  createCountryData('pan', 'Panama', 'PAN', 'Central America', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 22
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 15,
      connectivityControl: 72
    },
    cognitiveLayer: {
      modelSovereignty: 10,
      workforceCapability: 62
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 88, description: 'Cloud and connectivity hub' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 70, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Costa Rica
  createCountryData('cri', 'Costa Rica', 'CRI', 'Central America', {
    materialFoundation: {
      energySovereignty: 82,
      criticalMineralsAccess: 12,
      urbanMiningCapacity: 28
    },
    computeInfrastructure: {
      chipIndependence: 8,
      cloudAutonomy: 12,
      connectivityControl: 65
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 72
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 52
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud services and tech investment' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' },
    { country: 'United States', countryCode: 'USA', sector: 'chips', dependencyLevel: 45, description: 'Intel manufacturing presence' }
  ]),

  // Guatemala
  createCountryData('gtm', 'Guatemala', 'GTM', 'Central America', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 45
    },
    jurisdictionalShield: {
      legalImmunization: 42,
      enforcementCapability: 35
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Cloud dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 94, description: 'All chip imports' }
  ]),

  // Honduras
  createCountryData('hnd', 'Honduras', 'HND', 'Central America', {
    materialFoundation: {
      energySovereignty: 42,
      criticalMineralsAccess: 15,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 4,
      connectivityControl: 38
    },
    cognitiveLayer: {
      modelSovereignty: 4,
      workforceCapability: 42
    },
    jurisdictionalShield: {
      legalImmunization: 40,
      enforcementCapability: 32
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 94, description: 'Cloud infrastructure' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 80, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 95, description: 'All chip imports' }
  ]),

  // El Salvador
  createCountryData('slv', 'El Salvador', 'SLV', 'Central America', {
    materialFoundation: {
      energySovereignty: 45,
      criticalMineralsAccess: 8,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 45
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 42
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 90, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Nicaragua
  createCountryData('nic', 'Nicaragua', 'NIC', 'Central America', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 22,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 4,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 45
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Technology imports' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 72, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Dominican Republic
  createCountryData('dom', 'Dominican Republic', 'DOM', 'Caribbean', {
    materialFoundation: {
      energySovereignty: 38,
      criticalMineralsAccess: 18,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 52
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 42
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 92, description: 'Cloud dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 94, description: 'All chip imports' }
  ]),

  // ==================== AFRICA ====================

  // Egypt
  createCountryData('egy', 'Egypt', 'EGY', 'Africa', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 22
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 12,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 62
    },
    jurisdictionalShield: {
      legalImmunization: 68,
      enforcementCapability: 65
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 78, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' },
    { country: 'Global', countryCode: 'GLB', sector: 'cables', dependencyLevel: 25, description: 'Suez cable hub strategic position' }
  ]),

  // Kenya
  createCountryData('ken', 'Kenya', 'KEN', 'Africa', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 28,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 2,
      cloudAutonomy: 15,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 18,
      workforceCapability: 58
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 48
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 82, description: 'Cloud and fintech infrastructure' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics and telecom equipment' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Ethiopia
  createCountryData('eth', 'Ethiopia', 'ETH', 'Africa', {
    materialFoundation: {
      energySovereignty: 78,
      criticalMineralsAccess: 32,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 48
    },
    jurisdictionalShield: {
      legalImmunization: 65,
      enforcementCapability: 58
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Telecom and electronics (Huawei infrastructure)' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 55, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Morocco
  createCountryData('mar', 'Morocco', 'MAR', 'Africa', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 78,
      urbanMiningCapacity: 28
    },
    computeInfrastructure: {
      chipIndependence: 5,
      cloudAutonomy: 18,
      connectivityControl: 62
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 58
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 55
    }
  }, [
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 45, description: 'French tech partnerships' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 65, description: 'Cloud services' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 68, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 85, description: 'Semiconductor imports' }
  ]),

  // Algeria
  createCountryData('dza', 'Algeria', 'DZA', 'Africa', {
    materialFoundation: {
      energySovereignty: 88,
      criticalMineralsAccess: 42,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 10,
      connectivityControl: 52
    },
    cognitiveLayer: {
      modelSovereignty: 10,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 65
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Technology imports' },
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 48, description: 'French tech influence' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Tunisia
  createCountryData('tun', 'Tunisia', 'TUN', 'Africa', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 25
    },
    computeInfrastructure: {
      chipIndependence: 3,
      cloudAutonomy: 12,
      connectivityControl: 58
    },
    cognitiveLayer: {
      modelSovereignty: 12,
      workforceCapability: 62
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 52, description: 'French tech partnerships' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 58, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Ghana
  createCountryData('gha', 'Ghana', 'GHA', 'Africa', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 45,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 10,
      connectivityControl: 52
    },
    cognitiveLayer: {
      modelSovereignty: 12,
      workforceCapability: 55
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 48
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 85, description: 'Cloud services (Google data center)' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Tanzania
  createCountryData('tza', 'Tanzania', 'TZA', 'Africa', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 42,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 6,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 45
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 48
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Technology and infrastructure' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 72, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // DR Congo
  createCountryData('cod', 'DR Congo', 'COD', 'Africa', {
    materialFoundation: {
      energySovereignty: 42,
      criticalMineralsAccess: 95,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 3,
      connectivityControl: 25
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 35
    },
    jurisdictionalShield: {
      legalImmunization: 42,
      enforcementCapability: 32
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'minerals', dependencyLevel: 85, description: 'Cobalt mining and export dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Technology imports' },
    { country: 'Global', countryCode: 'GLB', sector: 'cables', dependencyLevel: 88, description: 'Limited connectivity infrastructure' }
  ]),

  // Angola
  createCountryData('ago', 'Angola', 'AGO', 'Africa', {
    materialFoundation: {
      energySovereignty: 85,
      criticalMineralsAccess: 55,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 38
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 52
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Technology and infrastructure' },
    { country: 'Portugal', countryCode: 'PRT', sector: 'cloud', dependencyLevel: 35, description: 'Portuguese tech partnerships' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Senegal
  createCountryData('sen', 'Senegal', 'SEN', 'Africa', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 28,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 52
    },
    cognitiveLayer: {
      modelSovereignty: 10,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 48
    }
  }, [
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 55, description: 'French tech influence' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Côte d'Ivoire
  createCountryData('civ', "Côte d'Ivoire", 'CIV', 'Africa', {
    materialFoundation: {
      energySovereignty: 52,
      criticalMineralsAccess: 32,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 8,
      connectivityControl: 48
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 48
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 45
    }
  }, [
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 58, description: 'French tech dominance' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 70, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Cameroon
  createCountryData('cmr', 'Cameroon', 'CMR', 'Africa', {
    materialFoundation: {
      energySovereignty: 58,
      criticalMineralsAccess: 35,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 42
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 48
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 48
    }
  }, [
    { country: 'France', countryCode: 'FRA', sector: 'cloud', dependencyLevel: 52, description: 'French tech influence' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 75, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Uganda
  createCountryData('uga', 'Uganda', 'UGA', 'Africa', {
    materialFoundation: {
      energySovereignty: 55,
      criticalMineralsAccess: 32,
      urbanMiningCapacity: 12
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 5,
      connectivityControl: 38
    },
    cognitiveLayer: {
      modelSovereignty: 8,
      workforceCapability: 48
    },
    jurisdictionalShield: {
      legalImmunization: 55,
      enforcementCapability: 52
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Huawei infrastructure' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 65, description: 'Cloud services' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 92, description: 'Semiconductor imports' }
  ]),

  // Zimbabwe
  createCountryData('zwe', 'Zimbabwe', 'ZWE', 'Africa', {
    materialFoundation: {
      energySovereignty: 35,
      criticalMineralsAccess: 58,
      urbanMiningCapacity: 15
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 4,
      connectivityControl: 32
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 52
    },
    jurisdictionalShield: {
      legalImmunization: 52,
      enforcementCapability: 45
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 82, description: 'Technology and mining equipment' },
    { country: 'South Africa', countryCode: 'ZAF', sector: 'cloud', dependencyLevel: 45, description: 'Regional connectivity' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // Mozambique
  createCountryData('moz', 'Mozambique', 'MOZ', 'Africa', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 42,
      urbanMiningCapacity: 10
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 4,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 38
    },
    jurisdictionalShield: {
      legalImmunization: 48,
      enforcementCapability: 42
    }
  }, [
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 78, description: 'Technology imports' },
    { country: 'South Africa', countryCode: 'ZAF', sector: 'cloud', dependencyLevel: 48, description: 'Regional connectivity' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 90, description: 'Semiconductor imports' }
  ]),

  // Rwanda
  createCountryData('rwa', 'Rwanda', 'RWA', 'Africa', {
    materialFoundation: {
      energySovereignty: 48,
      criticalMineralsAccess: 55,
      urbanMiningCapacity: 18
    },
    computeInfrastructure: {
      chipIndependence: 1,
      cloudAutonomy: 12,
      connectivityControl: 55
    },
    cognitiveLayer: {
      modelSovereignty: 15,
      workforceCapability: 58
    },
    jurisdictionalShield: {
      legalImmunization: 58,
      enforcementCapability: 62
    }
  }, [
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 75, description: 'Cloud services and tech partnerships' },
    { country: 'China', countryCode: 'CHN', sector: 'chips', dependencyLevel: 72, description: 'Electronics imports' },
    { country: 'Taiwan', countryCode: 'TWN', sector: 'chips', dependencyLevel: 88, description: 'Semiconductor imports' }
  ]),

  // ==================== TERRITORIES ====================

  // Greenland
  createCountryData('grl', 'Greenland', 'GRL', 'North America', {
    materialFoundation: {
      energySovereignty: 72,
      criticalMineralsAccess: 85,
      urbanMiningCapacity: 8
    },
    computeInfrastructure: {
      chipIndependence: 0,
      cloudAutonomy: 5,
      connectivityControl: 35
    },
    cognitiveLayer: {
      modelSovereignty: 5,
      workforceCapability: 65
    },
    jurisdictionalShield: {
      legalImmunization: 72,
      enforcementCapability: 55
    }
  }, [
    { country: 'Denmark', countryCode: 'DNK', sector: 'cloud', dependencyLevel: 75, description: 'Danish infrastructure dependence' },
    { country: 'United States', countryCode: 'USA', sector: 'cloud', dependencyLevel: 55, description: 'US cloud and defense presence' },
    { country: 'European Union', countryCode: 'EU', sector: 'chips', dependencyLevel: 85, description: 'All technology imports via EU' },
    { country: 'Global', countryCode: 'GLB', sector: 'cables', dependencyLevel: 82, description: 'Limited submarine cable access' }
  ])
];

// Decoupling scenarios for simulation
export const decouplingScenarios: DecouplingScenario[] = [
  {
    id: 'taiwan-strait',
    name: 'Taiwan Strait Crisis',
    description: 'Complete disruption of Taiwanese semiconductor exports due to military conflict or blockade.',
    affectedSectors: ['chips'],
    sourceCountry: 'TWN',
    impactMultiplier: 1.5
  },
  {
    id: 'china-gallium-ban',
    name: 'China Gallium Export Ban',
    description: 'China restricts export of gallium and germanium, critical for semiconductor manufacturing.',
    affectedSectors: ['chips', 'minerals'],
    sourceCountry: 'CHN',
    impactMultiplier: 1.2
  },
  {
    id: 'us-cloud-act',
    name: 'US CLOUD Act Enforcement',
    description: 'Aggressive enforcement of US CLOUD Act extraterritorial data access provisions.',
    affectedSectors: ['cloud', 'ai'],
    sourceCountry: 'USA',
    impactMultiplier: 1.0
  },
  {
    id: 'rare-earth-shock',
    name: 'Global Rare Earth Shortage',
    description: 'Major disruption to rare earth supply chains affecting battery and electronics production.',
    affectedSectors: ['minerals', 'chips'],
    sourceCountry: 'CHN',
    impactMultiplier: 1.3
  },
  {
    id: 'submarine-cable-cut',
    name: 'Submarine Cable Disruption',
    description: 'Critical undersea internet cables damaged or sabotaged, affecting connectivity.',
    affectedSectors: ['cables', 'cloud'],
    sourceCountry: 'Global',
    impactMultiplier: 1.1
  },
  {
    id: 'ai-model-restriction',
    name: 'US AI Export Controls',
    description: 'Expansion of US export controls to restrict access to advanced AI models and chips.',
    affectedSectors: ['ai', 'chips'],
    sourceCountry: 'USA',
    impactMultiplier: 1.2
  },
  {
    id: 'energy-crisis',
    name: 'Global Energy Supply Shock',
    description: 'Major energy supply disruption affecting data center operations worldwide.',
    affectedSectors: ['energy', 'cloud'],
    sourceCountry: 'Global',
    impactMultiplier: 1.4
  }
];

// Helper to get country by code
export function getCountryByCode(code: string): CountryData | undefined {
  return countriesData.find(c => c.code === code || c.id === code.toLowerCase());
}

// Helper to get top countries by score
export function getTopCountries(limit: number = 10): CountryData[] {
  return [...countriesData].sort((a, b) => b.overallScore - a.overallScore).slice(0, limit);
}

// Helper to get sovereign prisons
export function getSovereignPrisons(): CountryData[] {
  return countriesData.filter(c => c.isSovereignPrison);
}

// Helper to get countries by region
export function getCountriesByRegion(region: string): CountryData[] {
  return countriesData.filter(c => c.region === region);
}
