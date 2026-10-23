import type { ExamDomainConfig } from '../types/quiz.js';

export const DEFAULT_DOMAINS: ExamDomainConfig[] = [
  {
    id: 1,
    name: 'Describe cloud concepts',
    shortName: 'Cloud Concepts',
    weightPercentage: 25,
    description:
      'Cloud models (public, private, hybrid), shared responsibility, CapEx vs OpEx, consumption-based pricing, and core cloud benefits (high availability, elasticity, agility, reliability).',
    iconName: 'Cloud',
    subtopics: [
      { id: 'cloud-fundamentals', name: 'Cloud Computing Fundamentals & Pricing' },
      { id: 'shared-responsibility', name: 'Shared Responsibility Model' },
      { id: 'cloud-models', name: 'Public, Private, and Hybrid Cloud Models' },
      { id: 'cloud-benefits', name: 'High Availability, Scalability, and Elasticity' },
      { id: 'capex-opex', name: 'Capital (CapEx) vs Operational (OpEx) Expenditure' },
    ],
  },
  {
    id: 2,
    name: 'Describe Azure architecture and services',
    shortName: 'Architecture & Services',
    weightPercentage: 40,
    description:
      'Regions, Availability Zones, Management Groups, Subscriptions, Compute (VMs, Containers, Functions, App Service), Networking (VNets, VPN, ExpressRoute), Storage tiers & redundancy, Microsoft Entra ID, and Azure RBAC.',
    iconName: 'Layers',
    subtopics: [
      { id: 'regions-zones', name: 'Regions, Availability Zones & Region Pairs' },
      { id: 'resource-hierarchy', name: 'Management Groups, Subscriptions & Resource Groups' },
      { id: 'compute-services', name: 'Compute: VMs, Containers, Functions & App Services' },
      { id: 'networking-services', name: 'Networking: VNets, VPN Gateway & ExpressRoute' },
      { id: 'storage-redundancy', name: 'Storage Services, Tiers & Redundancy (LRS/ZRS/GRS)' },
      { id: 'identity-access', name: 'Identity, Microsoft Entra ID & Azure RBAC' },
      { id: 'security-services', name: 'Security Tools & Microsoft Defender for Cloud' },
    ],
  },
  {
    id: 3,
    name: 'Describe Azure management and governance',
    shortName: 'Management & Governance',
    weightPercentage: 35,
    description:
      'Cost management, Azure Pricing Calculator, Azure Policy, Resource Locks, Resource Tags, Microsoft Purview, Azure Monitor, Service Health, Azure Advisor, Cloud Shell, CLI, and ARM templates.',
    iconName: 'ShieldCheck',
    subtopics: [
      { id: 'cost-tools', name: 'Cost Management, Pricing Calculator & Budgets' },
      { id: 'governance-policy', name: 'Azure Policy, Resource Locks & Tags' },
      { id: 'purview-compliance', name: 'Microsoft Purview & Compliance' },
      { id: 'monitoring-health', name: 'Azure Monitor, Log Analytics & Service Health' },
      { id: 'advisor-guidance', name: 'Azure Advisor Recommendations' },
      { id: 'management-tools', name: 'Azure Portal, Cloud Shell, CLI & ARM/Bicep' },
    ],
  },
];
