/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'accueil' | 'services' | 'apropos' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  features: string[];
  accentColor: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export interface AIAnalysisResult {
  projectName: string;
  summary: string;
  recommendedStack: string[];
  featuresList: string[];
  estimatedTimeline: string;
  difficulty: 'Simple' | 'Moyen' | 'Complexe';
  keyAdvices: string[];
}
