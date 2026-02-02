import { Vendor } from '../types';

export const vendorsData: Vendor[] = [
  // EU-Compliant Cloud Providers
  {
    id: 'ovhcloud',
    name: 'OVHcloud',
    headquarters: 'Roubaix, France',
    countryCode: 'FRA',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'European cloud infrastructure provider offering bare metal, VPS, and managed Kubernetes.',
    certifications: ['ISO 27001', 'SOC 2', 'HDS', 'SecNumCloud']
  },
  {
    id: 'scaleway',
    name: 'Scaleway',
    headquarters: 'Paris, France',
    countryCode: 'FRA',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'French cloud provider with GPU instances, Kubernetes, and serverless offerings.',
    certifications: ['ISO 27001', 'HDS', 'SecNumCloud']
  },
  {
    id: 'ionos',
    name: 'IONOS',
    headquarters: 'Montabaur, Germany',
    countryCode: 'DEU',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German cloud and hosting provider with data centers across Europe.',
    certifications: ['ISO 27001', 'ISO 27018', 'C5']
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    headquarters: 'Gunzenhausen, Germany',
    countryCode: 'DEU',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German hosting company known for competitive pricing and bare metal servers.',
    certifications: ['ISO 27001']
  },
  {
    id: 'exoscale',
    name: 'Exoscale',
    headquarters: 'Lausanne, Switzerland',
    countryCode: 'CHE',
    category: 'cloud',
    isEUHQ: false,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: false,
    description: 'Swiss cloud provider focused on simplicity and European data sovereignty.',
    certifications: ['ISO 27001', 'FINMA compliant']
  },
  {
    id: 'infomaniak',
    name: 'Infomaniak',
    headquarters: 'Geneva, Switzerland',
    countryCode: 'CHE',
    category: 'cloud',
    isEUHQ: false,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: false,
    description: 'Swiss hosting and cloud provider with strong privacy focus.',
    certifications: ['ISO 27001', 'ISO 14001']
  },
  {
    id: 'cleura',
    name: 'Cleura',
    headquarters: 'Stockholm, Sweden',
    countryCode: 'SWE',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Swedish OpenStack-based cloud provider focused on compliance.',
    certifications: ['ISO 27001', 'ISO 27017', 'ISO 27018']
  },
  {
    id: 'stackit',
    name: 'STACKIT',
    headquarters: 'Heilbronn, Germany',
    countryCode: 'DEU',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Schwarz Group cloud provider (Lidl/Kaufland parent) for European enterprises.',
    certifications: ['ISO 27001', 'C5', 'BSI IT-Grundschutz']
  },
  {
    id: 'fuga-cloud',
    name: 'Fuga Cloud',
    headquarters: 'Amsterdam, Netherlands',
    countryCode: 'NLD',
    category: 'cloud',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Dutch OpenStack public cloud with Kubernetes and object storage.',
    certifications: ['ISO 27001', 'NEN 7510']
  },

  // Security & Identity
  {
    id: 'onfido',
    name: 'Onfido',
    headquarters: 'London, UK',
    countryCode: 'GBR',
    category: 'identity',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: true,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Identity verification using AI and biometrics. Note: Acquired by Entrust (US).',
    certifications: ['ISO 27001', 'SOC 2']
  },
  {
    id: 'idnow',
    name: 'IDnow',
    headquarters: 'Munich, Germany',
    countryCode: 'DEU',
    category: 'identity',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German identity verification platform for KYC and onboarding.',
    certifications: ['ISO 27001', 'eIDAS', 'BaFin approved']
  },
  {
    id: 'veriff',
    name: 'Veriff',
    headquarters: 'Tallinn, Estonia',
    countryCode: 'EST',
    category: 'identity',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Estonian identity verification platform with AI-powered fraud detection.',
    certifications: ['ISO 27001', 'SOC 2']
  },

  // AI & Machine Learning
  {
    id: 'mistral',
    name: 'Mistral AI',
    headquarters: 'Paris, France',
    countryCode: 'FRA',
    category: 'ai',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'French AI company developing open-weight foundation models.',
    certifications: ['ISO 27001']
  },
  {
    id: 'aleph-alpha',
    name: 'Aleph Alpha',
    headquarters: 'Heidelberg, Germany',
    countryCode: 'DEU',
    category: 'ai',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German AI company building sovereign AI for enterprises and governments.',
    certifications: ['ISO 27001', 'BSI C5']
  },
  {
    id: 'deepl',
    name: 'DeepL',
    headquarters: 'Cologne, Germany',
    countryCode: 'DEU',
    category: 'ai',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German AI translation service with enterprise API offerings.',
    certifications: ['ISO 27001', 'GDPR compliant']
  },
  {
    id: 'stability-ai',
    name: 'Stability AI',
    headquarters: 'London, UK',
    countryCode: 'GBR',
    category: 'ai',
    isEUHQ: false,
    foreignControlFree: true,
    dataResident: false,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Open-source generative AI company (Stable Diffusion). Post-Brexit jurisdiction.',
    certifications: ['SOC 2']
  },

  // Data & Analytics
  {
    id: 'snowflake-eu',
    name: 'Snowflake (EU Region)',
    headquarters: 'San Mateo, USA',
    countryCode: 'USA',
    category: 'data',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: true,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Cloud data platform with EU data residency options. Subject to US CLOUD Act.',
    certifications: ['ISO 27001', 'SOC 2', 'FedRAMP']
  },
  {
    id: 'exasol',
    name: 'Exasol',
    headquarters: 'Nuremberg, Germany',
    countryCode: 'DEU',
    category: 'data',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'German high-performance analytics database.',
    certifications: ['ISO 27001', 'SOC 2']
  },

  // Infrastructure & Connectivity
  {
    id: 'nokia',
    name: 'Nokia',
    headquarters: 'Espoo, Finland',
    countryCode: 'FIN',
    category: 'infrastructure',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Finnish telecommunications and 5G infrastructure provider.',
    certifications: ['ISO 27001', '3GPP compliant']
  },
  {
    id: 'ericsson',
    name: 'Ericsson',
    headquarters: 'Stockholm, Sweden',
    countryCode: 'SWE',
    category: 'infrastructure',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Swedish telecommunications company providing 5G and network infrastructure.',
    certifications: ['ISO 27001', '3GPP compliant']
  },

  // Security
  {
    id: 'bitdefender',
    name: 'Bitdefender',
    headquarters: 'Bucharest, Romania',
    countryCode: 'ROU',
    category: 'security',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Romanian cybersecurity company offering endpoint and cloud security.',
    certifications: ['ISO 27001', 'AV-TEST certified']
  },
  {
    id: 'f-secure',
    name: 'WithSecure (F-Secure)',
    headquarters: 'Helsinki, Finland',
    countryCode: 'FIN',
    category: 'security',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'Finnish cybersecurity company providing enterprise security solutions.',
    certifications: ['ISO 27001', 'SOC 2']
  },
  {
    id: 'wallix',
    name: 'Wallix',
    headquarters: 'Paris, France',
    countryCode: 'FRA',
    category: 'security',
    isEUHQ: true,
    foreignControlFree: true,
    dataResident: true,
    legallyImmunized: true,
    euStackCompliant: true,
    description: 'French privileged access management (PAM) solutions provider.',
    certifications: ['ISO 27001', 'ANSSI CSPN']
  },

  // Non-EU Comparison (US hyperscalers)
  {
    id: 'aws',
    name: 'Amazon Web Services',
    headquarters: 'Seattle, USA',
    countryCode: 'USA',
    category: 'cloud',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: true,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Market-leading cloud provider. Subject to US CLOUD Act and FISA.',
    certifications: ['ISO 27001', 'SOC 2', 'FedRAMP', 'C5']
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    headquarters: 'Redmond, USA',
    countryCode: 'USA',
    category: 'cloud',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: true,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Enterprise cloud platform. Subject to US CLOUD Act and FISA.',
    certifications: ['ISO 27001', 'SOC 2', 'FedRAMP', 'C5']
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    headquarters: 'Mountain View, USA',
    countryCode: 'USA',
    category: 'cloud',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: true,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Google cloud services. Subject to US CLOUD Act and FISA.',
    certifications: ['ISO 27001', 'SOC 2', 'FedRAMP', 'C5']
  },
  {
    id: 'openai',
    name: 'OpenAI',
    headquarters: 'San Francisco, USA',
    countryCode: 'USA',
    category: 'ai',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: false,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'Leading AI research company (GPT-4, ChatGPT). US jurisdiction.',
    certifications: ['SOC 2']
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    headquarters: 'San Francisco, USA',
    countryCode: 'USA',
    category: 'ai',
    isEUHQ: false,
    foreignControlFree: false,
    dataResident: false,
    legallyImmunized: false,
    euStackCompliant: false,
    description: 'AI safety company (Claude). US jurisdiction.',
    certifications: ['SOC 2']
  }
];

// Helper functions
export function getEUStackCompliantVendors(): Vendor[] {
  return vendorsData.filter(v => v.euStackCompliant);
}

export function getVendorsByCategory(category: Vendor['category']): Vendor[] {
  return vendorsData.filter(v => v.category === category);
}

export function checkVendorCompliance(vendor: Vendor): {
  compliant: boolean;
  issues: string[];
  score: number;
} {
  const issues: string[] = [];
  let score = 0;

  if (vendor.isEUHQ) {
    score += 25;
  } else {
    issues.push('Headquarters outside EU jurisdiction');
  }

  if (vendor.foreignControlFree) {
    score += 25;
  } else {
    issues.push('Subject to foreign corporate control');
  }

  if (vendor.dataResident) {
    score += 25;
  } else {
    issues.push('Data may be processed outside EU');
  }

  if (vendor.legallyImmunized) {
    score += 25;
  } else {
    issues.push('Exposed to extraterritorial data access laws (e.g., US CLOUD Act)');
  }

  return {
    compliant: score === 100,
    issues,
    score
  };
}
