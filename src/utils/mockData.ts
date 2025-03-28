import fs from 'fs';
export interface BananaData {
  size: number;
  weight: number;
  sweetness: number;
  softness: number;
  harvestTime: number;
  ripeness: number;
  acidity: number;
}

// // Sample data points from the dataset (normalized)
// const bananaDataset = [
//   { size: -1.92497, weight: 0.468078, sweetness: 3.077833, softness: -1.47218, harvestTime: 0.294799, ripeness: 2.43557, acidity: 0.27129, quality: "Good" },
//   { size: -2.40975, weight: 0.48687, sweetness: 0.346921, softness: -2.4951, harvestTime: -0.89221, ripeness: 2.067549, acidity: 0.307325, quality: "Good" },
//   { size: -0.35761, weight: 1.483176, sweetness: 1.568452, softness: -2.64515, harvestTime: -0.64727, ripeness: 3.090643, acidity: 1.427322, quality: "Good" },
//   { size: -0.86852, weight: 1.566201, sweetness: 1.889605, softness: -1.27376, harvestTime: -1.00628, ripeness: 1.873002, acidity: 0.477862, quality: "Good" },
//   { size: 0.651825, weight: 1.319199, sweetness: -0.02246, softness: -1.20971, harvestTime: -1.43069, ripeness: 1.078345, acidity: 2.812442, quality: "Good" },
//   { size: -2.80772, weight: 1.138136, sweetness: 3.447627, softness: -1.7133, harvestTime: -2.22091, ripeness: 2.07941, acidity: 2.281203, quality: "Good" },
//   { size: -0.23021, weight: 2.783471, sweetness: 1.681184, softness: -0.52978, harvestTime: -1.95847, ripeness: 1.348143, acidity: 2.181766, quality: "Good" },
//   { size: -1.34852, weight: 3.232281, sweetness: 4.011817, softness: -0.89061, harvestTime: -0.03199, ripeness: 2.395917, acidity: 1.042878, quality: "Good" },
//   { size: -2.01223, weight: 1.928034, sweetness: 0.698746, softness: -0.95977, harvestTime: -1.34972, ripeness: 1.311802, acidity: 1.048762, quality: "Good" },
//   { size: 0.053035, weight: 1.309993, sweetness: -0.26414, softness: -2.9693, harvestTime: 0.303983, ripeness: 3.889359, acidity: 1.931332, quality: "Good" },
//   // Additional synthetic "Bad" quality examples for prediction contrast
//   { size: 3.2, weight: 0.2, sweetness: -2.5, softness: 3.1, harvestTime: 4.2, ripeness: 0.3, acidity: 4.1, quality: "Bad" },
//   { size: 2.9, weight: 0.3, sweetness: -3.1, softness: 3.5, harvestTime: 3.9, ripeness: 0.2, acidity: 3.8, quality: "Bad" },
//   { size: 3.1, weight: 0.25, sweetness: -2.8, softness: 3.3, harvestTime: 4.0, ripeness: 0.25, acidity: 4.0, quality: "Bad" }
// ];

// Feature importance based on typical banana quality factors
const featureImportance = {
  size: 0.12,
  weight: 0.15,
  sweetness: 0.18,
  softness: 0.15,
  harvestTime: 0.1,
  ripeness: 0.2,
  acidity: 0.1
};
export const readBananaDataset = (filePath: string): BananaData[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  const bananaDataset: BananaData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const banana: BananaData = {
      size: parseFloat(values[0]),
      weight: parseFloat(values[1]),
      sweetness: parseFloat(values[2]),
      softness: parseFloat(values[3]),
      harvestTime: parseFloat(values[4]),
      ripeness: parseFloat(values[5]),
      acidity: parseFloat(values[6]),
    };
    bananaDataset.push(banana);
  }

  return bananaDataset;
};

// Fixing the tuple type error by making sure optimalRanges explicitly uses tuple types
export const optimalRanges = {
  size: [-2.5, 0.7] as [number, number],
  weight: [0.4, 3.5] as [number, number],
  sweetness: [0.3, 4.1] as [number, number],
  softness: [-2.7, -0.5] as [number, number],
  harvestTime: [-2.2, 0.4] as [number, number],
  ripeness: [1.0, 4.0] as [number, number],
  acidity: [0.2, 2.8] as [number, number]
};

// Generate recommendations based on input values
export const generateRecommendations = (bananaData: BananaData): string[] => {
  const recommendations: string[] = [];
  
  // Check each feature against optimal ranges
  if (bananaData.size < optimalRanges.size[0]) {
    recommendations.push("The banana size is too small. Look for larger varieties or improve growing conditions.");
  } else if (bananaData.size > optimalRanges.size[1]) {
    recommendations.push("The banana size is too large. Consider harvesting earlier or using different varieties.");
  }
  
  if (bananaData.weight < optimalRanges.weight[0]) {
    recommendations.push("The banana is underweight. Improve nutrition during growing phase.");
  } else if (bananaData.weight > optimalRanges.weight[1]) {
    recommendations.push("The banana is overweight. This might affect texture and taste.");
  }
  
  if (bananaData.sweetness < optimalRanges.sweetness[0]) {
    recommendations.push("Sweetness is low. Consider allowing more time for ripening before consumption.");
  } else if (bananaData.sweetness > optimalRanges.sweetness[1]) {
    recommendations.push("Sweetness is very high. Ideal for desserts and smoothies.");
  }
  
  if (bananaData.softness < optimalRanges.softness[0]) {
    recommendations.push("The banana is too firm. Allow more ripening time for better texture.");
  } else if (bananaData.softness > optimalRanges.softness[1]) {
    recommendations.push("The banana is too soft. Consider consuming sooner or using for baking.");
  }
  
  if (bananaData.harvestTime < optimalRanges.harvestTime[0]) {
    recommendations.push("The banana was harvested quite early. May affect final ripening quality.");
  } else if (bananaData.harvestTime > optimalRanges.harvestTime[1]) {
    recommendations.push("The banana was harvested late. Monitor for faster ripening and shorter shelf life.");
  }
  
  if (bananaData.ripeness < optimalRanges.ripeness[0]) {
    recommendations.push("Ripeness is low. Allow more time before consumption for optimal flavor.");
  } else if (bananaData.ripeness > optimalRanges.ripeness[1]) {
    recommendations.push("Ripeness is high. Consume soon or use for baking.");
  }
  
  if (bananaData.acidity < optimalRanges.acidity[0]) {
    recommendations.push("Acidity is low. This banana will have a milder taste.");
  } else if (bananaData.acidity > optimalRanges.acidity[1]) {
    recommendations.push("Acidity is high. May have a stronger, tangier flavor.");
  }
  
  // If no specific recommendations, give general positive feedback
  if (recommendations.length === 0) {
    recommendations.push("All banana parameters are within optimal ranges. This is an excellent quality banana!");
  }
  
  // Add a general tip
  recommendations.push("Store bananas at room temperature to allow proper ripening and development of sweetness.");
  
  return recommendations;
};

// Predict banana quality based on input parameters
export const predictBananaQuality = (bananaData: BananaData): { quality: string; confidence: number; score: number } => {
  // Calculate a quality score based on how close each parameter is to the optimal range
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Helper function to calculate score for each parameter
  const calculateParameterScore = (value: number, optimalRange: [number, number], importance: number) => {
    const [min, max] = optimalRange;
    const midPoint = (min + max) / 2;
    const rangeWidth = max - min;
    
    // Score diminishes as the value moves away from the optimal range
    if (value >= min && value <= max) {
      // Within range: score based on proximity to midpoint
      const distanceFromMid = Math.abs(value - midPoint);
      const percentageFromOptimal = 1 - (distanceFromMid / (rangeWidth / 2));
      return importance * (0.7 + 0.3 * percentageFromOptimal);
    } else {
      // Outside range: penalty based on distance
      const distanceOutside = value < min ? min - value : value - max;
      const penaltyFactor = Math.min(1, distanceOutside / rangeWidth);
      return importance * Math.max(0, 0.7 - 0.5 * penaltyFactor);
    }
  };
  
  // Calculate scores for each parameter
  for (const [param, importance] of Object.entries(featureImportance)) {
    const value = bananaData[param as keyof BananaData];
    const optimalRange = optimalRanges[param as keyof typeof optimalRanges];
    const score = calculateParameterScore(value, optimalRange, importance);
    
    totalScore += score;
    maxPossibleScore += importance;
  }
  
  // Normalize score to 0-100%
  const normalizedScore = (totalScore / maxPossibleScore) * 100;
  
  // Determine quality based on score
  let quality = "Bad";
  if (normalizedScore >= 70) {
    quality = "Good";
  }
  
  // Add some randomness to confidence (within reasonable bounds)
  const confidenceBase = Math.min(95, Math.max(55, normalizedScore));
  const randomFactor = Math.random() * 5 - 2.5; // Random adjustment between -2.5 and +2.5
  const confidence = Math.round(confidenceBase + randomFactor);
  
  return {
    quality,
    confidence,
    score: normalizedScore
  };
};

// Determine visual characteristics based on banana parameters
export const getBananaVisualCharacteristics = (bananaData: BananaData): {
  color: string;
  spotting: string;
  shape: string;
  visualDescription: string;
} => {
  // Color based on ripeness and harvest time
  let color = "yellow";
  if (bananaData.ripeness < 1.0) {
    color = "green-yellow";
  } else if (bananaData.ripeness > 3.0) {
    color = "yellow-brown";
  }
  
  // Spotting based on ripeness and harvest time
  let spotting = "minimal";
  if (bananaData.ripeness > 2.5 || bananaData.harvestTime > 0) {
    spotting = "moderate";
  }
  if (bananaData.ripeness > 3.5 || bananaData.harvestTime > 1) {
    spotting = "significant";
  }
  
  // Shape based on size and weight
  let shape = "classic curved";
  if (bananaData.size < -1.5 && bananaData.weight > 2.0) {
    shape = "short and thick";
  } else if (bananaData.size > 0 && bananaData.weight < 1.0) {
    shape = "long and thin";
  } else if (bananaData.size < -2.0 && bananaData.weight < 1.0) {
    shape = "small and compact";
  }
  
  // Generate visual description
  const visualDescription = `This banana appears ${color} with ${spotting} brown spotting. It has a ${shape} shape.`;
  
  return {
    color,
    spotting,
    shape,
    visualDescription
  };
};

// Add this function to replace the missing predictCropYield
export const predictCropYield = (bananaData: BananaData): { yield: number; confidence: number } => {
  // Use the banana quality prediction to determine a yield value
  const qualityPrediction = predictBananaQuality(bananaData);
  
  // Calculate a mock yield based on the quality score
  const baseYield = qualityPrediction.quality === 'Good' ? 4.5 : 2.8;
  const yieldVariation = (qualityPrediction.score / 100) * 2; // Up to 2 t/ha variation
  
  return {
    yield: baseYield + yieldVariation,
    confidence: qualityPrediction.confidence
  };
};
