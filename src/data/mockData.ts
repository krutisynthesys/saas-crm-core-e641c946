// Mock data for the CRM application

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'cold' | 'engaged' | 'opportunity' | 'won' | 'lost';
  priority: 'high' | 'medium' | 'low';
  owner: string;
  createdAt: string;
  lastActivity: string;
  source: string;
  industry: string;
  dealValue: number;
  tags: string[];
}

export interface Opportunity {
  id: string;
  name: string;
  leadId: string;
  leadName: string;
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  owner: string;
  expectedCloseDate: string;
  createdAt: string;
  products: string[];
  notes: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  leadId: string;
  leadName: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'demo';
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task-completed';
  leadId: string;
  leadName: string;
  description: string;
  user: string;
  timestamp: string;
  outcome?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales-rep';
  avatar: string;
  department: string;
  performance: {
    leadsAssigned: number;
    dealsWon: number;
    revenue: number;
    tasksCompleted: number;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  createdBy: string;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
}

// Generate mock leads
export const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'engaged',
    priority: 'high',
    owner: 'John Smith',
    createdAt: '2024-12-01',
    lastActivity: '2024-12-10',
    source: 'Website',
    industry: 'Technology',
    dealValue: 85000,
    tags: ['Enterprise', 'Q1 Target'],
  },
  {
    id: 'L002',
    name: 'Michael Chen',
    email: 'mchen@globalinc.com',
    phone: '+1 (555) 234-5678',
    company: 'Global Industries',
    status: 'opportunity',
    priority: 'high',
    owner: 'Emily Davis',
    createdAt: '2024-11-15',
    lastActivity: '2024-12-09',
    source: 'Referral',
    industry: 'Manufacturing',
    dealValue: 120000,
    tags: ['Manufacturing', 'Hot Lead'],
  },
  {
    id: 'L003',
    name: 'Jessica Williams',
    email: 'jwilliams@startupxyz.io',
    phone: '+1 (555) 345-6789',
    company: 'StartupXYZ',
    status: 'new',
    priority: 'medium',
    owner: 'John Smith',
    createdAt: '2024-12-08',
    lastActivity: '2024-12-08',
    source: 'LinkedIn',
    industry: 'SaaS',
    dealValue: 35000,
    tags: ['Startup', 'SaaS'],
  },
  {
    id: 'L004',
    name: 'Robert Martinez',
    email: 'rmartinez@financepro.com',
    phone: '+1 (555) 456-7890',
    company: 'FinancePro LLC',
    status: 'cold',
    priority: 'low',
    owner: 'Sarah Wilson',
    createdAt: '2024-10-20',
    lastActivity: '2024-11-05',
    source: 'Trade Show',
    industry: 'Finance',
    dealValue: 50000,
    tags: ['Finance', 'Reactivate'],
  },
  {
    id: 'L005',
    name: 'Amanda Brown',
    email: 'abrown@healthplus.org',
    phone: '+1 (555) 567-8901',
    company: 'HealthPlus Medical',
    status: 'engaged',
    priority: 'high',
    owner: 'Emily Davis',
    createdAt: '2024-11-28',
    lastActivity: '2024-12-10',
    source: 'Website',
    industry: 'Healthcare',
    dealValue: 95000,
    tags: ['Healthcare', 'Enterprise'],
  },
  {
    id: 'L006',
    name: 'David Kim',
    email: 'dkim@retailmax.com',
    phone: '+1 (555) 678-9012',
    company: 'RetailMax Corp',
    status: 'won',
    priority: 'high',
    owner: 'John Smith',
    createdAt: '2024-10-01',
    lastActivity: '2024-12-05',
    source: 'Referral',
    industry: 'Retail',
    dealValue: 150000,
    tags: ['Retail', 'Closed'],
  },
  {
    id: 'L007',
    name: 'Lisa Thompson',
    email: 'lthompson@edutech.edu',
    phone: '+1 (555) 789-0123',
    company: 'EduTech Institute',
    status: 'opportunity',
    priority: 'medium',
    owner: 'Sarah Wilson',
    createdAt: '2024-11-10',
    lastActivity: '2024-12-08',
    source: 'Webinar',
    industry: 'Education',
    dealValue: 65000,
    tags: ['Education', 'Demo Scheduled'],
  },
  {
    id: 'L008',
    name: 'James Anderson',
    email: 'janderson@constructco.com',
    phone: '+1 (555) 890-1234',
    company: 'ConstructCo',
    status: 'new',
    priority: 'medium',
    owner: 'Emily Davis',
    createdAt: '2024-12-09',
    lastActivity: '2024-12-09',
    source: 'Website',
    industry: 'Construction',
    dealValue: 78000,
    tags: ['Construction'],
  },
  {
    id: 'L009',
    name: 'Michelle Garcia',
    email: 'mgarcia@mediagroup.com',
    phone: '+1 (555) 901-2345',
    company: 'Media Group Inc',
    status: 'lost',
    priority: 'medium',
    owner: 'John Smith',
    createdAt: '2024-09-15',
    lastActivity: '2024-11-20',
    source: 'Cold Call',
    industry: 'Media',
    dealValue: 45000,
    tags: ['Media', 'Lost to Competitor'],
  },
  {
    id: 'L010',
    name: 'Christopher Lee',
    email: 'clee@logisticspro.com',
    phone: '+1 (555) 012-3456',
    company: 'LogisticsPro',
    status: 'engaged',
    priority: 'high',
    owner: 'Sarah Wilson',
    createdAt: '2024-11-25',
    lastActivity: '2024-12-10',
    source: 'Partner',
    industry: 'Logistics',
    dealValue: 110000,
    tags: ['Logistics', 'Enterprise', 'Priority'],
  },
];

// Generate mock opportunities
export const mockOpportunities: Opportunity[] = [
  {
    id: 'OPP001',
    name: 'TechCorp Enterprise License',
    leadId: 'L001',
    leadName: 'Sarah Johnson',
    stage: 'negotiation',
    value: 85000,
    probability: 75,
    owner: 'John Smith',
    expectedCloseDate: '2024-12-31',
    createdAt: '2024-12-05',
    products: ['Enterprise Suite', 'Premium Support'],
    notes: 'Final pricing discussion scheduled for next week.',
  },
  {
    id: 'OPP002',
    name: 'Global Industries Implementation',
    leadId: 'L002',
    leadName: 'Michael Chen',
    stage: 'proposal',
    value: 120000,
    probability: 60,
    owner: 'Emily Davis',
    expectedCloseDate: '2025-01-15',
    createdAt: '2024-11-20',
    products: ['Full Platform', 'Integration Services', 'Training'],
    notes: 'Proposal sent, awaiting feedback from procurement.',
  },
  {
    id: 'OPP003',
    name: 'HealthPlus Annual Contract',
    leadId: 'L005',
    leadName: 'Amanda Brown',
    stage: 'qualification',
    value: 95000,
    probability: 40,
    owner: 'Emily Davis',
    expectedCloseDate: '2025-02-01',
    createdAt: '2024-12-01',
    products: ['Healthcare Module', 'Compliance Package'],
    notes: 'Initial requirements gathering in progress.',
  },
  {
    id: 'OPP004',
    name: 'RetailMax Expansion',
    leadId: 'L006',
    leadName: 'David Kim',
    stage: 'closed-won',
    value: 150000,
    probability: 100,
    owner: 'John Smith',
    expectedCloseDate: '2024-12-05',
    createdAt: '2024-10-15',
    products: ['Retail Suite', 'Analytics Add-on', 'API Access'],
    notes: 'Contract signed. Implementation starts January.',
  },
  {
    id: 'OPP005',
    name: 'EduTech Pilot Program',
    leadId: 'L007',
    leadName: 'Lisa Thompson',
    stage: 'proposal',
    value: 65000,
    probability: 55,
    owner: 'Sarah Wilson',
    expectedCloseDate: '2025-01-20',
    createdAt: '2024-11-15',
    products: ['Education Module', 'Student Management'],
    notes: 'Demo completed successfully. Preparing proposal.',
  },
  {
    id: 'OPP006',
    name: 'LogisticsPro Integration',
    leadId: 'L010',
    leadName: 'Christopher Lee',
    stage: 'negotiation',
    value: 110000,
    probability: 70,
    owner: 'Sarah Wilson',
    expectedCloseDate: '2024-12-28',
    createdAt: '2024-11-28',
    products: ['Logistics Module', 'Fleet Management', 'API Integration'],
    notes: 'Discussing discount for multi-year commitment.',
  },
];

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: 'T001',
    title: 'Follow-up call with Sarah Johnson',
    description: 'Discuss enterprise license pricing and timeline',
    leadId: 'L001',
    leadName: 'Sarah Johnson',
    assignee: 'John Smith',
    dueDate: '2024-12-11',
    priority: 'high',
    status: 'pending',
    type: 'call',
  },
  {
    id: 'T002',
    title: 'Send proposal to Global Industries',
    description: 'Prepare and send updated proposal with implementation timeline',
    leadId: 'L002',
    leadName: 'Michael Chen',
    assignee: 'Emily Davis',
    dueDate: '2024-12-12',
    priority: 'high',
    status: 'in-progress',
    type: 'email',
  },
  {
    id: 'T003',
    title: 'Product demo for StartupXYZ',
    description: 'Schedule and conduct product demonstration',
    leadId: 'L003',
    leadName: 'Jessica Williams',
    assignee: 'John Smith',
    dueDate: '2024-12-13',
    priority: 'medium',
    status: 'pending',
    type: 'demo',
  },
  {
    id: 'T004',
    title: 'Re-engagement call with FinancePro',
    description: 'Attempt to re-engage cold lead with new offerings',
    leadId: 'L004',
    leadName: 'Robert Martinez',
    assignee: 'Sarah Wilson',
    dueDate: '2024-12-14',
    priority: 'low',
    status: 'pending',
    type: 'call',
  },
  {
    id: 'T005',
    title: 'Meeting with HealthPlus team',
    description: 'Requirements gathering session with IT and procurement',
    leadId: 'L005',
    leadName: 'Amanda Brown',
    assignee: 'Emily Davis',
    dueDate: '2024-12-11',
    priority: 'high',
    status: 'pending',
    type: 'meeting',
  },
  {
    id: 'T006',
    title: 'Contract review for RetailMax',
    description: 'Review and finalize contract terms',
    leadId: 'L006',
    leadName: 'David Kim',
    assignee: 'John Smith',
    dueDate: '2024-12-10',
    priority: 'high',
    status: 'completed',
    type: 'follow-up',
  },
  {
    id: 'T007',
    title: 'Send case studies to EduTech',
    description: 'Share relevant education industry case studies',
    leadId: 'L007',
    leadName: 'Lisa Thompson',
    assignee: 'Sarah Wilson',
    dueDate: '2024-12-12',
    priority: 'medium',
    status: 'pending',
    type: 'email',
  },
  {
    id: 'T008',
    title: 'Initial outreach to ConstructCo',
    description: 'First contact call to understand requirements',
    leadId: 'L008',
    leadName: 'James Anderson',
    assignee: 'Emily Davis',
    dueDate: '2024-12-15',
    priority: 'medium',
    status: 'pending',
    type: 'call',
  },
];

// Generate mock activities
export const mockActivities: Activity[] = [
  {
    id: 'A001',
    type: 'call',
    leadId: 'L001',
    leadName: 'Sarah Johnson',
    description: 'Discussed enterprise features and pricing structure',
    user: 'John Smith',
    timestamp: '2024-12-10T14:30:00',
    outcome: 'Positive - Moving to negotiation',
  },
  {
    id: 'A002',
    type: 'email',
    leadId: 'L002',
    leadName: 'Michael Chen',
    description: 'Sent updated proposal with revised pricing',
    user: 'Emily Davis',
    timestamp: '2024-12-10T11:15:00',
  },
  {
    id: 'A003',
    type: 'meeting',
    leadId: 'L005',
    leadName: 'Amanda Brown',
    description: 'Product demo with healthcare compliance team',
    user: 'Emily Davis',
    timestamp: '2024-12-09T15:00:00',
    outcome: 'Interested in compliance features',
  },
  {
    id: 'A004',
    type: 'task-completed',
    leadId: 'L006',
    leadName: 'David Kim',
    description: 'Contract signed and deal closed',
    user: 'John Smith',
    timestamp: '2024-12-05T16:45:00',
    outcome: 'Deal Won - $150,000',
  },
  {
    id: 'A005',
    type: 'note',
    leadId: 'L010',
    leadName: 'Christopher Lee',
    description: 'Client interested in 3-year commitment for additional discount',
    user: 'Sarah Wilson',
    timestamp: '2024-12-10T09:30:00',
  },
  {
    id: 'A006',
    type: 'call',
    leadId: 'L007',
    leadName: 'Lisa Thompson',
    description: 'Follow-up call after demo - very positive feedback',
    user: 'Sarah Wilson',
    timestamp: '2024-12-08T10:00:00',
    outcome: 'Demo successful',
  },
  {
    id: 'A007',
    type: 'email',
    leadId: 'L003',
    leadName: 'Jessica Williams',
    description: 'Sent welcome email with product overview',
    user: 'John Smith',
    timestamp: '2024-12-08T08:30:00',
  },
  {
    id: 'A008',
    type: 'call',
    leadId: 'L009',
    leadName: 'Michelle Garcia',
    description: 'Final call - chose competitor solution',
    user: 'John Smith',
    timestamp: '2024-11-20T14:00:00',
    outcome: 'Lost to competitor',
  },
];

// Generate mock users
export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'sales-rep',
    avatar: 'JS',
    department: 'Sales',
    performance: {
      leadsAssigned: 45,
      dealsWon: 12,
      revenue: 485000,
      tasksCompleted: 89,
    },
  },
  {
    id: 'U002',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'sales-rep',
    avatar: 'ED',
    department: 'Sales',
    performance: {
      leadsAssigned: 38,
      dealsWon: 9,
      revenue: 320000,
      tasksCompleted: 76,
    },
  },
  {
    id: 'U003',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'manager',
    avatar: 'SW',
    department: 'Sales',
    performance: {
      leadsAssigned: 52,
      dealsWon: 15,
      revenue: 580000,
      tasksCompleted: 102,
    },
  },
  {
    id: 'U004',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    avatar: 'AU',
    department: 'Management',
    performance: {
      leadsAssigned: 0,
      dealsWon: 0,
      revenue: 0,
      tasksCompleted: 45,
    },
  },
];

// Generate mock email templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'ET001',
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform - Getting Started Guide',
    content: 'Dear {{name}},\n\nWelcome to our platform! We\'re excited to have you on board...',
    category: 'Onboarding',
    createdBy: 'Admin User',
    createdAt: '2024-10-01',
    lastUsed: '2024-12-10',
    usageCount: 156,
  },
  {
    id: 'ET002',
    name: 'Follow-up After Demo',
    subject: 'Thank You for Your Time - Next Steps',
    content: 'Hi {{name}},\n\nThank you for taking the time to see our demo yesterday...',
    category: 'Sales',
    createdBy: 'John Smith',
    createdAt: '2024-09-15',
    lastUsed: '2024-12-09',
    usageCount: 89,
  },
  {
    id: 'ET003',
    name: 'Proposal Send',
    subject: 'Your Custom Proposal from {{company}}',
    content: 'Dear {{name}},\n\nPlease find attached the proposal we discussed...',
    category: 'Sales',
    createdBy: 'Emily Davis',
    createdAt: '2024-08-20',
    lastUsed: '2024-12-08',
    usageCount: 67,
  },
  {
    id: 'ET004',
    name: 'Re-engagement',
    subject: 'We Miss You! Check Out What\'s New',
    content: 'Hi {{name}},\n\nIt\'s been a while since we connected...',
    category: 'Marketing',
    createdBy: 'Admin User',
    createdAt: '2024-11-01',
    lastUsed: '2024-12-05',
    usageCount: 34,
  },
  {
    id: 'ET005',
    name: 'Contract Renewal',
    subject: 'Your Contract Renewal - Special Offer Inside',
    content: 'Dear {{name}},\n\nYour contract is coming up for renewal...',
    category: 'Account Management',
    createdBy: 'Sarah Wilson',
    createdAt: '2024-07-10',
    lastUsed: '2024-12-01',
    usageCount: 45,
  },
];

// Dashboard metrics
export const dashboardMetrics = {
  totalLeads: 248,
  newLeadsThisMonth: 45,
  activeOpportunities: 32,
  totalRevenue: 1385000,
  revenueTarget: 2000000,
  conversionRate: 24.5,
  avgDealSize: 82500,
  tasksCompleted: 156,
  tasksPending: 28,
  activitiesThisWeek: 89,
};

// Pipeline data for charts
export const pipelineData = [
  { stage: 'New Leads', count: 45, value: 850000 },
  { stage: 'Qualified', count: 32, value: 720000 },
  { stage: 'Proposal', count: 18, value: 540000 },
  { stage: 'Negotiation', count: 12, value: 420000 },
  { stage: 'Closed Won', count: 8, value: 350000 },
];

// Monthly performance data
export const monthlyPerformanceData = [
  { month: 'Jul', leads: 32, deals: 5, revenue: 125000 },
  { month: 'Aug', leads: 38, deals: 7, revenue: 185000 },
  { month: 'Sep', leads: 45, deals: 8, revenue: 210000 },
  { month: 'Oct', leads: 42, deals: 10, revenue: 275000 },
  { month: 'Nov', leads: 48, deals: 11, revenue: 295000 },
  { month: 'Dec', leads: 52, deals: 12, revenue: 320000 },
];

// Lead sources data
export const leadSourcesData = [
  { source: 'Website', count: 85, percentage: 34 },
  { source: 'Referral', count: 62, percentage: 25 },
  { source: 'LinkedIn', count: 45, percentage: 18 },
  { source: 'Trade Show', count: 32, percentage: 13 },
  { source: 'Cold Call', count: 24, percentage: 10 },
];

// Team performance data
export const teamPerformanceData = [
  { name: 'John Smith', deals: 12, revenue: 485000, target: 500000 },
  { name: 'Emily Davis', deals: 9, revenue: 320000, target: 400000 },
  { name: 'Sarah Wilson', deals: 15, revenue: 580000, target: 600000 },
];
