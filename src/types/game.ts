export type GameStage = 'intro' | 'production' | 'distribution' | 'consumption' | 'cycle_summary' | 'final_reflection' | 'quiz';

export type SocialLevel = 'harmonis' | 'stabil' | 'tegang' | 'konflik';

export interface Product {
  id: string;
  name: string;
  category: string;
  baseCost: number; // Biaya bahan per unit
  suggestedPrice: number;
  iconName: string;
  description: string;
  minBatch: number;
  maxBatch: number;
  ecoFactor: string; // Karakteristik produksi ramah lingkungan
}

export interface ProductionChoice {
  product: Product;
  quantity: number;
  laborType: 'local_gotong_royong' | 'standard_hired' | 'cheap_overwork';
  qualityLevel: 'standar' | 'premium_organik';
}

export interface DistributionDilemma {
  id: string;
  title: string;
  context: string;
  scenarioDescription: string;
  associativeOption: {
    title: string;
    type: 'Kerja Sama (Kooperasi)' | 'Akomodasi (Musyawarah)' | 'Asimilasi & Akulturasi';
    description: string;
    costMultiplier: number; // e.g. 0.85 (efficient through cooperation)
    socialImpact: number; // e.g. +15
    distributionSuccessRate: number; // e.g. 0.98
    explanation: string;
  };
  dissociativeOption: {
    title: string;
    type: 'Persaingan Tidak Sehat' | 'Kontravensi' | 'Pertentangan / Konflik';
    description: string;
    costMultiplier: number; // e.g. 0.60 initially, but risk
    socialImpact: number; // e.g. -20
    distributionSuccessRate: number; // e.g. 0.65 (risk of blockade/dispute)
    explanation: string;
  };
}

export interface CycleRecord {
  cycleNumber: number;
  production: {
    productName: string;
    quantity: number;
    totalCost: number;
    unitCost: number;
    laborChoiceLabel: string;
  };
  distribution: {
    choiceType: 'associative' | 'dissociative';
    title: string;
    socialChange: number;
    cost: number;
    successRate: number;
    deliveredUnits: number;
  };
  consumption: {
    sellingPrice: number;
    unitsSold: number;
    totalRevenue: number;
    grossProfit: number;
    netProfit: number;
    marketFeedback: string;
  };
  endingMoney: number;
  endingSocialScore: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  concept: 'Produksi' | 'Distribusi' | 'Konsumsi' | 'Interaksi Asosiatif' | 'Interaksi Disosiatif';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryItem {
  term: string;
  category: 'Kegiatan Ekonomi' | 'Interaksi Sosial' | 'Prinsip & Motif';
  definition: string;
  example: string;
  icon: string;
}
