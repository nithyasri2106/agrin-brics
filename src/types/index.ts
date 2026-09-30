export type NationCode = 'IN' | 'BR' | 'ZA' | 'CN' | 'RU';

export interface BricsNation {
  code: NationCode;
  name: string;
  nativeName: string;
  flag: string;
  primaryZone: string;
  coordinates: { lat: number; lng: number };
  climateType: string;
  primaryCrops: string[];
  soilType: string;
}

export type LanguageCode = 'en' | 'hi' | 'pt' | 'zh' | 'ru';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  precipitationChance: number;
  windSpeed: number;
  solarRadiation: number;
  evapotranspiration: number;
  forecast: {
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    actionAdvice: string;
  }[];
}

export interface SoilMetrics {
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  ph: number;
  organicCarbon: number; // %
  moisture: number; // %
  electricalConductivity: number; // dS/m
  microbiomeActivity: 'Low' | 'Moderate' | 'High' | 'Optimal';
}

export interface NdviZone {
  zoneId: string;
  name: string;
  ndviValue: number; // 0 to 1
  vegetationHealth: 'Critical' | 'Stressed' | 'Moderate' | 'Vigorous';
  waterDeficit: boolean;
  canopyCoverPct: number;
}

export interface RegenerativeCropPlan {
  id: string;
  primaryCrop: string;
  scientificName: string;
  companionCrop: string;
  coverCrop: string;
  growingCycleDays: number;
  soilBenefits: string[];
  carbonOffsetKgPerHa: number;
  waterSavingPct: number;
  expectedYieldTonsHa: number;
  bioInputs: {
    name: string;
    recipe: string;
    applicationStage: string;
  }[];
}

export interface DiseaseSample {
  id: string;
  cropName: string;
  diseaseName: string;
  scientificClassification: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  imageUrl: string;
  symptoms: string[];
  organicRemedies: string[];
  regenerativeBioTreatments: string[];
  preventionTechniques: string[];
}

export interface TransboundaryAlert {
  id: string;
  type: 'Pest Migration' | 'Climate Shock' | 'Soil Degradation' | 'Water Scarcity';
  severity: 'Warning' | 'High Alert' | 'Critical';
  originCountry: string;
  affectedRegions: string[];
  title: string;
  description: string;
  cooperativeActions: string[];
  reportedDate: string;
}

export interface OpenAgriEndpoint {
  method: 'GET' | 'POST';
  endpoint: string;
  description: string;
  sampleRequest?: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
}
