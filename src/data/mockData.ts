import type { BricsNation, WeatherData, SoilMetrics, NdviZone, RegenerativeCropPlan, DiseaseSample, TransboundaryAlert, OpenAgriEndpoint } from '../types';

export const BRICS_NATIONS: BricsNation[] = [
  {
    code: 'IN',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    primaryZone: 'Deccan Semi-Arid & Indo-Gangetic Alluvial',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    climateType: 'Tropical Monsoon / Semi-Arid',
    primaryCrops: ['Millets (Bajra/Ragi)', 'Chickpeas', 'Rice', 'Mustard', 'Cotton'],
    soilType: 'Black Cotton Vertisols & Alluvial Loam'
  },
  {
    code: 'BR',
    name: 'Brazil',
    nativeName: 'Brasil',
    flag: '🇧🇷',
    primaryZone: 'Cerrado Agro-Ecological Corridor & Paraná Basin',
    coordinates: { lat: -14.235, lng: -51.9253 },
    climateType: 'Tropical Savanna / Subtropical',
    primaryCrops: ['Soybeans (Non-GMO)', 'Maize', 'Coffee', 'Cassava', 'Sugarcane'],
    soilType: 'Oxisols (Ferralsols) with Low Base Saturation'
  },
  {
    code: 'ZA',
    name: 'South Africa',
    nativeName: 'iNingizimu Afrika',
    flag: '🇿🇦',
    primaryZone: 'Free State Grain Belt & Limpopo Valley',
    coordinates: { lat: -30.5595, lng: 22.9375 },
    climateType: 'Semi-Arid to Mediterranean',
    primaryCrops: ['Sorghum', 'Maize', 'Sunflower', 'Rooibos', 'Legumes'],
    soilType: 'Arenosols & Sandy Red Loams'
  },
  {
    code: 'CN',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    primaryZone: 'Huang-Huai-Hai Plain & Yangtze River Basin',
    coordinates: { lat: 35.8617, lng: 104.1954 },
    climateType: 'Temperate Continental & Subtropical Monsoonal',
    primaryCrops: ['Winter Wheat', 'Soybean', 'Rapeseed', 'Rice', 'Tea'],
    soilType: 'Fluvisols & Brown Forest Cambisols'
  },
  {
    code: 'RU',
    name: 'Russia',
    nativeName: 'Россия',
    flag: '🇷🇺',
    primaryZone: 'Kuban Chernozem & Central Black Soil Zone',
    coordinates: { lat: 61.524, lng: 105.3188 },
    climateType: 'Humid Continental Steppe',
    primaryCrops: ['Spring/Winter Wheat', 'Barley', 'Sunflower', 'Buckwheat', 'Flax'],
    soilType: 'Deep Chernozem (Black Earth - high humus)'
  }
];

export const NATION_WEATHER: Record<string, WeatherData> = {
  IN: {
    temp: 29.4,
    condition: 'Partly Sunny & Mild Breeze',
    humidity: 58,
    precipitationChance: 15,
    windSpeed: 12.5,
    solarRadiation: 780,
    evapotranspiration: 4.8,
    forecast: [
      { day: 'Mon', tempMax: 31, tempMin: 22, condition: 'Clear', actionAdvice: 'Optimal time for neem cake soil incorporation' },
      { day: 'Tue', tempMax: 30, tempMin: 21, condition: 'Partly Cloudy', actionAdvice: 'Apply drip irrigation early morning to limit evaporation' },
      { day: 'Wed', tempMax: 29, tempMin: 22, condition: 'Light Shower', actionAdvice: 'Hold off chemical/bio-spray; moisture benefits cover crop' },
      { day: 'Thu', tempMax: 28, tempMin: 20, condition: 'Cloudy', actionAdvice: 'Inspect pulse crops for pod borer emergence' },
      { day: 'Fri', tempMax: 30, tempMin: 21, condition: 'Sunny', actionAdvice: 'Prepare Jeevamrutha bio-inoculant batch' },
      { day: 'Sat', tempMax: 32, tempMin: 23, condition: 'Sunny', actionAdvice: 'Mulch inter-row spaces to conserve soil moisture' },
      { day: 'Sun', tempMax: 31, tempMin: 22, condition: 'Clear', actionAdvice: 'Review weekly NDVI satellite index changes' }
    ]
  },
  BR: {
    temp: 26.2,
    condition: 'Intermittent Showers',
    humidity: 74,
    precipitationChance: 65,
    windSpeed: 14.0,
    solarRadiation: 650,
    evapotranspiration: 3.9,
    forecast: [
      { day: 'Mon', tempMax: 28, tempMin: 19, condition: 'Rain', actionAdvice: 'Heavy rain expected; verify contour bunds and swales' },
      { day: 'Tue', tempMax: 27, tempMin: 19, condition: 'Thunderstorm', actionAdvice: 'Avoid tractor field traffic to prevent soil compaction' },
      { day: 'Wed', tempMax: 26, tempMin: 18, condition: 'Showers', actionAdvice: 'Favorable conditions for fungal hyper-parasites' },
      { day: 'Thu', tempMax: 29, tempMin: 20, condition: 'Partly Sunny', actionAdvice: 'Broadcast Brachiaria cover crop seed into wet soil' },
      { day: 'Fri', tempMax: 30, tempMin: 21, condition: 'Sunny', actionAdvice: 'Check soil pH with lime/gypsum dosing if required' },
      { day: 'Sat', tempMax: 29, tempMin: 20, condition: 'Cloudy', actionAdvice: 'Deploy beneficial predatory mites in coffee groves' },
      { day: 'Sun', tempMax: 28, tempMin: 19, condition: 'Light Rain', actionAdvice: 'Maintain green manure residue coverage' }
    ]
  },
  ZA: {
    temp: 24.1,
    condition: 'Dry & Crisp Sunny',
    humidity: 38,
    precipitationChance: 5,
    windSpeed: 18.2,
    solarRadiation: 890,
    evapotranspiration: 5.6,
    forecast: [
      { day: 'Mon', tempMax: 26, tempMin: 12, condition: 'Sunny', actionAdvice: 'High evaporation risk: maintain minimum 80% mulch cover' },
      { day: 'Tue', tempMax: 27, tempMin: 13, condition: 'Sunny', actionAdvice: 'Pulse drip irrigation during late evening hours' },
      { day: 'Wed', tempMax: 25, tempMin: 11, condition: 'Windy', actionAdvice: 'Check windbreak hedgerows to suppress soil erosion' },
      { day: 'Thu', tempMax: 24, tempMin: 10, condition: 'Clear', actionAdvice: 'Apply liquid seaweed kelp extract for heat stress tolerance' },
      { day: 'Fri', tempMax: 26, tempMin: 12, condition: 'Partly Sunny', actionAdvice: 'Rotate grazing livestock through paddock sector C' },
      { day: 'Sat', tempMax: 28, tempMin: 14, condition: 'Sunny', actionAdvice: 'Monitor transboundary fall armyworm pheromone traps' },
      { day: 'Sun', tempMax: 27, tempMin: 13, condition: 'Clear', actionAdvice: 'Test subsoil moisture probe readings' }
    ]
  },
  CN: {
    temp: 21.8,
    condition: 'Mild Overcast',
    humidity: 62,
    precipitationChance: 25,
    windSpeed: 9.8,
    solarRadiation: 540,
    evapotranspiration: 3.2,
    forecast: [
      { day: 'Mon', tempMax: 23, tempMin: 14, condition: 'Overcast', actionAdvice: 'Apply fermented straw bio-compost to winter wheat bed' },
      { day: 'Tue', tempMax: 22, tempMin: 13, condition: 'Light Drizzle', actionAdvice: 'Ideal humidity for symbiotic rhizobia nodulation' },
      { day: 'Wed', tempMax: 24, tempMin: 15, condition: 'Partly Sunny', actionAdvice: 'Release Trichogramma parasitic wasps for stem borers' },
      { day: 'Thu', tempMax: 25, tempMin: 16, condition: 'Sunny', actionAdvice: 'Irrigate via shallow wetting furrow to save 40% water' },
      { day: 'Fri', tempMax: 23, tempMin: 14, condition: 'Overcast', actionAdvice: 'Monitor soil microbial carbon using mobile spectrograph' },
      { day: 'Sat', tempMax: 22, tempMin: 13, condition: 'Foggy Morning', actionAdvice: 'Prune dead foliage to improve air circulation' },
      { day: 'Sun', tempMax: 24, tempMin: 15, condition: 'Sunny', actionAdvice: 'Sync farm records with national BRICS AgriN ledger' }
    ]
  },
  RU: {
    temp: 18.5,
    condition: 'Cool & Moderate Breeze',
    humidity: 52,
    precipitationChance: 20,
    windSpeed: 15.0,
    solarRadiation: 580,
    evapotranspiration: 2.8,
    forecast: [
      { day: 'Mon', tempMax: 20, tempMin: 9, condition: 'Partly Sunny', actionAdvice: 'Chernozem moisture retention is optimal for legume seeding' },
      { day: 'Tue', tempMax: 19, tempMin: 8, condition: 'Cool Breeze', actionAdvice: 'Direct drill spring barley with zero-tillage coulters' },
      { day: 'Wed', tempMax: 17, tempMin: 7, condition: 'Cloudy', actionAdvice: 'Apply humic & fulvic acid foliar spray to stimulate roots' },
      { day: 'Thu', tempMax: 21, tempMin: 10, condition: 'Sunny', actionAdvice: 'Inspect field borders for migratory rust spore symptoms' },
      { day: 'Fri', tempMax: 22, tempMin: 11, condition: 'Sunny', actionAdvice: 'Maintain crop residue blanket to shield against sudden frost' },
      { day: 'Sat', tempMax: 20, tempMin: 9, condition: 'Light Shower', actionAdvice: 'Allow natural rain soaking of top 15cm organic horizon' },
      { day: 'Sun', tempMax: 19, tempMin: 8, condition: 'Clear', actionAdvice: 'Sample soil electrical conductivity across transect A-B' }
    ]
  }
};

export const NATION_SOIL: Record<string, SoilMetrics> = {
  IN: {
    nitrogen: 185, // Medium-Low
    phosphorus: 22,
    potassium: 260,
    ph: 7.6,
    organicCarbon: 0.65, // Needs regeneration
    moisture: 32,
    electricalConductivity: 0.42,
    microbiomeActivity: 'Moderate'
  },
  BR: {
    nitrogen: 210,
    phosphorus: 14,
    potassium: 190,
    ph: 5.6, // Acidic oxisol
    organicCarbon: 1.85,
    moisture: 46,
    electricalConductivity: 0.28,
    microbiomeActivity: 'High'
  },
  ZA: {
    nitrogen: 140, // Low
    phosphorus: 18,
    potassium: 175,
    ph: 6.8,
    organicCarbon: 0.48, // Very low, high urgency for cover cropping
    moisture: 22,
    electricalConductivity: 0.35,
    microbiomeActivity: 'Low'
  },
  CN: {
    nitrogen: 245,
    phosphorus: 32,
    potassium: 290,
    ph: 7.1,
    organicCarbon: 1.40,
    moisture: 38,
    electricalConductivity: 0.55,
    microbiomeActivity: 'High'
  },
  RU: {
    nitrogen: 280,
    phosphorus: 28,
    potassium: 310,
    ph: 6.9,
    organicCarbon: 3.80, // Rich Chernozem
    moisture: 41,
    electricalConductivity: 0.38,
    microbiomeActivity: 'Optimal'
  }
};

export const NATION_NDVI_ZONES: Record<string, NdviZone[]> = {
  IN: [
    { zoneId: 'IN-01', name: 'North Quadrant (Pigeon Pea Intercrop)', ndviValue: 0.74, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 82 },
    { zoneId: 'IN-02', name: 'Central Belt (Pearl Millet & Sorghum)', ndviValue: 0.61, vegetationHealth: 'Moderate', waterDeficit: false, canopyCoverPct: 68 },
    { zoneId: 'IN-03', name: 'East Boundary (Legume Cover Crop)', ndviValue: 0.81, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 89 },
    { zoneId: 'IN-04', name: 'South Slope (Unmulched Fallow - Degraded)', ndviValue: 0.32, vegetationHealth: 'Critical', waterDeficit: true, canopyCoverPct: 24 },
  ],
  BR: [
    { zoneId: 'BR-01', name: 'Parcel A (No-Till Soy + Brachiaria)', ndviValue: 0.86, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 93 },
    { zoneId: 'BR-02', name: 'Parcel B (Agroforestry Shade Coffee)', ndviValue: 0.89, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 95 },
    { zoneId: 'BR-03', name: 'Parcel C (Regenerating Savanna Buffer)', ndviValue: 0.69, vegetationHealth: 'Moderate', waterDeficit: false, canopyCoverPct: 74 },
    { zoneId: 'BR-04', name: 'Parcel D (Recently Harvested Residue)', ndviValue: 0.44, vegetationHealth: 'Stressed', waterDeficit: true, canopyCoverPct: 38 },
  ],
  ZA: [
    { zoneId: 'ZA-01', name: 'Camp 1 (Drought Resilient Sorghum)', ndviValue: 0.65, vegetationHealth: 'Moderate', waterDeficit: false, canopyCoverPct: 71 },
    { zoneId: 'ZA-02', name: 'Camp 2 (Cowpea Multi-specie Cover)', ndviValue: 0.76, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 84 },
    { zoneId: 'ZA-03', name: 'Camp 3 (Dryland Grazing strip)', ndviValue: 0.39, vegetationHealth: 'Critical', waterDeficit: true, canopyCoverPct: 31 },
    { zoneId: 'ZA-04', name: 'Camp 4 (Micro-catchment Swale Basin)', ndviValue: 0.72, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 79 },
  ],
  CN: [
    { zoneId: 'CN-01', name: 'Terrace 1 (Wheat-Soybean Relay)', ndviValue: 0.83, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 91 },
    { zoneId: 'CN-02', name: 'Terrace 2 (Organic Rapeseed & Azolla)', ndviValue: 0.78, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 85 },
    { zoneId: 'CN-03', name: 'Terrace 3 (Subsurface Biochar Trial)', ndviValue: 0.88, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 94 },
    { zoneId: 'CN-04', name: 'Terrace 4 (Saline-Alkaline Restoration)', ndviValue: 0.52, vegetationHealth: 'Stressed', waterDeficit: false, canopyCoverPct: 56 },
  ],
  RU: [
    { zoneId: 'RU-01', name: 'Field Alpha (Direct-Drill Spring Wheat)', ndviValue: 0.85, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 92 },
    { zoneId: 'RU-02', name: 'Field Beta (Perennial Clover & Timothy)', ndviValue: 0.88, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 96 },
    { zoneId: 'RU-03', name: 'Field Gamma (Buckwheat Pollinator Band)', ndviValue: 0.79, vegetationHealth: 'Vigorous', waterDeficit: false, canopyCoverPct: 86 },
    { zoneId: 'RU-04', name: 'Field Delta (Post-Sunflower Stubble)', ndviValue: 0.49, vegetationHealth: 'Moderate', waterDeficit: false, canopyCoverPct: 53 },
  ]
};

export const REGENERATIVE_CROP_PLANS: Record<string, RegenerativeCropPlan[]> = {
  IN: [
    {
      id: 'IN-PLAN-1',
      primaryCrop: 'Pearl Millet (Bajra)',
      scientificName: 'Pennisetum glaucum',
      companionCrop: 'Pigeon Pea (Arhar/Tur) & Cowpea',
      coverCrop: 'Sunnhemp (Crotalaria juncea)',
      growingCycleDays: 95,
      soilBenefits: [
        'Fixes 45-60 kg atmospheric nitrogen per hectare through root nodules',
        'Deep taproots puncture hard soil pans, improving water percolation by 35%',
        'Generates dense organic biomass for in-situ carbon sequestration'
      ],
      carbonOffsetKgPerHa: 1450,
      waterSavingPct: 42,
      expectedYieldTonsHa: 3.4,
      bioInputs: [
        { name: 'Jeevamrutha Ferment', recipe: 'Indigenous cow dung, cow urine, jaggery, pulse flour, virgin soil, fermented for 48h', applicationStage: 'Every 21 days with irrigation water' },
        { name: 'Neem-Karanj Bio-Extract', recipe: '5% cold pressed neem & karanj seed kernel decoction', applicationStage: 'Foliar spray at vegetative 25th day' },
        { name: 'Trichoderma Inoculant', recipe: '500g Trichoderma viride mixed in 50kg well-decomposed farmyard manure', applicationStage: 'Basal seedbed incorporation' }
      ]
    },
    {
      id: 'IN-PLAN-2',
      primaryCrop: 'Finger Millet (Ragi)',
      scientificName: 'Eleusine coracana',
      companionCrop: 'Horsegram (Macrotyloma uniflorum)',
      coverCrop: 'Sesbania bispinosa (Dhaincha)',
      growingCycleDays: 110,
      soilBenefits: [
        'Extraordinarily high root mycorrhizal association for phosphorus solubilization',
        'Prevents topsoil erosion on sloped rainfed micro-watersheds',
        'Improves soil organic carbon from 0.6% towards 1.2% in 2 seasons'
      ],
      carbonOffsetKgPerHa: 1680,
      waterSavingPct: 50,
      expectedYieldTonsHa: 2.8,
      bioInputs: [
        { name: 'Beejamrutha Seed Coat', recipe: 'Cow dung, cow urine, slaked lime and water paste', applicationStage: 'Pre-sowing seed priming' },
        { name: 'Dashaparni Ark', recipe: 'Ten botanical leaves fermented with cow urine and ginger/garlic paste', applicationStage: 'Broad spectrum pest deterrent when borer threshold reaches 5%' }
      ]
    }
  ],
  BR: [
    {
      id: 'BR-PLAN-1',
      primaryCrop: 'Non-GMO Soybean (Consórcio ILPF)',
      scientificName: 'Glycine max',
      companionCrop: 'Brachiaria ruziziensis (Signal Grass)',
      coverCrop: 'Crotalaria spectabilis (Nematode suppressor)',
      growingCycleDays: 115,
      soilBenefits: [
        'Biological Nitrogen Fixation (BNF) provides 100% of nitrogen needs with Bradyrhizobium inoculation',
        'Brachiaria roots create biopores up to 2m deep, preventing tropical rain crusting',
        'Crotalaria drastically cuts root-knot nematode (Meloidogyne incognita) by up to 80%'
      ],
      carbonOffsetKgPerHa: 2200,
      waterSavingPct: 35,
      expectedYieldTonsHa: 4.1,
      bioInputs: [
        { name: 'Bradyrhizobium + Azospirillum Consortium', recipe: 'Commercial inoculant strain CPAC 15 + Az39', applicationStage: 'Seed inoculation under shade' },
        { name: 'Bokashi Fermented Compost', recipe: 'Rice bran, bone meal, castor cake, EM-1 effective microorganisms', applicationStage: 'In-furrow micro-dosing at planting' }
      ]
    },
    {
      id: 'BR-PLAN-2',
      primaryCrop: 'Specialty Shade-Grown Arabica Coffee',
      scientificName: 'Coffea arabica',
      companionCrop: 'Inga edulis (Ice Cream Bean Tree - Nitrogen fixing shade canopy)',
      coverCrop: 'Arachis pintoi (Pinto Forage Peanut)',
      growingCycleDays: 240,
      soilBenefits: [
        'Permanent perennial ground cover eliminates 98% of soil runoff',
        'Inga leaf litter recycles 85 kg N/ha annually onto plantation floor',
        'Attracts pollinators and parasitoids, curbing coffee borer beetle naturally'
      ],
      carbonOffsetKgPerHa: 3800,
      waterSavingPct: 48,
      expectedYieldTonsHa: 2.2,
      bioInputs: [
        { name: 'Bio-Fertilizante Supermagro', recipe: 'Aerobic microbial tea with milk, molasses, trace rock dust', applicationStage: 'Monthly canopy spray' },
        { name: 'Beauveria bassiana Biocontrol', recipe: 'Beneficial entomopathogenic fungus spore suspension', applicationStage: 'Early season borer emergence window' }
      ]
    }
  ],
  ZA: [
    {
      id: 'ZA-PLAN-1',
      primaryCrop: 'Grain Sorghum (Sorghum bicolor)',
      scientificName: 'Sorghum bicolor',
      companionCrop: 'Cowpea (Vigna unguiculata)',
      coverCrop: 'Lablab purpureus (Hyacinth Bean)',
      growingCycleDays: 120,
      soilBenefits: [
        'High drought endurance through wax leaf cuticle and stay-green genetic traits',
        'Dense fibrous root system pumps root exudates, revitalizing soil microbial populations',
        'Cowpea provides rapid ground shading within 20 days, cutting soil evaporation by half'
      ],
      carbonOffsetKgPerHa: 1550,
      waterSavingPct: 55,
      expectedYieldTonsHa: 3.1,
      bioInputs: [
        { name: 'Indigenous Microorganism (IMO) Brew', recipe: 'Cooked maize meal colonized with forest humus and brown sugar', applicationStage: 'Soil soak before wet planting' },
        { name: 'Wood Ash & Pyroligneous Biochar', recipe: 'Slow pyrolysis crop residue infused with liquid manure', applicationStage: 'Soil band placement' }
      ]
    }
  ],
  CN: [
    {
      id: 'CN-PLAN-1',
      primaryCrop: 'Winter Wheat - Summer Maize Relay System',
      scientificName: 'Triticum aestivum / Zea mays',
      companionCrop: 'Soybean & Hairy Vetch (Vicia villosa)',
      coverCrop: 'Daikon Tillage Radish (Raphanus sativus)',
      growingCycleDays: 220,
      soilBenefits: [
        'Radish bio-drilling naturally loosens compacted subsoil plow pan without heavy diesel tractors',
        'Hairy vetch biomass contributes 120 kg N/ha, cutting synthetic urea requirement by 60%',
        'Maintains uninterrupted photosynthesizing living roots for 330 days a year'
      ],
      carbonOffsetKgPerHa: 2600,
      waterSavingPct: 38,
      expectedYieldTonsHa: 6.8,
      bioInputs: [
        { name: 'Biochar-Compost Matrix', recipe: 'High-temperature bamboo/straw biochar co-composted with pig manure', applicationStage: 'Autumn tillage-free strip band' },
        { name: 'Bacillus subtilis Bio-fungicide', recipe: 'Endophytic bacterial culture spray', applicationStage: 'Flag leaf emergence' }
      ]
    }
  ],
  RU: [
    {
      id: 'RU-PLAN-1',
      primaryCrop: 'Organic Spring Wheat (Durum)',
      scientificName: 'Triticum durum',
      companionCrop: 'Yellow Sweet Clover (Melilotus officinalis)',
      coverCrop: 'Winter Rye (Secale cereale) & Crimson Clover',
      growingCycleDays: 105,
      soilBenefits: [
        'Maintains Chernozem organic carbon levels above 3.5% through multi-year green manure',
        'Sweet clover root penetration extracts phosphorus from deeper unweathered horizons',
        'Rye allelopathic root exudates suppress troublesome weeds without chemical herbicides'
      ],
      carbonOffsetKgPerHa: 2100,
      waterSavingPct: 30,
      expectedYieldTonsHa: 4.5,
      bioInputs: [
        { name: 'Peat-Humate Complex', recipe: 'Activated potassium humate derived from natural wetland peat', applicationStage: 'Seed dressing and early tillering' },
        { name: 'Pseudomonas fluorescens Bio-protectant', recipe: 'Biological bacterial agent against root rot complex', applicationStage: 'Pre-seeding seed coating' }
      ]
    }
  ]
};

export const CROP_DISEASE_SAMPLES: DiseaseSample[] = [
  {
    id: 'DISEASE-01',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Target Spot)',
    scientificClassification: 'Alternaria solani (Ascomycota)',
    confidence: 96.4,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Concentric dark brown rings resembling target bullseyes on older lower leaves',
      'Yellow chlorotic halos surrounding lesions leading to early leaf drop',
      'Sunken brown lesions on stems and calyx ends'
    ],
    organicRemedies: [
      'Foliar spray of 0.5% cold-pressed neem oil mixed with mild organic potassium soap',
      'Diluted baking soda spray (1 tablespoon sodium bicarbonate + 1 tsp vegetable oil in 4L water)',
      'Trichoderma harzianum or Bacillus subtilis biological liquid spray every 7 days'
    ],
    regenerativeBioTreatments: [
      'Incorporate 15 tonnes/ha mature vermicompost to stimulate soil chitinolytic bacteria',
      'Apply 5-8 cm organic straw mulch beneath plants to eliminate rain splashback from soil',
      'Intercrop with marigolds and basil to repel insect vectors and release airborne phytoncides'
    ],
    preventionTechniques: [
      'Enforce 3-year crop rotation avoiding Solanaceae family (potato, eggplant, pepper)',
      'Drip irrigation only; keep foliage strictly dry during morning hours',
      'Prune lowest 30cm sucker foliage to maximize air circulation'
    ]
  },
  {
    id: 'DISEASE-02',
    cropName: 'Rice / Paddy',
    diseaseName: 'Rice Blast Disease',
    scientificClassification: 'Magnaporthe oryzae (Pyricularia oryzae)',
    confidence: 94.8,
    severity: 'Severe',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Spindle/diamond-shaped lesions with gray-whitish centers and dark reddish-brown borders',
      'Lesions coalesce causing entire leaf blades to wither and turn straw-colored',
      'Neck rot causing partial or total sterility of grain panicles ("whiteheads")'
    ],
    organicRemedies: [
      'Pseudomonas fluorescens (Pf-1 strain) seed treatment (10g/kg) and foliar spray at 0.2%',
      'Cow urine distillate (Arka) diluted 1:10 with fermented buttermilk spray',
      'Silica supplementation: Rice husk ash incorporation into soil (improves mechanical leaf barrier)'
    ],
    regenerativeBioTreatments: [
      'Adopt System of Rice Intensification (SRI) spacing (25x25cm) with alternate wetting and drying (AWD)',
      'Inoculate rice field with Azolla microphylla biofertilizer; avoids excessive synthetic nitrogen which triggers blast susceptibility',
      'Introduce duck-rice or fish-rice polyculture to biologically digest spores and insects'
    ],
    preventionTechniques: [
      'Avoid high-dose synthetic urea fertilizers; shift to split bio-N applications',
      'Preserve genetic diversity by planting multi-line landraces rather than monocultures',
      'Flood field temporarily if leaf blast appears in vegetative stage to arrest spore spread'
    ]
  },
  {
    id: 'DISEASE-03',
    cropName: 'Maize / Corn',
    diseaseName: 'Fall Armyworm Infestation & Leaf Sheath Blight',
    scientificClassification: 'Spodoptera frugiperda & Rhizoctonia solani',
    confidence: 97.2,
    severity: 'Severe',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Characteristic "windowpane" feeding holes on young whorl leaves',
      'Heavy moist sawdust-like frass (excrement) lodged inside central leaf funnel',
      'Inverted "Y" shape on the larval head capsule'
    ],
    organicRemedies: [
      'Bacillus thuringiensis (Bt kurstaki or aizawai) spray targeted directly into the plant funnel in late afternoon',
      'Metarhizium rileyi or Beauveria bassiana entomopathogenic fungal bio-spray',
      'Dry sand mixed with wood ash or neem cake dropped directly into whorls (suffocates larvae physically)'
    ],
    regenerativeBioTreatments: [
      'Implement "Push-Pull Technology": Plant Desmodium (silverleaf) between rows (repels moth) and Napier grass around borders (attracts & traps moth)',
      'Erect bird perches (15 per hectare) to encourage black drongos and kingfishers to predate caterpillars',
      'Release Trichogramma chilonis egg parasitoid cards (50,000 wasps/ha)'
    ],
    preventionTechniques: [
      'Synchronous community sowing across contiguous village clusters to avoid staggered host availability',
      'Deploy BRICS transboundary pheromone monitoring traps to detect early flight arrival',
      'Intercrop maize with cowpea or velvet bean to reduce moth oviposition'
    ]
  },
  {
    id: 'DISEASE-04',
    cropName: 'Wheat',
    diseaseName: 'Stripe / Yellow Rust',
    scientificClassification: 'Puccinia striiformis f. sp. tritici',
    confidence: 92.9,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Linear rows of bright yellow-orange pustules (uredinia) forming parallel stripes along leaf veins',
      'Yellow powder stains fingers upon leaf contact',
      'Desiccation of green tissue causing severe reduction in grain shriveling'
    ],
    organicRemedies: [
      'Potassium silicate foliar spray (3g/L) to strengthen plant cuticle and induce systemic acquired resistance',
      'Garlic and chili oil extract with 0.1% surfactant as a natural antifungal spore inhibitor',
      'Bio-sulfur powder dusting (elemental wettable sulfur @ 2.5 kg/ha)'
    ],
    regenerativeBioTreatments: [
      'Intercrop with nitrogen-fixing brassicas or chickpeas to disrupt laminar wind spore dispersion',
      'Inoculate soil with vesicular-arbuscular mycorrhizal (VAM) fungi to upregulate plant defense enzymes',
      'Zero-tillage preservation of crop residue retains soil moisture during critical grain filling'
    ],
    preventionTechniques: [
      'Sow resistant rust-screened cultivars coordinated through BRICS Agriculture Genebanks',
      'Early winter sowing to outpace optimal cooler fungal sporulation window',
      'Maintain broad buffer hedges around field perimeters'
    ]
  },
  {
    id: 'DISEASE-05',
    cropName: 'Coffee',
    diseaseName: 'Coffee Leaf Rust (Ferrugem do Café)',
    scientificClassification: 'Hemileia vastatrix (Basidiomycota)',
    confidence: 95.1,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Yellowish oily spots on the upper leaf surface',
      'Bright orange-yellow powdery fungal spore dust on corresponding undersides',
      'Premature defoliation resulting in shoot dieback and empty coffee cherries'
    ],
    organicRemedies: [
      'Bordeaux mixture (1% copper sulfate + hydrated lime) as an approved organic protective barrier',
      'Lecanicillium lecanii hyperparasitic fungus (acts as a direct bio-parasite on rust pustules)',
      'Bio-fermented whey and compost tea canopy washing'
    ],
    regenerativeBioTreatments: [
      'Maintain 30-40% agroforestry shade cover (e.g. Inga, banana, cedar) to buffer leaf microclimate temperature extremes',
      'Soil mulching with coffee cherry pulp compost and biochar to stimulate root vigor',
      'Conserve arboreal ant colonies (e.g. Azteca spp.) that protect against spore transport'
    ],
    preventionTechniques: [
      'Plant rust-resistant cultivars (e.g. Catuaí Vermelho IAC 144, IPR 100, Catimor derivatives)',
      'Strategic pruning to remove diseased branches following harvest cycle',
      'Soil nutrient balancing: avoid excessive potassium deficiency which weakens plant cell walls'
    ]
  },
  {
    id: 'DISEASE-06',
    cropName: 'Potato',
    diseaseName: 'Late Blight (Requeima)',
    scientificClassification: 'Phytophthora infestans (Oomycete)',
    confidence: 98.3,
    severity: 'Severe',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    symptoms: [
      'Dark water-soaked brown/black necrotic lesions starting at leaf tips and margins',
      'Delicate white fungal mycelial fuzz appearing on leaf undersides in humid mornings',
      'Tuber rot: granular reddish-brown dry rot extending into flesh'
    ],
    organicRemedies: [
      'Copper hydroxide / copper octanoate spray before forecasted rain events',
      'Horse chestnut & Horsetail (Equisetum arvense) silica-rich herbal decoction',
      'Bacillus amyloliquefaciens biocontrol spray to colonize leaf surface'
    ],
    regenerativeBioTreatments: [
      'High-hill ridge cultivation (mounding 25-30cm of soil) to prevent zoospores from washing down to tubers',
      'Bio-solarization of seedbeds with clear plastic film prior to planting season',
      'Intercrop with alliums (garlic and onions) to create natural fungistatic volatile emissions'
    ],
    preventionTechniques: [
      'Plant only certified pathogen-free seed tubers',
      'Destroy volunteer potato plants and cull piles within 5 km radius',
      'Terminate vine haulms 14 days before harvest to let tuber skins harden'
    ]
  }
];

export const TRANSBOUNDARY_ALERTS: TransboundaryAlert[] = [
  {
    id: 'ALERT-BRICS-2026-08',
    type: 'Pest Migration',
    severity: 'High Alert',
    originCountry: 'Southern Africa (Limpopo/Zimbabwe corridor)',
    affectedRegions: ['South Africa (Limpopo & Mpumalanga)', 'India (Western Peninsula corridor)', 'East African transit route'],
    title: 'Transcontinental Fall Armyworm (Spodoptera frugiperda) Swarm Trajectory',
    description: 'Pheromone sensor network reports high reproductive spikes following late unseasonal rains. BRICS agro-met telemetry models show 68% probability of westward wind-assisted dispersal into maritime shipping corridors.',
    cooperativeActions: [
      'Joint biological control release (Trichogramma & Metarhizium strains) synchronized across SAARC and SADC stations',
      'Open sharing of genomic resistance sequencing between ICAR (India) and ARC (South Africa)',
      'Farmer advisory broadcast in 8 local dialects recommending push-pull intercropping'
    ],
    reportedDate: '2026-09-28'
  },
  {
    id: 'ALERT-BRICS-2026-07',
    type: 'Climate Shock',
    severity: 'Critical',
    originCountry: 'Pacific Equatorial Oscillation',
    affectedRegions: ['Brazil (Central-West Cerrado)', 'South Africa (Free State)', 'India (Deccan Plateau)'],
    title: 'El Niño Teleconnection: Prolonged Mid-Season Dry Spell Protocol',
    description: 'Copernicus & BRICS Satellite constellation telemetry indicates an extended 24-day precipitation hiatus. Evapotranspiration indices exceed historic means by 32%.',
    cooperativeActions: [
      'Emergency activation of Drought Tolerant Seed Sharing Treaty (BRICS AgriN Seed Pool)',
      'Cross-border deployment of zero-till soil moisture retention advisories',
      'Subsidized distribution of biochar and mycorrhizal root inoculants to preserve rhizosphere moisture'
    ],
    reportedDate: '2026-09-25'
  },
  {
    id: 'ALERT-BRICS-2026-06',
    type: 'Soil Degradation',
    severity: 'Warning',
    originCountry: 'Eurasian Steppe & Yellow River Basin',
    affectedRegions: ['Russia (Kuban region)', 'China (Northern Arid zones)'],
    title: 'Spring Wind Erosion & Topsoil Desiccation Warning',
    description: 'High wind velocity (65 km/h) combined with low residual winter snow blanket creates extreme risk of fertile Chernozem topsoil drift.',
    cooperativeActions: [
      'Mandatory stubble retention protocols shared across Sino-Russian agro-forestry cooperation zones',
      'Real-time Landsat/Sentinel-2 windbreak barrier compliance surveillance',
      'Joint exchange of cold-hardy cover crop germplasm (Winter Rye + Siberian Vetch)'
    ],
    reportedDate: '2026-09-20'
  }
];

export const OPEN_AGRI_ENDPOINTS: OpenAgriEndpoint[] = [
  {
    method: 'GET',
    endpoint: '/api/v1/agrin/satellite/ndvi',
    description: 'Retrieve real-time normalized difference vegetation index (NDVI) and canopy vigor data for any agro-climatic coordinate within BRICS digital public good grid.',
    sampleResponse: {
      status: 'success',
      node: 'BRICS-AgriN-Mesh-IN-04',
      coordinates: { lat: 20.5937, lng: 78.9629 },
      timestamp: '2026-09-30T10:15:00Z',
      satellite_source: 'Sentinel-2B / Copernicus Open Access Hub',
      indices: {
        ndvi_mean: 0.742,
        evi_enhanced: 0.581,
        ndwi_water_index: 0.312,
        canopy_cover_percentage: 82.4
      },
      vegetation_health_status: 'Vigorous',
      anomalies_detected: false
    }
  },
  {
    method: 'POST',
    endpoint: '/api/v1/agrin/regenerative/recommend',
    description: 'Compute agro-ecological multi-tier companion crop recommendations and soil restoration roadmap based on input soil chemistry (NPK, SOC) and microclimate.',
    sampleRequest: {
      country_code: 'IN',
      agro_zone: 'Deccan Semi-Arid',
      soil_metrics: {
        nitrogen_kg_ha: 185,
        phosphorus_kg_ha: 22,
        potassium_kg_ha: 260,
        ph: 7.6,
        organic_carbon_pct: 0.65
      },
      irrigation_access: 'Rainfed with supplementary drip'
    },
    sampleResponse: {
      status: 'success',
      primary_crop: 'Pearl Millet (Bajra)',
      companion_crops: ['Pigeon Pea', 'Cowpea'],
      cover_crop: 'Sunnhemp (Crotalaria juncea)',
      soil_regeneration_score: 88,
      projected_soc_gain_2yr: '+0.45%',
      carbon_sequestration_kg_ha_yr: 1450,
      prescribed_bio_inputs: ['Jeevamrutha Ferment', 'Neem-Karanj Bio-Extract', 'Trichoderma viride']
    }
  },
  {
    method: 'POST',
    endpoint: '/api/v1/agrin/diagnostics/classify-disease',
    description: 'Multimodal AI vision inference endpoint accepting RGB crop leaf imagery; returns disease classification, pathogen taxonomy, confidence rating, and biological/organic remedy protocols.',
    sampleRequest: {
      image_format: 'base64_jpeg',
      crop_type_hint: 'Tomato',
      region_code: 'BR'
    },
    sampleResponse: {
      pathogen: 'Alternaria solani',
      disease_common_name: 'Early Blight (Target Spot)',
      confidence: 0.964,
      severity: 'Moderate',
      organic_remedies: [
        '0.5% Cold pressed neem oil with potassium soap spray',
        'Trichoderma harzianum biological foliar colonization'
      ],
      regenerative_actions: [
        'Apply 8cm straw mulch to block spore rain-splash',
        'Crop rotation away from Solanaceae for 3 years'
      ],
      interoperability_taxonomy_id: 'AGROVOC-c_7821'
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/agrin/transboundary/alerts',
    description: 'Query shared multilateral pest and climate vulnerability alerts across the BRICS agricultural security network.',
    sampleResponse: {
      active_alerts_count: 3,
      cooperating_agencies: ['ICAR (India)', 'EMBRAPA (Brazil)', 'ARC (South Africa)', 'CAAS (China)', 'RAS (Russia)'],
      alerts: [
        {
          id: 'ALERT-BRICS-2026-08',
          pest: 'Spodoptera frugiperda',
          risk_level: 'High Alert',
          shared_mitigation_protocol: 'Push-Pull Desmodium & Trichogramma wasp release'
        }
      ]
    }
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: 'AgriN-BRICS',
    tagline: 'Regenerative Agricultural Intelligence Network',
    subtagline: 'Interoperable Digital Public Good for BRICS Food Security & Soil Restoration',
    navAdvisory: 'Agro-Advisory & Climate',
    navSatellite: 'Satellite NDVI & Soil Hub',
    navCrops: 'Regenerative Crop Planner',
    navDoctor: 'AI Disease Clinic',
    navInteroperability: 'BRICS Open Network',
    selectNation: 'Select Member Nation',
    liveTelemetry: 'Live Satellite Telemetry',
    soilHealthScore: 'Soil Regeneration Index',
    aiAdvisoryPrompt: 'Ask the BRICS Agro-Ecological AI Assistant...',
    diagnoseButton: 'Analyze Leaf Symptoms with AI',
    organicPrescription: 'Regenerative & Organic Biological Remedies',
    bricsTheme: 'BRICS Cooperation in Action',
    dpgCertified: 'Certified Digital Public Good (DPG Standard v1.4)'
  },
  hi: {
    title: 'एग्रीएन-ब्रिक्स',
    tagline: 'पुनर्योजी कृषि बुद्धिमत्ता नेटवर्क',
    subtagline: 'ब्रिक्स खाद्य सुरक्षा और मृदा पुनरुद्धार के लिए डिजिटल सार्वजनिक वस्तु',
    navAdvisory: 'कृषि-सलाह और जलवायु',
    navSatellite: 'उपग्रह एनडीवीआई व मृदा हब',
    navCrops: 'पुनर्योजी फसल योजनाकार',
    navDoctor: 'एआई फसल रोग क्लिनिक',
    navInteroperability: 'ब्रिक्स खुला नेटवर्क',
    selectNation: 'सदस्य देश चुनें',
    liveTelemetry: 'सक्रिय उपग्रह टेलीमेट्री',
    soilHealthScore: 'मृदा पुनरुद्धार सूचकांक',
    aiAdvisoryPrompt: 'ब्रिक्स कृषि-पारिस्थितिकी एआई से पूछें...',
    diagnoseButton: 'एआई के साथ पत्ती के लक्षणों का विश्लेषण करें',
    organicPrescription: 'जैविक और पुनर्योजी उपचार',
    bricsTheme: 'ब्रिक्स सहयोग व्यवहार में',
    dpgCertified: 'प्रमाणित डिजिटल पब्लिक गुड (डीपीजी मानक v1.4)'
  },
  pt: {
    title: 'AgriN-BRICS',
    tagline: 'Rede de Inteligência Agrícola Regenerativa',
    subtagline: 'Bem Público Digital Interoperável para Segurança Alimentar e Regeneração do Solo',
    navAdvisory: 'Agroconsultoria e Clima',
    navSatellite: 'Satélite NDVI e Solo',
    navCrops: 'Planejador Regenerativo',
    navDoctor: 'Clínica Fitossanitária IA',
    navInteroperability: 'Rede Aberta BRICS',
    selectNation: 'Selecione o País Membro',
    liveTelemetry: 'Telemetria de Satélite em Tempo Real',
    soilHealthScore: 'Índice de Regeneração do Solo',
    aiAdvisoryPrompt: 'Pergunte ao Assistente de IA Agroecológica BRICS...',
    diagnoseButton: 'Analisar Sintomas da Folha com IA',
    organicPrescription: 'Prescrições Biológicas e Regenerativas',
    bricsTheme: 'Cooperação BRICS em Ação',
    dpgCertified: 'Bem Público Digital Certificado (Padrão DPG v1.4)'
  },
  zh: {
    title: 'AgriN-金砖农业智能',
    tagline: '再生农业智能网络',
    subtagline: '面向金砖国家粮食安全与土壤修复的互操作数字公共产品',
    navAdvisory: '农业建议与微气候',
    navSatellite: '卫星NDVI与土壤中心',
    navCrops: '再生作物规划器',
    navDoctor: 'AI作物病害诊所',
    navInteroperability: '金砖开放互联网络',
    selectNation: '选择成员国',
    liveTelemetry: '实时卫星遥感监测',
    soilHealthScore: '土壤再生修复指数',
    aiAdvisoryPrompt: '咨询金砖生态农业AI专家...',
    diagnoseButton: '使用AI诊断作物叶片病症',
    organicPrescription: '有机生物防治与再生土壤方案',
    bricsTheme: '金砖合作实践行动',
    dpgCertified: '认证数字公共产品 (DPG标准 v1.4)'
  },
  ru: {
    title: 'АгриН-БРИКС',
    tagline: 'Сеть Регенеративного Сельскохозяйственного Интеллекта',
    subtagline: 'Интероперабельное цифровое общественное благо для продовольственной безопасности',
    navAdvisory: 'Агросоветы и Климат',
    navSatellite: 'Спутниковый NDVI и Почва',
    navCrops: 'Регенеративное Планирование',
    navDoctor: 'ИИ-Диагностика Болезней',
    navInteroperability: 'Открытая Сеть БРИКС',
    selectNation: 'Выберите Страну-Участницу',
    liveTelemetry: 'Спутниковая Телеметрия Онлайн',
    soilHealthScore: 'Индекс Регенерации Почвы',
    aiAdvisoryPrompt: 'Задайте вопрос ИИ-агроному БРИКС...',
    diagnoseButton: 'Диагностировать симптомы с помощью ИИ',
    organicPrescription: 'Биологические и Регенеративные Рецепты',
    bricsTheme: 'Сотрудничество БРИКС в Действии',
    dpgCertified: 'Сертифицированное Цифровое Общественное Благо (DPG v1.4)'
  }
};
