import type { Question } from '../types/quiz.js';

export const AZ900_QUESTIONS: Question[] = [
  // ==========================================
  // DOMAIN 1: Describe cloud concepts (25-30%)
  // ==========================================
  {
    id: 'az900-d1-001',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'shared-responsibility',
    subtopicName: 'Shared Responsibility Model',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'In an Infrastructure as a Service (IaaS) cloud deployment, who is responsible for updating and patching the operating system running on an Azure Virtual Machine?',
    options: [
      {
        id: 'A',
        text: 'Microsoft exclusively',
        explanation:
          'Incorrect. In IaaS, Microsoft manages physical hosts, data centers, and the virtualization hypervisor, but the customer retains full ownership and administrative control over the guest OS.',
      },
      {
        id: 'B',
        text: 'The customer exclusively',
        explanation:
          'Correct! Under the Shared Responsibility Model for IaaS, the customer is responsible for installing, configuring, securing, and patching the operating system and applications installed on the virtual machine.',
      },
      {
        id: 'C',
        text: 'Both Microsoft and the customer share OS patching duties',
        explanation:
          'Incorrect. While some PaaS services manage OS patching automatically, standard IaaS VMs place direct responsibility for guest OS updates squarely on the customer.',
      },
      {
        id: 'D',
        text: 'The third-party hardware vendor',
        explanation:
          'Incorrect. Third-party hardware vendors do not manage cloud software layers or virtual machine operating systems.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Under the shared responsibility model, IaaS provides the customer with maximum control over hardware virtualization, which means the customer is responsible for managing the guest OS, runtime, and software updates.',
    keyTakeaway:
      'IaaS gives you control over the OS, so patching and updating that OS is always your responsibility.',
    examTrap:
      'Do not confuse IaaS with PaaS (like Azure App Service), where Microsoft patches the underlying operating system automatically.',
    practicalAnalogy:
      'Renting an empty apartment (IaaS): the landlord provides the structure and pipes, but you furnish it, clean the rooms, and lock your doors.',
    docUrl: 'https://learn.microsoft.com/azure/security/fundamentals/shared-responsibility',
    docTitle: 'Shared responsibility in the cloud - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-002',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'capex-opex',
    subtopicName: 'Capital (CapEx) vs Operational (OpEx) Expenditure',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'A startup company wants to avoid large upfront payments for physical servers and data center cooling, paying only for the compute resources they consume each month. Which financial model does this represent?',
    options: [
      {
        id: 'A',
        text: 'Capital Expenditure (CapEx)',
        explanation:
          'Incorrect. CapEx involves spending money upfront on physical infrastructure, such as buying servers, storage arrays, and real estate, and deducting that expense over time.',
      },
      {
        id: 'B',
        text: 'Operational Expenditure (OpEx)',
        explanation:
          'Correct! OpEx is spending money on services or products now and being billed for them as you use them, with no upfront infrastructure cost.',
      },
      {
        id: 'C',
        text: 'Asset Depreciation Allowance',
        explanation:
          'Incorrect. Depreciation is an accounting method of allocating the cost of a tangible CapEx asset over its useful life, not a cloud pricing model.',
      },
      {
        id: 'D',
        text: 'Fixed Overhead Amortization',
        explanation:
          'Incorrect. Amortization spreads the cost of intangible assets, whereas cloud consumption is charged as an ongoing operating expense.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Cloud computing typically operates on an OpEx model where you pay for cloud services on a recurring, consumption-based schedule rather than investing huge upfront capital in hardware.',
    keyTakeaway:
      'CapEx = Upfront infrastructure investment; OpEx = Pay-as-you-go recurring operating cost.',
    examTrap:
      'The exam often asks how cloud impacts financial planning. Cloud shifts costs from CapEx to OpEx.',
    practicalAnalogy:
      'Buying a car outright is CapEx; hailing a taxi or renting a car by the kilometre is OpEx.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/3-describe-consumption-based-model',
    docTitle: 'Describe the consumption-based model - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-003',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-benefits',
    subtopicName: 'High Availability, Scalability, and Elasticity',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'An e-commerce website experiences a predictable 500% surge in web traffic every Friday evening during flash sales. Which cloud computing capability allows the application to automatically add VM instances during peak hours and decommission them afterwards?',
    options: [
      {
        id: 'A',
        text: 'High Availability',
        explanation:
          'Incorrect. High availability ensures the system remains operational and accessible with minimal downtime, but does not inherently add capacity based on demand.',
      },
      {
        id: 'B',
        text: 'Fault Tolerance',
        explanation:
          'Incorrect. Fault tolerance enables a system to continue operating without interruption even if a hardware component fails.',
      },
      {
        id: 'C',
        text: 'Elasticity',
        explanation:
          'Correct! Elasticity is the ability of a cloud system to automatically allocate and deallocate resources dynamically in response to changing demand.',
      },
      {
        id: 'D',
        text: 'Predictability',
        explanation:
          'Incorrect. Predictability lets you anticipate performance and cost, but elasticity is the actual automated mechanism that dynamically scales instances.',
      },
    ],
    correctOptionIds: ['C'],
    whyCorrect:
      'Elasticity refers to the dynamic addition and removal of computing resources automatically as workload requirements spike or subside, ensuring you only pay for what you need.',
    keyTakeaway:
      'Elasticity is automated, dynamic scaling up/out and down/in in response to real-time workload fluctuations.',
    examTrap:
      'Scalability is the capability to handle increased workload; elasticity is the ability to do so dynamically and automatically contract when demand drops.',
    practicalAnalogy:
      'A rubber band stretching when pulled and snapping back to original size when released.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/4-describe-benefits-using-cloud-services',
    docTitle: 'Describe the benefits of using cloud services - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-004',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-models',
    subtopicName: 'Public, Private, and Hybrid Cloud Models',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'An enterprise maintains its legacy database inside an on-premises data center to comply with strict local government regulations, while hosting its public-facing web applications in Azure. Which cloud deployment model is being used?',
    options: [
      {
        id: 'A',
        text: 'Public cloud',
        explanation:
          'Incorrect. Public cloud services are owned and operated entirely by third-party cloud service providers like Microsoft.',
      },
      {
        id: 'B',
        text: 'Private cloud',
        explanation:
          'Incorrect. Private cloud is cloud infrastructure used exclusively by one business or organization, hosted on-premises or by a dedicated host.',
      },
      {
        id: 'C',
        text: 'Hybrid cloud',
        explanation:
          'Correct! A hybrid cloud combines public cloud (Azure) with private infrastructure or an on-premises data center, allowing data and apps to be shared between them.',
      },
      {
        id: 'D',
        text: 'Community cloud',
        explanation:
          'Incorrect. Community cloud is shared by several organizations with shared concerns (e.g., healthcare research), not an enterprise mixing private and public clouds.',
      },
    ],
    correctOptionIds: ['C'],
    whyCorrect:
      'A hybrid cloud connects an on-premises private environment with a public cloud like Microsoft Azure, providing greater flexibility and meeting compliance or data residency constraints.',
    keyTakeaway:
      'Hybrid cloud = On-premises / Private Cloud + Public Cloud working together.',
    examTrap:
      'Using multiple public clouds (e.g., Azure and AWS) is called multi-cloud, whereas combining on-premises with public cloud is hybrid cloud.',
    practicalAnalogy:
      'Keeping sensitive family heirlooms in a secure home safe while keeping everyday savings in a commercial bank.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/5-describe-cloud-service-types',
    docTitle: 'Describe cloud service types - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-005',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'shared-responsibility',
    subtopicName: 'Shared Responsibility Model',
    difficulty: 'Intermediate',
    questionType: 'multiple',
    prompt:
      'In the cloud Shared Responsibility Model, which TWO responsibilities always remain with the customer, regardless of whether they choose IaaS, PaaS, or SaaS? (Select two)',
    options: [
      {
        id: 'A',
        text: 'Information and data',
        explanation:
          'Correct! You always own your data, and ensuring its classification, protection, and governance is always the customer’s responsibility across all cloud models.',
      },
      {
        id: 'B',
        text: 'Physical network and data center security',
        explanation:
          'Incorrect. Microsoft always manages physical data center access, perimeter fencing, power, and physical network gear.',
      },
      {
        id: 'C',
        text: 'Identity and access management',
        explanation:
          'Correct! Securing credentials, establishing user accounts, enforcing MFA, and granting access permissions always rest with the customer.',
      },
      {
        id: 'D',
        text: 'Operating system patching',
        explanation:
          'Incorrect. In PaaS and SaaS, Microsoft manages the operating system and patches it automatically; only in IaaS does the customer patch the OS.',
      },
    ],
    correctOptionIds: ['A', 'C'],
    whyCorrect:
      'Regardless of the cloud deployment model (IaaS, PaaS, or SaaS), the customer ALWAYS retains responsibility for their data and information, as well as accounts and identity management.',
    keyTakeaway:
      'Data, Devices (endpoints), and Identities/Accounts are ALWAYS the customer responsibility.',
    examTrap:
      'Candidates often assume SaaS transfers 100% of responsibility to the cloud provider. You still manage who has access to the SaaS app and what data goes in.',
    docUrl: 'https://learn.microsoft.com/azure/security/fundamentals/shared-responsibility',
    docTitle: 'Shared responsibility model documentation - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-006',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-benefits',
    subtopicName: 'High Availability, Scalability, and Elasticity',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt:
      'What is the fundamental difference between vertical scaling (scaling up) and horizontal scaling (scaling out)?',
    options: [
      {
        id: 'A',
        text: 'Vertical scaling adds more identical VM instances; horizontal scaling increases CPU and RAM on an existing VM.',
        explanation:
          'Incorrect. This is the exact opposite of the correct definitions.',
      },
      {
        id: 'B',
        text: 'Vertical scaling upgrades CPU, memory, or disk on an existing resource; horizontal scaling adds more instances or nodes of the resource.',
        explanation:
          'Correct! Scaling up (vertical) means increasing the capacity of an existing machine (e.g. 4 cores to 16 cores), while scaling out (horizontal) adds additional machines to share the load.',
      },
      {
        id: 'C',
        text: 'Vertical scaling distributes traffic across availability zones; horizontal scaling replicates data across geography.',
        explanation:
          'Incorrect. Traffic distribution across zones is handled by load balancers, not the definition of vertical scaling.',
      },
      {
        id: 'D',
        text: 'Vertical scaling is automatic; horizontal scaling must always be performed manually.',
        explanation:
          'Incorrect. Both scaling methods can be automated (for example, Azure Virtual Machine Scale Sets horizontally scale automatically based on metric rules).',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Scaling up (vertical) increases individual instance compute power (RAM/CPU/disk), which often requires a brief reboot. Scaling out (horizontal) adds more server instances to work in parallel.',
    keyTakeaway:
      'Scale UP = Bigger server; Scale OUT = More servers.',
    examTrap:
      'Remember that scaling up has a physical ceiling (the largest VM size available), whereas scaling out can scale almost infinitely.',
    practicalAnalogy:
      'Vertical scaling is replacing your delivery van with a large truck. Horizontal scaling is hiring five more delivery vans.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/4-describe-benefits-using-cloud-services',
    docTitle: 'Benefits of cloud computing - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-007',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-fundamentals',
    subtopicName: 'Cloud Computing Fundamentals & Pricing',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'Which cloud service category provides a complete software application that is centrally hosted and managed by Microsoft, accessible to end-users via a web browser or mobile app?',
    options: [
      {
        id: 'A',
        text: 'Software as a Service (SaaS)',
        explanation:
          'Correct! SaaS delivers fully functional end-user applications over the internet, such as Microsoft 365, Dynamics 365, and Power BI.',
      },
      {
        id: 'B',
        text: 'Platform as a Service (PaaS)',
        explanation:
          'Incorrect. PaaS provides a managed development and deployment environment (like Azure SQL Database or Azure App Service) where you bring your own code.',
      },
      {
        id: 'C',
        text: 'Infrastructure as a Service (IaaS)',
        explanation:
          'Incorrect. IaaS provides basic compute, storage, and networking building blocks (like Azure Virtual Machines) where you install the OS and software.',
      },
      {
        id: 'D',
        text: 'Hardware as a Service (HaaS)',
        explanation:
          'Incorrect. HaaS is not a standard cloud service category in the AZ-900 syllabus.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Software as a Service (SaaS) is software that is centrally hosted and managed for the end customer. Examples include Microsoft 365, Outlook.com, and OneDrive.',
    keyTakeaway:
      'SaaS = Software you use as an end-user; PaaS = Environment you deploy code to; IaaS = Raw servers and networks you configure.',
    examTrap:
      'Remember that Microsoft 365 is SaaS, Azure App Service is PaaS, and Azure Virtual Machines are IaaS.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/5-describe-cloud-service-types',
    docTitle: 'Describe cloud service types - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-008',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-benefits',
    subtopicName: 'High Availability, Scalability, and Elasticity',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'What cloud benefit ensures that a cloud service continues to operate and serve user requests even when a hardware failure occurs inside an underlying host server?',
    options: [
      {
        id: 'A',
        text: 'Reliability and Fault Tolerance',
        explanation:
          'Correct! Reliability and fault tolerance ensure that services withstand component failures without significant downtime or data loss.',
      },
      {
        id: 'B',
        text: 'Agility',
        explanation:
          'Incorrect. Agility is the ability to rapidly allocate and configure cloud resources to respond to business needs quickly.',
      },
      {
        id: 'C',
        text: 'Disaster Recovery',
        explanation:
          'Incorrect. Disaster Recovery refers to recovering from catastrophic events (like an entire region outage or flood), whereas fault tolerance handles individual hardware failures.',
      },
      {
        id: 'D',
        text: 'Cost Predictability',
        explanation:
          'Incorrect. Cost predictability allows businesses to forecast their cloud expenditure using pricing tools.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Reliability is the ability of a system to recover from failures and continue to function. Fault tolerance is built-in redundancy that prevents a single component failure from causing an outage.',
    keyTakeaway:
      'Reliability & fault tolerance prevent localized component failures from interrupting user service.',
    examTrap:
      'Do not confuse high availability/fault tolerance (mitigating immediate component failures) with disaster recovery (restoring service after catastrophic regional events).',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/4-describe-benefits-using-cloud-services',
    docTitle: 'Benefits of using cloud services - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-009',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-fundamentals',
    subtopicName: 'Cloud Computing Fundamentals & Pricing',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'What is the primary characteristic of the consumption-based pricing model in Azure?',
    options: [
      {
        id: 'A',
        text: 'You pay a fixed annual licensing fee regardless of how much compute power you run.',
        explanation:
          'Incorrect. Fixed licensing without usage metrics reflects traditional on-premises software agreements, not consumption pricing.',
      },
      {
        id: 'B',
        text: 'You only pay for cloud resources when you use them, and stop paying when they are deallocated or removed.',
        explanation:
          'Correct! Under consumption-based pricing, there are no upfront costs, no termination fees, and you pay strictly for the compute, memory, and storage you actually consume.',
      },
      {
        id: 'C',
        text: 'You must commit to a minimum 5-year contract before provisioning any resource.',
        explanation:
          'Incorrect. Azure allows pay-as-you-go with zero upfront commitment, though reserved instances offer discounts for 1- or 3-year commitments.',
      },
      {
        id: 'D',
        text: 'Pricing increases automatically each time your company adds new employees to Microsoft Entra ID.',
        explanation:
          'Incorrect. Consumption pricing is tied to cloud resource usage (gigabytes, execution seconds, vCPU hours), not company headcount.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Consumption-based pricing aligns expenses directly with utilization. When workloads pause or scale down, costs decrease accordingly.',
    keyTakeaway:
      'Consumption-based pricing = No upfront purchase, pay only for what you consume, stop paying when decommissioned.',
    examTrap:
      'Remember that stopped (deallocated) VMs stop incurring compute charges, but attached managed disks still incur storage costs.',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/3-describe-consumption-based-model',
    docTitle: 'Describe the consumption-based model - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d1-010',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-benefits',
    subtopicName: 'High Availability, Scalability, and Elasticity',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt:
      'A global news publisher needs their articles to load with minimal latency for readers in Europe, North America, and Asia. Which cloud benefit best addresses this requirement?',
    options: [
      {
        id: 'A',
        text: 'Geo-distribution',
        explanation:
          'Correct! Geo-distribution allows deploying applications and data to regional data centers around the globe, ensuring content is physically close to users to reduce latency.',
      },
      {
        id: 'B',
        text: 'Vertical scalability',
        explanation:
          'Incorrect. Vertical scaling increases the size of a single VM, which does not overcome physical distance and network latency for international users.',
      },
      {
        id: 'C',
        text: 'Cost predictability',
        explanation:
          'Incorrect. Cost predictability relates to budget forecasting, not geographical response times.',
      },
      {
        id: 'D',
        text: 'Governance automation',
        explanation:
          'Incorrect. Governance enforces compliance and policies, not edge content delivery.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Geo-distribution deploys workloads and caches content across Azure’s worldwide global network of regions and edge locations, drastically reducing latency for international audiences.',
    keyTakeaway:
      'Geo-distribution puts resources close to users worldwide to minimize network latency.',
    examTrap:
      'Do not confuse High Availability (system uptime) with Geo-distribution (geographic presence for low latency and local data residency).',
    docUrl: 'https://learn.microsoft.com/training/modules/describe-cloud-compute/4-describe-benefits-using-cloud-services',
    docTitle: 'Benefits of using cloud services - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },

  // ========================================================
  // DOMAIN 2: Describe Azure architecture and services (35-40%)
  // ========================================================
  {
    id: 'az900-d2-001',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'regions-zones',
    subtopicName: 'Regions, Availability Zones & Region Pairs',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'What is an Azure Availability Zone?',
    options: [
      {
        id: 'A',
        text: 'A geographical area containing at least two Azure regions located within 300 miles of each other.',
        explanation:
          'Incorrect. That describes a geography or regional pair relationship, not an individual Availability Zone.',
      },
      {
        id: 'B',
        text: 'One or more physically separate data centers within an Azure region, each equipped with independent power, cooling, and networking.',
        explanation:
          'Correct! Availability Zones are distinct physical locations inside an Azure region designed to protect applications from data center failures.',
      },
      {
        id: 'C',
        text: 'A virtual firewall boundary separating subnets inside a Virtual Network.',
        explanation:
          'Incorrect. That describes a Network Security Group (NSG) or Azure Firewall.',
      },
      {
        id: 'D',
        text: 'A subscription-level limit on how many virtual machines you can provision.',
        explanation:
          'Incorrect. That describes an Azure subscription quota.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Each Availability Zone is made up of one or more physical data centers equipped with independent power, cooling, and networking infrastructure within the same region, connected by low-latency networks.',
    keyTakeaway:
      'Availability Zones = Physically separate data centers within a single region with isolated power, cooling, and networking.',
    examTrap:
      'Not all Azure regions support Availability Zones, although all regions with zone support contain at least three separate zones.',
    practicalAnalogy:
      'Having three separate branch offices in the same city, each on a different electrical grid and internet provider.',
    docUrl: 'https://learn.microsoft.com/azure/reliability/availability-zones-overview',
    docTitle: 'Azure Availability Zones overview - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-002',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'regions-zones',
    subtopicName: 'Regions, Availability Zones & Region Pairs',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'When Microsoft performs planned platform updates across Azure regions, how do Azure Region Pairs protect workloads from simultaneous downtime?',
    options: [
      {
        id: 'A',
        text: 'Microsoft updates both paired regions simultaneously to speed up deployment windows.',
        explanation:
          'Incorrect. Updating paired regions simultaneously would risk widespread outages. Updates are strictly serialized.',
      },
      {
        id: 'B',
        text: 'Planned updates are deployed to only one region in the pair at a time to prevent cross-region downtime.',
        explanation:
          'Correct! Azure region pairs are coordinated so that platform updates roll out to one region at a time. In the event of a broad disaster, recovery of one region is prioritized.',
      },
      {
        id: 'C',
        text: 'Region pairs merge into a single data center during updates to maintain uninterrupted service.',
        explanation:
          'Incorrect. Physical data centers are hundreds of miles apart and cannot physically merge.',
      },
      {
        id: 'D',
        text: 'Region pairs are exclusively reserved for government customers and cannot run commercial workloads.',
        explanation:
          'Incorrect. Region pairs exist globally for all public and sovereign clouds (e.g., East US paired with West US).',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Each Azure region is paired with another region within the same geography (at least 300 miles apart). Platform updates are sequenced so only one paired region is updated at a time, ensuring business continuity.',
    keyTakeaway:
      'Region Pairs serialize updates (one at a time) and prioritize failover recovery across at least 300 miles.',
    examTrap:
      'Availability Zones protect against single data center failure inside one region; Region Pairs protect against an entire regional outage.',
    docUrl: 'https://learn.microsoft.com/azure/reliability/cross-region-replication-azure',
    docTitle: 'Cross-region replication in Azure - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-003',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'resource-hierarchy',
    subtopicName: 'Management Groups, Subscriptions & Resource Groups',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'What is the correct hierarchy of Azure resource management containers from highest level to lowest level?',
    options: [
      {
        id: 'A',
        text: 'Management groups -> Subscriptions -> Resource groups -> Resources',
        explanation:
          'Correct! Management groups contain subscriptions; subscriptions contain resource groups; resource groups contain individual resources.',
      },
      {
        id: 'B',
        text: 'Subscriptions -> Management groups -> Resource groups -> Resources',
        explanation:
          'Incorrect. Subscriptions cannot contain management groups; management groups sit above subscriptions.',
      },
      {
        id: 'C',
        text: 'Resource groups -> Management groups -> Subscriptions -> Resources',
        explanation:
          'Incorrect. Resource groups reside inside subscriptions, not above them.',
      },
      {
        id: 'D',
        text: 'Management groups -> Resource groups -> Subscriptions -> Resources',
        explanation:
          'Incorrect. Subscriptions contain resource groups, not vice versa.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'The Azure hierarchy consists of four levels: Management groups (govern access and policies across subscriptions) -> Subscriptions (billing boundary) -> Resource groups (logical resource containers) -> Resources (the instances).',
    keyTakeaway:
      'Hierarchy: Management Groups > Subscriptions > Resource Groups > Resources.',
    examTrap:
      'A resource can belong to ONLY ONE resource group at a time, and a resource group belongs to exactly one subscription.',
    practicalAnalogy:
      'Enterprise holding company (Management group) -> Operating subsidiary company (Subscription) -> Department project folder (Resource group) -> Individual files/assets (Resources).',
    docUrl: 'https://learn.microsoft.com/azure/governance/management-groups/overview',
    docTitle: 'What are Azure management groups? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-004',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'compute-services',
    subtopicName: 'Compute: VMs, Containers, Functions & App Services',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'You need to execute lightweight backend C# code in response to a message arriving on an Azure Service Bus queue. You do not want to manage any servers or pay when the code is idle. Which service should you choose?',
    options: [
      {
        id: 'A',
        text: 'Azure Virtual Machines',
        explanation:
          'Incorrect. VMs are IaaS instances that run continuously and incur billing even when idle unless deallocated.',
      },
      {
        id: 'B',
        text: 'Azure Functions',
        explanation:
          'Correct! Azure Functions is an event-driven, serverless compute service that executes code on demand and scales automatically, charging only for compute time consumed during execution.',
      },
      {
        id: 'C',
        text: 'Azure Dedicated Host',
        explanation:
          'Incorrect. Dedicated Host provides dedicated physical hardware for compliance and licensing, which is the opposite of serverless.',
      },
      {
        id: 'D',
        text: 'Azure Virtual Desktop',
        explanation:
          'Incorrect. Azure Virtual Desktop provides virtualized Windows desktops and apps to remote workers.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Azure Functions is a serverless solution that enables you to write less code, maintain less infrastructure, and save costs by running event-driven code that bills strictly per execution.',
    keyTakeaway:
      'Azure Functions = Event-driven serverless compute (pay only when code executes).',
    examTrap:
      'Do not confuse Azure Functions (serverless code) with Azure Logic Apps (serverless automated workflows with a visual designer).',
    docUrl: 'https://learn.microsoft.com/azure/azure-functions/functions-overview',
    docTitle: 'Introduction to Azure Functions - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-005',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'compute-services',
    subtopicName: 'Compute: VMs, Containers, Functions & App Services',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'Which Azure compute service is designed specifically for enterprise-grade container orchestration, managing deployment, scaling, and networking for clusters of containerized applications?',
    options: [
      {
        id: 'A',
        text: 'Azure Container Instances (ACI)',
        explanation:
          'Incorrect. ACI runs standalone containers fast without managing clusters or orchestration overhead.',
      },
      {
        id: 'B',
        text: 'Azure Kubernetes Service (AKS)',
        explanation:
          'Correct! AKS is a fully managed Kubernetes service that provides cluster management, automatic scaling, self-healing, and container orchestration.',
      },
      {
        id: 'C',
        text: 'Azure App Service Web App',
        explanation:
          'Incorrect. While App Service can host web container apps, it is not an enterprise container orchestration engine like Kubernetes.',
      },
      {
        id: 'D',
        text: 'Azure Batch',
        explanation:
          'Incorrect. Azure Batch runs large-scale parallel and high-performance computing (HPC) batch jobs.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'AKS is Microsoft’s managed Kubernetes service that automates deployment, scaling, health monitoring, and lifecycle management for containerized microservice architectures.',
    keyTakeaway:
      'AKS = Managed container orchestration with Kubernetes; ACI = Simple, fast single-container execution without cluster management.',
    examTrap:
      'If the question mentions running a single container quickly without cluster management, the answer is Azure Container Instances (ACI). If it mentions orchestration or Kubernetes, choose AKS.',
    docUrl: 'https://learn.microsoft.com/azure/aks/intro-kubernetes',
    docTitle: 'Introduction to Azure Kubernetes Service - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-006',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'networking-services',
    subtopicName: 'Networking: VNets, VPN Gateway & ExpressRoute',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'A financial institution requires a private, dedicated, high-speed connection between their corporate on-premises headquarters and Azure that does NOT travel over the public internet. Which service meets this requirement?',
    options: [
      {
        id: 'A',
        text: 'Point-to-Site (P2S) VPN Gateway',
        explanation:
          'Incorrect. P2S connects individual remote client computers to Azure across the public internet using encrypted tunnels.',
      },
      {
        id: 'B',
        text: 'Site-to-Site (S2S) VPN Gateway',
        explanation:
          'Incorrect. A Site-to-Site VPN encrypts traffic between an on-premises network and Azure, but it still traverses the public internet.',
      },
      {
        id: 'C',
        text: 'Azure ExpressRoute',
        explanation:
          'Correct! Azure ExpressRoute creates a private, dedicated physical connection between your on-premises network and Azure with the help of a connectivity provider, bypassing the public internet entirely.',
      },
      {
        id: 'D',
        text: 'Azure Virtual Network Peering',
        explanation:
          'Incorrect. VNet Peering connects two Azure virtual networks within Microsoft’s private backbone, not on-premises networks.',
      },
    ],
    correctOptionIds: ['C'],
    whyCorrect:
      'Azure ExpressRoute provides private, dedicated connectivity with higher reliability, faster speeds, lower latency, and higher security because traffic never traverses the public internet.',
    keyTakeaway:
      'ExpressRoute = Private dedicated connection bypassing the public internet; VPN Gateway = Encrypted tunnel over the public internet.',
    examTrap:
      'Look for the keyword "does not travel over the public internet"—this is the signature exam clue for Azure ExpressRoute.',
    docUrl: 'https://learn.microsoft.com/azure/expressroute/expressroute-introduction',
    docTitle: 'What is Azure ExpressRoute? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-007',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'networking-services',
    subtopicName: 'Networking: VNets, VPN Gateway & ExpressRoute',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'What Azure feature allows two Virtual Networks (VNets) in Azure to connect seamlessly with low latency, using Microsoft’s private backbone network without routing traffic over the internet?',
    options: [
      {
        id: 'A',
        text: 'Virtual Network (VNet) Peering',
        explanation:
          'Correct! VNet Peering links two Azure virtual networks directly via the high-bandwidth Microsoft backbone network, appearing as one unified network.',
      },
      {
        id: 'B',
        text: 'Azure DNS Private Resolver',
        explanation:
          'Incorrect. Azure DNS Private Resolver resolves domain names within virtual networks, but does not route network traffic between them.',
      },
      {
        id: 'C',
        text: 'Network Security Group (NSG)',
        explanation:
          'Incorrect. NSGs filter inbound and outbound network traffic to Azure resources based on security rules.',
      },
      {
        id: 'D',
        text: 'Azure Bastion',
        explanation:
          'Incorrect. Azure Bastion provides secure RDP/SSH access to VMs directly via the Azure Portal over TLS.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'VNet Peering enables you to connect virtual networks in the same or different regions (Global VNet Peering). Traffic between peered networks is private and remains on the Microsoft backbone.',
    keyTakeaway:
      'VNet Peering connects Azure VNets directly through Microsoft’s private fiber backbone without internet transit.',
    examTrap:
      'VNet peering traffic is completely private; it does not require a gateway or public IP addresses.',
    docUrl: 'https://learn.microsoft.com/azure/virtual-network/virtual-network-peering-overview',
    docTitle: 'Virtual network peering - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-008',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'storage-redundancy',
    subtopicName: 'Storage Services, Tiers & Redundancy (LRS/ZRS/GRS)',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'A hospital needs to store patient medical records that must be retained for 10 years to meet legal mandates. The files are rarely accessed (less than once a year) and a retrieval latency of several hours is acceptable. Which Azure Blob Storage access tier is the most cost-effective?',
    options: [
      {
        id: 'A',
        text: 'Hot access tier',
        explanation:
          'Incorrect. The Hot tier has higher storage costs and lowest access costs, optimized for frequently accessed data.',
      },
      {
        id: 'B',
        text: 'Cool access tier',
        explanation:
          'Incorrect. The Cool tier is for data stored for at least 30 days and accessed infrequently (e.g. monthly backups).',
      },
      {
        id: 'C',
        text: 'Cold access tier',
        explanation:
          'Incorrect. Cold tier is optimized for data stored for at least 90 days and accessed rarely, but remains online immediately.',
      },
      {
        id: 'D',
        text: 'Archive access tier',
        explanation:
          'Correct! The Archive tier offers the lowest storage cost for data stored for at least 180 days with flexible retrieval latency (several hours to rehydrate).',
      },
    ],
    correctOptionIds: ['D'],
    whyCorrect:
      'The Archive tier provides the lowest per-gigabyte storage cost, making it ideal for long-term compliance records, regulatory archives, and historical data where retrieval delays of several hours are acceptable.',
    keyTakeaway:
      'Hot = Frequent access; Cool = Infrequent access (30 days); Cold = Rare access (90 days); Archive = Long-term offline archive (180 days, hours to rehydrate).',
    examTrap:
      'Data in the Archive tier is offline and must be rehydrated back to Hot or Cool before it can be read.',
    docUrl: 'https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview',
    docTitle: 'Blob storage access tiers - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-009',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'storage-redundancy',
    subtopicName: 'Storage Services, Tiers & Redundancy (LRS/ZRS/GRS)',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt:
      'Which Azure Storage redundancy option replicates data synchronously across three Azure availability zones within a single primary region?',
    options: [
      {
        id: 'A',
        text: 'Locally Redundant Storage (LRS)',
        explanation:
          'Incorrect. LRS replicates three times synchronously within a single data center in the primary region.',
      },
      {
        id: 'B',
        text: 'Zone-Redundant Storage (ZRS)',
        explanation:
          'Correct! ZRS copies your data synchronously across three Azure availability zones in the primary region, providing 99.9999999999% (12 9s) of durability.',
      },
      {
        id: 'C',
        text: 'Geo-Redundant Storage (GRS)',
        explanation:
          'Incorrect. GRS uses LRS in the primary region and replicates asynchronously to a secondary paired region.',
      },
      {
        id: 'D',
        text: 'Read-Access Geo-Zone-Redundant Storage (RA-GZRS)',
        explanation:
          'Incorrect. RA-GZRS uses ZRS in the primary region plus replication to a secondary region with read access enabled.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Zone-redundant storage (ZRS) replicates your data synchronously across three storage clusters in three separate availability zones within the primary region.',
    keyTakeaway:
      'LRS = 3 copies in 1 data center; ZRS = 3 copies across 3 availability zones in 1 region; GRS = 3 copies in primary region + 3 copies in secondary region.',
    examTrap:
      'Remember that LRS protects against server rack failure, ZRS protects against an entire data center failure, and GRS protects against a regional catastrophe.',
    docUrl: 'https://learn.microsoft.com/azure/storage/common/storage-redundancy',
    docTitle: 'Data redundancy in Azure Storage - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-010',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'identity-access',
    subtopicName: 'Identity, Microsoft Entra ID & Azure RBAC',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'What is Microsoft Entra ID (formerly known as Azure Active Directory)?',
    options: [
      {
        id: 'A',
        text: 'A cloud-based identity and access management service that provides single sign-on, authentication, and multi-factor authentication.',
        explanation:
          'Correct! Microsoft Entra ID is Microsoft’s cloud identity solution that manages identities, credentials, access tokens, and access policies for Azure and external apps.',
      },
      {
        id: 'B',
        text: 'A physical server rack hosting on-premises Domain Controllers inside Microsoft headquarters.',
        explanation:
          'Incorrect. Microsoft Entra ID is a multi-tenant cloud SaaS service, not a physical server rack for on-premises domain joining.',
      },
      {
        id: 'C',
        text: 'A network firewall that inspects packet headers traversing virtual networks.',
        explanation:
          'Incorrect. That describes Azure Firewall or Network Security Groups, not an identity provider.',
      },
      {
        id: 'D',
        text: 'A relational database service running managed Microsoft SQL Server.',
        explanation:
          'Incorrect. That describes Azure SQL Database.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Microsoft Entra ID is a cloud-based identity and access management solution that enables organizations to authenticate and authorize users to Azure resources, Microsoft 365, and thousands of other SaaS applications.',
    keyTakeaway:
      'Microsoft Entra ID is the cloud identity service for authentication, SSO, Conditional Access, and MFA.',
    examTrap:
      'Do not confuse Microsoft Entra ID with on-premises Windows Server Active Directory Domain Services (AD DS). Entra ID does not use Kerberos or Group Policy Objects by default.',
    docUrl: 'https://learn.microsoft.com/entra/fundamentals/whatis',
    docTitle: 'What is Microsoft Entra ID? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-011',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'identity-access',
    subtopicName: 'Identity, Microsoft Entra ID & Azure RBAC',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'What is the primary difference between Authentication (AuthN) and Authorization (AuthZ)?',
    options: [
      {
        id: 'A',
        text: 'Authentication establishes the identity of a person or service; Authorization determines what level of access or permissions they have.',
        explanation:
          'Correct! Authentication answers "Who are you?" (e.g. verifying password and MFA). Authorization answers "What are you permitted to do?" (e.g. read, write, or delete).',
      },
      {
        id: 'B',
        text: 'Authentication grants role permissions; Authorization verifies passwords and tokens.',
        explanation:
          'Incorrect. This statement inverts the definitions.',
      },
      {
        id: 'C',
        text: 'Authentication applies only to virtual machines; Authorization applies only to users.',
        explanation:
          'Incorrect. Both AuthN and AuthZ apply to human users, service principals, and managed identities.',
      },
      {
        id: 'D',
        text: 'Authentication is managed by Azure Policy; Authorization is managed by Microsoft Sentinel.',
        explanation:
          'Incorrect. Azure Policy enforces compliance rules, while Azure RBAC manages authorization.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Authentication (AuthN) proves identity through credentials, biometrics, or certificates. Authorization (AuthZ) verifies whether that authenticated identity has permission to access a specific resource or execute an action.',
    keyTakeaway:
      'Authentication = Who are you? (Identity); Authorization = What can you do? (Permissions).',
    examTrap:
      'A common exam trap tests whether logging in with MFA is AuthN or AuthZ. Logging in with MFA is Authentication.',
    practicalAnalogy:
      'Showing your passport to a border guard is Authentication. Your passport visa granting you permission to work in the country is Authorization.',
    docUrl: 'https://learn.microsoft.com/azure/active-directory/develop/authentication-vs-authorization',
    docTitle: 'Authentication vs. authorization - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-012',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'identity-access',
    subtopicName: 'Identity, Microsoft Entra ID & Azure RBAC',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt:
      'You need to grant an IT contractor permission to view Azure Virtual Machines and restart them, but prevent them from deleting VMs or modifying the virtual networks. Which mechanism should you use?',
    options: [
      {
        id: 'A',
        text: 'Azure Role-Based Access Control (Azure RBAC)',
        explanation:
          'Correct! Azure RBAC provides fine-grained access management by assigning built-in or custom roles (like Virtual Machine Contributor) at specific management scopes.',
      },
      {
        id: 'B',
        text: 'Azure Resource Locks',
        explanation:
          'Incorrect. Resource locks prevent accidental deletion or modification for all users across a resource, not tailored per-user permissions.',
      },
      {
        id: 'C',
        text: 'Azure Policy',
        explanation:
          'Incorrect. Azure Policy enforces resource configuration rules (like allowed regions or naming conventions), not individual user permissions.',
      },
      {
        id: 'D',
        text: 'Microsoft Purview',
        explanation:
          'Incorrect. Microsoft Purview is for data governance, metadata cataloging, and compliance.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure RBAC is the authorization system built on Azure Resource Manager that provides fine-grained access management of Azure resources based on roles (Reader, Contributor, Owner, or custom roles).',
    keyTakeaway:
      'Azure RBAC grants users, groups, and service principals the exact permissions they need (Principle of Least Privilege).',
    examTrap:
      'Azure RBAC controls user actions (who can do what). Azure Policy controls resource properties (what kinds of resources can be created).',
    docUrl: 'https://learn.microsoft.com/azure/role-based-access-control/overview',
    docTitle: 'What is Azure role-based access control (Azure RBAC)? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-013',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'security-services',
    subtopicName: 'Security Tools & Microsoft Defender for Cloud',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'Which Azure security tool continuously monitors the security posture of your hybrid and multicloud resources and calculates a Secure Score to help you prioritize remediation tasks?',
    options: [
      {
        id: 'A',
        text: 'Microsoft Defender for Cloud',
        explanation:
          'Correct! Microsoft Defender for Cloud is a cloud security posture management (CSPM) and cloud workload protection platform (CWPP) that assesses resources, recommends security hardening, and provides a Secure Score.',
      },
      {
        id: 'B',
        text: 'Azure Key Vault',
        explanation:
          'Incorrect. Azure Key Vault securely stores cryptographic keys, secrets, and certificates.',
      },
      {
        id: 'C',
        text: 'Azure DDoS Protection',
        explanation:
          'Incorrect. Azure DDoS Protection defends applications against Distributed Denial of Service attacks.',
      },
      {
        id: 'D',
        text: 'Azure Bastion',
        explanation:
          'Incorrect. Azure Bastion provides secure browser-based RDP/SSH connectivity to virtual machines.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Microsoft Defender for Cloud analyzes security configurations across your subscriptions, produces actionable recommendations, and calculates an overall Secure Score to measure your security posture.',
    keyTakeaway:
      'Defender for Cloud = Security posture management, threat protection, and Secure Score.',
    examTrap:
      'Defender for Cloud gives recommendations and a Secure Score. Microsoft Sentinel is a full SIEM/SOAR system for threat intelligence and security incident response.',
    docUrl: 'https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction',
    docTitle: 'What is Microsoft Defender for Cloud? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d2-014',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'security-services',
    subtopicName: 'Security Tools & Microsoft Defender for Cloud',
    difficulty: 'Exam-level',
    questionType: 'multiple',
    prompt:
      'Which TWO core principles are fundamental pillars of the Zero Trust security model used by Microsoft? (Select two)',
    options: [
      {
        id: 'A',
        text: 'Verify explicitly',
        explanation:
          'Correct! Always authenticate and authorize based on all available data points (identity, location, device health, service or workload).',
      },
      {
        id: 'B',
        text: 'Trust all traffic originated from inside the corporate intranet',
        explanation:
          'Incorrect. Traditional perimeter security trusted internal traffic, which Zero Trust explicitly rejects ("Never trust, always verify").',
      },
      {
        id: 'C',
        text: 'Use least privilege access',
        explanation:
          'Correct! Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) with adaptive risk-based policies to protect data and productivity.',
      },
      {
        id: 'D',
        text: 'Disable multi-factor authentication on managed desktop devices',
        explanation:
          'Incorrect. Zero Trust encourages strong multi-factor authentication everywhere.',
      },
    ],
    correctOptionIds: ['A', 'C'],
    whyCorrect:
      'The three foundational principles of Zero Trust are: 1) Verify explicitly, 2) Use least privilege access, and 3) Assume breach.',
    keyTakeaway:
      'Zero Trust principles: 1. Verify explicitly, 2. Least privilege access, 3. Assume breach.',
    examTrap:
      'Zero Trust assumes the network has already been breached; it never relies solely on perimeter network trust.',
    docUrl: 'https://learn.microsoft.com/security/zero-trust/zero-trust-overview',
    docTitle: 'Zero Trust guidance center - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },

  // =============================================================
  // DOMAIN 3: Describe Azure management and governance (30-35%)
  // =============================================================
  {
    id: 'az900-d3-001',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'governance-policy',
    subtopicName: 'Azure Policy, Resource Locks & Tags',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'A company wants to ensure that developers can only deploy virtual machines in the "East US" and "North Europe" Azure regions to maintain data compliance. Which feature should they enforce?',
    options: [
      {
        id: 'A',
        text: 'Azure Policy',
        explanation:
          'Correct! Azure Policy enforces organizational standards and assesses compliance at scale. An "Allowed locations" policy prevents deploying resources outside approved regions.',
      },
      {
        id: 'B',
        text: 'Resource Locks',
        explanation:
          'Incorrect. Resource locks prevent deletion or changes to existing resources, but cannot evaluate resource location parameters during creation.',
      },
      {
        id: 'C',
        text: 'Azure Advisor',
        explanation:
          'Incorrect. Azure Advisor provides guidance and best practice tips, but does not block or enforce deployment restrictions.',
      },
      {
        id: 'D',
        text: 'Azure Monitor',
        explanation:
          'Incorrect. Azure Monitor collects and analyzes telemetry and log data; it is not a compliance enforcement engine.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure Policy helps enforce governance by evaluating resources for non-compliance with assigned rules, such as restricting allowed VM SKUs or limiting deployment to specific geographical regions.',
    keyTakeaway:
      'Azure Policy enforces rules and guardrails across resources (e.g. allowed regions, mandatory tags, allowed VM sizes).',
    examTrap:
      'RBAC controls WHO can deploy; Azure Policy controls WHAT properties and configurations can be deployed.',
    practicalAnalogy:
      'Building codes and zoning laws in a city: they dictate what materials and heights are allowed, regardless of who the contractor is.',
    docUrl: 'https://learn.microsoft.com/azure/governance/policy/overview',
    docTitle: 'Overview of Azure Policy - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-002',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'governance-policy',
    subtopicName: 'Azure Policy, Resource Locks & Tags',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'An administrator applies a "CanNotDelete" lock to an Azure Resource Group containing an Azure SQL Database and two Virtual Machines. What happens when a Subscription Owner tries to delete one of the Virtual Machines?',
    options: [
      {
        id: 'A',
        text: 'The deletion succeeds because Subscription Owners can bypass resource locks automatically.',
        explanation:
          'Incorrect. Resource locks apply to all users and administrators, including Subscription Owners and Global Admins, unless the lock itself is first removed.',
      },
      {
        id: 'B',
        text: 'The deletion is blocked until the lock is explicitly removed from the resource group.',
        explanation:
          'Correct! CanNotDelete locks prevent any authorized user from deleting resources. Because child resources inherit parent locks, the VM cannot be deleted until the lock is deleted.',
      },
      {
        id: 'C',
        text: 'The virtual machine is deleted, but its virtual network interface and disk are preserved.',
        explanation:
          'Incorrect. The entire deletion operation is blocked by Resource Manager.',
      },
      {
        id: 'D',
        text: 'The lock converts into a ReadOnly lock for 24 hours.',
        explanation:
          'Incorrect. Locks maintain their configured state until an administrator deletes them.',
      },
    ],
    correctOptionIds: ['B'],
    whyCorrect:
      'Resource locks override even the highest administrator roles in Azure RBAC. When applied at the Resource Group level, all resources inside inherit the lock, blocking deletion attempts until the lock is deliberately removed.',
    keyTakeaway:
      'Resource locks apply to EVERYONE (including Owners). Inherited locks must be removed to perform the locked action.',
    examTrap:
      'Remember the two lock levels: CanNotDelete (can read and modify, cannot delete) and ReadOnly (can only read, cannot modify or delete).',
    docUrl: 'https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources',
    docTitle: 'Lock resources to prevent unexpected changes - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-003',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'cost-tools',
    subtopicName: 'Cost Management, Pricing Calculator & Budgets',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'Before migrating any workloads to the cloud, an IT director wants to estimate the expected monthly operational costs of running 5 virtual machines, 2 storage accounts, and an Azure SQL database in Azure. Which free tool should they use?',
    options: [
      {
        id: 'A',
        text: 'Azure Pricing Calculator',
        explanation:
          'Correct! The Azure Pricing Calculator is a web-based tool used to estimate anticipated monthly costs for new cloud services before deploying them.',
      },
      {
        id: 'B',
        text: 'Microsoft Cost Management',
        explanation:
          'Incorrect. Cost Management is used to analyze, monitor, and optimize costs for resources that are already deployed and running in an active subscription.',
      },
      {
        id: 'C',
        text: 'Azure Service Health',
        explanation:
          'Incorrect. Service Health tracks cloud service disruptions, outages, and planned maintenance.',
      },
      {
        id: 'D',
        text: 'Azure Metrics Explorer',
        explanation:
          'Incorrect. Metrics Explorer visualizes performance metrics (such as CPU usage and network traffic) of active resources.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'The Azure Pricing Calculator allows you to configure prospective Azure architectures and generate detailed cost estimates prior to provisioning any infrastructure.',
    keyTakeaway:
      'Pricing Calculator = Estimate costs BEFORE creating resources; Microsoft Cost Management = Analyze and track costs of EXISTING resources.',
    examTrap:
      'Do not confuse the Azure Pricing Calculator (estimating new Azure architecture costs) with Microsoft Cost Management (analyzing past and current spend).',
    docUrl: 'https://azure.microsoft.com/pricing/calculator/',
    docTitle: 'Azure Pricing Calculator - Microsoft',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-004',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'cost-tools',
    subtopicName: 'Cost Management, Pricing Calculator & Budgets',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'Which Azure cost-saving benefit allows enterprises with existing on-premises Windows Server and SQL Server software licenses with Software Assurance to apply those licenses to Azure virtual machines at a significantly reduced compute rate?',
    options: [
      {
        id: 'A',
        text: 'Azure Hybrid Benefit',
        explanation:
          'Correct! Azure Hybrid Benefit lets you bring your eligible on-premises Windows Server and SQL Server licenses to Azure, paying only the base Linux compute rate.',
      },
      {
        id: 'B',
        text: 'Azure Spot Virtual Machines',
        explanation:
          'Incorrect. Spot VMs offer unused Azure compute capacity at steep discounts, but can be evicted at any time when Azure needs capacity.',
      },
      {
        id: 'C',
        text: 'Azure Free Tier Credits',
        explanation:
          'Incorrect. Free Tier offers 12 months of popular free services for new accounts, not license portability.',
      },
      {
        id: 'D',
        text: 'Azure Enterprise Dev/Test Subscription',
        explanation:
          'Incorrect. Dev/Test subscriptions provide discounted rates for non-production environments, but do not specifically exchange on-premises Software Assurance licenses.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure Hybrid Benefit is a licensing offer that helps you maximize the value of your existing on-premises Windows Server and SQL Server licenses with Software Assurance when migrating to Azure.',
    keyTakeaway:
      'Azure Hybrid Benefit = Use existing on-premises Software Assurance licenses to pay reduced compute rates in Azure.',
    examTrap:
      'Azure Hybrid Benefit requires Software Assurance (SA) or active subscription licenses.',
    docUrl: 'https://learn.microsoft.com/azure/cost-management-billing/manage/azure-hybrid-benefit',
    docTitle: 'Azure Hybrid Benefit documentation - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-005',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'governance-policy',
    subtopicName: 'Azure Policy, Resource Locks & Tags',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'An organization needs to categorize Azure resources by Department, Cost Center, and Environment (e.g., Environment: Production) to aggregate billing reports in Cost Management. Which feature should they apply?',
    options: [
      {
        id: 'A',
        text: 'Resource Tags',
        explanation:
          'Correct! Resource tags are name-value metadata pairs applied to resources, resource groups, and subscriptions to organize billing, inventory, and management.',
      },
      {
        id: 'B',
        text: 'Resource Locks',
        explanation:
          'Incorrect. Locks protect resources from deletion or modification; they do not hold custom key-value metadata for accounting.',
      },
      {
        id: 'C',
        text: 'Network Security Groups',
        explanation:
          'Incorrect. NSGs filter network traffic packets, having nothing to do with accounting metadata.',
      },
      {
        id: 'D',
        text: 'Azure Log Analytics workspaces',
        explanation:
          'Incorrect. Log Analytics stores log events and telemetry, not resource-level metadata tags.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Tags are key-value pairs that help you categorize resources for billing, departmental tracking, ownership identification, and automated operations.',
    keyTakeaway:
      'Tags = Metadata key-value pairs (e.g. Dept: Finance, Env: Prod) used to organize billing and management.',
    examTrap:
      'Tags are not inherited automatically by child resources from parent resource groups unless an Azure Policy is configured to enforce tag inheritance.',
    docUrl: 'https://learn.microsoft.com/azure/azure-resource-manager/management/tag-resources',
    docTitle: 'Use tags to organize your Azure resources - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-006',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'purview-compliance',
    subtopicName: 'Microsoft Purview & Compliance',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'Which unified data governance solution helps organizations map, catalog, discover, and protect sensitive data across on-premises, multicloud, and SaaS data estates?',
    options: [
      {
        id: 'A',
        text: 'Microsoft Purview',
        explanation:
          'Correct! Microsoft Purview provides unified data governance, automated data discovery, sensitive data classification, and end-to-end data lineage mapping across your entire estate.',
      },
      {
        id: 'B',
        text: 'Azure Advisor',
        explanation:
          'Incorrect. Azure Advisor analyzes cloud resource configurations and gives optimization recommendations.',
      },
      {
        id: 'C',
        text: 'Azure Service Health',
        explanation:
          'Incorrect. Service Health notifies you of Azure platform outages and planned maintenance.',
      },
      {
        id: 'D',
        text: 'Azure DevTest Labs',
        explanation:
          'Incorrect. DevTest Labs lets developers quickly create self-service test VMs without wasteful cost.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Microsoft Purview provides automated data discovery, sensitive data classification, and end-to-end data lineage across on-premises, Azure, and third-party clouds.',
    keyTakeaway:
      'Microsoft Purview = Data discovery, sensitive data classification, and governance across all data estates.',
    examTrap:
      'Purview focuses on data governance and data compliance. Azure Policy focuses on cloud resource deployment compliance.',
    docUrl: 'https://learn.microsoft.com/purview/purview',
    docTitle: 'What is Microsoft Purview? - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-007',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'monitoring-health',
    subtopicName: 'Azure Monitor, Log Analytics & Service Health',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'You experience an unexpected outage of an Azure service and want to see if Microsoft has reported a widespread incident or planned maintenance impacting your specific subscriptions and regions. Which tool provides personalized notifications regarding platform health?',
    options: [
      {
        id: 'A',
        text: 'Azure Service Health',
        explanation:
          'Correct! Azure Service Health provides personalized alerts and guidance when Azure service issues, planned maintenance, or security advisories affect your specific resources.',
      },
      {
        id: 'B',
        text: 'Azure Status page (public)',
        explanation:
          'Incorrect. The public Azure Status page provides global, unauthenticated status of widespread outages across all regions, but does not provide personalized insight into your specific subscription resources.',
      },
      {
        id: 'C',
        text: 'Azure Application Insights',
        explanation:
          'Incorrect. Application Insights monitors live web application performance, telemetry, and runtime exceptions.',
      },
      {
        id: 'D',
        text: 'Azure Pricing Calculator',
        explanation:
          'Incorrect. The Pricing Calculator estimates prospective architectural costs.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure Service Health gives you a personalized dashboard of the health of the specific Azure services and regions you are actively using, along with planned maintenance notifications.',
    keyTakeaway:
      'Azure Service Health = Personalized platform health affecting YOUR specific subscriptions and resources; Azure Status = Public global status of Azure as a whole.',
    examTrap:
      'Remember: Azure Status is generic and public; Azure Service Health is personalized to your tenant and subscription.',
    docUrl: 'https://learn.microsoft.com/azure/service-health/overview',
    docTitle: 'Azure Service Health documentation - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-008',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'monitoring-health',
    subtopicName: 'Azure Monitor, Log Analytics & Service Health',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'Which comprehensive monitoring service collects, analyzes, and acts on telemetry from both cloud and on-premises environments, offering metrics, logs, and alerting?',
    options: [
      {
        id: 'A',
        text: 'Azure Monitor',
        explanation:
          'Correct! Azure Monitor maximizes availability and performance by delivering a comprehensive solution for collecting, analyzing, and acting on telemetry from Azure and on-premises environments.',
      },
      {
        id: 'B',
        text: 'Azure Bastion',
        explanation:
          'Incorrect. Azure Bastion provides secure browser-based administrative connection to VMs.',
      },
      {
        id: 'C',
        text: 'Azure Policy',
        explanation:
          'Incorrect. Azure Policy evaluates resource configurations against compliance rules.',
      },
      {
        id: 'D',
        text: 'Microsoft Cost Management',
        explanation:
          'Incorrect. Cost Management monitors monetary spending, not operational performance telemetry.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure Monitor is the overarching observability platform that ingests metrics (numerical performance data) and logs (event and activity records stored in Log Analytics) to generate alerts and autoscale triggers.',
    keyTakeaway:
      'Azure Monitor collects Metrics (real-time numerical data) and Logs (event records analyzed with Kusto Query Language in Log Analytics).',
    examTrap:
      'Log Analytics and Application Insights are features that operate under the umbrella of Azure Monitor.',
    docUrl: 'https://learn.microsoft.com/azure/azure-monitor/overview',
    docTitle: 'Azure Monitor overview - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-009',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'advisor-guidance',
    subtopicName: 'Azure Advisor Recommendations',
    difficulty: 'Beginner',
    questionType: 'multiple',
    prompt:
      'Which of the following are official recommendation categories evaluated by Azure Advisor to help optimize your deployments? (Select two)',
    options: [
      {
        id: 'A',
        text: 'Cost optimization (e.g. shutting down underutilized VMs)',
        explanation:
          'Correct! Cost is one of the five core categories in Azure Advisor, identifying idle or overprovisioned resources.',
      },
      {
        id: 'B',
        text: 'Programming language compiler optimization',
        explanation:
          'Incorrect. Azure Advisor does not rewrite your application source code or tune software compilers.',
      },
      {
        id: 'C',
        text: 'Reliability / High Availability',
        explanation:
          'Correct! Reliability is a core category in Azure Advisor, recommending multi-zone deployments and backup configurations.',
      },
      {
        id: 'D',
        text: 'Competitor pricing benchmarking',
        explanation:
          'Incorrect. Azure Advisor evaluates your Azure environment against Microsoft best practices, not other cloud providers.',
      },
    ],
    correctOptionIds: ['A', 'C'],
    whyCorrect:
      'Azure Advisor provides personalized recommendations across five pillars: Reliability (High Availability), Security, Performance, Cost, and Operational Excellence.',
    keyTakeaway:
      'Azure Advisor 5 Pillars: Cost, Security, Reliability (HA), Performance, Operational Excellence.',
    examTrap:
      'Think of Azure Advisor as your personalized digital cloud architect that scans configurations and recommends improvements across the 5 pillars.',
    docUrl: 'https://learn.microsoft.com/azure/advisor/advisor-overview',
    docTitle: 'Introduction to Azure Advisor - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-010',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'management-tools',
    subtopicName: 'Azure Portal, Cloud Shell, CLI & ARM/Bicep',
    difficulty: 'Intermediate',
    questionType: 'single',
    prompt:
      'You are building an automated deployment pipeline to repeatedly provision identical sets of virtual networks, storage accounts, and virtual machines in a declarative JSON format. Which Azure service or technology enables this?',
    options: [
      {
        id: 'A',
        text: 'Azure Resource Manager (ARM) templates',
        explanation:
          'Correct! ARM templates use declarative JSON (or Bicep) syntax to define the infrastructure and configuration for your Azure solutions, enabling reproducible Infrastructure as Code (IaC).',
      },
      {
        id: 'B',
        text: 'Azure Cost Management Export',
        explanation:
          'Incorrect. Cost Management exports CSV billing records to storage accounts, not deployment templates.',
      },
      {
        id: 'C',
        text: 'Azure DNS Private Zones',
        explanation:
          'Incorrect. Azure DNS Private Zones provide domain name resolution within virtual networks.',
      },
      {
        id: 'D',
        text: 'Microsoft Entra Connect',
        explanation:
          'Incorrect. Entra Connect synchronizes on-premises Active Directory identities with Microsoft Entra ID.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'ARM templates implement Infrastructure as Code (IaC), allowing you to declare what infrastructure should look like rather than writing imperative procedural scripts.',
    keyTakeaway:
      'ARM Templates / Bicep = Declarative Infrastructure as Code (IaC) in JSON or Bicep for repeatable deployments.',
    examTrap:
      'Declarative means you define WHAT you want deployed, and Azure Resource Manager handles HOW to create it.',
    docUrl: 'https://learn.microsoft.com/azure/azure-resource-manager/templates/overview',
    docTitle: 'ARM templates overview - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-011',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'management-tools',
    subtopicName: 'Azure Portal, Cloud Shell, CLI & ARM/Bicep',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt:
      'An administrator wants to run Azure CLI and Azure PowerShell commands directly from any modern web browser without installing any tools or software on their local computer. Which tool should they launch?',
    options: [
      {
        id: 'A',
        text: 'Azure Cloud Shell',
        explanation:
          'Correct! Azure Cloud Shell is an interactive, authenticated, browser-accessible terminal for managing Azure resources that includes Bash and PowerShell pre-installed with common CLI tools.',
      },
      {
        id: 'B',
        text: 'Visual Studio Code Desktop',
        explanation:
          'Incorrect. VS Code Desktop is a locally installed code editor.',
      },
      {
        id: 'C',
        text: 'Remote Desktop Connection (mstsc)',
        explanation:
          'Incorrect. RDP is a remote desktop protocol tool for connecting to Windows server sessions.',
      },
      {
        id: 'D',
        text: 'Windows Terminal Desktop App',
        explanation:
          'Incorrect. Windows Terminal is an application installed locally on Windows client machines.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'Azure Cloud Shell provides a browser-based shell authenticated to your Azure account. You can choose either Bash or PowerShell, and it attaches an Azure Storage account to persist your files.',
    keyTakeaway:
      'Azure Cloud Shell = Browser-accessible terminal with Bash or PowerShell; requires an Azure File share to persist data.',
    examTrap:
      'Cloud Shell requires an Azure storage account to persist files across sessions ($HOME directory).',
    docUrl: 'https://learn.microsoft.com/azure/cloud-shell/overview',
    docTitle: 'Overview of Azure Cloud Shell - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
  {
    id: 'az900-d3-012',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'governance-policy',
    subtopicName: 'Azure Policy, Resource Locks & Tags',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt:
      'In Azure governance, what is the term for a group or collection of multiple related Azure Policy definitions managed together as a single administrative unit?',
    options: [
      {
        id: 'A',
        text: 'An Initiative definition (or Policy Set)',
        explanation:
          'Correct! An Azure Policy Initiative (also called a policy set) groups multiple policy definitions together toward a single overarching compliance goal, such as ensuring ISO 27001 or PCI DSS compliance.',
      },
      {
        id: 'B',
        text: 'A Resource Group',
        explanation:
          'Incorrect. A Resource Group is a container for holding related Azure resources (VMs, databases), not a governance policy collection.',
      },
      {
        id: 'C',
        text: 'A Management Group',
        explanation:
          'Incorrect. A Management Group is a container for subscriptions in the resource hierarchy, where policies can be assigned.',
      },
      {
        id: 'D',
        text: 'A Role Assignment',
        explanation:
          'Incorrect. A Role Assignment binds a security principal (user/group) to an RBAC role definition.',
      },
    ],
    correctOptionIds: ['A'],
    whyCorrect:
      'An Initiative definition bundles several individual policy definitions into one logical package, simplifying management and tracking compliance against complex standards.',
    keyTakeaway:
      'Initiative Definition = A collection of multiple Azure Policy definitions assigned together.',
    examTrap:
      'When an exam question mentions tracking compliance for a large standard (like HIPAA or PCI DSS) with many rules, think Policy Initiative.',
    docUrl: 'https://learn.microsoft.com/azure/governance/policy/overview#initiative-definition',
    docTitle: 'Azure Policy initiative definitions - Microsoft Learn',
    verificationStatus: 'verified',
    lastReviewed: '2025-05-10',
  },
];
